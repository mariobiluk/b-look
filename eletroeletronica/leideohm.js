function calcular() {
    let resultado = document.getElementById('resultado')
    let voltagem = Number(document.getElementById('voltagem').value)
    let resistenciaA = Number(document.getElementById('resistenciaA').value)
    let resistenciaB = Number(document.getElementById('resistenciaB').value)
    let resistenciaC = Number(document.getElementById('resistenciaC').value)
    
    if(voltagem === 0 && resistenciaA === 0 && resistenciaB === 0 && resistenciaC === 0){
        resultado.innerHTML = `Impossível efetuar o cálculo. Informe os dados necessários.`
    } else {
        let paralelo = (resistenciaB * resistenciaC) / (resistenciaB + resistenciaC)
        let total = resistenciaA + paralelo
        
        let correnteA = voltagem / total
        let correnteB = (resistenciaC * correnteA) / (resistenciaB + resistenciaC)
        let correnteC = correnteA - correnteB
        
        let potenciaA = resistenciaA * (correnteA * correnteA)
        let potenciaB = resistenciaB * (correnteB * correnteB)
        let potenciaC = resistenciaC * (correnteC * correnteC)
        
        let tensaoA = resistenciaA * correnteA
        let tensaoB = resistenciaB * correnteB
        let tensaoC = resistenciaC * correnteC
        
        resultado.innerHTML = ""
        
        resultado.innerHTML += `Resistência equivalente em paralelo: ${paralelo.toFixed(3)} Ω<br>`
        resultado.innerHTML += `Resistência total do circuito: ${total.toFixed(3)} Ω<br><br>`
        
        resultado.innerHTML += `Corrente no resistor A: ${correnteA.toFixed(3)} A<br>`
        resultado.innerHTML += `Corrente no resistor B: ${correnteB.toFixed(3)} A<br>`
        resultado.innerHTML += `Corrente no resistor C: ${correnteC.toFixed(3)} A<br><br>`
        
        resultado.innerHTML += `Potência dissipada pelo resistor A: ${potenciaA.toFixed(3)} W<br>`
        resultado.innerHTML += `Potência dissipada pelo resistor B: ${potenciaB.toFixed(3)} W<br>`
        resultado.innerHTML += `Potência dissipada pelo resistor C: ${potenciaC.toFixed(3)} W<br><br>`
        
        resultado.innerHTML += `Tensão no resistor A: ${tensaoA.toFixed(3)} V<br>`
        resultado.innerHTML += `Tensão no resistor B: ${tensaoB.toFixed(3)} V<br>`
        resultado.innerHTML += `Tensão no resistor C: ${tensaoC.toFixed(3)} V<br><br>`
    }
}

function iniciarCalculo() {
    calcular()
}
