import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withValidation } from 'next-validations';
import axios from 'axios';
import snapshotSite from '../../../helpers/server/snapshotSite';

const schema = z.object({
	title: z.string().max(100),
	url: z.string().url(),
	entireSite: z.boolean(),
});

const validate = withValidation({
	schema,
	type: 'Zod',
	mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	axios
		.get(req.body.url)
		.then((response) => {
			const url = response.request.res.responseUrl;

			snapshotSite(url, req.body.title, req.body.entireSite, res);
		})
		.catch(() => {
			if (!res.headersSent)
				res.status(500).json({
					message:
						"The website couldn't be reached, neither for content nor comments on the situation.",
				});
		});
};
export default validate(handler);
