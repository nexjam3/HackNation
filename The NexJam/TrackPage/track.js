"use strict";

var map = L.map("map").setView([20.350347364306387, 85.805199143396072], 15);

L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let locationIcon = L.icon({
  iconUrl: "./img/location.png",

  iconSize: [50, 50],
  iconAnchor: [50, 50],
});

let carIcon = L.icon({
  iconUrl: "./img/car-2.png",

  iconSize: [50, 50],
  iconAnchor: [50, 50],
});

let bikeIcon = L.icon({
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

const bikeRoutes = [
  {
    id: 0,
    name: "Rahul Sharam",
    from: [20.329993659381863, 85.80617469089303],
    to: [20.36241254253824, 85.8105689753764],
  },
  {
    id: 1,
    name: "Ankit Yadav",
    from: [20.262648793213824, 85.83541498014227],
    to: [20.364802012595568, 85.82877109666185],
  },
  {
    id: 2,
    name: "Ravi Mani",
    from: [20.332605936515563, 85.82130844656666],
    to: [20.353499091975852, 85.7681097045141],
  },
  {
    id: 3,
    name: "Gori Yadav",
    from: [20.421192731870207, 85.83065040939198],
    to: [20.299319027847755, 85.78070558772885],
  },
  {
    id: 4,
    name: "Nabi Mani",
    from: [20.3676415139403, 85.88831800650307],
    to: [20.33917958951271, 85.76853061160946],
  },
  {
    id: 5,
    name: "Bira Nayak0",
    from: [20.23884878663084, 85.75756072998047],
    to: [20.362416896612718, 85.78631401062013],
  },
  {
    id: 6,
    name: "Virat Singh",
    from: [20.318943392547265, 85.80940246582033],
    to: [20.42178515703598, 85.78296661376953],
  },
];

const carRoutes = [
  {
    id: 0,
    from: [20.312326593787798, 85.83366561721208],
    to: [20.381509280356052, 85.7554885971791],
  },

  {
    id: 1,
    from: [20.398007010621665, 85.8623976005634],
    to: [20.27779322725157, 85.7276796851028],
  },
  {
    id: 2,
    from: [20.35723805876347, 85.85374637177087],
    to: [20.199994754296117, 86.04618502993006],
  },
  {
    id: 3,
    from: [20.35886962405026, 85.79639369979797],
    to: [20.319554420137813, 85.84285476745364],
  },
  {
    id: 4,
    from: [20.31656063354178, 85.71462570538462],
    to: [20.353069999393032, 85.8678780601697],
  },
];

bikeRoutes.forEach((rout) => {
  L.marker(rout.from, {
    icon: bikeIcon,
  }).addTo(map);
  L.marker(rout.to, {
    icon: bikeIcon,
  }).addTo(map);

  L.Routing.control({
    waypoints: [
      L.latLng(rout.from[0], rout.from[1]),
      L.latLng(rout.to[0], rout.to[1]),
    ],
    lineOptions: {
      styles: [{ color: "#FF0000", opacity: 0.8, weight: 5 }],
    },
    createMarker: function () {
      return null;
    },
    icon: locationIcon,
  }).addTo(map);
});

carRoutes.forEach((rout) => {
  L.marker(rout.from, {
    icon: carIcon,
  }).addTo(map);
  L.marker(rout.to, {
    icon: carIcon,
  }).addTo(map);

  L.Routing.control({
    waypoints: [
      L.latLng(rout.from[0], rout.from[1]),
      L.latLng(rout.to[0], rout.to[1]),
    ],
    lineOptions: {
      styles: [{ color: "#FF0000", opacity: 0.8, weight: 5 }],
    },
    createMarker: function () {
      return null;
    },
    icon: locationIcon,
  }).addTo(map);
});

const carCords = [
  [20.349779337894837, 85.80738509216981],
  [20.348722866648572, 85.80638736406574],
  [20.3550567609611, 85.80912204504857],
  [20.356445207596998, 85.81435743553001],
  [20.344914685244106, 85.80399393715886],
  [20.338816679294773, 85.80618264509756],
];

// bikeCords.forEach((veh) => {
//   L.marker(veh, { icon: bikeIcon }).addTo(map);
// });

// carCords.forEach((veh) => {
//   L.marker(veh, { icon: carIcon }).addTo(map);
// });

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

  let point1 = L.latLng(placeFrom.lat, placeFrom.lng);
  let point2 = L.latLng(placeTo.lat, placeTo.lng);
  let distanceval = point1.distanceTo(point2);

  let kmDistance = (distanceval / 1000).toFixed(1);
  let priceVal = (kmDistance * pricePerKm).toFixed(2);
  document.querySelector(".book").style.opacity = 1;
  price.textContent = `₹${priceVal}`;
  distance.textContent = `${kmDistance} KM`;
  ridePrice.textContent = rideTotal.textContent = `${priceVal} ₹`;
  console.log(price.textContent, distance.textContent);

  let shortDistance = 1000000000000000000000;
  let shortName = "";

  bikeRoutes.forEach((el) => {
    const distance = distanceCalFunc(el.from, placeFrom);
    if (distance < shortDistance) {
      shortDistance = distance;
      shortName = el.name;
    }

    console.log(distance);
  });

  document.querySelector(".book__rider__name").textContent = shortName;
});

const distanceCalFunc = function (p1, p2) {
  let point1 = L.latLng(p1[0], p1[1]);
  let point2 = L.latLng(p2.lat, p2.lng);
  let distanceval = point1.distanceTo(point2);
  return distanceval;
};

console.log(bookBtn, paymentPage);

bookBtn.addEventListener("click", function (e) {
  mapPage.classList.add("display__none");
  ridePage.classList.add("display__none");
  paymentPage.classList.remove("display__none");

  console.log("success");
});
