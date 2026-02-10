let egresos = [];
let totalEgresos = 0;

document.getElementById("egresos-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const anio = document.getElementById("anio-egreso").value;
  const mes = document.getElementById("mes-egreso").value;
  const fecha = document.getElementById("fecha-egreso").value;
  const tipo = document.getElementById("tipo-costo").value;
  const categoria = document.getElementById("categoria").value;
  const descripcion = document.getElementById("descripcion").value;
  const valor = parseFloat(document.getElementById("valor").value);

  // Validaciones lógicas
  if (!anio || !mes) {
    alert("Debe seleccionar un período contable");
    return;
  }

  if (valor <= 0) {
    alert("El valor del egreso debe ser mayor que cero");
    return;
  }

  egresos.push({ anio, mes, fecha, tipo, categoria, descripcion, valor });
  totalEgresos += valor;

  actualizarTablaEgresos();
  actualizarTotalEgresos();
  this.reset();
});

function actualizarTablaEgresos() {
  const tbody = document.querySelector("#tabla-egresos tbody");
  tbody.innerHTML = "";

  egresos.forEach(e => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.fecha}</td>
      <td>${e.tipo}</td>
      <td>${e.categoria}</td>
      <td>${e.descripcion || ""}</td>
      <td>$${e.valor.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

function actualizarTotalEgresos() {
  document.getElementById("total-egresos").textContent =
    `$${totalEgresos.toFixed(2)}`;
}

// Exportación CSV
document.getElementById("exportar-egresos").addEventListener("click", () => {
  let csv = "Año,Mes,Fecha,Tipo,Categoría,Descripción,Valor\n";

  egresos.forEach(e => {
    csv += `${e.anio},${e.mes},${e.fecha},${e.tipo},${e.categoria},${e.descripcion},${e.valor}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "egresos.csv";
  a.click();

  URL.revokeObjectURL(url);
});
