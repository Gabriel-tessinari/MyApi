# MyApi

#### Descrição:

- Pensamento inicial:

  - Nada de especial. Estou só estudando, por mim mesmo.Vendo se sai alguma coisa disso.

#### Observações:
Pra eu poder usar, esse código, de referência. Se precisar.

**Adicionar um .env com:**
- APP_SECRET= segredo do token.
- DB_HOST= host do db, aqui usei o localhost.
- DB_USER= usei postgres, então de padrão veio postgres.
- DB_NAME= nome do db que criar.
- DB_PASS= senha do db.

**src/api/user/database/database.sql:**
- Tem os comandos sql, como exemplo, pra criar um database que funcione com essa api.

**src/config/database.js**
- Tem a pool, que é a conexão com o database, dela que preciso para usar as queries.
- Precisa dos dados do arquivo .env.

**Rotas**
- Ver index.js.
- Ver src/routes/**.routes.js.
- src/routes/http/**.http, tem exemplos de como são as chamadas dessas rotas.