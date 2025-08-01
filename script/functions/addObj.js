function adicionarObjeto(objetivo, conclusao) {
    // Seleciona o container com os objetivos
    let containerObjetivos = document.querySelector('.container-objetivos');
    // Adiciona um novo cartão ao container
    containerObjetivos.innerHTML += `
        <div class="cartao-objetivo" data-index="${objetivo.id}">
                <h4 class="titulo-objetivo">${objetivo.titulo}</h4>
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
    })
}
// Exporta a função
export default adicionarObjeto;