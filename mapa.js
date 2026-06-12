function switchFloor(floor) {
  const map = document.getElementById("map");
  const text = document.getElementById("map-text");
  const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

  if (floor === "1") {
    text.innerText = "1. patro - mapa se načte později";
  }

  if (floor === "2") {
    text.innerText = "2. patro - mapa se načte později";
  }

  if (floor === "3") {
    text.innerText = "3. patro - mapa se načte později";
  }

  if (floor === "dvorek") {
    text.innerText = "Altán / Dvorek - mapa se načte později";
  }

  // tady později:
  // vyměníme background image + klikací stánky
}
