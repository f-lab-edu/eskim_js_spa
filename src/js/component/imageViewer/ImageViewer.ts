export type ImageViewerState = {
	imgSrc: string;
	isOpen: boolean;
};

export class ImageViewer {
	private $modalContainer: HTMLDivElement;
	private state: ImageViewerState;

	constructor({ $app }: { $app: HTMLDivElement }) {
		this.state = {
			isOpen: false,
			imgSrc: '',
		};
		this.$modalContainer = document.createElement('div');
		this.$modalContainer.classList.add('modal');
		this.$modalContainer.classList.add('imageViewer');
		this.$modalContainer.dataset.uiType = 'modalContainer';
		this.$modalContainer.addEventListener('click', (e) => {
			if ((e.target as HTMLElement).dataset.uiType === 'modalContainer')
				this.setState({
					isOpen: false,
					imgSrc: '',
				});
		});

		$app.appendChild(this.$modalContainer);
	}

	setState(nextState: ImageViewerState) {
		this.state = nextState;
		this.render();
	}

	render() {
		this.$modalContainer.innerHTML = `<div class="content">${this.state.isOpen ? `<img alt="고양이 이미지" src="${this.state.imgSrc}" onerror='this.parentNode.innerHTML = "데이터 조회에 실패했습니다."'>` : ''}</div>`;
		this.$modalContainer.style.display = this.state.isOpen ? 'block' : 'none';
	}
}
