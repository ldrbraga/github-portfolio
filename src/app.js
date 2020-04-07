const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repository = repositories.find(
    (repository) => repository.id === id
  );
  
  if (!repository) { 
    return response.status(400).json({ error: "Repository not found" });
  }

  repository.likes += 1; 

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repoIndex = repositories.findIndex(item => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs, 
    likes: 0
  }

  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(item => item.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).json();
});

module.exports = app;