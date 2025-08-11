function calcularConclusao(objetivo) {
    // Variavel para porcentagem de conclusão
    var porcentagem = 0;
    // Contador de subobjetivos concluídos
    let contadorConcluido = 0;

    // Verifica se existem subobjetivos
    if (objetivo.subobjetivos.length > 0) {
        // Conta o número de subobjetivos concluídos
        objetivo.subobjetivos.forEach(subObj => {
            if (subObj.status == 'concluido') {
                contadorConcluido++
            }
        });

        // Obtém a porcentagem de conclusão
        porcentagem = (contadorConcluido / objetivo.subobjetivos.length) * 100
    }

    // Cria um objeto com informações sobre a conclusão
    let infoConclusao = {
        qtdConcluidos: contadorConcluido,
        porcentagem: porcentagem
    }
    // Retorna o objeto
    return infoConclusao;
}

export default calcularConclusao;