import BreadCrumb from './component/breadcrumb/BreadCrumb';
import {DEFAULT_PATH} from "./utils/constant";
import {Nodes} from "./component/nodes/Nodes";

export class App {
    private readonly $app: HTMLDivElement;
    private breadCrumb: BreadCrumb;
    private nodes: Nodes;

    constructor() {
        this.$app = document.querySelector('.App') as HTMLDivElement;
        this.breadCrumb = new BreadCrumb({
            $app: this.$app,
            initialState: [DEFAULT_PATH],
        });
        this.nodes = new Nodes({$app: this.$app});

    }
}

window.addEventListener("DOMContentLoaded", () => {
    new App();
})