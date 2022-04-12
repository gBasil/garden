import { deserialize } from 'superjson';
import { Snapshot } from '@prisma/client';
import axios from 'axios';

const getSnapshot = async (id: string): Promise<Snapshot> => {
	const response = await axios.post('/api/data/snapshot', { uuid: id });
	if (!response) throw new Error('Failed to fetch snapshot');

	return deserialize(response.data) as Snapshot;
};

export default getSnapshot;
