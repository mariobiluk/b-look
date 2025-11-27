// leideohm.js

// Esta função atualiza os campos de entrada dependendo do cálculo escolhido (tensão, corrente ou resistência)
function atualizarCampos() {
    // Pega qual botão de rádio está marcado (qual cálculo o usuário escolheu)
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;

    // Pega a div onde os inputs serão colocados
    const camposDiv = document.getElementById('camposEntrada');

    // Variável onde vamos montar o HTML dos campos
    // Usamos template strings para facilitar quebrar linhas
    let html = '<h3>Informe os valores:</h3>';

    // switch escolhe qual conjunto de campos mostrar
    switch (calculoSelecionado) {

        case 'tensao':
            // Aqui estamos montando uma string com HTML
            // Isso é usado normalmente quando os campos mudam dinamicamente
            // Se colocássemos direto no HTML, não seria possível trocar automaticamente
            html += `
                <div class="grupo-input">
                    <label for="corrente">Corrente (I) em Amperes (A):</label>
                    <input type="number" id="corrente" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="resistencia">Resistência (R) em Ohms (Ω):</label>
                    <input type="number" id="resistencia" step="0.001" required>
                </div>
            `;
            break;

        case 'corrente':
            html += `
                <div class="grupo-input">
                    <label for="tensao">Tensão (V) em Volts (V):</label>
                    <input type="number" id="tensao" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="resistencia">Resistência (R) em Ohms (Ω):</label>
                    <input type="number" id="resistencia" step="0.001" required>
                </div>
            `;
            break;

        case 'resistencia':
            html += `
                <div class="grupo-input">
                    <label for="tensao">Tensão (V) em Volts (V):</label>
                    <input type="number" id="tensao" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="corrente">Corrente (I) em Amperes (A):</label>
                    <input type="number" id="corrente" step="0.001" required>
                </div>
            `;
            break;
    }

    // Aqui estamos inserindo aquele HTML montado dentro da div
    // innerHTML substitui o conteúdo da div pelo que passar na string
    camposDiv.innerHTML = html;
}



// Função principal para calcular tensão, corrente ou resistência
function calcular() {
    // Pega o cálculo escolhido novamente
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;

    // Div onde o resultado será exibido
    const resultadoDiv = document.getElementById('resultado');

    try {
        // try = bloco onde o código é testado
        // Se acontecer algum erro aqui dentro, ele é "jogado" (lançado) para o catch
        // Variável que guardará o texto final do resultado
        let resultado = '';

        switch (calculoSelecionado) {

            case 'tensao':
                // parseFloat() converte texto para número REAL (com decimal)
                // document.getElementById('corrente').value sempre retorna texto
                const correnteV = parseFloat(document.getElementById('corrente').value);
                const resistenciaV = parseFloat(document.getElementById('resistencia').value);

                // isNaN() verifica se NÃO é número (NaN = Not a Number)
                if (isNaN(correnteV) || isNaN(resistenciaV)) {
                    // throw new Error cria um erro manualmente
                    // Ele para a execução do try e vai direto para o catch
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                // Evita divisão por zero e valores inválidos
                if (resistenciaV <= 0) throw new Error('A resistência deve ser maior que zero');

                // Fórmula da Lei de Ohm — V = I * R
                const tensao = correnteV * resistenciaV;

                // toFixed(4) reduz casas decimais para 4
                resultado = `Tensão (V) = ${tensao.toFixed(4)} Volts`;
                break;


            case 'corrente':
                const tensaoI = parseFloat(document.getElementById('tensao').value);
                const resistenciaI = parseFloat(document.getElementById('resistencia').value);

                if (isNaN(tensaoI) || isNaN(resistenciaI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (resistenciaI <= 0) throw new Error('A resistência deve ser maior que zero');

                // I = V / R
                const corrente = tensaoI / resistenciaI;

                resultado = `Corrente (I) = ${corrente.toFixed(4)} Amperes`;
                break;


            case 'resistencia':
                const tensaoR = parseFloat(document.getElementById('tensao').value);
                const correnteR = parseFloat(document.getElementById('corrente').value);

                if (isNaN(tensaoR) || isNaN(correnteR)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (correnteR <= 0) throw new Error('A corrente deve ser maior que zero');

                // R = V / I
                const resistencia = tensaoR / correnteR;

                resultado = `Resistência (R) = ${resistencia.toFixed(4)} Ohms`;
                break;
        }

        // Coloca o resultado na tela e aplica classe de sucesso
        resultadoDiv.innerHTML = resultado;
        resultadoDiv.className = 'resultado-sucesso';

    } catch (error) {
        // catch = só executa se algum throw ou erro acontecer dentro do try
        // error.message contém o texto que colocamos no throw new Error()
        // Se algo deu errado, mostra mensagem de erro
        resultadoDiv.innerHTML = `Erro: ${error.message}`;
        resultadoDiv.className = 'resultado-erro';
    }
}



// Função para limpar tudo e recriar os campos iniciais
function limpar() {
    document.getElementById('camposEntrada').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('resultado').className = '';

    // Recarrega os campos conforme o cálculo selecionado
    atualizarCampos();
}



// Event listeners — executado quando a página carrega
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona todos os botões de rádio
    const radios = document.querySelectorAll('input[name="calculo"]');

    // Toda vez que um cálculo é selecionado, atualiza os campos
    radios.forEach(radio => {
        radio.addEventListener('change', atualizarCampos);
    });


    // Aqui criamos um container para os botões
    // Isso é útil se quiser agrupar eles visualmente
    const botoes = document.querySelectorAll('button');
    const botoesContainer = document.createElement('div');
    botoesContainer.className = 'botoes-container';

    // Clona os botões dentro do novo container e remove os originais
    botoes.forEach(botao => {
        botoesContainer.appendChild(botao.cloneNode(true));
        botao.remove();
    });

    // Insere o container de botões acima do resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.parentNode.insertBefore(botoesContainer, resultadoDiv);

    // Cria os campos iniciais ao abrir a página
    atualizarCampos();
});
