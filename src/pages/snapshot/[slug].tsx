import { Breadcrumbs, Display, Spinner, Text } from '@geist-ui/core';
import type { GetServerSideProps, NextPage } from 'next';
import Breadcrumb from '../../components/Breadcrumb';
import Page from '../../components/Page';
import { prisma } from '../../helpers/server/db';
import { deserialize, serialize } from 'superjson';
import { Snapshot } from '@prisma/client';
import { useQuery } from 'react-query';
import { SuperJSONResult } from 'superjson/dist/types';
import getSnapshot from '../../helpers/client/getSnapshot';
import SnapshotPage from '../../components/SnapshotPage';

type Props = {
	snapshot: SuperJSONResult;
};

const Site: NextPage<Props> = (props) => {
	const deserialized: Snapshot = deserialize(props.snapshot);
	const { data: snapshot, isSuccess } = useQuery<Snapshot>(
		['snapshot', deserialized.id],
		() => getSnapshot(deserialized.id),
		{
			initialData: deserialized,
			refetchInterval: (data) =>
				!data || !data.ready ? 1000 : 5 * 60 * 1000,
		}
	);

	return (
		<Page
			title={isSuccess ? snapshot.title : '404'}
			headerContent={
				<Breadcrumbs>
					<Breadcrumb href='/'>Home</Breadcrumb>
					<Breadcrumb>
						{isSuccess ? snapshot.title : '404'}
					</Breadcrumb>
				</Breadcrumbs>
			}
		>
			{isSuccess ? (
				snapshot.ready ? (
					<SnapshotPage snapshot={snapshot} />
				) : (
					<Display caption='Archival underway, the page will be updated automagically on finish.'>
						<Spinner scale={4} />
					</Display>
				)
			) : (
				<Text type='error' className='text-center'>
					Error fetching data, try refreshing the page.
				</Text>
			)}
		</Page>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const snapshot = await prisma.snapshot.findFirst({
		where: {
			id: context.query.slug as string,
		},
	});

	if (snapshot)
		return {
			props: {
				snapshot: serialize(snapshot),
			},
		};
	else
		return {
			notFound: true,
		};
};

export default Site;
