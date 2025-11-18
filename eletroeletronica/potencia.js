function atualizarCampos() {
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;
    const camposDiv = document.getElementById('camposEntrada');
    let html = '<h3>Informe os valores:</h3>';
    
    switch(calculoSelecionado) {
        case 'potenciaVI':
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
    
    camposDiv.innerHTML = html;
}

function calcular() {
    const calculoSelecionado = document.querySelector('input[name="calculo"]:checked').value;
    const resultadoDiv = document.getElementById('resultado');
    
    try {
        let resultado = '';
        
        switch(calculoSelecionado) {
            case 'potenciaVI':
                const tensaoVI = parseFloat(document.getElementById('tensao').value);
                const correnteVI = parseFloat(document.getElementById('corrente').value);
                
                if (isNaN(tensaoVI) || isNaN(correnteVI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                
                const potenciaVI = tensaoVI * correnteVI;
                resultado = `Potência (P) = ${potenciaVI.toFixed(4)} Watts`;
                break;
                
            case 'potenciaRI':
                const resistenciaRI = parseFloat(document.getElementById('resistencia').value);
                const correnteRI = parseFloat(document.getElementById('corrente').value);
                
                if (isNaN(resistenciaRI) || isNaN(correnteRI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (resistenciaRI <= 0) throw new Error('A resistência deve ser maior que zero');
                
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
                
                const potenciaVR = Math.pow(tensaoVR, 2) / resistenciaVR;
                resultado = `Potência (P) = ${potenciaVR.toFixed(4)} Watts`;
                break;
                
            case 'tensao':
                const potenciaV = parseFloat(document.getElementById('potencia').value);
                const correnteV = parseFloat(document.getElementById('corrente').value);
                
                if (isNaN(potenciaV) || isNaN(correnteV)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (correnteV <= 0) throw new Error('A corrente deve ser maior que zero');
                
                const tensao = potenciaV / correnteV;
                resultado = `Tensão (V) = ${tensao.toFixed(4)} Volts`;
                break;
                
            case 'corrente':
                const potenciaI = parseFloat(document.getElementById('potencia').value);
                const tensaoI = parseFloat(document.getElementById('tensao').value);
                
                if (isNaN(potenciaI) || isNaN(tensaoI)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (tensaoI <= 0) throw new Error('A tensão deve ser maior que zero');
                
                const corrente = potenciaI / tensaoI;
                resultado = `Corrente (I) = ${corrente.toFixed(4)} Amperes`;
                break;
                
            case 'resistencia':
                const tensaoR = parseFloat(document.getElementById('tensao').value);
                const potenciaR = parseFloat(document.getElementById('potencia').value);
                
                if (isNaN(tensaoR) || isNaN(potenciaR)) {
                    throw new Error('Preencha todos os campos com valores válidos');
                }
                if (potenciaR <= 0) throw new Error('A potência deve ser maior que zero');
                
                const resistencia = Math.pow(tensaoR, 2) / potenciaR;
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
    
    atualizarCampos();
});