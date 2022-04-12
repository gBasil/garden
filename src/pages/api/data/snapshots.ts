import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../helpers/server/db';
import { serialize } from 'superjson';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	prisma.snapshot
		.findMany({
			where: {
				ready: true,
			},
		})
		.then((data) => {
			if (!data) throw new Error();

			res.status(200).json(serialize(data));
		})
		.catch(() => 
			res.status(500).json({
				message: 'An error ocurred fetching snapshot status',
			})
		);
};
export default handler;
