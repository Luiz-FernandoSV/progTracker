import carregarDados from "./exemplos.js";
import adicionarSubObjetivo from "./functions/addSubObj.js";
import calcularConclusao from "./functions/calcConclusao.js";

// Variavel para guardar os dados
const data = carregarDados();
// Busca por parâmetros na url
const params = new URLSearchParams(window.location.search);
// Busca pelo ID transferido
const idObjetivo = params.get('id');
// Procura um objetivo com aquele ID
const objetivo = data.objetivos.find(obj => obj.id == idObjetivo);

window.addEventListener('load', function () {

    // Seleciona o container dos detalhes
    const containerDetalhes = document.querySelector('.container-detalhes');

    // Seleciona a barra
    const barraProgresso = document.querySelector('.barra');

    // Altera as informações dinamicamente
    let titulo = containerDetalhes.querySelector('.titulo');
    titulo.textContent = objetivo.titulo;

    let desc = containerDetalhes.querySelector('.desc');
    desc.textContent = objetivo.descricao;

    // Função que calcula e retorna informações sobre a conclusão do objetivo
    let conclusao = calcularConclusao(objetivo)
    // Verifica se há subobjetivos
    // Só executa o script caso existam subobjetivos cadastrados
    if (objetivo.subobjetivos) {
        // Cria um card para cada subobjetivo cadastrado
        objetivo.subobjetivos.forEach(subObj => {

            adicionarSubObjetivo(objetivo, subObj)
            // Função para calcular e retornar informações sobre a conclusão
            let conclusao = calcularConclusao(objetivo)

            // Seleciona o campo de status
            let status = containerDetalhes.querySelector('.status');

            // Altera o status do objetivo
            if (conclusao.porcentagem == 100) {
                status.textContent = 'Concluído'
            } else {
                status.textContent = 'Não Concluído'
            }

            // Altera os dados da seção de estatísticas
            // Verifica se a quantidade de subobjetivos concluídos são diferentes de 0, se não forem o valor é 0
            document.querySelector('.card-totais p').textContent = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : '0';
            document.querySelector('.card-conclusao p').textContent = conclusao.qtdConcluidos !== 0 ? conclusao.qtdConcluidos : '0';
            document.querySelector('.card-restantes p').textContent = objetivo.subobjetivos?.length && conclusao.qtdConcluidos !== 0 ? objetivo.subobjetivos.length - conclusao.qtdConcluidos : '0';
        })

    }
    // Preenche dinamicamente a barra
    barraProgresso.style.width = conclusao.porcentagem + '%';
});

// Funções pra abrir e fechar
function abrirModal() {
    document.querySelector('.container-modal').style.display = 'flex';
}
function fecharModal() {
    document.querySelector('.container-modal').style.display = 'none';
}

// Seleciona os botões
const btnAdicionar = document.querySelector('.btn-adicionar-subobj');
const btnFechar = document.querySelector('.fechar-modal');

// Seleciona o modal
const modal = document.querySelector('.container-modal');
const modalExclusao = document.querySelector('#modal-exclusao');

// Abre e fecha o modal
btnAdicionar.addEventListener('click', abrirModal);
btnFechar.addEventListener('click', function (event) {
    event.preventDefault();
    fecharModal();
    // limpa o modal caso seja fechado
    modal.querySelector('input[id="titulo-subobj"]').value = '';
    modal.querySelector('textarea[id="descricao-subobj"]').value = '';
});

const btnEnviar = document.querySelector('#btn-enviar');
btnEnviar.addEventListener('click', function (event) {
    // Previne o recarregamento da página
    event.preventDefault();
    // Fecha o modal
    fecharModal()
    // Verifica o modo do form, se é uma adição ou edição
    // Variavel de controle
    var modoForm = document.querySelector('form').dataset.mode;

    console.log(document.querySelector('input[id="titulo-subobj"]'))
    if (modoForm == 'adicionar') {
        // Seleciona os valores dos campos do form
        let tituloSub = document.querySelector('input[id="titulo-subobj"]');
        let descricaoSub = document.querySelector('textarea[id="descricao-subobj"]');

        // Verifica se os campos estão vazios; caso estejam, retorna ao form
        if (tituloSub.value == '' || descricaoSub.value == '') {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        // Cria um novo ID a partir do último índice de subobjetivos
        // Caso não exista nenhum será 0
        let novoID = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : 0;

        // Cria um novo objeto
        let novoSubObj = {
            id: novoID,
            titulo: tituloSub.value,
            descricao: descricaoSub.value,
            status: 'nao-concluido'
        }

        // Adiciona o novo subobjetivo
        objetivo.subobjetivos.push(novoSubObj)
        // Atualiza o localstorage
        localStorage.setItem('dados', JSON.stringify(data));

        // Calcula novamente as estatísticas
        const concluidos = objetivo.subobjetivos.filter(sub => sub.status === 'concluido').length

        // Altera os dados da seção de estatísticas
        document.querySelector('.card-totais p').textContent = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : '0';
        document.querySelector('.card-conclusao p').textContent = concluidos
        document.querySelector('.card-restantes p').textContent = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length - concluidos : '0';
        // Limpa os campos
        tituloSub.value = '';
        descricaoSub.value = '';

        // Adiciona o card na tela
        adicionarSubObjetivo(objetivo, novoSubObj);
    } else if (modoForm == 'editar') {
        let cardIndex = document.querySelector('form').dataset.index;
        console.log(cardIndex)
        // Seleciona o card com aquele índice
        let cardEditado = document.querySelector(`.card-subobj[data-index="${cardIndex}"]`);
        // Obtém os novos valores
        let novoTitulo = modal.querySelector('input[id="titulo-subobj"]').value;
        let novaDescricao = modal.querySelector('textarea[id="descricao-subobj"]').value;

        // Altera o HTML
        cardEditado.querySelector('.card-titulo').textContent = novoTitulo;
        cardEditado.querySelector('.card-desc').textContent = novaDescricao;

        // Obtém o array atual
        let arrayAtual = JSON.parse(localStorage.getItem('dados')) || [];
        // Obtém o objeto em questão
        let subObjetivoAtual = arrayAtual.objetivos[idObjetivo].subobjetivos[cardIndex];
        // Atualiza os valores
        subObjetivoAtual.titulo = novoTitulo
        subObjetivoAtual.descricao = novaDescricao

        // Atualiza o localstorage
        localStorage.setItem('dados', JSON.stringify(arrayAtual))
        // limpa os campos do modal
        modal.querySelector('input[id="titulo-subobj"]').value = '';
        modal.querySelector('textarea[id="descricao-subobj"]').value = '';
        // Reseta o modo do form e o índice
        document.querySelector('form').dataset.mode = 'adicionar';
        document.querySelector('form').dataset.index = '';
    }
})

// Adiciona um eventListener; se o usuário clicar fora do modal, ele será fechado
window.addEventListener('click', function (event) {
    if (event.target === modal || event.target === modalExclusao
    ) {
        modal.style.display = 'none';
        modalExclusao.style.display = 'none';
        // limpa o modal caso seja fechado
        modal.querySelector('input[id="titulo-subobj"]').value = '';
        modal.querySelector('textarea[id="descricao-subobj"]').value = '';
    }
})
