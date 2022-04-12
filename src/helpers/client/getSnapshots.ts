import { Snapshot } from "@prisma/client";
import axios from "axios";
import { deserialize } from "superjson";

const getSnapshots = async (): Promise<Snapshot[]> => {
	const response = await axios.get('/api/data/snapshots');
	if (!response) throw new Error('Failed to fetch snapshot');

	return deserialize(response.data) as Snapshot[];
};

export default getSnapshots;