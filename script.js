// Obtener los elementos del HTML
const formulario = document.getElementById("formulario");
const campoValor = document.getElementById("valor");
const unidadOrigen = document.getElementById("origen");
const unidadDestino = document.getElementById("destino");
const botonConvertir = document.getElementById("convertir");
const resultado = document.getElementById("resultado");

// Revisar si los tres campos están completos
function revisarCampos() {
    // Comprobar que el valor no esté vacío
    const valorCompleto = campoValor.value.trim() !== "";

    // Comprobar que se haya elegido una unidad de origen
    const origenCompleto = unidadOrigen.value !== "";

    // Comprobar que se haya elegido una unidad de destino
    const destinoCompleto = unidadDestino.value !== "";

    // Habilitar el botón solamente si todos tienen información
    botonConvertir.disabled = !(valorCompleto && origenCompleto && destinoCompleto);

    // Limpiar el resultado cuando se cambian los datos
    resultado.textContent = "";
}

// Convertir la temperatura recibida a Celsius
function convertirACelsius(valor, unidad) {
    if (unidad === "C") {
        return valor;
    } else if (unidad === "F") {
        return (valor - 32) * 5 / 9;
    } else {
        return valor - 273.15;
    }
}

// Convertir desde Celsius a la unidad seleccionada
function convertirDesdeCelsius(valor, unidad) {
    if (unidad === "C") {
        return valor;
    } else if (unidad === "F") {
        return (valor * 9 / 5) + 32;
    } else {
        return valor + 273.15;
    }
}

// Revisar los campos cada vez que el usuario escribe o selecciona
campoValor.addEventListener("input", revisarCampos);
unidadOrigen.addEventListener("change", revisarCampos);
unidadDestino.addEventListener("change", revisarCampos);

// Escuchar el envío del formulario
formulario.addEventListener("submit", function(evento) {
    // Evitar que la página se recargue
    evento.preventDefault();

    // Obtener el valor escrito como número
    const valorIngresado = Number(campoValor.value);

    // Verificar que el dato sea válido
    if (campoValor.value.trim() === "" || !Number.isFinite(valorIngresado)) {
        resultado.textContent = "Escribe una temperatura válida.";
        return;
    }

    // Convertir primero a Celsius
    const valorCelsius = convertirACelsius(valorIngresado, unidadOrigen.value);

    // Verificar que no esté por debajo del cero absoluto
    if (valorCelsius < -273.15) {
        resultado.textContent = "La temperatura no puede ser inferior al cero absoluto.";
        return;
    }

    // Convertir de Celsius a la unidad que se eligió
    const valorConvertido = convertirDesdeCelsius(valorCelsius, unidadDestino.value);

    // Definir el símbolo de la unidad final
    let simbolo = "°C";
    if (unidadDestino.value === "F") {
        simbolo = "°F";
    } else if (unidadDestino.value === "K") {
        simbolo = "K";
    }

    // Mostrar el resultado con dos decimales
    resultado.textContent = valorConvertido.toFixed(2) + " " + simbolo;
});

// Comprobar el estado del botón al abrir la página
revisarCampos();
