// leideohm.js

// Esta função atualiza os campos de entrada dependendo do cálculo escolhido
function atualizarCampos() {
    // Seleciona o radio que está marcado (o cálculo escolhido pelo usuário)
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;

    // Pega a <div> onde vamos inserir os campos de entrada (tensão, corrente, resistência, potência etc.)
    const camposDiv = document.getElementById('camposEntrada');

    // Começamos a montar uma string com HTML. Colocamos um título fixo.
    // Usamos uma string porque vamos substituir o conteúdo da div inteira com innerHTML abaixo.
    let html = '<h3>Informe os valores:</h3>';
    
    // Dependendo da opção escolhida, concatenamos (adicionamos) ao HTML os inputs necessários
    switch(calculoSelecionado) {

        case 'potenciaVI':
            // Se o usuário quer calcular potência a partir de V e I (P = V * I),
            // mostramos os campos Tensão (tensao) e Corrente (corrente).
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
            
        case 'potenciaRI':
            // Se quer calcular P usando R e I (P = R * I^2), mostramos Resistência e Corrente.
            html += `
                <div class="grupo-input">
                    <label for="resistencia">Resistência (R) em Ohms (Ω):</label>
                    <input type="number" id="resistencia" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="corrente">Corrente (I) em Amperes (A):</label>
                    <input type="number" id="corrente" step="0.001" required>
                </div>
            `;
            break;
            
        case 'potenciaVR':
            // Se quer calcular P usando V e R (P = V^2 / R), mostramos Tensão e Resistência.
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
            
        case 'tensao':
            // Se quer calcular tensão a partir de potência e corrente (V = P / I),
            // mostramos Potência e Corrente.
            html += `
                <div class="grupo-input">
                    <label for="potencia">Potência (P) em Watts (W):</label>
                    <input type="number" id="potencia" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="corrente">Corrente (I) em Amperes (A):</label>
                    <input type="number" id="corrente" step="0.001" required>
                </div>
            `;
            break;
            
        case 'corrente':
            // Se quer calcular corrente a partir de potência e tensão (I = P / V),
            // mostramos Potência e Tensão.
            html += `
                <div class="grupo-input">
                    <label for="potencia">Potência (P) em Watts (W):</label>
                    <input type="number" id="potencia" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="tensao">Tensão (V) em Volts (V):</label>
                    <input type="number" id="tensao" step="0.001" required>
                </div>
            `;
            break;
            
        case 'resistencia':
            // Se quer calcular resistência a partir de tensão e potência (R = V^2 / P),
            // mostramos Tensão e Potência.
            html += `
                <div class="grupo-input">
                    <label for="tensao">Tensão (V) em Volts (V):</label>
                    <input type="number" id="tensao" step="0.001" required>
                </div>
                <div class="grupo-input">
                    <label for="potencia">Potência (P) em Watts (W):</label>
                    <input type="number" id="potencia" step="0.001" required>
                </div>
            `;
            break;
    }
    
    // innerHTML coloca a string HTML inteira dentro da div camposEntrada.
    // Isso substitui tudo que estava lá pelo conteúdo da variável html.
    camposDiv.innerHTML = html;
}



