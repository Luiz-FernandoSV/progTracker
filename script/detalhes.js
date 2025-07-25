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
    
    // Altera o status do objetivo
    if(contadorConcluido == objetivo.subobjetivos.length){
        status.textContent = 'Concluído'
    }else{
        status.textContent = 'Não Concluído'
    }

    // Altera os dados da seção de estatísticas
    document.querySelector('.card-totais p').textContent = objetivo.subobjetivos.length
    document.querySelector('.card-conclusao p').textContent = contadorConcluido
    document.querySelector('.card-restantes p').textContent = objetivo.subobjetivos.length - contadorConcluido


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
        <div class="card-subobj data-index="${subObj.id}">
                <input type="checkbox" class="checkbox-status">
                <div class="card-detalhes">
                    <h4 class="card-titulo">${subObj.titulo}</h4>
                    <p class="card-desc">${subObj.descricao}</p>
                    <p class="card-status">${statusSub}</p>
                </div>
            </div>`

        // Seleciona os cards
        const cards = document.querySelectorAll('.card-subobj');
        
        // Para cada card faz a verificação do checkbox e status
        cards.forEach(card =>{
            let checkbox = card.querySelector('.checkbox-status');
            let status = card.querySelector('.card-status').textContent;
            // Troca o checkbox baseado no status
            switch(status){
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
            checkbox.addEventListener('click',function(){
                // Seleciona o campo novamente
                let campoStatus = card.querySelector('.card-status');
                // Faz a troca do status
                switch(checkbox.checked){
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
})