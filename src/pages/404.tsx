import { Breadcrumbs, Spacer, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import Page from '../components/Page';

const Error404: NextPage = () => (
	<Page
		title='Home'
		headerContent={
			<Breadcrumbs>
				<Breadcrumb href='/'>Home</Breadcrumb>
				<Breadcrumb>404</Breadcrumb>
			</Breadcrumbs>
		}
	>
		<Spacer h={2} />
		<div className='text-center'>
			<Text h1>404</Text>
			<Text>You know the drill, we couldn&apos;t find the page.</Text>
		</div>
	</Page>
);

export default Error404;
