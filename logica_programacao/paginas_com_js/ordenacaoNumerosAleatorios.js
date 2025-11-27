let res = document.getElementById("res")
let arr = []

function gerarAleatorio(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}

function gerarArray(min,max,n) {
    let contador = 1
    for (let i = 0; i < n; i++) {
        arr[i] = gerarAleatorio(min,max)
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

function ordenar() {
    let min = 1, max = 20, n = 10

    gerarArray(min,max,n)
    ordenarAraayCrescente(n)
}
