const express = require('express');
const { monitorEventLoopDelay } = require('perf_hooks');
const app = express();

app.use(express.json());

let pessoas = [
    {nome:'leda', idade:13, cor:'rosa'},
    {nome:'valentina', idade:13, cor:'roxo'},
    {nome:'ana luiza', idade:13, cor:'rosa'},
    {nome:'filipe', idade:16, cor:'preto'},
    {nome:'agatha', idade:13, cor:'vermelho'},
]

app.get('/', (reg, res) =>{
     res.json({ mensagem: 'API de pessoas funcionando'});
});

app.get('/pessoas', (reg, res) =>{
    res.json(pessoas)
});

app.get('/pessoas2', (reg, res) =>{
    res.json(pessoas[3])
});

const PORT = 3000;
app.listen(PORT, () => {
     console.log(`Servidor rodando em http://localhost:${PORT}`);
});