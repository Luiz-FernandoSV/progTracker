import carregarDados from "../exemplos.js";
import atualizarEstatisticas from "./atualizarEstatisticas.js";

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
                    <i class="fa-regular fa-pen-to-square"></i>
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>
         </div>`

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
            // Variavel para guardar os dados
            const data = carregarDados();
            // Seleciona o campo novamente
            let campoStatus = card.querySelector('.card-status');
            // Faz a troca do status e atualiza o status do subobjetivo
            let subobj = '';

            switch (checkbox.checked) {
                case true:
                    campoStatus.textContent = 'Concluído';
                    subobj = data.objetivos[objetivo.id].subobjetivos.find(s => s.id == cardIndex);
                    if (subobj) {
                        subobj.status = checkbox.checked ? 'concluido' : 'nao-concluido';
                    }
                    break;
                case false:
                    campoStatus.textContent = 'Não Concluído';
                    subobj = data.objetivos[objetivo.id].subobjetivos.find(s => s.id == cardIndex);
                    if (subobj) {
                        subobj.status = checkbox.checked ? 'concluido' : 'nao-concluido';
                    }
                    break;
                default:
                    console.log("Erro");
                    break;
            }
            // Atualiza a seção de estatísticas
            atualizarEstatisticas(data.objetivos[objetivo.id]);
            // Atualiza o storage
            localStorage.setItem('dados', JSON.stringify(data))
        })

        let btnEditar = card.querySelector('.fa-pen-to-square');
        let btnDeletar = card.querySelector('.fa-trash-can');
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
                arrayAtual.objetivos[objetivo.id].subobjetivos = arrayAtual.objetivos[objetivo.id].subobjetivos.filter(subobj => subobj.id != cardIndex);

                // Atualiza o localStorage
                localStorage.setItem('dados', JSON.stringify(arrayAtual));
                // Atualiza a seção de estatísticas
                atualizarEstatisticas(arrayAtual.objetivos[objetivo.id]);
            })
        })
    })
}
// Exporta a função
export default adicionarSubObjetivo;