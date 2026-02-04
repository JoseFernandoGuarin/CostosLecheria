function mostrar(id) {
  document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}
mostrar("inicio");
