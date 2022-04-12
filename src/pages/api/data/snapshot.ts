import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withValidation } from 'next-validations';
import { prisma } from '../../../helpers/db';
import { serialize } from 'superjson';

const schema = z.object({
	uuid: z.string().uuid(),
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
				id: req.body.uuid,
			},
		})
		.then((data) => {
			if (!data) throw new Error();

			res.status(200).json(serialize(data));
		})
		.catch((err) => {
			res.status(500).json({
				message: 'An error ocurred fetching snapshot status',
			});
		});
};
export default validate(handler);
