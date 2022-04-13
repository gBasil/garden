import { Grid, Text } from '@geist-ui/core';
import Image from 'next/image';

type ReleaseProps = {
	v: string;
	date: string;
	hidden?: boolean;
	children: JSX.Element | JSX.Element[];
};

type ReleaseContainerProps = {
	children: JSX.Element | JSX.Element[];
};

type ReleaseImageProps = {
	src: string;
};

const Release = ({ v, children, date, hidden }: ReleaseProps) =>
	hidden ? null : (
		<>
			<Grid xs={24} md={5}>
				<div>
					<Text
						h4
						className='mb-0 inline-block w-20 rounded bg-lime-100 text-center text-lime-900'
					>
						v{v}
					</Text>
					<Text small h5 type='secondary'>
						{new Date(date).toLocaleDateString('en-US', {
							dateStyle: 'long',
						})}
					</Text>
				</div>
			</Grid>
			<Grid xs={24} md={19} className='mb-12 block'>
				{children}
			</Grid>
		</>
	);

Release.Container = ({ children }: ReleaseContainerProps) => (
	<Grid.Container gap={1}>{children}</Grid.Container>
);

Release.Image = ({ src }: ReleaseImageProps) => (
	<div className='relative aspect-video overflow-clip rounded-md'>
		<Image src={`/img/changelog/${src}`} layout='fill' quality={100} />
	</div>
);

export default Release;
