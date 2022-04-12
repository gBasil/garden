import { Card, Grid, Text } from '@geist-ui/core';
import { Snapshot } from '@prisma/client';
import Image from 'next/image';
import Link from './Link';
import config from '../helpers/config';

type SnapshotCardProps = {
	snapshot: Snapshot;
};

const SnapshotCard = ({ snapshot }: SnapshotCardProps) => {
	return (
		<Grid xs={24} sm={12} md={8}>
			<Link href={`/snapshot/${snapshot.id}`} className='w-full'>
				<Card className='w-full overflow-clip' shadow>
					<Card.Content padding={0}>
						<div className='relative aspect-video w-full'>
							<Image
								src={`${config.static.url}/ext/${snapshot.id}/screenshot.png`}
								alt='Preview of snapshotted webpage'
								layout='fill'
								objectFit='cover'
								objectPosition='top center'
							/>
						</div>

						<Card.Content padding={1}>
							<Text h3 margin={0}>
								{snapshot.title}
							</Text>

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
							</div>
						</Card.Content>
					</Card.Content>
				</Card>
			</Link>
		</Grid>
	);
};

export default SnapshotCard;
