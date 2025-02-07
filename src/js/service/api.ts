import { DataForNode } from '../utils/type';

const URL = 'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/';

export const handleResponse = async (res: Response) => {
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error(`Response error:${res.status}`);
	}
};

export const getRootData = async (): Promise<DataForNode[]> => {
	const res = await fetch(URL, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	return handleResponse(res);
};

export const getSpecificData = async (nodeId: string): Promise<DataForNode> => {
	const res = await fetch(`${URL}${nodeId}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	return handleResponse(res);
};
