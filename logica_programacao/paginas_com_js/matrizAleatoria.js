let res = document.getElementById("res")
let mat = []

function gerarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function gerarMatrizAleatoria(min, max, n) {
    mat = []

    for (let i = 0; i < n; i++) {
        mat[i] = []
        for (let j = 0; j < n; j++) {
            mat[i][j] = gerarAleatorio(min, max)
        }
    }

    res.innerHTML = `<strong>Matriz gerada:</strong><br><br>`

    let tabela = "<table style='border-collapse: collapse;'>"

    for (let i = 0; i < n; i++) {
        tabela += "<tr>"
        for (let j = 0; j < n; j++) {
            tabela += `
                <td style="
                    border: 1px solid #333; 
                    padding: 8px 14px; 
                    text-align: center;
                    font-size: 1.1rem;
                ">
                    ${mat[i][j]}
                </td>`
        }
        tabela += "</tr>"
    }

    tabela += "</table>"

    res.innerHTML += tabela
}

function btnGerarMatriz() {
    gerarMatrizAleatoria(1, 20, 3)
}
