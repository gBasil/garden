import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withValidation } from 'next-validations';
import { prisma } from '../../../helpers/server/db';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';

const schema = z.object({
	id: z.string().uuid(),
});

const validate = withValidation({
	schema,
	type: 'Zod',
	mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	prisma.snapshot
		.delete({
			where: {
				id: req.body.id,
			},
		})
		.then(() => {
			const folder = join(process.cwd(), 'snapshots', req.body.id);
			if (existsSync(folder)) rmSync(folder, { recursive: true });

			res.status(200).json({
				message: 'Deleted successfully!',
			});
		})
		.catch(() =>
			res.status(500).json({
				message: 'An error ocurred when deleting the snapshot',
			})
		);
};
export default validate(handler);
