document.getElementById("calcular-resultados").addEventListener("click", () => {
  const anio = document.getElementById("anio-res").value;
  const mes = document.getElementById("mes-res").value;

  if (!anio || !mes) {
    alert("Debe seleccionar año y mes");
    return;
  }

  // Filtrar ingresos y egresos por período
  const ingresosPeriodo = ingresos.filter(i => i.anio === anio && i.mes === mes);
  const egresosPeriodo = egresos.filter(e => e.anio === anio && e.mes === mes);

  const totalIngresos = ingresosPeriodo.reduce((sum, i) => sum + i.total, 0);
  const totalEgresos = egresosPeriodo.reduce((sum, e) => sum + e.valor, 0);

  const resultadoNeto = totalIngresos - totalEgresos;
  const margen = totalIngresos > 0
    ? (resultadoNeto / totalIngresos) * 100
    : 0;

  document.getElementById("res-ingresos").textContent =
    `$${totalIngresos.toFixed(2)}`;
  document.getElementById("res-egresos").textContent =
    `$${totalEgresos.toFixed(2)}`;
  document.getElementById("res-neto").textContent =
    `$${resultadoNeto.toFixed(2)}`;
  document.getElementById("res-margen").textContent =
    `${margen.toFixed(2)}%`;
});

// Exportación CSV
document.getElementById("exportar-resultados").addEventListener("click", () => {
  const filas = [
    ["Indicador", "Valor"],
    ["Ingresos totales", document.getElementById("res-ingresos").textContent],
    ["Egresos totales", document.getElementById("res-egresos").textContent],
    ["Resultado neto", document.getElementById("res-neto").textContent],
    ["Margen (%)", document.getElementById("res-margen").textContent]
  ];

  let csv = filas.map(f => f.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resultados.csv";
  a.click();

  URL.revokeObjectURL(url);
});
