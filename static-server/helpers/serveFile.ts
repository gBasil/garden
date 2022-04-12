import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { prisma } from '../../src/helpers/db';

// Cache the subdirectories from lookups
const dirCache: any = {};
const fetchDir = async (id: string) => {
	if (!dirCache[id]) {
		const schema = await prisma.snapshot.findFirst({ where: { id } });

		dirCache[id] = schema ? new URL(schema.url).hostname : '/';
		// This is very lazy revalidation, and should probably be improved
		setTimeout(() => delete dirCache[id], 60 * 1000);
		return dirCache[id];
	} else return dirCache[id];
};

const check = (req: Request) => req.cookies.snapshotUUID;

const handle = async (req: Request, res: Response) => {
	const file = join(
		process.cwd(),
		'snapshots',
		req.cookies.snapshotUUID,
		'files',
		await fetchDir(req.cookies.snapshotUUID),
		req.path
	);

	if (!existsSync(file)) return res.status(404).send('404');

	res.sendFile(file);
	return;
};

export default { check, handle };
