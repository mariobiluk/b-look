let res = document.getElementById("res")   // GLOBAL

function calcularValorIMC(peso, altura) {
    return peso / (altura * altura)
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso"
    } else if (imc < 25) {
        return "Peso normal"
    } else if (imc < 30) {
        return "Sobrepeso"
    } else if (imc < 35) {
        return "Obesidade grau 1"
    } else if (imc < 40) {
        return "Obesidade grau 2"
    } else {
        return "Obesidade grau 3"
    }
}

function calcularIMC() {
    let peso = Number(document.getElementById("peso").value)
    let altura = Number(document.getElementById("altura").value)

    let imc = calcularValorIMC(peso, altura)
    let classificacao = classificarIMC(imc)

    res.innerHTML = `
        IMC: ${imc.toFixed(2)} <br>
        Classificação: ${classificacao}
    `
}
