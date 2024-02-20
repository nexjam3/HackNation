const logPage = document.querySelector(".wrapper");
const btnLog = document.querySelector(".nav__log");
const btnSign = document.querySelector(".nav__sign");
console.log(logPage, btnLog, btnSign);
btnLog.addEventListener("click", (e) => {
  logPage.classList.remove("display__none");
  console.log("success");
});
const totalUserData = [];

fetch("./../Data/users.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    totalUserData.push(...data);
  })
  .catch((error) => console.error("Error fetching or parsing data:", error));

console.log(totalUserData);

const submit = document.querySelector(".submit");
const inputName = document.querySelector(".input__userName");
const inputPass = document.querySelector(".input__pass");
const signIn = document.querySelector(".nav__sign");
const logIn = document.querySelector(".nav__log");
const navUser = document.querySelector(".nav__user");

console.log(signIn, logIn);
let activeId;
submit.addEventListener("click", function (e) {
  e.preventDefault();
  totalUserData.forEach((user) => {
    if (
      user.username === inputName.value &&
      user.password === inputPass.value
    ) {
      signIn.classList.remove("nav__active");
      logIn.classList.remove("nav__active");
      navUser.classList.add("nav__active");
      navUser.textContent = user.name;
      logPage.classList.add("display__none");
    }
  });
});
