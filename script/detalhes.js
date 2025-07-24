import { mockdata } from "./mock.js"

window.addEventListener('load', function () {
    // Busca por parâmetros na url
    const params = new URLSearchParams(window.location.search);
    // Busca pelo ID transferido
    let idObjetivo = params.get('id');
    // Procura um objetivo com aquele ID
    let objetivo = mockdata.objetivos[idObjetivo];

    // Seleciona o container dos detalhes
    const containerDetalhes = document.querySelector('.container-detalhes');

    // Altera as informações dinamicamente
    let titulo = containerDetalhes.querySelector('.titulo');
    titulo.textContent = objetivo.titulo;

    let desc = containerDetalhes.querySelector('.desc');
    desc.textContent = objetivo.descricao;

    // Conta o número de subobjetivos concluídos
    let contadorConcluido = 0;
    objetivo.subobjetivos.forEach(subObj => {
        if (subObj.status == 'concluido') {
            contadorConcluido++
        }
    });
    // Obtém a porcentagem de conclusão
    let porcentagem = (contadorConcluido / objetivo.subobjetivos.length) * 100

    // Seleciona a barra
    const barraProgresso = document.querySelector('.barra');
    // Preenche dinamicamente a barra
    barraProgresso.style.width = porcentagem + '%'

    // Seleciona o campo de status
    let status = containerDetalhes.querySelector('.status');
    
    // Formata o status original
    let statusFormatado = ''
    switch (objetivo.status) {
        case 'concluido':
            statusFormatado = 'Concluído'
            break;
        case 'nao-concluido':
            statusFormatado = 'Não Concluído'
            break;
        default:
            console.log('Status não reconhecido.')
            break;
    }
    // Coloca o status formatado
    status.textContent = statusFormatado;

    const containerSubObj = document.querySelector('.container-subobjetivos');

    // Cria um card para cada subobjetivo cadastrado
    objetivo.subobjetivos.forEach(subObj => {
        // Formata o status
        let statusSub = ''
        switch (subObj.status) {
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
        <div class="card-subobj">
                <input type="checkbox">
                <div class="card-detalhes">
                    <h4 class="card-titulo">${subObj.titulo}</h4>
                    <p class="card-desc">${subObj.descricao}</p>
                    <p class="card-status">${statusSub}</p>
                </div>
            </div>`
    });
})