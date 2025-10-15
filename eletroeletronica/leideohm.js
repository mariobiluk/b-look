// leideohm.js
function atualizarCampos() {
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;
    const camposDiv = document.getElementById('camposEntrada');
    let html = '<h3>Informe os valores:</h3>';
    
    switch(calculoSelecionado) {
        case 'tensao':
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
    
    camposDiv.innerHTML = html;
}

function calcular() {
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;
    const resultadoDiv = document.getElementById('resultado');
    
    try {
        let resultado = '';
        
        switch(calculoSelecionado) {
            case 'tensao':
                const correnteV = parseFloat(document.getElementById('corrente').value);
                const resistenciaV = parseFloat(document.getElementById('resistencia').value);
                
                if (isNaN(correnteV) || isNaN(resistenciaV)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (resistenciaV <= 0) throw new Error('A resistência deve ser maior que zero');
                
                const tensao = correnteV * resistenciaV;
                resultado = `Tensão (V) = ${tensao.toFixed(4)} Volts`;
                break;
                
            case 'corrente':
                const tensaoI = parseFloat(document.getElementById('tensao').value);
                const resistenciaI = parseFloat(document.getElementById('resistencia').value);
                
                if (isNaN(tensaoI) || isNaN(resistenciaI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (resistenciaI <= 0) throw new Error('A resistência deve ser maior que zero');
                
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
                
                const resistencia = tensaoR / correnteR;
                resultado = `Resistência (R) = ${resistencia.toFixed(4)} Ohms`;
                break;
        }
        
        resultadoDiv.innerHTML = resultado;
        resultadoDiv.className = 'resultado-sucesso';
        
    } catch (error) {
        resultadoDiv.innerHTML = `Erro: ${error.message}`;
        resultadoDiv.className = 'resultado-erro';
    }
}

function limpar() {
    document.getElementById('camposEntrada').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('resultado').className = '';
    atualizarCampos();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="calculo"]');
    radios.forEach(radio => {
        radio.addEventListener('change', atualizarCampos);
    });
    
    // Organiza os botões em um container
    const botoes = document.querySelectorAll('button');
    const botoesContainer = document.createElement('div');
    botoesContainer.className = 'botoes-container';
    
    botoes.forEach(botao => {
        botoesContainer.appendChild(botao.cloneNode(true));
        botao.remove();
    });
    
    // Insere o container de botões antes do resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.parentNode.insertBefore(botoesContainer, resultadoDiv);
    
    atualizarCampos();
});