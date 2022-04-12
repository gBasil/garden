import { Breadcrumbs, Button, Card, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Page from '../components/Page';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormInput from '../components/FormInput';
import handleFormError from '../helpers/handleFormError';
import FormCheckbox from '../components/FormCheckbox';
import { z } from 'zod';
import { useRouter } from 'next/router';

const New: NextPage = () => {
	const {
		register,
		handleSubmit,
		setError,
		control,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const snapshot = (data: any) => {
		setLoading(true);
		axios
			.post('/api/action/snapshot', data)
			.then(({ data }) => router.push(`/snapshot/${data.uuid}`))
			.catch((err) => {
				setLoading(false);

				const message = z
					.object({
						data: z.object({
							message: z.string(),
						}),
					})
					.safeParse(err.response).success
					? err.response.data.message
					: 'An unknown error ocurred';

				if (handleFormError(err, setError))
					setError('server', {
						message,
					});
			});
	};

	return (
		<Page
			title='New'
			headerContent={
				<Breadcrumbs>
					<Breadcrumb href='/'>Home</Breadcrumb>
					<Breadcrumb>New</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<Card className='m-auto w-96'>
				<form
					onSubmit={handleSubmit(snapshot)}
					className='flex flex-col items-start gap-4'
					onChange={() => clearErrors()}
				>
					<FormInput
						control={control}
						register={register}
						name='title'
						placeholder={"Basil's portfolio"}
						inputProps={{
							width: '100%',
						}}
					>
						Title
					</FormInput>

					<FormInput
						control={control}
						register={register}
						name='url'
						placeholder='https://gbasil.dev'
						inputProps={{
							width: '100%',
						}}
					>
						URL
					</FormInput>

					<FormCheckbox
						control={control}
						setValue={setValue}
						name={'entireSite'}
						defaultValue={false}
					>
						Snapshot entire site
					</FormCheckbox>

					<Button
						type={errors.server ? 'error' : 'secondary'}
						className='w-full'
						loading={loading}
						htmlType='submit'
					>
						Snapshot
					</Button>
					{errors.server && (
						<Text small type='error' my={0}>
							{errors.server.message}
						</Text>
					)}
				</form>
			</Card>
		</Page>
	);
};

export default New;
