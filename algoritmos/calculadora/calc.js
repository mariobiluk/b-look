            let res = document.getElementById('res')

            function calcular(operacao) {
                let num1 = Number(document.getElementById('num1').value)
                let num2 = Number(document.getElementById('num2').value)
                console.log(num1, num2)

                let resposta
                let simbolo

                if (operacao === 'somar') {
                    resposta = num1 + num2
                    simbolo = '+'
                } else if (operacao === 'subtrair') {
                    resposta = num1 - num2
                    simbolo = '-'
                } else if (operacao === 'multiplicar') {
                    resposta = num1 * num2
                    simbolo = '*'
                } else if (operacao === 'dividir') {
                    resposta = num1 / num2
                    simbolo = '/'
                }

                res.innerHTML = ''
                res.innerHTML += `${num1} ${simbolo} ${num2} = ${resposta} <br>`
            }

            function somar() {
                calcular('somar')
            }

            function subtrair() {
                calcular('subtrair')
            }

            function multiplicar() {
                calcular('multiplicar')
            }

            function dividir() {
                calcular('dividir')
            }