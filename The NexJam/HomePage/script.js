// Stickly Navigations
const nav = document.querySelector(".section-nav");
const header = document.querySelector(".header");

const stickyNav = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add("sticky-nav");
  else nav.classList.remove("sticky-nav");
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.9,
});

navObserver.observe(header);

const allSlides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const leftSlideBtn = document.querySelector(".slider__btn--left");
const rightSlideBtn = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlide = allSlides.length;

// Functions
const createDot = function () {
  allSlides.forEach(function (s, i) {
    const dot = document.createElement("button");
    dot.className = "dots__dot";
    dot.setAttribute("data-slide", i);
    dotContainer.insertAdjacentElement("beforeend", dot);
  });
};

const imageSlider = function (currSlide) {
  allSlides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - currSlide)}%)`;
  });
};

const goSlide = function (slide) {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((el) => el.classList.remove("dots__dot--active"));
  const dot = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
  dot.classList.add("dots__dot--active");
};

const initSide = function () {
  imageSlider(0);
  createDot();
  goSlide(0);
};

const gotoRight = function () {
  if (currSlide === maxSlide - 1) currSlide = 0;
  else currSlide++;

  imageSlider(currSlide);
  goSlide(currSlide);
};

const gotoLeft = function () {
  if (currSlide === 0) currSlide = maxSlide - 1;
  else currSlide--;

  imageSlider(currSlide);
  goSlide(currSlide);
};

initSide();

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot"))
    imageSlider(e.target.dataset.slide);
});
rightSlideBtn.addEventListener("click", gotoRight);

leftSlideBtn.addEventListener("click", gotoLeft);

const loadSection = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  sectionObserver.unobserve(entry.target);
};

const allSections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(loadSection, {
  root: null,
  threshold: 0.3,
});

allSections.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});

// about slide
// const about = document.querySelector(".nav__about");
// const sol = document.querySelector(".sol-aside");

// about.addEventListener("mouseover", function () {
//   sol.classList.remove("display-open");
// });

// about.addEventListener("click", function () {
//   sol.classList.remove("display-open");
// });

// sol.addEventListener("mouseout", function () {
//   sol.classList.add("display-open");
// });

const about = document.querySelector(".nav__about");
const sol = document.querySelector(".sol-aside");

const handleMouseEnterLeave = (event) => {
  if (event.type === "mouseover") {
    sol.classList.remove("display-open");
  } else if (
    event.type === "mouseout" &&
    !about.contains(event.relatedTarget)
  ) {
    sol.classList.add("display-open");
  }
};

// Add both mouseover and mouseout event listeners to about
about.addEventListener("mouseover", handleMouseEnterLeave);
about.addEventListener("mouseout", handleMouseEnterLeave);

// Optionally, add mouseover and mouseout events to sol for smoother transitions
sol.addEventListener("mouseover", handleMouseEnterLeave);
sol.addEventListener("mouseout", handleMouseEnterLeave);
