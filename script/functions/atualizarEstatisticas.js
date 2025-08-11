import calcularConclusao from "./calcConclusao.js";

function atualizarEstatisticas(objetivo) {
    // Seleciona a barra de progresso
    let barraProgresso = document.querySelector('.barra');

    // Verifica se existem subobjetivos
    if (objetivo.subobjetivos) {
        // Função para calcular a conclusão
        let conclusao = calcularConclusao(objetivo);
        // Obtém o array atual
        let arrayAtual = JSON.parse(localStorage.getItem('dados'));

        // Seleciona o campo de status
        let status = document.querySelector('.status');

        // Altera o status do objetivo
        if (conclusao.porcentagem == 100) {
            status.textContent = 'Concluído'
        } else {
            status.textContent = 'Não Concluído'
        }

        // Altera a seção de estatísticas
        document.querySelector('.card-totais p').textContent = arrayAtual.objetivos[objetivo.id].subobjetivos?.length ? arrayAtual.objetivos[objetivo.id].subobjetivos.length : '0';
        document.querySelector('.card-conclusao p').textContent = conclusao.qtdConcluidos !== 0 ? conclusao.qtdConcluidos : '0';
        document.querySelector('.card-restantes p').textContent = arrayAtual.objetivos[objetivo.id].subobjetivos?.length ? arrayAtual.objetivos[objetivo.id].subobjetivos.length - conclusao.qtdConcluidos : '0';

        // Preenche dinamicamente a barra
        barraProgresso.style.width = conclusao.porcentagem + '%';
    } else {
        // Caso não existam objetivos a barra zera
        barraProgresso.style.width = '0%'
    }
}

export default atualizarEstatisticas;