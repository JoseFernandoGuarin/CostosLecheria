let ingresos = [];
let totalIngresos = 0;

document.getElementById("ingresos-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const anio = document.getElementById("anio").value;
  const mes = document.getElementById("mes").value;
  const fecha = document.getElementById("fecha").value;
  const tipo = document.getElementById("tipo").value;
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);

  // Validaciones lógicas
  if (!anio || !mes) {
    alert("Debe seleccionar un período contable");
    return;
  }

  if (cantidad <= 0 || precio <= 0) {
    alert("Cantidad y precio deben ser mayores que cero");
    return;
  }

  const total = cantidad * precio;

  ingresos.push({ anio, mes, fecha, tipo, cantidad, precio, total });
  totalIngresos += total;

  actualizarTabla();
  actualizarTotal();
  this.reset();
});

function actualizarTabla() {
  const tbody = document.querySelector("#tabla-ingresos tbody");
  tbody.innerHTML = "";

  ingresos.forEach(i => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i.fecha}</td>
      <td>${i.tipo}</td>
      <td>${i.cantidad}</td>
      <td>${i.precio.toFixed(2)}</td>
      <td>${i.total.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

function actualizarTotal() {
  document.getElementById("total-ingresos").textContent =
    `$${totalIngresos.toFixed(2)}`;
}

// Exportación CSV
document.getElementById("exportar").addEventListener("click", () => {
  let csv = "Año,Mes,Fecha,Tipo,Cantidad,Precio,Total\n";

  ingresos.forEach(i => {
    csv += `${i.anio},${i.mes},${i.fecha},${i.tipo},${i.cantidad},${i.precio},${i.total}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ingresos.csv";
  a.click();

  URL.revokeObjectURL(url);
});
