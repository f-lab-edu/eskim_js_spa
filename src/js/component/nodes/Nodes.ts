import {DIRECTORY_IMG_PATH, FILE_IMG_PATH} from '../../utils/constant';
import { DataForNode } from '../../utils/type';

export type NodesState = {
	nodes: DataForNode[];
	isRoot: boolean;
	errorMessage: string | null;
};

export class Nodes {
	private readonly $target: HTMLDivElement;
	private state: NodesState;

	constructor({
		$app,
		onClickEventHandler,
	}: {
		$app: HTMLDivElement;
		onClickEventHandler: (e: MouseEvent) => void;
	}) {
		this.$target = document.createElement('div');
		this.$target.classList.add('nodes');
		this.$target.onclick = onClickEventHandler;
		$app.appendChild(this.$target);

		this.state = { nodes: [], isRoot: true, errorMessage: null };
		this.render();
	}

	setState(nextState: NodesState) {
		this.state = nextState;
		this.render();
	}

	render() {
		this.$target.replaceChildren();

		if (this.state.errorMessage) {
			this.$target.innerHTML = `<p class="errorMessage">데이터를 불러오지 못했습니다.</p>`;
			return;
		}

		const $nodes = this.state
			.nodes!.map(
				(item) =>
					`<div class="node">
                        <img alt=${item.type === 'FILE' ? '파일' : '디렉토리'} src=${item.type === 'FILE' ? FILE_IMG_PATH : DIRECTORY_IMG_PATH} data-node-type=${item.type} data-node-id=${item.id} data-node-name=${item.name} data-file-path=${item.filePath}>
                        <div>${item.name}</div>
                     </div>`,
			)
			.join('');

		this.$target.innerHTML = this.state.isRoot
			? $nodes
			: `<div class="node"><img alt='뒤로가기' src='img/prev.png' data-node-type='PREV'></div>${$nodes}`;
	}
}
