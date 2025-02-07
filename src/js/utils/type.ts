export type DataForNodeType = 'DIRECTORY' | 'FILE';

export interface DataForNode {
	id: string;
	name: string;
	type: DataForNodeType;
	filePath: string | null;
	parent: object | null;
}
