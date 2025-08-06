function adicionarObjeto(objetivo, conclusao) {
    // Seleciona o container com os objetivos
    let containerObjetivos = document.querySelector('.container-objetivos');
    // Adiciona um novo cartão ao container
    containerObjetivos.innerHTML += `
        <div class="cartao-objetivo" data-index="${objetivo.id}">
                <div class="top-bar">
                    <h4 class="titulo-objetivo">${objetivo.titulo}</h4>
                    <div class="div-acoes">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
                <p class="descricao-objetivo">${objetivo.descricao}</p>
                <p class="sub-objetivos">Sub-Objetivos Cadastrados: ${objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : '0'}</p>
                <p class="conclusao-objetivo">Progresso: </p>
                <div class="barra-progresso">
                    <div class="barra" data-index="${objetivo.id}"></div>
                </div>
            </div>`

    // Seleciona a barra do card baseado no ID
    const barraProgresso = containerObjetivos.querySelector(`.barra[data-index="${objetivo.id}"]`)
    // Altera dinamicamente o preenchimento da barra de progresso
    barraProgresso.style.width = conclusao + '%'

    // Seleciona os cards
    let cardObjetivos = document.querySelectorAll('.cartao-objetivo')

    // Para cada card adiciona um eventListener
    cardObjetivos.forEach(card => {
        card.addEventListener('click', () => {
            // Ao clicar será feito um redirecionamento para a página de detalhes
            // Leva o ID do objetivo como parâmetro na URL
            window.location.href = `./detalhes.html?id=${card.getAttribute('data-index')}`
        })
        // Seleciona o icone de edição do card
        let iconeEditar = card.querySelector('.fa-pen-to-square');
        // EventListener de clique
        iconeEditar.addEventListener('click', function (event) {
            event.stopPropagation(); // Evita o redirecionamento
            // Seleciona o modal e o form
            let modal = document.querySelector('.container-modal');
            let form = document.querySelector('form');
            // Obtém os valores anteriores
            let tituloAtual = card.querySelector('.titulo-objetivo').textContent;
            let descricaoAtual = card.querySelector('.descricao-objetivo').textContent;
            // Coloca os valores anteriores
            modal.querySelector('input[id="titulo-obj"]').value = tituloAtual;
            modal.querySelector('textarea[id="descricao-obj"]').value = descricaoAtual;

            // Altera o modo para edição e adiciona o índice a ser alterado no data-index
            form.dataset.mode = 'editar';
            form.dataset.index = card.dataset['index'];
            // Exibe o form modal
            modal.style.display = 'flex';
        })
        // Seleciona o botão de apagar
        let iconeDeletar = card.querySelector('.fa-trash');
        iconeDeletar.addEventListener('click', function (event) {
            event.stopPropagation(); // Evita o redirecionamento
            // Obtém o id do objetivo
            let idObjetivo = card.dataset.index
            // Seleciona o modal de confirmação
            let modalExclusao = document.querySelector('#modal-exclusao');
            // Deixa ele visível na tela
            modalExclusao.style.display = 'flex'
            // Seleciona o card onde o botão foi clicado
            let cardSelecionado = containerObjetivos.querySelector(`.cartao-objetivo[data-index="${card.dataset['index']}"]`);
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
                // Remove o objetivo do array
                arrayAtual.objetivos = arrayAtual.objetivos.filter(obj => obj.id != idObjetivo);
                // Atualiza o localStorage
                localStorage.setItem('dados', JSON.stringify(arrayAtual));

            })
        })
    })
}

// Exporta a função
export default adicionarObjeto;