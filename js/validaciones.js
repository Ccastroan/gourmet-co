/* ============================================================
   GOURMET & CO. - VALIDACION DEL FORMULARIO DE CONTACTO
   Proyecto DSY1104 Desarrollo Fullstack II - Duoc UC

   El formulario lleva el atributo novalidate en el HTML para
   desactivar la validacion automatica del navegador. De esa
   forma todo el control queda en JavaScript y los mensajes de
   error y las sugerencias son propios del sitio, no los
   genericos del navegador.

   Estrategia:
   - Cada campo tiene una funcion que lo valida y devuelve
     null si esta correcto, o un texto de error si no lo esta.
   - La validacion se dispara al salir del campo (blur) y se
     limpia mientras el usuario escribe (input).
   - Al enviar se validan todos los campos y, si hay errores,
     se muestra un resumen y se detiene el envio.
   ============================================================ */

"use strict";

/* ---------- 1. REFERENCIAS AL DOCUMENTO ---------- */
const formulario = document.getElementById("formContacto");
const resumen = document.getElementById("resumenErrores");
const listaResumen = document.getElementById("listaErrores");
const avisoExito = document.getElementById("mensajeExito");

const campos = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    region: document.getElementById("region"),
    tipo: document.getElementById("tipo"),
    mensaje: document.getElementById("mensaje"),
    terminos: document.getElementById("terminos")
};

/* Dominios de correo mal escritos con frecuencia.
   Sirven para ofrecer una sugerencia al usuario. */
const DOMINIOS_CORREGIDOS = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmail.co": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "outlok.com": "outlook.com",
    "yaho.com": "yahoo.com",
    "duocuc.c": "duocuc.cl"
};

const LARGO_MAXIMO_MENSAJE = 500;


/* ---------- 2. UTILIDADES DE INTERFAZ ---------- */

/* Pinta el campo como incorrecto y muestra su mensaje */
function marcarError(campo, texto) {
    campo.classList.add("campo-error");
    campo.classList.remove("campo-ok");
    campo.setAttribute("aria-invalid", "true");

    const contenedor = document.getElementById("error-" + campo.id);
    if (contenedor) {
        contenedor.textContent = texto;
        contenedor.classList.add("visible");
    }
}

/* Pinta el campo como correcto y oculta su mensaje */
function marcarCorrecto(campo) {
    campo.classList.remove("campo-error");
    campo.classList.add("campo-ok");
    campo.setAttribute("aria-invalid", "false");

    const contenedor = document.getElementById("error-" + campo.id);
    if (contenedor) {
        contenedor.textContent = "";
        contenedor.classList.remove("visible");
    }
}

/* Devuelve el campo a su estado neutro */
function limpiarEstado(campo) {
    campo.classList.remove("campo-error", "campo-ok");
    campo.removeAttribute("aria-invalid");

    const contenedor = document.getElementById("error-" + campo.id);
    if (contenedor) {
        contenedor.classList.remove("visible");
    }
}


/* ---------- 3. VALIDADORES POR CAMPO ----------
   Cada funcion devuelve null si el dato esta bien,
   o el texto del error si esta mal. */

function validarNombre() {
    const valor = campos.nombre.value.trim();

    if (valor === "") {
        return "Necesitamos tu nombre para poder responderte.";
    }
    if (valor.length < 3) {
        return "El nombre debe tener al menos 3 caracteres. Escribiste " + valor.length + ".";
    }
    if (valor.length > 60) {
        return "El nombre no puede superar los 60 caracteres.";
    }
    // Solo letras (incluye tildes y ñ), espacios, apostrofes y guiones
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü'\-\s]+$/.test(valor)) {
        return "El nombre solo admite letras. Quita los números o símbolos.";
    }
    return null;
}

function validarEmail() {
    const valor = campos.email.value.trim().toLowerCase();

    if (valor === "") {
        return "Sin tu correo no podemos enviarte la respuesta.";
    }
    if (!valor.includes("@")) {
        return "Falta el símbolo @. Un correo válido se ve así: nombre@dominio.cl";
    }

    // Estructura general: algo@algo.algo
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(valor)) {
        return "El formato del correo no es válido. Revisa que tenga un punto y la terminación, por ejemplo .cl o .com";
    }

    // Sugerencia cuando el dominio parece mal escrito
    const dominio = valor.split("@")[1];
    if (DOMINIOS_CORREGIDOS[dominio]) {
        return "¿Quisiste escribir " + valor.split("@")[0] + "@" + DOMINIOS_CORREGIDOS[dominio] + "?";
    }

    return null;
}

function validarTelefono() {
    const valor = campos.telefono.value.trim();

    // Este campo es opcional
    if (valor === "") {
        return null;
    }

    // Se quitan espacios, guiones y parentesis para contar los digitos
    const soloDigitos = valor.replace(/[\s\-()+.]/g, "");

    if (!/^\d+$/.test(soloDigitos)) {
        return "El teléfono solo admite números. Puedes usar espacios o guiones como separadores.";
    }
    if (soloDigitos.length < 8) {
        return "El teléfono está incompleto: escribiste " + soloDigitos.length + " dígitos y se necesitan al menos 8.";
    }
    if (soloDigitos.length > 12) {
        return "El teléfono tiene demasiados dígitos. Usa el formato +56 9 1234 5678.";
    }
    return null;
}

function validarRegion() {
    if (campos.region.value === "") {
        return "Elige tu región para calcular el despacho.";
    }
    return null;
}

