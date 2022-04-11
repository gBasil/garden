import { FieldValues, UseFormSetError } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	issues: z.array(
		z.object({
			message: z.string(),
			path: z.array(z.string())
		})
	),
});

const handleFormError = (err: any, setError: UseFormSetError<FieldValues>) => {
	if (!schema.safeParse(err.response.data).success) return true;

	err.response.data.issues.forEach((issue: any) =>
		setError(issue.path[0], {
			type: 'custom',
			message: issue.message,
		})
	);
};

export default handleFormError;
