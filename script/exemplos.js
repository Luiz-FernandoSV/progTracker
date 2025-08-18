function carregarDados() {
  const dadosExemplo = {
    "objetivos": [
      {
        "id": 0,
        "titulo": "Aprender JavaScript Avançado",
        "descricao": "Estudar conceitos avançados de JavaScript, como closures, promises e programação assíncrona.",
        "status": "nao-concluido",
        "subobjetivos": [
          {
            "id": 0,
            "titulo": "Revisar fundamentos",
            "descricao": "Revisar tipos de dados, funções, escopos e manipulação de arrays.",
            "status": "nao-concluido"
          },
          {
            "id": 1,
            "titulo": "Estudar async/await",
            "descricao": "Aprender a lidar com código assíncrono utilizando async/await.",
            "status": "nao-concluido"
          }
        ]
      },
      {
        "id": 1,
        "titulo": "Melhorar Condicionamento Físico",
        "descricao": "Criar uma rotina de treinos semanais para melhorar resistência e força.",
        "status": "nao-concluido",
        "subobjetivos": [
          {
            "id": 0,
            "titulo": "Correr 5 km",
            "descricao": "Atingir a meta de corrida contínua de 5 km em menos de 30 minutos.",
            "status": "nao-concluido"
          },
          {
            "id": 1,
            "titulo": "Treinar força 3x por semana",
            "descricao": "Incluir exercícios de peso corporal e musculação na rotina.",
            "status": "nao-concluido"
          }
        ]
      },
      {
        "id": 2,
        "titulo": "Ler 12 livros no ano",
        "descricao": "Desenvolver o hábito de leitura e ampliar o conhecimento.",
        "status": "nao-concluido",
        "subobjetivos": [
          {
            "id": 0,
            "titulo": "Ler 1 livro por mês",
            "descricao": "Definir uma meta de leitura mensal para cumprir o objetivo anual.",
            "status": "nao-concluido"
          },
          {
            "id": 1,
            "titulo": "Fazer anotações",
            "descricao": "Resumir cada capítulo lido para fixar o aprendizado.",
            "status": "nao-concluido"
          }
        ]
      },
      {
        "id": 3,
        "titulo": "Aprender Banco de Dados",
        "descricao": "Estudar conceitos de banco de dados relacionais e NoSQL, focando em SQL e MongoDB.",
        "status": "nao-concluido",
        "subobjetivos": [
          {
            "id": 0,
            "titulo": "Praticar consultas SQL",
            "descricao": "Aprender SELECT, JOIN, GROUP BY e subqueries.",
            "status": "nao-concluido"
          },
          {
            "id": 1,
            "titulo": "Modelagem de dados",
            "descricao": "Entender como criar diagramas ER e normalizar tabelas.",
            "status": "nao-concluido"
          }
        ]
      }
    ]
  };

  // Função para lidar com a inicialização do localstorage
  // Só traz os dados de exemplo na primeira inicialização
  function inicializar() {
    // Flag para controle do localstorage
    let jaInicializou = localStorage.getItem('flagInicializacao');

    // Caso seja a primeira inicialização
    if(!jaInicializou){
      // Guarda os dados de exemplo no localstorage
      localStorage.setItem('dados',JSON.stringify(dadosExemplo));
      // Marca que já iniciou uma vez
      localStorage.setItem('flagInicializacao','true');
    }
    // Retorna os dados
    return JSON.parse(localStorage.getItem('dados'));
  }
  
  // Retorna o conteúdo da função
  return inicializar();
}

export default carregarDados;