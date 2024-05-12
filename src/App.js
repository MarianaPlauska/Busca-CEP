import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

function App() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('CEP não encontrado');
        }
        return response.json();
      })
      .then(data => {
        setAddress(data);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setAddress(null);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={e => setCep(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={20} color="#FFF" />
        </button>
      </div>

      {error && <p>{error}</p>}

      {address && (
        <main className="main">
          <h2>Cep: {address.cep}</h2>
          <span>Rua: {address.logradouro}</span>
          <span>Bairro: {address.bairro}</span>
          <span>Cidade: {address.localidade}</span>
          <span>Estado: {address.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
