const express = require("express");
const { get } = require("http");
const app = express();

app.use(express.json());

let pessoas = [
  { id: 1, nome: "leda", idade: 13, cor: "rosa" },
  { id: 2, nome: "valentina", idade: 13, cor: "roxo" },
  { id: 3, nome: "ana luiza", idade: 13, cor: "rosa" },
  { id: 4, nome: "filipe", idade: 16, cor: "preto" },
  { id: 5, nome: "agatha", idade: 13, cor: "vermelho" },
];

app.get("/", (reg, res) => {
  res.json({ mensagem: "API de pessoas funcionando" });
});

app.get("/pessoas", (reg, res) => {
  res.json(pessoas);
});

app.get("/pessoas2", (reg, res) => {
  res.json(pessoas[3]);
});

app.post("/pessoas", (req, res) => {
  const { nome, idade, cor } = req.body;
  const newUser = { id: pessoas.length + 1, nome, idade, cor };
  console.log(pessoas.length + 1);
  console.log("Novos dados: ", newUser);
  pessoas.push(newUser);
  res.status(201).json(newUser); // 201 = código de criação com sucesso
});

//rota: http://localhost:3000/pessoas/2
app.get("/pessoa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find((u) => u.id === id);

  if (!pessoa) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(pessoa);
});

app.put("/pessoa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find((u) => u.id === id);

  if (!pessoa) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  // const {id, nome, idade, cor } = req.body;
  const novaPessoa = req.body;
  console.log("pessoa antiga: ", pessoa);
  console.log("pessoa nova: ", { id: pessoa.id, ...novaPessoa });

  pessoas[pessoa.id - 1] = { ...novaPessoa, id: pessoa.id };

  console.log("pessoas: ", pessoas);
  res.json(pessoas);
});

app.delete("/deletePessoa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find((u) => u.id === id);

  if (!pessoa) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  pessoas.splice(pessoa.id - 1, 1);
  console.log(pessoas);
  res.json(pessoas);
});

app.get("/totalpessoas", (req, res) => {
  console.log("requisição:", req);
  console.log("\nresponse:", res);
  res.json(pessoas.length);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let doces = [
  { id: 1, nome: "brigadeiro", peso: "14g", formato: "bola", validade: 2026 },
  {
    id: 2,
    nome: "bolo de morango",
    peso: "500g",
    formato: "retangular",
    validade: 2026,
  },
  { id: 3, nome: "cookie", peso: "70g", formato: "redondo", validade: 2026 },
  {
    id: 4,
    nome: "gelatina",
    peso: "300g",
    formato: "retangular",
    validade: 2026,
  },
  {
    id: 5,
    nome: "croissant",
    peso: "100g",
    formato: "meia lua",
    validade: 2026,
  },
];

app.get("/doces", (req, res) => {
  if(doces.length === 0){
    return res.status(404).json({status:404, error: "NOT_FOUND", message: 'informações não encontradas'});
  }
  res.json(doces);
});

app.get("/doces/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const doce = doces.find((u) => u.id === id);

  if (!doce) {
    return res.status(404).json({ status:404, error: "NOT_FOUND", message: 'informações não encontradas'});
  }

  res.json(doce);
});

app.put("/doces/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const doce = doces.find((u) => u.id === id);

  if (!doce) {
    return res.status(404).json({ status:404, error: "NOT_FOUND", message: 'informações não encontradas' });
  }

  const novoDoce = req.body;
  console.log("Doce antigo: ", doce);
  console.log("Doce novo: ", { id: doce.id, ...novoDoce });

  doce.nome=novoDoce.nome || doce.nome
  doce.peso=novoDoce.peso || doce.peso
  doce.formato=novoDoce.formato || doce.formato
  doce.validade=novoDoce.validade || doce.validade

  doces[doce.id - 1] = { ...doce, id: doce.id };

  console.log("doces: ", doces);
  res.json(doces);
});

app.post("/doces", (req, res) => {
  const { nome, peso, formato, validade } = req.body;
  const novoDoce = { id: doces.length + 1, nome, peso, formato, validade };
  console.log(doces.length + 1);
  console.log("Novos dados: ", novoDoce);
  pessoas.push(novoDoce);
  res.status(201).json(novoDoce); // 201 = código de criação com sucesso
});

app.delete("/doces/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const doce = doces.find((u) => u.id === id);

  if (!doce) {
    return res.status(404).json({ status:404, error: "NOT_FOUND", message: 'informações não encontradas' });
  }

  doces.splice(doce.id - 1, 1);
  console.log(doces);
  res.json(doces);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
