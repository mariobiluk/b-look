let res = document.getElementById("res")
let arr = []

function gerarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function gerarArray(min, max, n) {
    for (let i = 0; i < n; i++) {
        arr[i] = gerarAleatorio(min, max)
    }
    res.innerHTML = ``                    // Limpa apenas uma vez
    res.innerHTML += `Array gerado: ${arr}<br>`
}

function somarArray(n) {
    let soma = 0

    for (let i = 0; i < n; i++) {  // até n, não n-1
        soma += arr[i]
    }

    // escreve aqui, dentro da função
    res.innerHTML += `Soma dos elementos do array: ${soma}<br>`
}

function calcular() {
    let min = 1, max = 220, n = 10

    gerarArray(min, max, n)
    somarArray(n)
}
