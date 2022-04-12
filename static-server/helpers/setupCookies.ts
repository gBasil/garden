import { Request, Response } from 'express';
import { prisma } from '../../src/helpers/server/db';

const setupCookies = async (req: Request, res: Response) => {
	// TODO: Add check to prevent redundant database lookups
	const snapshot = await prisma.snapshot.findFirst({
		where: {
			id: req.params.id,
		},
	});

	if (!snapshot)
		return res.status(501).json({
			message: "Couldn't find snapshot",
		});

	const expires = new Date();
	// Add 1 day
	expires.setDate(expires.getDate() + 1);

	// Cache the directory so we don't need lookups
	res.cookie('snapshotID', req.params.id, {
		path: '/',
		expires,
		httpOnly: true,
	}).redirect(snapshot.path!);
};

export default setupCookies;
