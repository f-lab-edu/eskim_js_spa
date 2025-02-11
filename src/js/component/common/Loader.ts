export class Loader {
	private readonly $target: HTMLDivElement;
	private isLoading: boolean;

	constructor({ $app }: { $app: HTMLElement }) {
		this.isLoading = false;
		this.$target = document.createElement('div');
		this.$target.classList.add('loader');
		$app.appendChild(this.$target);

		this.render();
	}

	setState(nextState: boolean) {
		this.isLoading = nextState;
		this.render();
	}

	render() {
		this.$target.style.opacity = this.isLoading ? '1' : '0';
	}
}
