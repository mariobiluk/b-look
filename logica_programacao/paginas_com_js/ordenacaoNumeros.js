let res = document.getElementById("res")
let arr = []

function gerarArray(n) {
    let contador = 1
    for (let i = 0; i < n; i++) {
        arr[i] = contador
        contador++
    }
    res.innerHTML = ``                    // LIMPA UMA ÚNICA VEZ
    res.innerHTML += `Array gerado: ${arr}<br>`
}

function ordenarAraayCrescente(n) {
    let num = 0

    for (let j = 0; j < n - 1; j++) {
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                num = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = num
            }
        }
    }
    
    // NÃO limpar aqui!
    res.innerHTML += `Array ordenado crescente: ${arr}<br>`
}

function ordenarAraayDecrescente(n) {
    let num = 0

    for (let j = 0; j < n - 1; j++) {
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] < arr[i + 1]) {
                num = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = num
            }
        }
    }

    // NÃO limpar aqui!
    res.innerHTML += `Array ordenado decrescente: ${arr}<br>`
}

function ordenar() {
    let n = 20

    gerarArray(n)
    ordenarAraayCrescente(n)
    ordenarAraayDecrescente(n)
}
