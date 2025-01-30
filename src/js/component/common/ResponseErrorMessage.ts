export class ResponseErrorMessage {
    private readonly $target: HTMLParagraphElement;
    constructor({$parent}:{$parent:HTMLElement}) {
        this.$target = document.createElement('p');
        this.$target.classList.add('errorMessage');
        this.$target.innerHTML = `데이터를 불러오지 못했습니다.`;
        $parent.appendChild(this.$target);
    }
}