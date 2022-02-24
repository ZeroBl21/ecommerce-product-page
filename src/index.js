nav = document.querySelector('.principal-nav');
navToggle = document.querySelector('.nav-toggle');


navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute('data-visible');

    if (visibility === "false") {
        nav.setAttribute('data-visible', true);
    } else {
        nav.setAttribute('data-visible', false);
    }
});

//Vars

const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const nextBtn = document.querySelector('.carousel__button--right');
const prevBtn = document.querySelector('.carousel__button--left');

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//Functions

const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateNav = (currentImg, targetImg) => {
    currentImg.classList.remove('current-slide');
    targetImg.classList.add('current-slide');
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

//Logic

prevBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;

    const currentImg = dotsNav.querySelector('.current-slide');
    const prevImg = currentImg.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateNav(currentImg, prevImg);
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

nextBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentImg = dotsNav.querySelector('.current-slide');
    const nextImg = currentImg.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateNav(currentImg, nextImg);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

dotsNav.addEventListener('click', e => {
    const targetImg = e.target.closest('button');

    if (!targetImg) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentImg = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetImg);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateNav(currentImg, targetImg);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
})