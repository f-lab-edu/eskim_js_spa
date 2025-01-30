export default class BreadCrumb {
  public state: string[];
  public $target: HTMLElement;
  constructor({
    $app,
    initialState,
  }: {
    $app: HTMLDivElement;
    initialState: string[];
  }) {
    this.state = initialState;
    this.$target = document.createElement('nav');
    this.$target.classList.add('Breadcrumb');
    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState: string[]) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state
      .map((item) => `<div>${item}</div>`)
      .join('');
  }
}
