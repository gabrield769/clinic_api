# API de Clínica

## 📝 Descrição do Projeto

Este projeto consiste em uma API RESTful desenvolvida em Node.js com TypeScript, projetada para gerenciar as operações de uma clínica médica. A arquitetura da aplicação utiliza o framework Express para o roteamento, TypeORM como ORM para a comunicação com o banco de dados PostgreSQL, e Docker para a criação de um ambiente de banco de dados local, consistente e isolado.

## ✨ Funcionalidades

A API oferece os seguintes recursos principais:

- **Gestão de Pacientes:**
  - Cadastro de novos pacientes.
  - Listagem de todos os pacientes cadastrados.
- **Gestão de Médicos:**
  - Cadastro de novos médicos.
  - Listagem de todos os médicos cadastrados.
- **Gestão de Agendamentos:**
  - Criação de agendamentos, vinculando um paciente a um médico em uma data/hora específica.
  - Listagem de todos os agendamentos de um médico.
  - Listagem de todos os agendamentos de um paciente.

## ⚙️ Pré-requisitos

Para executar este projeto em seu ambiente de desenvolvimento, você precisará ter instalado:

- Node.js (versão LTS é recomendada)
- NPM ou Yarn
- Docker e Docker Compose
- Um cliente de API como Thunder Client (para VS Code) ou Postman.

---

## ▶️ Instruções para Execução Local

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

1. Clone o Repositório

git clone https://github.com/gabrield769/clinic_api.git

cd clinic-api

2. Instale as Dependências

npm install

3. Configure as Variáveis de Ambiente

Crie uma cópia de um possível arquivo .env.example ou crie um novo arquivo chamado .env na raiz do projeto. Preencha com suas credenciais. Para o ambiente Docker, os valores abaixo geralmente funcionam.

Exemplo de .env:

# Credenciais para o banco de dados Docker local
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=docker_password # Senha definida no docker-compose.yml
DB_DATABASE=clinic_api

# Porta do Servidor da API
PORT=3000

4. Inicie o Banco de Dados com Docker

Com o Docker em execução na sua máquina, utilize o Docker Compose para iniciar o contêiner do PostgreSQL.

docker-compose up -d

Este comando irá baixar a imagem do Postgres (se necessário) e iniciar o serviço em segundo plano (-d).

5. Execute a Aplicação

Com o banco de dados no ar, inicie o servidor da API em modo de desenvolvimento.

npm run dev

O servidor será iniciado em http://localhost:3000 e reiniciará automaticamente a cada alteração nos arquivos.

🚀 Como Testar a API Online 

1. A API está hospedada online e pode ser acessada através da seguinte URL base:
https://clinic-api-2.onrender.com

2. Utilize um Cliente de API
Para realizar testes que não sejam GET (como POST), você precisará de um cliente de API como Thunder Client, Postman ou Insomnia.

3. Fluxo de Teste Sugerido
Como o banco de dados de produção pode estar vazio no início, o fluxo ideal de teste é:

a) Verifique a Conexão e o Estado Inicial:

Faça uma requisição GET para um endpoint de listagem como /api/patients ou /api/doctors.
Resultado Esperado: Um status 200 OK e um array vazio []. Isso confirma que a conexão com o banco de dados está funcionando.

b) Crie Novos Dados:
Faça uma requisição POST para /api/patients com um corpo JSON para adicionar dados.

c) Confirme a Criação:
Execute novamente a requisição GET do passo (a) e verifique se os novos dados aparecem na lista.
Repita esse fluxo para os outros recursos. Para uma lista completa de todas as rotas, consulte a seção "Endpoints da API" abaixo.

📖 Endpoints da API
1.Pacientes:
POST /api/patients: Cria um novo paciente.
Corpo (Body): { "name": "string", "email": "string" }
GET /api/patients: Lista todos os pacientes.

2.Médicos:
POST /api/doctors: Cria um novo médico.
Corpo (Body): { "name": "string", "specialty": "string" }
GET /api/doctors: Lista todos os médicos.

3.Agendamentos:
POST /api/appointments: Cria um novo agendamento.
Corpo (Body): { "patientId": number, "doctorId": number, "appointmentDate": "Date" }
GET /api/appointments/doctor/:doctorId: Lista os agendamentos de um médico específico. É necessário informar o ID do médico.
GET /api/appointments/patient/:patientId: Lista os agendamentos de um paciente específico. É necessário informar o ID do paciente.
