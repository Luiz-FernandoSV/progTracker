import carregarDados from "./exemplos.js";
import adicionarSubObjetivo from "./functions/addSubObj.js";

// Variavel para guardar os dados
const data = carregarDados();
// Busca por parâmetros na url
const params = new URLSearchParams(window.location.search);
// Busca pelo ID transferido
const idObjetivo = params.get('id');
// Procura um objetivo com aquele ID
const objetivo = data.objetivos[idObjetivo];

window.addEventListener('load', function () {

    // Seleciona o container dos detalhes
    const containerDetalhes = document.querySelector('.container-detalhes');

    // Altera as informações dinamicamente
    let titulo = containerDetalhes.querySelector('.titulo');
    titulo.textContent = objetivo.titulo;

    let desc = containerDetalhes.querySelector('.desc');
    desc.textContent = objetivo.descricao;

    // Variavel para porcentagem de conclusão
    var porcentagem = 0;
    // Contador de subobjetivos concluídos
    let contadorConcluido = 0;

    // Verifica se há subobjetivos
    // Só executa o script caso existam subobjetivos cadastrados
    if (objetivo.subobjetivos) {
        // Conta o número de subobjetivos concluídos
        objetivo.subobjetivos.forEach(subObj => {
            if (subObj.status == 'concluido') {
                contadorConcluido++
            }
        });

        // Obtém a porcentagem de conclusão
        porcentagem = (contadorConcluido / objetivo.subobjetivos.length) * 100

        // Seleciona o campo de status
        let status = containerDetalhes.querySelector('.status');

        // Altera o status do objetivo
        if (contadorConcluido == objetivo.subobjetivos.length) {
            status.textContent = 'Concluído'
        } else {
            status.textContent = 'Não Concluído'
        }

        // Cria um card para cada subobjetivo cadastrado
        objetivo.subobjetivos.forEach(subObj => {

            adicionarSubObjetivo(subObj)

            // Seleciona os cards
            const cards = document.querySelectorAll('.card-subobj');

            // Para cada card faz a verificação do checkbox e status
            cards.forEach(card => {
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
                    // Faz a troca do status
                    switch (checkbox.checked) {
                        case true:
                            campoStatus.textContent = 'Concluído'
                            break;
                        case false:
                            campoStatus.textContent = 'Não Concluído'
                            break;
                        default:
                            console.log("Erro");
                            break;
                    }
                })

            })
        });
        // Seleciona a barra
        const barraProgresso = document.querySelector('.barra');
        // Preenche dinamicamente a barra
        barraProgresso.style.width = porcentagem + '%'
    }
    // Altera os dados da seção de estatísticas
    // Verifica se contadorConcluído e subojetivos existem, caso contrário serão 0
    document.querySelector('.card-totais p').textContent = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : '0';
    document.querySelector('.card-conclusao p').textContent = typeof contadorConcluido !== 'undefined' ? contadorConcluido : '0';
    document.querySelector('.card-restantes p').textContent = objetivo.subobjetivos?.length && typeof contadorConcluido !== 'undefined' ? objetivo.subobjetivos.length - contadorConcluido : '0';
})

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

// Abre e fecha o modal
btnAdicionar.addEventListener('click', abrirModal);
btnFechar.addEventListener('click', function (event) {
    event.preventDefault();
    fecharModal();
});

const btnEnviar = document.querySelector('#btn-enviar');
btnEnviar.addEventListener('click', function (event) {
    // Previne o recarregamento da página
    event.preventDefault();
    // Fecha o modal
    fecharModal()

    // Seleciona os valores dos campos do form
    let tituloSub = document.querySelector('input[name="titulo"]').value
    let descricaoSub = document.querySelector('textarea[name="descricao"]').value

    // Cria um novo ID a partir do último índice de subobjetivos
    // Caso não exista nenhum será 0
    let novoID = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : 0;

    // Cria um novo objeto
    let novoSubObj = {
        id: novoID,
        titulo: tituloSub,
        descricao: descricaoSub,
        status: 'nao-concluido'
    }
    
    // Adiciona o novo subobjetivo
    objetivo.subobjetivos.push(novoSubObj)
    // Atualiza o localstorage
    localStorage.setItem('dados',JSON.stringify(data));

    // Altera os dados da seção de estatísticas
    document.querySelector('.card-totais p').textContent = objetivo.subobjetivos?.length ? objetivo.subobjetivos.length : '0';
    document.querySelector('.card-conclusao p').textContent = typeof contadorConcluido !== 'undefined' ? contadorConcluido : '0';
    document.querySelector('.card-restantes p').textContent = objetivo.subobjetivos?.length && typeof contadorConcluido !== 'undefined' ? objetivo.subobjetivos.length - contadorConcluido : '0';

    // Adiciona o card na tela
    adicionarSubObjetivo(novoSubObj)
    
})

// Seleciona o modal
const modal = document.querySelector('.container-modal');

// Adiciona um eventListener; se o usuário clicar fora do modal, ele será fechado
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
})
