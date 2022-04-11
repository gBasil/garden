import { exec } from 'child_process';
import { copyFileSync, existsSync } from 'fs';
import { NextApiResponse } from 'next';
import { join } from 'path';
import { prisma } from './db';
import getFolderSize from 'get-folder-size';
import recursive from 'recursive-readdir';
import captureWebsite from 'capture-website';
import config from './config';

const archiveSite = async (
	url: string,
	title: string,
	entireSite: boolean,
	res?: NextApiResponse
) => {
	const snapshot = await prisma.snapshot.create({
		data: {
			title,
			url,
			ready: false,
		},
	});

	if (res && !res.headersSent)
		res.status(200).json({
			uuid: snapshot.id,
		});

	const getPath = (...path: string[]) =>
		join(process.cwd(), `archive/${snapshot.id}`, ...path);

	exec(
		`wget --no-clobber --page-requisites --convert-links --restrict-file-names=windows --adjust-extension --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" ${
			entireSite && '--recursive'
		} --directory-prefix=${getPath('files')} ${url}`,
		async (_, stdout, stderr) => {
			// All of this is done just to get the file which we took a snapshot of
			const out = stdout || stderr;
			const targetLine = out
				.split(/\r?\n/g)
				.find((line) => line.startsWith('Saving to: '))!;
			const outFile: string = targetLine.split(/[‘’]/)[1];
			const relativePath = outFile.replace(
				`${getPath('files')}/${new URL(url).hostname}`,
				''
			);

			// Move favicon (if it exists)
			const favicon = getPath(
				'files',
				new URL(url).hostname,
				'favicon.ico'
			);
			if (existsSync(favicon))
				copyFileSync(favicon, getPath('favicon.ico'));

			prisma.snapshot
				.update({
					where: {
						id: snapshot.id,
					},
					data: {
						favicon: existsSync(favicon),
						size: await getFolderSize.loose(getPath('files')),
						files: (await recursive(getPath('files'))).length,
						path: relativePath,
					},
				})
				.then(async (snapshot) => {
					await captureWebsite.file(
						config.static.url + relativePath,
						getPath('screenshot.png'),
						{
							headers: {
								cookie: `archiveUUID=${snapshot.id}`,
							},
						}
					);

					prisma.snapshot
						.update({
							where: {
								id: snapshot.id,
							},
							data: {
								ready: true,
							},
						})
						.then(() => {
							// For some reason, the data only updates when I add a .then. Probably a Next.js thing
						});
				});
		}
	);
};

export default archiveSite;
