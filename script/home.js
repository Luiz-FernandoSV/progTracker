// Importa os objetivos de exemplo
import adicionarObjeto from './functions/addObj.js';
import calcularConclusao from './functions/calcConclusao.js';
import carregarDados from './exemplos.js';

// Variavel para guardar os dados
const data = carregarDados()

// EventListener para carregar os objetivos assim que a tela carregar
window.addEventListener('load', function () {
    // Array para guardar a porcentagem de conclusão de cada objetivo
    const arrayConclusao = []

    // Loop para calcular a conclusão dos subobjetivos
    data.objetivos.forEach(objetivo => {
        // Verifica se há subobjetivos
        if (objetivo.subobjetivos == null) {
            // Caso não haja marca o progresso como zerado
            arrayConclusao.push(0)
        }
        else {
            // Função que calcula e retorna informações sobre a conclusão do objetivo
            let conclusao = calcularConclusao(objetivo);
            let porcentagem = conclusao.porcentagem
            // Salva ela no array e associa ao id do objetivo
            arrayConclusao.push({id: objetivo.id , porcentagem });
        }
    });

    // Para cada objetivo cadastrado, cria um card no container
    data.objetivos.forEach(objetivo => {
        // Procura pela porcentagem de conclusão do objetivo
        let conclusaoObj = arrayConclusao.find(conclusao => conclusao.id == objetivo.id);
        // Função externa para criar os cards
        adicionarObjeto(objetivo, conclusaoObj.porcentagem);
    });
})

// Seleciona os botões de abrir e fechar modal
const btn_adicionar = document.querySelector('.btn-adicionar');
const btn_fechar = document.querySelector('.fechar-modal');
const btn_fechar_exc = document.querySelector('.fechar-modal-exc')
// Adiciona os eventos
btn_adicionar.addEventListener('click', abrirModal);
btn_fechar.addEventListener('click', fecharModal);
btn_fechar_exc.addEventListener('click',fecharModal)


// Funções pra abrir e fechar
function abrirModal() {
    document.querySelector('.container-modal').style.display = 'flex';
}
function fecharModal() {
    document.querySelector('.container-modal').style.display = 'none';
    document.querySelector('#modal-exclusao').style.display = 'none';
}

// Seleciona o modal
const modal = document.querySelector('.container-modal');
const modalExclusao = document.querySelector('#modal-exclusao');

// Seleciona o botão de enviar
const btn_enviar = document.querySelector('#btn-enviar');
// Adiciona um eventListener
btn_enviar.addEventListener('click', function (event) {
    // Ao enviar fecha o modal
    fecharModal()
    // Previne o recarregamento da página
    event.preventDefault()

    // Variavel de controle
    var modoForm = document.querySelector('form').dataset.mode;

    if (modoForm == 'adicionar') {
        // Obtém os campos do form
        let objTitulo = document.querySelector('input[id="titulo-obj"]');
        let objDescricao = document.querySelector('textarea[id="descricao-obj"]');

        // Verifica se os campos estão vazios; caso estejam, retorna ao form
        if (objTitulo.value == '' || objDescricao.value == '') {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Busca os dados atuais do storage
        let arrayAtual = JSON.parse(localStorage.getItem('dados')) || [];
        // ID do novo objetivo, obtém o tamanho do array
        let novoID = arrayAtual.objetivos.length

        // Cria um novo objeto
        let novoObjetivo = {
            id: novoID,
            titulo: objTitulo.value,
            descricao: objDescricao.value,
            subobjetivos: [],
            status: 'nao-concluido'
        }
        // Limpa os campos
        objTitulo.value = '';
        objDescricao.value = '';

        // Atualiza o array
        arrayAtual.objetivos.push(novoObjetivo);
        // Atualiza o localstorage
        localStorage.setItem('dados', JSON.stringify(arrayAtual))

        // Chama a função para adicionar na tela
        adicionarObjeto(novoObjetivo, 0);
    } else if (modoForm == 'editar') {
        // Caso o form esteja em modo de edição
        // Seleciona o form e obtém o índice do card a ser alterado
        let form = document.querySelector('form');
        let cardIndex = form.dataset.index
        // Seleciona o card com aquele índice
        let cardEditado = document.querySelector(`.cartao-objetivo[data-index="${cardIndex}"]`);
        // Obtém os novos valores
        let novoTitulo = modal.querySelector('input[id="titulo-obj"]').value;
        let novaDescricao = modal.querySelector('textarea[id="descricao-obj"]').value;

        // Altera o HTML
        cardEditado.querySelector('.titulo-objetivo').textContent = novoTitulo;
        cardEditado.querySelector('.descricao-objetivo').textContent = novaDescricao;

        // Obtém o array atual
        let arrayAtual = JSON.parse(localStorage.getItem('dados')) || [];
        // Obtém o objeto em questão
        let objetivoAtual = arrayAtual.objetivos[cardIndex]
        // Atualiza os valores
        objetivoAtual.titulo = novoTitulo
        objetivoAtual.descricao = novaDescricao


        // Atualiza o localstorage
        localStorage.setItem('dados', JSON.stringify(arrayAtual))

        // Limpa os campos
        modal.querySelector('input[id="titulo-obj"]').value = '';
        modal.querySelector('textarea[id="descricao-obj"]').value = '';
        // Reseta o modo do form e o índice
        form.dataset.mode = 'adicionar';
        form.dataset.index = ''
    } else {
        alert("Erro!")
    }
})

// Adiciona um eventListener; se o usuário clicar fora do modal, ele será fechado
window.addEventListener('click', function (event) {
    if (event.target === modal || event.target === modalExclusao) {
        modal.style.display = 'none';
        modalExclusao.style.display = 'none';
    }
})