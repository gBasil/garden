import { Tooltip } from '@geist-ui/core';
import ReactTimeago from 'react-timeago';

type TimeAgoProps = {
	date: Date;
};

const TimeAgo = ({ date }: TimeAgoProps) => {
	return (
		<Tooltip
			text={date.toLocaleString('en-US', {
				timeStyle: 'short',
				dateStyle: 'long',
			})}
			type='dark'
			scale={0.5}
		>
			<ReactTimeago date={date} />
		</Tooltip>
	);
};

export default TimeAgo;
