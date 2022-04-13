import { Button, Grid, Spacer, Text } from '@geist-ui/core';
import { Snapshot } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { deserialize, serialize } from 'superjson';
import { SuperJSONResult } from 'superjson/dist/types';
import SnapshotCard from '../components/SnapshotCard';
import Link from '../components/Link';
import Page from '../components/Page';
import { prisma } from '../helpers/server/db';
import { useQuery } from 'react-query';
import getSnapshots from '../helpers/client/getSnapshots';

type Props = {
	snapshots: SuperJSONResult;
};

const Home: NextPage<Props> = (props) => {
	const deserialized: Snapshot[] = deserialize(props.snapshots);
	const { data: snapshots, isSuccess } = useQuery<Snapshot[]>(
		['snapshots'],
		getSnapshots,
		{
			initialData: deserialized,
		}
	);

	return (
		<Page quote title='Home'>
			<div className='flex w-full place-content-end'>
				<Link href='/new'>
					<Button>Snapshot Website</Button>
				</Link>
			</div>

			<Spacer />

			{isSuccess ? (
				snapshots.length ? <Grid.Container gap={3}>
					{snapshots.map((snapshot) => (
						<SnapshotCard snapshot={snapshot} key={snapshot.id} />
					))}
				</Grid.Container>
				: <Text className='text-center' type='secondary'>There's nothing here, try snapshotting a website.</Text>
			) : (
				<Text type='error'>Error fetching data, try refreshing the page.</Text>
			)}
		</Page>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const snapshots = await prisma.snapshot.findMany({
		where: {
			ready: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		props: {
			snapshots: serialize(snapshots),
		},
	};
};

export default Home;
