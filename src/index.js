//#region Nav

const hideNavbarMedia = window.matchMedia("(min-width: 40em)")
const nav = document.querySelector('.principal-nav');
const navToggle = document.querySelector('.nav-toggle');
const dark = document.querySelector('.modal__background');

navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute('data-visible');

    if (visibility === "false") {
        nav.setAttribute('data-visible', true);
        dark.classList.remove('hidden');
    } else {
        nav.setAttribute('data-visible', false);
        dark.classList.add('hidden');
    }
});

hideNavbarMedia.addEventListener("change", () => {
    const visibility = nav.getAttribute('data-visible');

    if (visibility === "true") {
        nav.setAttribute('data-visible', false);
        dark.classList.add('hidden');
    }
});

//#endregion


//#region Carousel

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

//#endregion


//#region Shop


const quantity = document.querySelector('#quantity');
const plus = document.querySelector('.btn--plus');
const minus = document.querySelector('.btn--minus');

plus.addEventListener('click', () => {
    if (quantity.value < 0)
        quantity.value = 0;
    quantity.value++;
});

minus.addEventListener('click', () => {
    if (quantity.value > 0)
        quantity.value--;
});

//
const product = {
    img: './images/image-product-1-thumbnail.jpg',
    name: "Autumn Limited Edition",
    price: 250.00,
    discount: 0.5,
};

const buy = document.querySelector('#buy');
const check = document.querySelector('#check');
const cart = document.querySelector('.btn--cart');
const cartShow = document.querySelector('.cart')
const cartContainer = document.querySelector('.cart__container');

cart.addEventListener('click', () => {
    const visibility = cartShow.getAttribute('data-visible');

    if (visibility === "false") {
        cartShow.setAttribute('data-visible', true);
    } else {
        cartShow.setAttribute('data-visible', false);
    }
});

buy.addEventListener('click', () => {
    const helper = product.price * product.discount;

    cartContainer.innerHTML = `
    <div class="cart__card">
        <img
            src="${product.img}"
            alt="cart-item"
        />
        <div>
            <p class="card__title">${product.name}</p>
            <p>$${helper}.00 x ${quantity.value} <span class="card__total">$${helper * quantity.value}.00</span></p>
        </div>
        <button class="btn btn--trash"></button>
    </div>`;

    if(check.classList.contains('hidden')) check.classList.remove('hidden')

});

cartContainer.addEventListener('click', (e) =>{ 
    const targetTrash = e.target.closest('button');

    if (!targetTrash) return;

    cartContainer.innerHTML = 
    `
        <p class="card__empty">Your cart is empty.</p>
    `;

    check.classList.add('hidden');
});

//#endregion


