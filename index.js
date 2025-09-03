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
app.get("/pessoa/:id", (req,res) =>{
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(u => u.id === id);

    if(!pessoa) {
        return res.status(404).json({ error: "Usuário não encontrado"});
    }

    res.json(pessoa);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
