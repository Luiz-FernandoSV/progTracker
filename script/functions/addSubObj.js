import carregarDados from "../exemplos.js";
import calcularConclusao from "./calcConclusao.js";

function adicionarSubObjetivo(objetivo, subobj) {
    // Seleciona o container dos subobjetivos
    const containerSubObj = document.querySelector('.container-subobjetivos');
    // Formata o status
    let statusSub = ''
    switch (subobj.status) {
        case 'concluido':
            statusSub = 'Concluído'
            break;
        case 'nao-concluido':
            statusSub = 'Não Concluído'
            break;
        default:
            console.log('Status não reconhecido.')
            break;
    }

    // Preenche o container dinamicamente
    containerSubObj.innerHTML += `
     <div class="card-subobj" data-index="${subobj.id}">
             <input type="checkbox" class="checkbox-status">
             <div class="container-conteudo">
                <div class="card-detalhes">
                    <h4 class="card-titulo">${subobj.titulo}</h4>
                    <p class="card-desc">${subobj.descricao}</p>
                    <p class="card-status">${statusSub}</p>
                </div>
                <div class="div-acoes">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
         </div>`


    // Variavel para guardar os dados
    const data = carregarDados();
    // Seleciona a barra
    const barraProgresso = document.querySelector('.barra');

    let cardsSubObj = document.querySelectorAll('.card-subobj');
    cardsSubObj.forEach(card => {

        // Obtém o índice do card
        let cardIndex = card.dataset.index
        let checkbox = card.querySelector('.checkbox-status');
        let status = card.querySelector('.card-status').textContent;
        // Troca o checkbox baseado no status
        switch (status) {
            case 'Concluído':
                checkbox.checked = true;
                break;
            case 'Não Concluído':
                checkbox.checked = false;
                break;
            default:
                console.log("Erro");
                break;
        }
        // Adiciona um eventlistener de click
        checkbox.addEventListener('click', function () {
            // Seleciona o campo novamente
            let campoStatus = card.querySelector('.card-status');
            // Faz a troca do status e atualiza o status do subobjetivo
            switch (checkbox.checked) {
                case true:
                    campoStatus.textContent = 'Concluído';
                    data.objetivos[objetivo.id].subobjetivos[cardIndex].status = 'concluido';
                    break;
                case false:
                    campoStatus.textContent = 'Não Concluído';
                    data.objetivos[objetivo.id].subobjetivos[cardIndex].status = 'nao-concluido';
                    break;
                default:
                    console.log("Erro");
                    break;
            }
            // Atualiza o storage
            localStorage.setItem('dados', JSON.stringify(data))
            // Calcula novamente o status da conclusão
            let conclusao = calcularConclusao(data.objetivos[objetivo.id]);
            // Seleciona o campo de status
            let status = document.querySelector('.status');
            // Altera o status do objetivo
            if (conclusao.porcentagem == 100) {
                status.textContent = 'Concluído'
            } else {
                status.textContent = 'Não Concluído'
            }

            // Preenche dinamicamente a barra
            barraProgresso.style.width = conclusao.porcentagem + '%';

            // Verifica se a quantidade de subobjetivos concluídos são diferentes de 0, se não forem o valor é 0
            document.querySelector('.card-totais p').textContent = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : '0';
            document.querySelector('.card-conclusao p').textContent = conclusao.qtdConcluidos !== 0 ? conclusao.qtdConcluidos : '0';
            document.querySelector('.card-restantes p').textContent = objetivo.subobjetivos?.length && conclusao.qtdConcluidos !== 'undefined' ? objetivo.subobjetivos.length - conclusao.qtdConcluidos : '0';
        })

        let btnEditar = card.querySelector('.fa-pen-to-square');
        let btnDeletar = card.querySelector('.fa-trash');
        btnEditar.addEventListener('click', function () {
            let modal = document.querySelector('.container-modal');
            let form = document.querySelector('form');
            // Obtém os valores anteriores
            let tituloAtual = card.querySelector('.card-titulo').textContent;
            let descricaoAtual = card.querySelector('.card-desc').textContent;
            // Coloca os valores anteriores
            modal.querySelector('input[id="titulo-subobj"]').value = tituloAtual;
            modal.querySelector('textarea[id="descricao-subobj"]').value = descricaoAtual;
            // Altera o modo para edição e adiciona o índice a ser alterado no data-index
            form.dataset.mode = 'editar';
            form.dataset.index = card.dataset['index'];
            // Exibe o modal 
            modal.style.display = 'flex';
        })
        btnDeletar.addEventListener('click', function () {
            // Obtém o id do objetivo
            let idSubObjetivo = card.dataset.index
            // Seleciona o modal de confirmação
            let modalExclusao = document.querySelector('#modal-exclusao');
            // Deixa ele visível na tela
            modalExclusao.style.display = 'flex';
            // Seleciona o card onde o botão foi clicado
            let cardSelecionado = containerSubObj.querySelector(`.card-subobj[data-index="${card.dataset['index']}"]`);
            // Seleciona o botão de confirmação
            let btn_confirmar = document.querySelector('.btn-confirmar');
            // Adiciona um eventListener, só apaga o card caso seja confirmado
            btn_confirmar.addEventListener('click', function () {
                // Remove o card da tela
                cardSelecionado.remove()
                // Esconde o modal novamente
                modalExclusao.style.display = 'none';
                // Obtém o array atual e atualiza ele
                let arrayAtual = JSON.parse(localStorage.getItem('dados'));
                // Remove o subobjetivo do array
                arrayAtual.objetivos[objetivo.id].subobjetivos = arrayAtual.objetivos[objetivo.id].subobjetivos.filter(subobj => subobj.id != idSubObjetivo);
                // Atualiza o localStorage
                localStorage.setItem('dados', JSON.stringify(arrayAtual));

            })
        })
    })
}
// Exporta a função
export default adicionarSubObjetivo;