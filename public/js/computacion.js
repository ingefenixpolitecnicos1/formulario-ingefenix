document.addEventListener("DOMContentLoaded", () => {
  const btnVerificar = document.getElementById("btn-verificar");
  const continuarBtn = document.getElementById("continuar-btn");
  const loginContainer = document.getElementById("login-container");
  const moduloContainer = document.getElementById("modulo-container");
  const resumenContainer = document.getElementById("resumen-container");
  const resumenList = document.getElementById("resumen-list");
  const mensajeError = document.getElementById("mensaje-error");
  const form = document.getElementById("form-computacion"); // ✅ ← FALTA ESTO


  let usuarioGuardado = "";
  let claveGuardada = "";

  btnVerificar.addEventListener("click", async () => {
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (!usuario || !clave) {
      mostrarError("Por favor llene todos los campos.");
      return;
    }

    mensajeError.textContent = "⏳ Verificando...";
    mensajeError.style.display = "block";

    try {
      const res = await fetch("https://formulario-ingefenix.onrender.com/verificar-computacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, clave }),
      });

      const data = await res.json();

      if (data.exito) {
        usuarioGuardado = usuario;
        claveGuardada = clave;

        loginContainer.style.display = "none";
        moduloContainer.style.display = "block";
        mensajeError.style.display = "none";
      } else {
        mostrarError(" Credenciales incorrectas.");
      }
    } catch (err) {
      mostrarError("⚠️ Error al conectar con el servidor.");
    }
  });

  continuarBtn.addEventListener("click", () => {
    const modulo = document.querySelector('input[name="modulo"]:checked');
    const moduloError = document.getElementById("modulo-error");

    if (!modulo) {
      moduloError.textContent = "⚠️ Seleccione un módulo para continuar.";
      moduloError.style.display = "block";
      return;
    }

    moduloError.style.display = "none";

    resumenList.innerHTML = `
    <li><strong>Servicio:</strong> Módulo de Computación</li>
    <li><strong>Módulo seleccionado:</strong> ${modulo.value}</li>
    <li><strong>Usuario:</strong> ${usuarioGuardado}</li>
    <li><strong>Contraseña:</strong> ${claveGuardada}</li>
  `;

    moduloContainer.style.display = "none";
    resumenContainer.style.display = "block";

    form.style.display = "none"; // ✅ AHORA FUNCIONA
    document.querySelector('.btn-secondary').style.display = 'none'; // ✅ SE OCULTA EL BOTÓN
  });


  function mostrarError(msg) {
    mensajeError.textContent = msg;
    mensajeError.style.display = "block";
    mensajeError.style.color = "red";
  }
});
