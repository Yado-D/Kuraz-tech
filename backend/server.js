const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Learn REST API', completed: false },
  { id: 2, title: 'Build a server', completed: false }
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (mark as completed)
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  task.completed = req.body.completed;
  res.json(task);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Optional: Basic homepage
app.get('/', (req, res) => {
  res.send('<h1>Task API is running</h1><style>body { font-family: sans-serif; text-align: center; }</style>');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});