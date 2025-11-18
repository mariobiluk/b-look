let res = document.getElementById("res")   // GLOBAL

function celsiusParaFahrenheit(c) {
    return (c * 9/5) + 32
}

function fahrenheitParaCelsius(f) {
    return (f - 32) * 5/9
}

function converterTemperatura() {
    let temp = Number(document.getElementById("temp").value)
    let tipo = document.getElementById("tipo").value   // "CtoF" ou "FtoC"

    let resultado = 0

    if (tipo == "CtoF") {
        resultado = celsiusParaFahrenheit(temp)
        res.innerHTML = `
            ${temp}°C = ${resultado.toFixed(2)}°F
        `
    } else {
        resultado = fahrenheitParaCelsius(temp)
        res.innerHTML = `
            ${temp}°F = ${resultado.toFixed(2)}°C
        `
    }
}
