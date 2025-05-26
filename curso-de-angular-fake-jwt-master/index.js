const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const VALID_USER = {
  email: 'theohenrique@asimovjr.com.br',
  password: '12345',
  nome: 'Theo Henrique',
  role: ['sysAdmin'],
};

// Rota de autenticação
app.post('/sign', (req, res) => {
  const { email, password } = req.body;

  if (email === VALID_USER.email && password === VALID_USER.password) {
    const payload = {
      nome: VALID_USER.nome,
      email: VALID_USER.email,
      role: VALID_USER.role,
    };

    const token = jwt.sign({ data: payload }, 'SECRET', {
      expiresIn: 100000, // segundos
    });

    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Usuário ou senha incorreta' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
