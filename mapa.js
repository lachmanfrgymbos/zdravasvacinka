document.addEventListener("DOMContentLoaded", () => {

  console.log("JS loaded");

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

});

function switchFloor(floor) {

  const text = document.getElementById("map-text");

  if (floor === "1") text.innerText = "1. patro - mapa se načte později";
  if (floor === "2") text.innerText = "2. patro - mapa se načte později";
  if (floor === "3") text.innerText = "3. patro - mapa se načte později";
  if (floor === "dvorek") text.innerText = "Altán / Dvorek - mapa se načte později";

}
