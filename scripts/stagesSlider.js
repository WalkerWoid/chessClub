class StagesSlider {
    #sliderContainer;
    #sliderRow;
    #sliderNav;
    #translate = 0;
    #step = 1;
    #currentStep = 1;
    #gapsContainer = '';
    #allSlides = [];
    #allGaps = [];
    #firstActiveSlide = '';
    #indexOfFirstActiveSlide = '';

    constructor(sliderContainerSelector) {
        this.#sliderContainer = document.querySelector(`${sliderContainerSelector}`);
        this.#sliderRow = this.#sliderContainer.querySelector('.stages');
        this.#sliderNav = this.#sliderContainer.querySelector('.slider__nav');
        this.#init();
    }
    #init() {
        this.#initSlider();
        this.#initNav();
        this.#actualSlides();
        window.addEventListener('resize', () => {
            this.#moveSlider()
            this.#actualWindowWidth();
            this.#actualSlides();
        })
    }
    #initSlider() {
        this.#moveSlider();
        this.#allSlides = [...this.#sliderRow.querySelectorAll('.slide')];

        this.#clearSlides();
        this.#allSlides.slice(this.#currentStep-this.#step, this.#currentStep).forEach(slide => {
            slide.classList.add('active');
        })
        this.#updateFirstActiveSlide();
    }
    #changeBtnsColor() {
        if (this.#indexOfFirstActiveSlide < this.#step) {
            this.#sliderNav.querySelector('.slide-prev').classList.add('_disabled')
        } else {
            this.#sliderNav.querySelector('.slide-prev').classList.remove('_disabled')
        }
        if (this.#indexOfFirstActiveSlide == this.#allSlides.length-1) {
            this.#sliderNav.querySelector('.slide-next').classList.add('_disabled');
        } else {
            this.#sliderNav.querySelector('.slide-next').classList.remove('_disabled');
        }
    }
    #initNav() {
        const nextBtn = this.#sliderNav.querySelector('.slide-next');
        const prevBtn = this.#sliderNav.querySelector('.slide-prev');

        nextBtn.addEventListener('click', () => this.#stepUpdate('next'));
        prevBtn.addEventListener('click', () => this.#stepUpdate('prev'));

        this.#gapsContainer = this.#sliderNav.querySelector('.slider__gaps');
        this.#allSlides.forEach(slide => {
            const gap = `<span class="gap"></span>`
            this.#gapsContainer.insertAdjacentHTML('beforeend', gap);
        })
        this.#allGaps = [...this.#gapsContainer.querySelectorAll('.gap')];
        this.#allGaps[this.#currentStep-1].classList.add('_active')
    }
    #moveSlider() {
        this.#sliderRow.style.transform = `translate3d(${this.#translate}px, 0, 0)`;
    }
    #stepUpdate(direction) {
        switch (direction) {
            case 'prev':
                if (this.#currentStep - this.#step <= 0) {
                    this.#currentStep = this.#step;
                    this.#actualSlides();
                } else {
                    this.#currentStep = this.#currentStep - this.#step;
                    this.#translate += (this.#sliderContainer.offsetWidth+20);
                    this.#actualSlides();
                    this.#moveSlider();
                }
                this.#changeBtnsColor();
                break;
            case 'next':
                if (this.#currentStep + this.#step > this.#allSlides.length) {
                    return;
                } else {
                    this.#currentStep = this.#currentStep + this.#step;
                    this.#translate -= (this.#sliderContainer.offsetWidth+20);
                    this.#moveSlider();
                    this.#actualSlides();
                }
                this.#changeBtnsColor();
                break;
            default:
                return
        }
    }
    #actualSlides() {
        this.#clearSlides();
        this.#clearGaps();
        this.#allSlides.slice(this.#currentStep-this.#step, this.#currentStep).forEach(slide => {
            slide.classList.add('active');
        })
        this.#allGaps[this.#currentStep-1].classList.add('_active')
    }
    #actualWindowWidth() {
        if (window.innerWidth > 768) {
            this.#translate = 0;
            this.#moveSlider()
            return
        }
        this.#updateFirstActiveSlide()
        this.#translate = -this.#firstActiveSlide.offsetWidth*this.#indexOfFirstActiveSlide-(20*(this.#currentStep-1));
        this.#moveSlider()
    }
    #clearSlides() {
        this.#allSlides.forEach(slide => {
            slide.classList.remove('active');
        })
    }
    #clearGaps() {
        [...this.#gapsContainer.querySelectorAll('.gap')].forEach(gap => {
            gap.classList.remove('_active')
        })
    }
    #updateFirstActiveSlide() {
        this.#allSlides = [...this.#sliderRow.querySelectorAll('.slide')];
        this.#firstActiveSlide = this.#allSlides.find(slide => slide.classList.contains('active'));
        this.#indexOfFirstActiveSlide = this.#allSlides.indexOf(this.#firstActiveSlide);
    }
}
const stagesSlider = new StagesSlider('.stages__container');