document.addEventListener("DOMContentLoaded", () => {

  console.log("JS loaded");

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

});

function switchFloor(floor) {

  const text =
    document.getElementById("map-text");

  const image =
    document.getElementById("map-image");

  if (floor === "1") {

    image.src = "images/1p.png";

    text.innerText = "1. patro";
  }

  if (floor === "2") {

    image.src = "images/2p.png";

    text.innerText = "2. patro";
  }

  if (floor === "3") {

    image.src = "images/3p.png";

    text.innerText = "3. patro";
  }

  if (floor === "dvorek") {

    image.src = "images/altanek.png";

    text.innerText = "Altánek";
  }

}

function openStand() {

  document
    .getElementById("popup")
    .classList.add("show");

}

function closePopup() {

  document
    .getElementById("popup")
    .classList.remove("show");

}

function openStand2(){

  document
    .getElementById("popup")
    .classList.add("show");

}

function openStand3(){

  document
    .getElementById("popup")
    .classList.add("show");


