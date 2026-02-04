function produccionAnual() {
  return modelo.inicio.vacas *
         modelo.inicio.prodVaca *
         modelo.inicio.dias;
}

function costoAlimentacionAnual() {
  const a = modelo.alimentacion;
  const diarioVaca =
    a.forraje.cant * a.forraje.costo +
    a.concentrado.cant * a.concentrado.costo +
    a.minerales.cant * a.minerales.costo;

  return diarioVaca * modelo.inicio.vacas * 365;
}
