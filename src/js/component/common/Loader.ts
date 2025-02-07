export class Loader {
	private readonly $target: HTMLDivElement;

	constructor({ $parent }: { $parent: HTMLElement }) {
		this.$target = document.createElement('div');
		this.$target.classList.add('loader');
		$parent.appendChild(this.$target);
	}
}