import {AppRoute} from "../../utils/type";

export default class BreadCrumb {
	public state: AppRoute[];
	public $target: HTMLElement;

	constructor({
		$app,
		initialState,
	}: {
		$app: HTMLDivElement;
		initialState: AppRoute[];
	}) {
		this.state = initialState;
		this.$target = document.createElement('nav');
		this.$target.classList.add('breadcrumb');
		$app.appendChild(this.$target);

		this.render();
	}

	setState(nextState: AppRoute[]) {
		this.state = nextState;
		this.render();
	}

	render() {
		this.$target.innerHTML = this.state
			.map((item) => `<div>${item.name}</div>`)
			.join('');
	}
}