function calcular() {
    // Pega qual cálculo está selecionado no momento
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;

    // Div onde o resultado será mostrado ao usuário
    const resultadoDiv = document.getElementById('resultado');
    
    try {
        // try: aqui colocamos o código que pode gerar erros (ex: campo vazio ou divisão por zero)
        // Se algo der errado dentro do try e usarmos "throw", ele pula direto para o catch.
        let resultado = '';
        
        switch(calculoSelecionado) {
            case 'potenciaVI':
                // parseFloat transforma a string do input em número de ponto flutuante (decimal)
                const tensaoVI = parseFloat(document.getElementById('tensao').value);
                const correnteVI = parseFloat(document.getElementById('corrente').value);
                
                // isNaN retorna true se o valor NÃO for um número (ex.: campo vazio ou texto)
                if (isNaN(tensaoVI) || isNaN(correnteVI)) {
                    // throw new Error interrompe o fluxo e envia a mensagem para o catch
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                
                // Fórmula P = V * I
                const potenciaVI = tensaoVI * correnteVI;
                resultado = `Potência (P) = ${potenciaVI.toFixed(4)} Watts`;
                break;
                
            case 'potenciaRI':
                const resistenciaRI = parseFloat(document.getElementById('resistencia').value);
                const correnteRI = parseFloat(document.getElementById('corrente').value);
                
                if (isNaN(resistenciaRI) || isNaN(correnteRI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                // Validação simples: resistência não pode ser zero ou negativa aqui
                if (resistenciaRI <= 0) throw new Error('A resistência deve ser maior que zero');
                
                // Math.pow(correnteRI, 2) = correnteRI ao quadrado (I^2)
                const potenciaRI = resistenciaRI * Math.pow(correnteRI, 2);
                resultado = `Potência (P) = ${potenciaRI.toFixed(4)} Watts`;
                break;
                
            case 'potenciaVR':
                const tensaoVR = parseFloat(document.getElementById('tensao').value);
                const resistenciaVR = parseFloat(document.getElementById('resistencia').value);
                
                if (isNaN(tensaoVR) || isNaN(resistenciaVR)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (resistenciaVR <= 0) throw new Error('A resistência deve ser maior que zero');
                
                // Math.pow(tensaoVR, 2) = V^2 ; P = V^2 / R
                const potenciaVR = Math.pow(tensaoVR, 2) / resistenciaVR;
                resultado = `Potência (P) = ${potenciaVR.toFixed(4)} Watts`;
                break;
                
            case 'tensao':
                const potenciaV = parseFloat(document.getElementById('potencia').value);
                const correnteV = parseFloat(document.getElementById('corrente').value);
                
                if (isNaN(potenciaV) || isNaN(correnteV)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                // corrente não pode ser zero para evitar divisão por zero
                if (correnteV <= 0) throw new Error('A corrente deve ser maior que zero');
                
                // V = P / I
                const tensao = potenciaV / correnteV;
                resultado = `Tensão (V) = ${tensao.toFixed(4)} Volts`;
                break;
                
            case 'corrente':
                const potenciaI = parseFloat(document.getElementById('potencia').value);
                const tensaoI = parseFloat(document.getElementById('tensao').value);
                
                if (isNaN(potenciaI) || isNaN(tensaoI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                // tensão não pode ser zero para evitar divisão por zero
                if (tensaoI <= 0) throw new Error('A tensão deve ser maior que zero');
                
                // I = P / V
                const corrente = potenciaI / tensaoI;
                resultado = `Corrente (I) = ${corrente.toFixed(4)} Amperes`;
                break;
                
            case 'resistencia':
                const tensaoR = parseFloat(document.getElementById('tensao').value);
                const potenciaR = parseFloat(document.getElementById('potencia').value);
                
                if (isNaN(tensaoR) || isNaN(potenciaR)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                // potência não pode ser zero para evitar divisão por zero
                if (potenciaR <= 0) throw new Error('A potência deve ser maior que zero');
                
                // R = V^2 / P
                const resistencia = Math.pow(tensaoR, 2) / potenciaR;
                resultado = `Resistência (R) = ${resistencia.toFixed(4)} Ohms`;
                break;
        }
        
        // Se chegou até aqui sem throw, mostra o resultado e aplica classe de sucesso
        resultadoDiv.innerHTML = resultado;
        resultadoDiv.className = 'resultado-sucesso';
        
    } catch (error) {
        // catch pega qualquer erro lançado dentro do try (incluindo os throw new Error)
        // Mostramos a mensagem do erro para o usuário e aplicamos classe de erro
        resultadoDiv.innerHTML = `Erro: ${error.message}`;
        resultadoDiv.className = 'resultado-erro';
    }
}

function limpar() {
    // Limpa a área dos campos e o resultado, e reseta a classe do resultado
    document.getElementById('camposEntrada').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('resultado').className = '';
    // Recria os campos conforme a opção selecionada
    atualizarCampos();
}

// Quando a página terminar de carregar, executamos a função abaixo
document.addEventListener('DOMContentLoaded', function() {
    // Pega todos os radios com name="calculo"
    const radios = document.querySelectorAll('input[name="calculo"]');

    // Para cada radio, adiciona um "ouvinte" (evento) para quando o usuário trocar a opção
    // Assim, sempre que o usuário mudar entre potenciaVI / potenciaRI / ... chamamos atualizarCampos
    radios.forEach(radio => {
        radio.addEventListener('change', atualizarCampos);
    });
    
    // Por fim, chamamos atualizarCampos para montar os campos iniciais logo que a página abre
    atualizarCampos();
});
