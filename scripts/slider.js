const playersArray = [
    {
        imgSrc: '../images/main/player.png',
        name: 'Хозе-Рауль Капабланка',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Эммануил Ласкер',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Александр Алехин',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Арон Нимцович',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Рихард Рети',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Остап Бендер',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Хозе-Рауль Капабланка',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Эммануил Ласкер',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Александр Алехин',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Арон Нимцович',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Рихард Рети',
        title: 'Чемпион мира по шахматам'
    },
    {
        imgSrc: '../images/main/player.png',
        name: 'Остап Бендер',
        title: 'Чемпион мира по шахматам'
    }
]

class Slider {
    #sliderContainer;
    #sliderRow;
    #sliderNav;
    #playersArray = [...playersArray];
    #translate = 0;
    #step = 3;
    #currentStep = 3;
    #countSliders = 0;
    #currentSliderContainer = '';
    #allSlidesContainer = '';
    #allSlides = [];
    #firstActiveSlide = '';
    #indexOfFirstActiveSlide = '';

    constructor(sliderContainerSelector) {
        this.#sliderContainer = document.querySelector(`${sliderContainerSelector}`);
        this.#sliderRow = this.#sliderContainer.querySelector('.players__row');
        this.#sliderNav = this.#sliderContainer.querySelector('.slider__nav');
        this.#currentSliderContainer = this.#sliderNav.querySelector('.current-slide');
        this.#allSlidesContainer = this.#sliderNav.querySelector('.all-slides');
        this.#init();
    }
    #init() {
        this.#firstInitWindow()
        this.#initSlider();
        this.#initNav();
        this.#actualSlides();
        this.#autoSlider();
        window.addEventListener('resize', () => {
            this.#initWindow();
            this.#actualWindowWidth();
            this.#actualSlides();
        })
    }
    #initSlider() {
        this.#moveSlider();
        this.#playersArray.forEach(player => {
            const playerHtml = this.#getSlideHtml(player)
            this.#sliderRow.insertAdjacentHTML('beforeend', playerHtml)
        })
        this.#countSliders = this.#playersArray.length;
        this.#allSlides = [...this.#sliderRow.children];

        this.#clearSlides();
        this.#allSlides.slice(this.#currentStep-this.#step, this.#currentStep).forEach(slide => {
            slide.classList.add('active');
        })
        this.#updateFirstActiveSlide();
    }
    #firstInitWindow() {
        if (window.innerWidth > 1024) {
            this.#step = 3;
            this.#currentStep = 3;
        }
        if (window.innerWidth <= 1024) {
            this.#step = 2;
            this.#currentStep = 2;
        }
        if (window.innerWidth <= 768) {
            this.#step = 1;
            this.#currentStep = 1;
        }
    }
    #initWindow() {
        if (window.innerWidth > 1024) {
            this.#step = 3;
        }
        if (window.innerWidth <= 1024) {
            this.#step = 2;
        }
        if (window.innerWidth <= 768) {
            this.#step = 1;
        }
    }
    #initNav() {
        const nextBtn = this.#sliderNav.querySelector('.slide-next');
        const prevBtn = this.#sliderNav.querySelector('.slide-prev');

        nextBtn.addEventListener('click', () => this.#stepUpdate('next'));
        prevBtn.addEventListener('click', () => this.#stepUpdate('prev'));

        this.#allSlidesContainer.textContent = `${this.#countSliders}`;
        this.#currentSliderContainer.textContent = `${this.#currentStep}`;
    }
    #changeBtnsColor() {
        if (this.#indexOfFirstActiveSlide < this.#step) {
            this.#sliderNav.querySelector('.slide-prev').classList.add('_disabled')
        } else {
            this.#sliderNav.querySelector('.slide-prev').classList.remove('_disabled')
        }
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
                    this.#translate += this.#sliderRow.offsetWidth;
                    this.#actualSlides();
                    this.#moveSlider();
                }
                this.#changeBtnsColor();
                break;
            case 'next':
                if (this.#currentStep + this.#step > this.#countSliders) {
                    if (this.#currentStep !== this.#allSlides.length) {
                        this.#currentStep = this.#allSlides.length;
                        this.#updateVisibleCountSlides();
                        this.#translate = -((this.#currentStep-this.#step)*this.#firstActiveSlide.offsetWidth);
                        this.#moveSlider();
                        this.#actualSlides();
                    } else {
                        this.#currentStep = this.#step;
                        this.#translate = 0;
                        this.#moveSlider();
                        this.#actualSlides();
                    }

                } else {
                    this.#currentStep = this.#currentStep + this.#step;
                    this.#translate -= this.#sliderRow.offsetWidth;
                    this.#moveSlider();
                    this.#actualSlides();
                }
                this.#changeBtnsColor();
                break;
            default:
                return
        }
    }
    #updateVisibleCountSlides() {
        this.#currentSliderContainer.textContent = `${this.#currentStep}`;
    }
    #actualSlides() {
        if (this.#translate > 0) {
            this.#translate = 0;
            this.#moveSlider();
            this.#currentStep = this.#step;
            this.#indexOfFirstActiveSlide = 0;
        }

        this.#clearSlides();
        this.#allSlides.slice(this.#currentStep-this.#step, this.#currentStep).forEach(slide => {
            slide.classList.add('active');
        })
        this.#updateVisibleCountSlides()
    }
    #actualWindowWidth() {
        this.#updateFirstActiveSlide()
        this.#currentStep = this.#indexOfFirstActiveSlide + this.#step;
        this.#updateVisibleCountSlides()
        this.#translate = -this.#firstActiveSlide.offsetWidth*this.#indexOfFirstActiveSlide;
        this.#moveSlider()
    }
    #clearSlides() {
        this.#allSlides.forEach(slide => {
            slide.classList.remove('active');
        })
    }
    #updateFirstActiveSlide() {
        this.#allSlides = [...this.#sliderRow.children];
        this.#firstActiveSlide = this.#allSlides.find(slide => slide.classList.contains('active'));
        this.#indexOfFirstActiveSlide = this.#allSlides.indexOf(this.#firstActiveSlide);
    }
    #createSlidesNext() {
        const arr = this.#playersArray.slice(this.#currentStep - this.#step, this.#currentStep)
        arr.forEach(player => {
            const slide = this.#getSlideHtml(player)
            this.#sliderRow.insertAdjacentHTML('beforeend', slide)
        })
    }
    #deleteSlides() {
        if (this.#sliderRow.children.length > this.#countSliders + this.#step) {
            for (let i = 0; i <= this.#countSliders-1; i++) {
                this.#sliderRow.firstElementChild.remove()
            }
            this.#translate = 0;
            this.#moveSlider();
        }
    }
    #createSlidesPrev(arr) {
        arr.forEach(player => {
            const slide = this.#getSlideHtml(player);
            this.#sliderRow.insertAdjacentHTML('afterbegin', slide)
        })
    }
    #autoSlider() {
        setInterval(() => {
            this.#stepUpdate('next')
        }, 4000)
    }
    #getSlideHtml(player) {
        return `
            <div class="player">
                <picture>
                    <img src="${player.imgSrc}" alt="player-img">
                </picture>

                <h4>${player.name}</h4>

                <p class="main__text">${player.title}</p>

                <a href="#" class="lil-btn about-player">Подробнее</a>
            </div>
        `
    }
}
const slider = new Slider('.players__container');