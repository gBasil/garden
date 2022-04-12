import {
	Button,
	Card,
	Description,
	Grid,
	Modal,
	Spacer,
	Text,
	useModal,
	useToasts,
} from '@geist-ui/core';
import { ExternalLink } from '@geist-ui/icons';
import { Snapshot } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import prettyBytes from 'pretty-bytes';
import deleteSnapshot from '../helpers/client/deleteSnapshot';
import config from '../helpers/config';
import Link from './Link';

const SnapshotPage = ({ snapshot }: { snapshot: Snapshot }) => {
	const { setVisible, bindings } = useModal();
	const { setToast } = useToasts();
	const router = useRouter();

	return (
		<>
			<Card>
				<Grid.Container gap={2}>
					<Grid xs={24} md={12}>
						<div className='relative aspect-video w-full'>
							<Link
								href={`${config.static.url}/view/${snapshot.id}`}
							>
								<Image
									src={`${config.static.url}/ext/${snapshot.id}/screenshot.png`}
									alt='Preview of snapshotted webpage'
									layout='fill'
									objectFit='cover'
									objectPosition='top center'
									className='rounded transition-opacity hover:opacity-60'
								/>
							</Link>
						</div>
					</Grid>
					<Grid
						xs={24}
						sm={12}
						className='block w-full max-w-full flex-1'
					>
						<Text h2 my={0}>
							{snapshot.title}
						</Text>
						<Link href={snapshot.url}>
							<div className='flex items-center gap-1'>
								{snapshot.favicon && (
									<div className='h-4 w-4 min-w-[16px]'>
										<Image
											src={`${config.static.url}/ext/${snapshot.id}/favicon.ico`}
											alt=''
											width={16}
											height={16}
										/>
									</div>
								)}
								<Text
									small
									type='secondary'
									className='overflow-hidden overflow-ellipsis whitespace-nowrap'
								>
									{snapshot.url}
								</Text>
								<Text small type='secondary'>
									<ExternalLink
										size={16}
										color='currentColor'
									/>
								</Text>
							</div>
						</Link>

						<Spacer />

						<Grid.Container gap={2}>
							<Grid xs={12}>
								<Description
									title='Files'
									content={`${snapshot.files} file${
										snapshot.files === 1 ? '' : 's'
									}`}
								/>
							</Grid>
							<Grid xs={12}>
								<Description
									title='Size'
									content={prettyBytes(snapshot.size!)}
								/>
							</Grid>
							<Grid xs={12}>
								<Description
									title='Created'
									content={snapshot.createdAt.toLocaleString(
										'en-US',
										{
											timeStyle: 'short',
											dateStyle: 'long',
										}
									)}
								/>
							</Grid>
						</Grid.Container>
					</Grid>
				</Grid.Container>
			</Card>

			<Spacer />

			<div className='flex gap-4'>
				<Button type='error' onClick={() => setVisible(true)}>
					Delete
				</Button>
			</div>

			<Modal {...bindings}>
				<Modal.Title>Deletion Confirmation Delegation</Modal.Title>
				<Modal.Content>
					<Text>
						Are you sure you want to delete it? It will be lost
						forever! (A long time)
					</Text>
				</Modal.Content>
				<Modal.Action passive onClick={() => setVisible(false)}>
					Cancel
				</Modal.Action>
				<Modal.Action
					onClick={() => deleteSnapshot(snapshot, router, setToast)}
				>
					Delete
				</Modal.Action>
			</Modal>
		</>
	);
};

export default SnapshotPage;
