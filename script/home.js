// Importa os objetivos de exemplo
import { mockdata } from './mock.js'

// EventListener para carregar os objetivos assim que a tela carregar
window.addEventListener('load', function () {
    // Seleciona o container com os objetivos
    let containerObjetivos = this.document.querySelector('.container-objetivos');

    // Array para guardar a porcentagem de conclusão de cada objetivo
    const arrayConclusao = []

    // Loop para calcular a conclusão dos subobjetivos
    mockdata.objetivos.forEach(objetivo => {
        // Contador de subobjetivos concluídos
        let contadorConcluido = 0;
        // Itera sobre cada subobjetivo
        for (let i = 0; i < objetivo.subobjetivos.length; i++) {
            // Verifica o status do subobjetivo, se concluído o contador é incrementado
            if (objetivo.subobjetivos[i].status == 'concluido') {
                contadorConcluido++
            }
        }
        // Obtém a porcentagem de conclusão
        let porcentagem = (contadorConcluido / objetivo.subobjetivos.length) * 100
        // Salva ela no array
        arrayConclusao.push(porcentagem)
    });

    // Para cada objetivo cadastrado, cria um card no container
    mockdata.objetivos.forEach(objetivo => {
        containerObjetivos.innerHTML += `
        <div class="cartao-objetivo" data-index="${objetivo.id}">
                <h4 class="titulo-objetivo">${objetivo.titulo}</h4>
                <p class="descricao-objetivo">${objetivo.descricao}</p>
                <p class="sub-objetivos">Sub-Objetivos Cadastrados: ${objetivo.subobjetivos.length}</p>
                <p class="conclusao-objetivo">Progresso: </p>
                <div class="barra-progresso">
                    <div class="barra" data-index="${objetivo.id}"></div>
                </div>
                <p class="data-objetivo">Data de criação: 23/09/2025</p>
            </div>`

        // Seleciona a barra do card baseado no ID
        const barraProgresso = containerObjetivos.querySelector(`.barra[data-index="${objetivo.id}"]`)
        // Altera dinamicamente o preenchimento da barra de progresso
        barraProgresso.style.width = arrayConclusao[objetivo.id] + '%'
    });

    // Seleciona os cards
    let cardObjetivos = document.querySelectorAll('.cartao-objetivo')

    // Para cada card adiciona um eventListener
    cardObjetivos.forEach(card => {
        card.addEventListener('click', () => {
            // Ao clicar será feito um redirecionamento para a página de detalhes
            // Leva o ID do objetivo como parâmetro na URL
            this.window.location.href = `./detalhes.html?id=${card.getAttribute('data-index')}`
        })
    })
})




