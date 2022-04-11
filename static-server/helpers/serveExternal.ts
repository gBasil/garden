import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

const check = (req: Request) =>
	req.path.startsWith('/ext/') &&
	(req.headers.accept === '*/*' ||
		req.headers['user-agent']?.startsWith('node-fetch'));

const handle = (req: Request, res: Response) => {
	const file = join(process.cwd(), 'archive', req.path.slice(4));

	if (!existsSync(file)) return res.status(500).send();
	res.sendFile(file);
};

export default { check, handle };
