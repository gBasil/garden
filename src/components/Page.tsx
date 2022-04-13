import { Page as GeistPage, Spacer, Text } from '@geist-ui/core';
import Head from 'next/head';
import packageJSON from '../../package.json';
import Link from './Link';

type PageProps = {
	title: string;
	children: JSX.Element | JSX.Element[];
	quote?: boolean;
	headerContent?: JSX.Element | JSX.Element[];
};

const Page = ({ title, children, quote, headerContent }: PageProps) => {
	return (
		<GeistPage
			style={{
				maxWidth: '1000px',
			}}
		>
			<Head>
				<title>{title}</title>
			</Head>
			<GeistPage.Header>
				<Text h1 my={0}>
					🪴 Garden{' '}
					<Link
						href='/changelog'
						className='transition-opacity hover:opacity-50'
					>
						<Text small font={1} type='secondary'>
							v{packageJSON.version}
						</Text>
					</Link>
				</Text>
				{quote && (
					<Text my={0} type='secondary'>
						The world is quiet here
					</Text>
				)}
				{headerContent}
				<Spacer />
			</GeistPage.Header>
			{children}
		</GeistPage>
	);
};

export default Page;
