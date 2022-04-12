import { Button, Grid, Spacer } from '@geist-ui/core';
import { Snapshot } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { deserialize, serialize } from 'superjson';
import { SuperJSONResult } from 'superjson/dist/types';
import SnapshotCard from '../components/SnapshotCard';
import Link from '../components/Link';
import Page from '../components/Page';
import { prisma } from '../helpers/db';

type Props = {
	snapshots: SuperJSONResult;
};

const Home: NextPage<Props> = (props) => {
	const snapshots: Snapshot[] = deserialize(props.snapshots);

	return (
		<Page quote title='Home'>
			<div className='flex w-full place-content-end'>
				<Link href='/new'>
					<Button>Snapshot Website</Button>
				</Link>
			</div>

			<Spacer />

			<Grid.Container gap={3}>
				{snapshots.map((snapshot) => (
					<SnapshotCard snapshot={snapshot} key={snapshot.id} />
				))}
			</Grid.Container>
		</Page>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const snapshots = await prisma.snapshot.findMany({
		where: {
			ready: true,
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return {
		props: {
			snapshots: serialize(snapshots),
		},
	};
};

export default Home;
