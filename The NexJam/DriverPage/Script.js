"use strict";

const content = document.querySelectorAll(".content");
const navBtn = document.querySelectorAll(".sidebar__item");

navBtn.forEach((el, i) => {
  el.addEventListener("click", () => {
    navBtn.forEach((el) => el.classList.remove("gradient-text"));
    content.forEach((el) => {
      el.classList.remove("active__element");
    });
    content[i].classList.add("active__element");
    el.classList.add("gradient-text");
  });
});
