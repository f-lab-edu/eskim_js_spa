const URL = 'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/';

export const handleResponse = async (res: Response) => {
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error(`Response error:${res.status}`);
	}
};

export const getNodeData = async (nodeId: string = '') => {
	const res = await fetch(`${URL}${nodeId}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	return handleResponse(res);
};