function validarTipo() {
    if (campos.tipo.value === "") {
        return "Indícanos de qué se trata tu consulta.";
    }
    return null;
}

function validarMensaje() {
    const valor = campos.mensaje.value.trim();

    if (valor === "") {
        return "Cuéntanos qué necesitas. Mientras más detalle, mejor te ayudamos.";
    }
    if (valor.length < 15) {
        return "El mensaje es muy breve: llevas " + valor.length + " de los 15 caracteres mínimos.";
    }
    if (valor.length > LARGO_MAXIMO_MENSAJE) {
        return "El mensaje supera los " + LARGO_MAXIMO_MENSAJE + " caracteres permitidos.";
    }
    return null;
}

function validarTerminos() {
    if (!campos.terminos.checked) {
        return "Debes aceptar la política de datos para poder enviar el formulario.";
    }
    return null;
}

/* Tabla que asocia cada campo con su validador y su nombre visible */
const REGLAS = [
    { campo: campos.nombre,   validar: validarNombre,   etiqueta: "Nombre" },
    { campo: campos.email,    validar: validarEmail,    etiqueta: "Correo electrónico" },
    { campo: campos.telefono, validar: validarTelefono, etiqueta: "Teléfono" },
    { campo: campos.region,   validar: validarRegion,   etiqueta: "Región" },
    { campo: campos.tipo,     validar: validarTipo,     etiqueta: "Tipo de consulta" },
    { campo: campos.mensaje,  validar: validarMensaje,  etiqueta: "Mensaje" },
    { campo: campos.terminos, validar: validarTerminos, etiqueta: "Política de datos" }
];


/* ---------- 4. VALIDACION DE UN CAMPO SUELTO ---------- */
function revisarCampo(regla) {
    const error = regla.validar();

    if (error) {
        marcarError(regla.campo, error);
        return false;
    }

    // Un campo opcional vacio queda neutro, no en verde
    if (regla.campo.value === "" && regla.campo === campos.telefono) {
        limpiarEstado(regla.campo);
        return true;
    }

    marcarCorrecto(regla.campo);
    return true;
}


/* ---------- 5. CONTADOR DE CARACTERES ---------- */
function actualizarContador() {
    const contador = document.getElementById("contadorMensaje");
    if (!contador) {
        return;
    }

    const usados = campos.mensaje.value.length;
    const restantes = LARGO_MAXIMO_MENSAJE - usados;

    contador.textContent = restantes + " caracteres disponibles";

    if (restantes < 50) {
        contador.classList.add("contador--limite");
    } else {
        contador.classList.remove("contador--limite");
    }
}


/* ---------- 6. EVENTOS EN TIEMPO REAL ---------- */
REGLAS.forEach(function (regla) {

    if (!regla.campo) {
        return;
    }

    // Al salir del campo se revisa
    regla.campo.addEventListener("blur", function () {
        revisarCampo(regla);
    });

    // Mientras escribe se borra el error para no molestar,
    // salvo que el campo ya estuviera correcto
    regla.campo.addEventListener("input", function () {
        if (regla.campo.classList.contains("campo-error")) {
            limpiarEstado(regla.campo);
        }
    });

    // Los select y el checkbox se revisan al cambiar
    if (regla.campo.tagName === "SELECT" || regla.campo.type === "checkbox") {
        regla.campo.addEventListener("change", function () {
            revisarCampo(regla);
        });
    }
});

if (campos.mensaje) {
    campos.mensaje.addEventListener("input", actualizarContador);
}


/* ---------- 7. ENVIO DEL FORMULARIO ---------- */
if (formulario) {
    formulario.addEventListener("submit", function (evento) {

        // Se detiene el envio hasta comprobar que todo esta bien
        evento.preventDefault();

        const errores = [];

        REGLAS.forEach(function (regla) {
            const ok = revisarCampo(regla);
            if (!ok) {
                errores.push({
                    etiqueta: regla.etiqueta,
                    campo: regla.campo,
                    texto: regla.validar()
                });
            }
        });

        if (errores.length > 0) {

            // Se arma el resumen con todos los problemas encontrados
            listaResumen.innerHTML = errores.map(function (e) {
                return "<li><strong>" + e.etiqueta + ":</strong> " + e.texto + "</li>";
            }).join("");

            resumen.classList.add("visible");
            avisoExito.classList.remove("visible");

            // Se lleva al usuario al resumen y luego al primer campo malo
            resumen.scrollIntoView({ behavior: "smooth", block: "center" });
            errores[0].campo.focus();

            return;
        }

        // Todo correcto: se oculta el resumen y se confirma
        resumen.classList.remove("visible");

        avisoExito.innerHTML =
            "<h2>Mensaje enviado</h2>" +
            "<p>Gracias, <strong>" + campos.nombre.value.trim() + "</strong>. " +
            "Recibimos tu consulta sobre <strong>" +
            campos.tipo.options[campos.tipo.selectedIndex].text.toLowerCase() +
            "</strong> y te responderemos a <strong>" +
            campos.email.value.trim() + "</strong> dentro de 24 horas hábiles.</p>";

        avisoExito.classList.add("visible");
        avisoExito.scrollIntoView({ behavior: "smooth", block: "center" });

        // Se limpia el formulario y se dejan los campos en estado neutro
        formulario.reset();
        REGLAS.forEach(function (regla) {
            limpiarEstado(regla.campo);
        });
        actualizarContador();
    });
}


/* ---------- 8. ESTADO INICIAL ---------- */
document.addEventListener("DOMContentLoaded", actualizarContador);
