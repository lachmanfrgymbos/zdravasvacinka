document.addEventListener("DOMContentLoaded", () => {

  console.log("JS loaded");

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

});


function closeAllPopups(){

  document.querySelectorAll(".popup")
  .forEach(popup => {
    popup.classList.remove("show");
  });

}


function switchFloor(floor) {

  const text =
    document.getElementById("map-text");

  const image =
    document.getElementById("map-image");


 if (floor === "1") {

  hideAllStands();

  document.querySelectorAll(".patro1")
    .forEach(stanek => {
      stanek.style.display = "block";
    });

  image.src = "images/1p.png";

  text.innerText = "1. patro";
}


if (floor === "2") {

  hideAllStands();

  document.querySelectorAll(".patro2")
    .forEach(stanek => {
      stanek.style.display = "block";
    });

  image.src = "images/2p.png";

  text.innerText = "2. patro";
}


if (floor === "3") {

  hideAllStands();

  document.querySelectorAll(".patro3")
    .forEach(stanek => {
      stanek.style.display = "block";
    });

  image.src = "images/3p.png";

  text.innerText = "3. patro";
}


if (floor === "altanek") {

  hideAllStands();

  document.querySelectorAll(".altanek")
    .forEach(stanek => {
      stanek.style.display = "block";
    });

  image.src = "images/altanek.png";

  text.innerText = "Altánek";
}

}



function openStand() {

  closeAllPopups();

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

  closeAllPopups();

  document
    .getElementById("popup2")
    .classList.add("show");

}



function openStand3(){

  closeAllPopups();

  document
    .getElementById("popup3")
    .classList.add("show");

}



function closePopup2(){

  document
    .getElementById("popup2")
    .classList.remove("show");

}



function closePopup3(){

  document
    .getElementById("popup3")
    .classList.remove("show");

}



function openStand4(){

  closeAllPopups();

  document
    .getElementById("popup4")
    .classList.add("show");

}



function closePopup4(){

  document
    .getElementById("popup4")
    .classList.remove("show");

}



function openStand5(){

  closeAllPopups();

  document
    .getElementById("popup5")
    .classList.add("show");

}



function closePopup5(){

  document
    .getElementById("popup5")
    .classList.remove("show");

}



function openStand6(){

  closeAllPopups();

  document
    .getElementById("popup6")
    .classList.add("show");

}



function closePopup6(){

  document
    .getElementById("popup6")
    .classList.remove("show");

}



function openStand7(){

  closeAllPopups();

  document
    .getElementById("popup7")
    .classList.add("show");

}



function closePopup7(){

  document
    .getElementById("popup7")
    .classList.remove("show");

}



function openStand8(){

  closeAllPopups();

  document
    .getElementById("popup8")
    .classList.add("show");

}



function closePopup8(){

  document
    .getElementById("popup8")
    .classList.remove("show");

}



function hideAllStands(){

  document.querySelectorAll(
    ".patro1, .patro2, .patro3, .altanek"
  ).forEach(stanek => {

    stanek.style.display = "none";

  });

}


document.addEventListener("DOMContentLoaded", () => {
  switchFloor("1");
});
