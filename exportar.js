function exportarCSV() {
  const filas = [
    ["Hacienda", modelo.inicio.hacienda],
    ["Año", modelo.inicio.anio],
    ["Producción anual (L)", produccionAnual()],
    ["Costo alimentación ($/año)", costoAlimentacionAnual()],
    ["Costo mano de obra ($/año)", costoManoObra()],
    ["Costo total ($/año)", costoTotal()],
    ["Costo por litro ($/L)", costoTotal()/produccionAnual()]
  ];

  let csv = filas.map(f => f.join(",")).join("\n");
  let blob = new Blob([csv], { type: "text/csv" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "costeo_hacienda.csv";
  a.click();
}
