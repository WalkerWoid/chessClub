class RunningRow {
    #runningRowContainer;
    #textP = undefined;
    #spans = [];
    #textSpans = [];
    #currentPosition = 0;
    #spanId = 0;

    constructor(rowContainer) {
        this.#runningRowContainer = rowContainer;
        this.#textP = this.#runningRowContainer.querySelector('p');

        this.#init()
    }
    #init() {
        this.#initTextSpans();
        this.#spans.forEach(span => {
            this.#textSpans.push(span.textContent)
        })
        this.#moveRowHandler();
        this.#addTextHandler();
    }
    #initTextSpans() {
        this.#spans = [...this.#textP.children];
    }
    #addTextHandler() {
        let spanId = 0;
        this.#addText(spanId)
    }
    #addText() {
        let span = `<span>${this.#textSpans[this.#spanId]}</span>`

        if (this.#spans.at(-2).getBoundingClientRect().right <= this.#textP.offsetWidth) {
            this.#spanId += 1;

            if (this.#spanId > this.#textSpans.length-1) {
                this.#spanId = 0;
            }

            this.#textP.insertAdjacentHTML('beforeend', span);
            this.#initTextSpans()
        }
    }
    #delText() {
        if (this.#spans.at(0).getBoundingClientRect().right === 0) {
            this.#textP.firstElementChild.remove();
            this.#currentPosition = 0;
            this.#initTextSpans();
        }
    }
    #moveRowHandler() {
        this.#currentPosition -= 1;
        this.#textP.style.transform = `translateX(${this.#currentPosition}px)`;
        this.#addText();
        this.#delText();
        requestAnimationFrame(this.#moveRowHandler.bind(this));
    }
}

const rowsArr = [...document.querySelectorAll('.running-row')];
rowsArr.forEach(container => {
    const runningRow = new RunningRow(container)
})
