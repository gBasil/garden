import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withValidation } from 'next-validations';
import { prisma } from '../../../helpers/server/db';
import { serialize } from 'superjson';

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
		.findFirst({
			where: {
				id: req.body.id,
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
export default validate(handler);
