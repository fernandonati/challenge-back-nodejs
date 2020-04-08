const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title,url,techs } = request.body  
  const repository = {id : uuid(),title,url,techs,likes: 0 };
  repositories.push(repository);
  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title,url,techs,likes } = request.body;  
  const idx = repositories.findIndex(repository => repository.id === id); //pequisa o index do repositorio.
  if (idx < 0) {
    return response.status(400).json({error:"Repositorio não encontrado"});    
  };

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  };
  
  repositories[idx] = repository;
  return response.status(200).json(repository);  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const idx = repositories.findIndex(repository => repository.id === id);
  console.log(idx);
  if (idx < 0 ) {
    return response.status(400).json({error:"Repositorio não encontrado"});
  }
  repositories.splice(idx,1);
  return response.status(204).send();    
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;  
  
  const idx = repositories.findIndex(repository => repository.id === id);
  if (idx < 0 ) {
    return response.status(400).json({error:"Repositorio não encontrado"});
  }  
  
  return response.status(200).json(repositories[idx].likes++); 
  
});

module.exports = app;
