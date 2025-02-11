import BreadCrumb from './component/breadcrumb/BreadCrumb';
import {Nodes} from './component/nodes/Nodes';
import {RouteState, AppState} from './utils/type';
import {Loader} from './component/common/Loader';
import {getNodeData} from './service/api';
import {ImageViewer} from './component/imageViewer/ImageViewer';
import {IMG_BASE_URL} from './utils/constant';

export class App {
    private readonly $app: HTMLDivElement;
    private breadCrumb: BreadCrumb;
    private loader: Loader;
    private nodes: Nodes;
    private imageViewer: ImageViewer;
    private state: AppState;

    constructor() {
        this.state = this.getDefaultState();
        this.$app = document.querySelector('.app') as HTMLDivElement;
        this.breadCrumb = new BreadCrumb({$app: this.$app});
        this.loader = new Loader({$app: this.$app});
        this.imageViewer = new ImageViewer({$app: this.$app});
        this.nodes = new Nodes({
            $app: this.$app,
            onClickEventHandler: async (e) => {
                const nodeType = (e.target as HTMLElement).dataset.nodeType;
                if (nodeType === 'PREV') {
                    this.updateRoute(history.state.slice(0, -1));
                } else if (nodeType === 'DIRECTORY') {
                    const id = (e.target as HTMLElement).dataset.nodeId!;
                    const name = (e.target as HTMLElement).dataset.nodeName!;
                    this.updateRoute([...history.state, {id, name}]);
                } else {
                    const imgSrc = (e.target as HTMLElement).dataset.filePath!;
                    this.setState({
                        ...this.state,
                        imageViewerState: {
                            isOpen: true,
                            imgSrc: `${IMG_BASE_URL}${imgSrc}`,
                        },
                    });
                }
            },
        });

        this.initNodeState();
    }

    setState(nextState: AppState) {
        this.state = nextState;
        this.breadCrumb.setState(history.state);
        this.nodes.setState({
            nodes: this.state.nodes,
            isRoot: this.state.isRoot,
            errorMessage: this.state.errorMessage,
        });
        this.loader.setState(this.state.isLoading);
        this.imageViewer.setState(this.state.imageViewerState);
    }

    async updateRoute(route: RouteState[]) {
        history.replaceState(route, '');
        const currentRoute = route[route.length - 1];
        try {
            this.setState({
                ...this.state,
                nodes: [],
                isLoading: true,
                isRoot: currentRoute.name === 'root',
                errorMessage: null,
            });
            const data = await getNodeData(currentRoute.id);
            this.setState({...this.state, nodes: data});
        } catch (e) {
            this.setState({
                ...this.state,
                errorMessage: (e as Error).message,
            });
        } finally {
            this.setState({...this.state, isLoading: false});
        }
    }

    getDefaultState(): AppState {
        return {
            isRoot: true,
            nodes: [],
            isLoading: false,
            errorMessage: null,
            imageViewerState: {
                isOpen: false,
                imgSrc: '',
            },
        };
    }

    initNodeState() {
        this.setState({...this.state, isLoading: true});
        getNodeData()
            .then((data) => {
                this.setState({...this.state, isRoot: true, nodes: data});
            })
            .catch((e: unknown) => {
                this.setState({...this.state, errorMessage: (e as Error).message});
            })
            .finally(() => {
                this.setState({...this.state, isLoading: false});
            });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    history.pushState([{id: '', name: 'root'}], '');
    new App();
});
