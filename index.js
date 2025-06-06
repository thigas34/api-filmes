import express from 'express';

const app = express();
app.use(express.json());

let filmes = [];
let proximoId = 1;

app.post('/filmes', (req, res) => {
  const { titulo, diretor, anoLancamento, genero } = req.body;
  if (!titulo || !diretor || !anoLancamento || !genero) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
  const filme = { id: proximoId++, titulo, diretor, anoLancamento, genero };
  filmes.push(filme);
  res.status(201).json(filme);
});

app.get('/filmes', (req, res) => {
  res.json(filmes);
});

app.get('/filmes/:id', (req, res) => {
  const id = Number(req.params.id);
  const filme = filmes.find(f => f.id === id);
  if (!filme) {
    return res.status(404).json({ mensagem: 'Filme não encontrado.' });
  }
  res.json(filme);
});

app.put('/filmes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { titulo, diretor, anoLancamento, genero } = req.body;
  const index = filmes.findIndex(f => f.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Filme não encontrado.' });
  }
  if (!titulo || !diretor || !anoLancamento || !genero) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
  filmes[index] = { id, titulo, diretor, anoLancamento, genero };
  res.json(filmes[index]);
});

app.delete('/filmes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = filmes.findIndex(f => f.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Filme não encontrado.' });
  }
  filmes.splice(index, 1);
  res.json({ mensagem: 'Filme removido com sucesso.' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
