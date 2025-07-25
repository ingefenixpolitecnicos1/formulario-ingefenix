document.getElementById('form-servicio').addEventListener('submit', (e) => {
  e.preventDefault();

  const seleccion = document.querySelector('input[name="servicio"]:checked');
  if (!seleccion) {
    alert("Por favor seleccione un servicio");
    return;
  }

  const servicio = seleccion.value;

  switch (servicio) {
    case 'ingles':
      window.location.href = 'ingles.html';
      break;
    case 'computacion':
      window.location.href = 'computacion.html';
      break;
    case 'nivelacion':
      window.location.href = 'nivelacion.html';
      break;
    case 'semestre_presencial':
      window.location.href = 'semestre_presencial.html';
      break;
    case 'semestre_linea':
      window.location.href = 'semestre_linea.html';
      break;
    default:
      alert("Servicio no reconocido");
  }
});
