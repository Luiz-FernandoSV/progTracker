// Importa os objetivos de exemplo
import adicionarObjeto from './functions/addObj.js';
import carregarDados from './exemplos.js';

// Variavel para guardar os dados
const data = carregarDados()

// EventListener para carregar os objetivos assim que a tela carregar
window.addEventListener('load', function () {
    // Array para guardar a porcentagem de conclusão de cada objetivo
    const arrayConclusao = []

    // Loop para calcular a conclusão dos subobjetivos
    data.objetivos.forEach(objetivo => {
        // Contador de subobjetivos concluídos
        let contadorConcluido = 0;
        
        // Verifica se há subobjetivos
        if (objetivo.subobjetivos == null) {
            // Caso não haja marca o progresso como zerado
            arrayConclusao.push(0)
        }
        else {
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
        }
    });

    // Para cada objetivo cadastrado, cria um card no container
    data.objetivos.forEach(objetivo => {
        // Função externa para criar os cards
        adicionarObjeto(objetivo, arrayConclusao[objetivo.id]);
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

// Seleciona os botões de abrir e fechar modal
const btn_adicionar = document.querySelector('.btn-adicionar');
const btn_fechar = document.querySelector('.fechar-modal');
// Adiciona os eventos
btn_adicionar.addEventListener('click', abrirModal);
btn_fechar.addEventListener('click', fecharModal);


// Funções pra abrir e fechar
function abrirModal() {
    document.querySelector('.container-modal').style.display = 'flex';
}
function fecharModal() {
    document.querySelector('.container-modal').style.display = 'none';
}

// Seleciona o botão de enviar
const btn_enviar = document.querySelector('#btn-enviar');
// Adiciona um eventListener
btn_enviar.addEventListener('click', function (event) {
    // Ao enviar fecha o modal
    fecharModal()
    // Previne o recarregamento da página
    event.preventDefault()
    // Obtém os campos do form
    let objTitulo = document.querySelector('input[id="titulo-obj"]');
    let objDescricao = document.querySelector('textarea[id="descricao-obj"]');

    // Verifica se os campos estão vazios; caso estejam, retorna ao form
    if (objTitulo.value == '' || objDescricao.value == '') {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // ID do novo objetivo, obtém o último índice no array, e incrementa ele
    let novoId = (data.objetivos.length - 1) + 1
    console.log(novoId)

    // Cria um novo objeto
    let novoObjetivo = {
        id: novoId,
        titulo: objTitulo.value,
        descricao: objDescricao.value,
        status: 'nao-concluido'
    }
    // Limpa os campos
    objTitulo.value = '';
    objDescricao.value = '';

    // Busca os dados atuais do storage
    let arrayAtual = JSON.parse(localStorage.getItem('dados')) || [];
    // Atualiza o array
    arrayAtual.objetivos.push(novoObjetivo);
    // Atualiza o localstorage
    localStorage.setItem('dados', JSON.stringify(arrayAtual))


    // Chama a função para adicionar na tela
    adicionarObjeto(novoObjetivo,0);
})

// Seleciona o modal
const modal = document.querySelector('.container-modal');

// Adiciona um eventListener; se o usuário clicar fora do modal, ele será fechado
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
})
