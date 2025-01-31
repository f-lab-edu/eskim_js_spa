import { DIRECTORY_IMG_PATH } from '../../utils/constant';
import { getRootData } from '../../service/api';
import { DataForNode } from '../../utils/type';
import { ResponseErrorMessage } from '../common/ResponseErrorMessage';
import { Loader } from '../common/Loader';

export class Nodes {
	private readonly $target: HTMLDivElement;
	private nodeList: DataForNode[] | null;
	private isLoading: boolean;
	private errorMessage: string | null;

	constructor({ $app }: { $app: HTMLDivElement }) {
		this.$target = document.createElement('div');
		this.$target.classList.add('Nodes');
		$app.appendChild(this.$target);

		this.nodeList = null;
		this.errorMessage = null;
		this.isLoading = true;
		this.render();

		getRootData()
			.then((data) => {
				this.nodeList = data;
			})
			.catch((error: unknown) => {
				this.errorMessage = (error as Error).message;
			})
			.finally(() => {
				this.isLoading = false;
				this.render();
			});
	}

	setState(nextState: DataForNode[] | null) {
		this.nodeList = nextState;
		this.render();
	}

	render() {
		this.$target.replaceChildren();

		if (this.isLoading) {
			new Loader({ $parent: this.$target });
			return;
		}

		if (this.errorMessage !== null) {
			new ResponseErrorMessage({ $parent: this.$target });
			this.errorMessage = null;
		} else {
			this.$target.innerHTML = this.nodeList!.map(
				(item) =>
					`<div class="Node">
                        <img alt=${item.type === 'FILE' ? '파일' : '디렉토리'} src=${item.type === 'FILE' ? item.filePath : DIRECTORY_IMG_PATH}>
                        <div>${item.name}</div>
                     </div>`,
			).join('');
		}
	}
}