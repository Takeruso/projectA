const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
