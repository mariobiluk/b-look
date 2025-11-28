let res = document.getElementById("res") //declaração as variáveis globais
let arr = []

function gerarAleatorio(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}

//função que gera um array aleatório
function gerarArray(qtd, min, max) {
    arr = [] // Limpa o array antes de gerar um novo
    for(let i = 0; i < qtd; i++){
        arr.push(gerarAleatorio(min, max))
    }
    return arr
}

// ----- ALGORITMO DE BUSCA LINEAR -----
function buscaLinear(arr, valor) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === valor) {
            return i   // posição encontrada
        }
    }
    return -1   // não encontrou
}

// ----- FUNÇÃO PRINCIPAL (BOTÃO) -----
function btnBuscar() {
    let valor = Number(document.getElementById("valor").value)

    if (isNaN(valor)) {
        res.innerHTML = "Digite um número válido para buscar."
        return
    }

    // gerar um array novo sempre que buscar
    let array = gerarArray(10, 1, 50)

    let pos = buscaLinear(array, valor)

    res.innerHTML = `
        <strong>Array Gerado:</strong> [${array.join(", ")}]<br><br>
    `

    if (pos === -1) {
        res.innerHTML += `O valor <strong>${valor}</strong> NÃO foi encontrado no array.`
    } else {
        res.innerHTML += `O valor <strong>${valor}</strong> foi encontrado na posição <strong>${pos+1}</strong>.`
    }
}