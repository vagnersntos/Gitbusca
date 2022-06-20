import React, { useState } from "react"
import './App.css';
import service from './services/services';
import {
  Button,
  InputGroup,
  Input,
  Table
} from 'reactstrap';

function App() {

  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [button, setButton] = useState("success");
  const [stylleInput, setStylleInput] = useState(false);

  const getUsers = () => {
    if (name || name !== '') {
      service.get(`/users/${name}`)
        .then((response) =>
          setUser(response.data),
          setButton("success"),
          setStylleInput(false)
        )
        .catch((err) => {
          console.log("Ocorreu um Erro!" + err)
          if (err) apllyDanger();
        })
    }
  }

  const handleChange = (item) => {
    setName(item);
  };

  const apllyDanger = () => {
    setUser('')
    setStylleInput(true)
    setButton("danger")
    return
  };

  const handlereset = () => {
    document.querySelectorAll("input.form-control").forEach(input => (input.value = ''))
  }

  return (
    <div className="App">
      <header className="App-header">
            <div>
          <div>
            <h3>Git Busca</h3>
          </div>
            <InputGroup>
              <Button color={button} onClick={() => { handlereset() }}>
                Limpar
              </Button>
              <Input invalid={stylleInput} placeholder="Nome do Usuário..." onChange={(e) => handleChange(e.target.value)} />
              <Button data-bs-toggle="tooltip" data-bs-placement="right" title={stylleInput ? 'Usuário não encontrado' : ''} color={button} onClick={() => { getUsers() }}>
                Buscar
              </Button>
            </InputGroup>
          </div>
          {user && <Table
            responsive
            size="sm"
          >
            <thead>
              <tr>
                <th>
                  Usuário:
                </th>
                <th>
                  {user?.name}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  Perfil GitHub:
                </th>
                <td>
                  <a href={user?.html_url} target="_blanlk">{user?.html_url}</a>
                </td>
              </tr>
            </tbody>
          </Table>}
      </header>
    </div>
  );
}

export default App;
