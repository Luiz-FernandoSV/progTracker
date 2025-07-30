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
            "status": "concluido"
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
            "status": "concluido"
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
        "status": "concluido",
        "subobjetivos": [
          {
            "id": 0,
            "titulo": "Praticar consultas SQL",
            "descricao": "Aprender SELECT, JOIN, GROUP BY e subqueries.",
            "status": "concluido"
          },
          {
            "id": 1,
            "titulo": "Modelagem de dados",
            "descricao": "Entender como criar diagramas ER e normalizar tabelas.",
            "status": "concluido"
          }
        ]
      }
    ]
  };

  // Verifica se ja há os objetivos de exemplo no localstorage, se houver retorna o que estiver armazenado
  // Caso contrário retorna os objetivos de exemplo
  if (localStorage.getItem('dados')) {
    return JSON.parse(localStorage.getItem('dados'));
  } else {
    localStorage.setItem('dados', JSON.stringify(dadosExemplo))
    return dadosExemplo;
  }

}

export default carregarDados;