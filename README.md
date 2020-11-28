# MyApi

#### Descrição:

- Pensamento inicial:

  - Nada de especial. Estou só estudando, por mim mesmo.Vendo se sai alguma coisa disso.

- Pensamentos durante:
  - Pensei em uma api nodejs, com banco postgres.
  - Comecei fazendo a funcionalidade de login e cadastro de usuário. Tentado organizar e nomear as pastas.
  - Até markdown, pra deixa esse texto arrumado, eu tô aprendendo como fazer.
  - Adicionei verificação e validação de token.
  - Adicionei a funcionalidade de deletar usuário do banco.
  - Adicionei configuração para debugar o código, no VSCode.

#### Observações:
Pra eu poder usar, esse código, de referência. Se precisar.

**Adicionar um .env com:**
- APP_SECRET= segredo do token.
- DB_HOST= host do db, aqui usei o localhost.
- DB_USER= usei postgres, então de padrão veio postgres.
- DB_NAME= nome do db que criar.
- DB_PASS= senha do db.

**src/api/database/database.sql:**
- Tem os comandos sql, como exemplo, pra criar um database que funcione com essa api.

**src/api/database.js**
- Tem a pool, que é a conexão com o database, dela que preciso para usar as queries.
- Precisa dos dados do arquivo .env.

**Rotas**
- Ver index.js.
- Ver src/api/routes/**.routes.js.
- src/api/routes/http, tem exemplos de como são as chamadas dessas rotas.

**Branch dev**
- O projeto tá diferente lá.
- Segui os passos de um vídeo, sobre tdd com jest para a parte de testes. Futuramente vou tentar implementar isso aqui. Fica lá de exemplo.
- Link do vídeo, que segui, no README de lá.