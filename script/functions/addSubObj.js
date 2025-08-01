function adicionarSubObjetivo(subobj) {
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
     <div class="card-subobj data-index="${subobj.id}">
             <input type="checkbox" class="checkbox-status">
             <div class="card-detalhes">
                 <h4 class="card-titulo">${subobj.titulo}</h4>
                 <p class="card-desc">${subobj.descricao}</p>
                 <p class="card-status">${statusSub}</p>
             </div>
         </div>`
}
// Exporta a função
export default adicionarSubObjetivo;