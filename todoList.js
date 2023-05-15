const express = require('express');
const router = express.Router();

let todos = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Buy milk, eggs, and bread',
    completed: false
  },
  {
    id: 2,
    title: 'Go for a run',
    description: 'Run for 30 minutes in the park',
    completed: false
  },
  {
    id: 3,
    title: 'Finish homework',
    description: 'Complete math and science assignments',
    completed: true
  }
];

function validateTodoId(req, res, next) {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  next();
}

function validateTodoData(req, res, next) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  next();
}

router.get('/', (req, res) => {
  res.status(200).json(todos);
});

router.get('/:id', validateTodoId, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  res.status(200).json(todo);
});

router.delete('/:id', validateTodoId, (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

router.post('/', validateTodoData, (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put('/:id', validateTodoId, validateTodoData, (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const updatedTodo = todos.find(todo => todo.id === id);
  updatedTodo.title = title;
  updatedTodo.description = description;
  res.status(200).json(updatedTodo);
});

module.exports = router;
