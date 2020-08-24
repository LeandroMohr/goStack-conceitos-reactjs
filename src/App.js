import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    let payload = {
      title: `Repositorio ${Date.now()}`,
      url: `https://github.com/LeandroMohr/goStack-conceito-nodeJs`,
      techs: ["Node.js", "React.js", "React Native"]
    }

    const response = await api.post('repositories', payload)

    setRepositories([...respositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = respositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepositories);
  }

  return (
    <div>
      <button className="addRepo" onClick={handleAddRepository}>Adicionar repositório</button>
      
      <ul data-testid="repository-list">
        {respositories.map(repository => (
          <li key={repository.id}>
            {repository.title} <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
