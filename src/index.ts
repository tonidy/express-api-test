import express from 'express';
const PORT = 3000;
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Data Source, could be replaced with a real database
const todos = [
  {
    title: 'Todo 1',
    desc: 'This is my first Todo',
    completed: true
  },
  {
    title: 'Todo 2',
    desc: 'This is my second Todo',
    completed: true
  },
  {
    title: 'Todo 3',
    desc: 'This is my third Todo',
    completed: true
  },
  {
    title: 'Todo 4',
    desc: 'This is my fourth Todo',
    completed: true
  },
  {
    title: 'Todo 5',
    desc: 'This is my fifth Todo x',
    completed: true
  }
];
// Data source ends here

app.get('/', (req, res) => {
  console.log('just got request');
  res.status(200).json(todos);
});

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find((e, i) => i === req.params.id - 1);
  if (todo) {
    res.status(200).json(todo);
    return;
  }
  res.status(404).json({ msg: 'todo not found' });
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  if (todo.hasOwnProperty('title')) {
    if (!todo.hasOwnProperty('desc') || !todo.hasOwnProperty('completed')) {
      todo.desc = '';
      todo.completed = false;
    }

    todos.push(todo);
    res.status(201).json({ msg: 'succesfully created todo' });
  } else {
    res.status(400).json({ msg: 'empty request body' });
  }
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find((e, i) => i === req.params.id - 1);
  if (todo) {
    const { title, desc, completed } = req.body;
    todo.title = title;
    todo.desc = desc;
    todo.completed = completed;

    res.status(200).json({ msg: 'sucessfully updated todo' });
    return;
  }

  res.status(404).json({ msg: 'todo not found' });
});

app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((todo) => (todo.id = req.params.id));

  if (todoIndex) {
    todos.splice(todoIndex, 1);

    res.status(200).json({ msg: 'successfully deleted tood' });
  }

  res.status(404).json({ msg: 'todo not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
