import {
	Breadcrumbs,
	Button,
	Card,
	Description,
	Display,
	Grid,
	Modal,
	Spacer,
	Spinner,
	Text,
	useModal,
	useToasts,
} from '@geist-ui/core';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Breadcrumb from '../../components/Breadcrumb';
import Link from '../../components/Link';
import Page from '../../components/Page';
import { prisma } from '../../helpers/db';
import { deserialize, serialize } from 'superjson';
import { Snapshot } from '@prisma/client';
import prettyBytes from 'pretty-bytes';
import config from '../../helpers/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ExternalLink } from '@geist-ui/icons';

const Site: NextPage = (props: any) => {
	const snapshot: Snapshot = deserialize(props.snapshot);
	const { setToast } = useToasts();
	const router = useRouter();
	const { setVisible, bindings } = useModal();

	const deleteSnapshot = () => {
		axios
			.post('/api/action/delete', {
				uuid: snapshot.id,
			})
			.then(({ data }) => {
				setToast({
					text: data.message,
					delay: 4000,
				});
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

	return (
		<Page
			title={snapshot.title}
			headerContent={
				<Breadcrumbs>
					<Breadcrumb href='/'>Home</Breadcrumb>
					<Breadcrumb>{snapshot.title}</Breadcrumb>
				</Breadcrumbs>
			}
		>
			{snapshot.ready ? (
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
											content={prettyBytes(
												snapshot.size!
											)}
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
						<Modal.Title>
							Deletion Confirmation Delegation
						</Modal.Title>
						<Modal.Content>
							<Text>
								Are you sure you want to delete it? It will be
								lost forever! (A long time)
							</Text>
						</Modal.Content>
						<Modal.Action passive onClick={() => setVisible(false)}>
							Cancel
						</Modal.Action>
						<Modal.Action onClick={deleteSnapshot}>
							Delete
						</Modal.Action>
					</Modal>
				</>
			) : (
				<Display caption='Archival in progress, please check in later for the verdict.'>
					<Spinner scale={4} />
				</Display>
			)}
		</Page>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
