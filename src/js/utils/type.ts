import {ImageViewerState} from '../component/imageViewer/ImageViewer';

export type DataForNodeType = 'DIRECTORY' | 'FILE';

export interface DataForNode {
    id: string;
    name: string;
    type: DataForNodeType;
    filePath: string | null;
    parent: object | null;
}

export type AppState = {
    isLoading: boolean;
    isRoot: boolean;
    nodes: DataForNode[];
    errorMessage: string | null;
    imageViewerState: ImageViewerState;
};


export type RouteState = {
    id: string;
    name: string;
};