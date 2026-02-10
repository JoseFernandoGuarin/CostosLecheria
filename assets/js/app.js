console.log("✅ App Hacienda La Montaña cargada correctamente");
alert("La app se cargó correctamente");

fetch("modules/ingresos.html")
  .then(r => r.text())
  .then(html => {
    document.getElementById("modulo-ingresos").innerHTML = html;
    const script = document.createElement("script");
    script.src = "assets/js/ingresos.js";
    document.body.appendChild(script);
  });
