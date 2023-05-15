const express = require('express');
const app = express();
const todoRoutes = require('./todoList');

app.use(express.json());

app.use('/todos', todoRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
