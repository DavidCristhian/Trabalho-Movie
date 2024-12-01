// Importa o módulo JSON Server
const jsonServer = require('json-server');

// Cria o servidor
const server = jsonServer.create();

// Define o roteador apontando para o arquivo db.json
const router = jsonServer.router('./db/db.json');

// Configura os middlewares padrão do JSON Server
const middlewares = jsonServer.defaults();

// Aplica os middlewares
server.use(middlewares);

// Aplica o roteador
server.use(router);

// Define a porta onde o servidor será executado
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server está rodando em http://localhost:${PORT}`);
});