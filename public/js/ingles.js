document.addEventListener("DOMContentLoaded", function () {
    const radios = document.querySelectorAll('input[name="subtipo"]');
    const loginContainer = document.getElementById("login-container");
    const fechaContainer = document.getElementById("fecha-container");
    const form = document.getElementById("form-ingles");
    const mensajeError = document.getElementById("mensaje-error");

    // Ocultar campos al inicio
    loginContainer.style.display = "none";
    fechaContainer.style.display = "none";
    mensajeError.style.display = "none";


    // Mostrar campos según selección
    radios.forEach((radio) => {
        radio.addEventListener("change", function () {
            loginContainer.style.display = "block";
            if (this.value === "examen" || this.value === "modulo_completo") {
                fechaContainer.style.display = "block";
            } else {
                fechaContainer.style.display = "none";
            }
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const subtipo = document.querySelector('input[name="subtipo"]:checked');
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();
        const fecha = document.getElementById("fecha").value.trim();
        const hora = document.getElementById("hora").value.trim();

        function mostrarError(mensaje) {
            mensajeError.textContent = mensaje;
            mensajeError.style.display = "block";

            setTimeout(() => {
                mensajeError.style.display = "none";
            }, 3000);
        }

        mensajeError.style.display = "none";

        if (!subtipo) {
            mostrarError("Por favor seleccione el tipo de servicio.");
            return;
        }

        if (!correo.endsWith("@unemi.edu.ec")) {
            mostrarError("El correo debe terminar en @unemi.edu.ec");
            return;
        }

        if (contrasena === "") {
            mostrarError("Por favor ingrese su contraseña.");
            return;
        }

        if (subtipo.value === "examen" || subtipo.value === "modulo_completo") {
            if (!fecha) {
                mostrarError("Por favor seleccione la fecha del examen.");
                return;
            }
            if (!hora) {
                mostrarError("Por favor seleccione la hora del examen.");
                return;
            }
        }

        // Si pasa todo:
        mensajeError.style.display = "none";
        alert("✅ Validación correcta. ¡Solicitud en curso!");
        // Mostrar resumen
        const resumenContainer = document.getElementById("resumen-container");
        const resumenList = document.getElementById("resumen-list");

        resumenList.innerHTML = `
  <li><strong>Servicio:</strong> Módulo de Inglés</li>
  <li><strong>Tipo:</strong> ${subtipo.value === "lecciones" ? "Solo lecciones" : subtipo.value === "examen" ? "Examen" : "Módulo completo"}</li>
  <li><strong>Usuario:</strong> ${correo}</li>
  <li><strong>Contraseña:</strong> ${contrasena}</li>
  ${subtipo.value === "examen" || subtipo.value === "modulo_completo" ? `
    <li><strong>Fecha del examen:</strong> ${fecha}</li>
    <li><strong>Hora del examen:</strong> ${hora}</li>
  ` : ''}
`;

        form.style.display = "none"; // Oculta el formulario
        resumenContainer.style.display = "block"; // Muestra el resumen

    });



});
