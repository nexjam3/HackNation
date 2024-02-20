// "use strict";
// let map;
// function useLocation(latitude, longitude) {
//   if (map) {
//     map.setCenter({ lat: latitude, lng: longitude });
//   } else {
//     map = new mappls.Map("map", {
//       center: { lat: latitude, lng: longitude },
//       zoom: 11,
//     });
//   }
// }

// navigator.geolocation.getCurrentPosition(function (pos) {
//   const { latitude, longitude } = pos.coords;
//   useLocation(latitude, longitude);
// });

// useLocation(0, 0);

// const coordsBike = [
//   [20.276049, 85.8645378],
//   [20.2760345, 85.8345338],
//   [20.246059, 85.8245324],
//   [20.236049, 85.8645378],
//   [20.2160345, 85.8345338],
//   [20.226059, 85.8245324],
// ];

// const coordsCar = [
//   [20.272792, 85.865917],
//   [20.277304, 85.830012],
//   [20.244158, 85.823271],
//   [20.236049, 85.8145378],
//   [20.2160345, 85.8245338],
//   [20.226059, 85.8345324],
// ];

// coordsBike.forEach((cord) => {
//   var marker = new mappls.Marker({
//     map: map,
//     icon: "./img/bike-2.png",
//     position: { lat: cord[0], lng: cord[1] },
//   });
// });

// coordsCar.forEach((cord) => {
//   var marker = new mappls.Marker({
//     map: map,
//     icon: "./img/car-2.png",
//     position: { lat: cord[0], lng: cord[1] },
//   });
// });

// map.addListener("click", function (e) {
//   console.log(e);
// });

// var marker = new mappls.Marker({
//   map: map,
//   icon: "./img/location.png",
//   position: { lat: 20.350347364306387, lng: 85.805199143396072 },
// });

// totalData.forEach((place) => {
//   var marker = new mappls.Marker({
//     map: map,
//     icon: "./img/popular-locations.png",
//     position: { lat: place.lat, lng: place.lng },
//   });
//   console.log(place.lat, place.lng);
// });

var map = L.map("map").setView([20.350347364306387, 85.805199143396072], 15);

L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var locationIcon = L.icon({
  iconUrl: "./img/location.png",

  iconSize: [50, 50],
  iconAnchor: [50, 50],
});

var carIcon = L.icon({
  iconUrl: "./img/car-2.png",

  iconSize: [50, 50],
  iconAnchor: [50, 50],
});

var bikeIcon = L.icon({
  iconUrl: "./img/bike-2.png",

  iconSize: [50, 50],
  iconAnchor: [50, 50],
});

L.marker([20.350347364306387, 85.805199143396072], {
  icon: locationIcon,
}).addTo(map);

map.on("click", function (e) {
  const { lat, lng } = e.latlng;
  console.log(`,[${lat}, ${lng}]`);
});

const bikeCords = [
  [20.354051846522598, 85.81467869950684],
  [20.3540294113521, 85.80667742222387],
  [20.34658385535509, 85.80719237866468],
  [20.348233982501867, 85.79996153197503],
  [20.349622490470296, 85.81929385502356],
  [20.342941439148518, 85.80783607421564],
  [20.343042059533865, 85.81448759490937],
  [20.349018792887033, 85.81931531154191],
  [20.355073304517045, 85.81286713627416],
];

const carCords = [
  [20.349779337894837, 85.80738509216981],
  [20.348722866648572, 85.80638736406574],
  [20.3550567609611, 85.80912204504857],
  [20.356445207596998, 85.81435743553001],
  [20.344914685244106, 85.80399393715886],
  [20.338816679294773, 85.80618264509756],
];

bikeCords.forEach((veh) => {
  L.marker(veh, { icon: bikeIcon }).addTo(map);
});

carCords.forEach((veh) => {
  L.marker(veh, { icon: carIcon }).addTo(map);
});

const btnPrice = document.querySelector(".form__btn");
const inputFrom = document.querySelector(".form__input--from");
const inputTo = document.querySelector(".form__input--to");
const inputMEd = document.querySelector(".form__input--type");
const price = document.querySelector(".book-price--price");
const distance = document.querySelector(".book-ride--ride");
const bookBtn = document.querySelector(".form__btn--price");
const paymentPage = document.querySelector(".payment-section");
const mapPage = document.querySelector(".section-map");
const ridePage = document.querySelector(".section-ride");
const ridePrice = document.querySelector(".payment__ride--price");
const rideTotal = document.querySelector(".payment__ride--ride");
let totalData = [];

fetch("./../Data/locations.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    totalData.push(...data);

    console.log(totalData);
  })
  .catch((error) => console.error("Error fetching or parsing data:", error));

btnPrice.addEventListener("click", function (e) {
  e.preventDefault();

  let placeFrom, placeTo;
  totalData.forEach((place) => {
    if (place.name === inputFrom.value) {
      placeFrom = place;
      console.log(placeFrom);
    }
    if (place.name === inputTo.value) {
      placeTo = place;
      console.log(placeTo);
    }
  });

  if (!placeFrom || !placeTo) {
    alert("Locations not found");
    return;
  }
  L.Routing.control({
    waypoints: [
      L.latLng(placeFrom.lat, placeFrom.lng),
      L.latLng(placeTo.lat, placeTo.lng),
    ],
  }).addTo(map);

  let pricePerKm;
  let selectedOption = inputMEd.options[inputMEd.selectedIndex].textContent;
  if (selectedOption === "Bike") pricePerKm = 7;
  else if (selectedOption === "Auto") pricePerKm = 9;
  else pricePerKm = 12;

  var point1 = L.latLng(placeFrom.lat, placeFrom.lng);
  var point2 = L.latLng(placeTo.lat, placeTo.lng);
  var distanceval = point1.distanceTo(point2);
  var kmDistance = (distanceval / 1000).toFixed(1);
  var priceVal = (kmDistance * pricePerKm).toFixed(2);
  document.querySelector(".book").style.opacity = 1;
  price.textContent = `₹${priceVal}`;
  distance.textContent = `${kmDistance} KM`;
  ridePrice.textContent = rideTotal.textContent = `${priceVal} ₹`;
  console.log(price.textContent, distance.textContent);
});

console.log(bookBtn, paymentPage);

bookBtn.addEventListener("click", function (e) {
  mapPage.classList.add("display__none");
  ridePage.classList.add("display__none");
  paymentPage.classList.remove("display__none");

  console.log("success");
});
