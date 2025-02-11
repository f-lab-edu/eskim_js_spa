import { RouteState } from '../../utils/type';

export default class BreadCrumb {
	public $target: HTMLElement;
	public state: RouteState[];

	constructor({ $app }: { $app: HTMLDivElement }) {
		this.$target = document.createElement('nav');
		this.$target.classList.add('breadcrumb');
		$app.appendChild(this.$target);
		this.state = history.state;

		this.render();
	}

	setState(nextState: RouteState[]) {
		this.state = nextState;
		this.render();
	}

	render() {
		this.$target.innerHTML = this.state
			.map((item) => `<div>${item.name}</div>`)
			.join('');
	}
}
