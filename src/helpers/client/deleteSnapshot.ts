import { ToastInput } from '@geist-ui/core';
import { Snapshot } from '@prisma/client';
import axios from 'axios';
import { NextRouter } from 'next/router';
import { queryClient } from '../../pages/_app';

const deleteSnapshot = (
	snapshot: Snapshot,
	router: NextRouter,
	setToast: (toast: ToastInput) => void
) => {
	axios
		.post('/api/action/delete', {
			uuid: snapshot.id,
		})
		.then(({ data }) => {
			setToast({
				text: data.message,
				delay: 4000,
			});

			queryClient.invalidateQueries(['snapshots']);
			router.push('/');
		})
		.catch(({ response }) => {
			if (response.data && response.data.message)
				setToast({
					text: response.data.message,
					type: 'error',
					delay: 4000,
				});
		});
};

export default deleteSnapshot;
