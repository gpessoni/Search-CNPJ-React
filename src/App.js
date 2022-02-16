import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Style.css";
import InputMask from "react-input-mask";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cnpj, setCNPJ] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Dados Mal Inseridos");
      return;
    }
    try {
      let newCNPJ = input
        .replaceAll("_", "")
        .replaceAll("/", "")
        .replaceAll(".", "")
        .replaceAll("-", "");
      console.log(newCNPJ);
      const response = await api.get(`${newCNPJ}`);
      setCNPJ(response.data);
      setInput("");
      console.log(response.data);
    } catch {
      alert("Erro na Requisição");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CNPJ</h1>
      <div className="containerInput">
        <InputMask
          mask="99.999.999/9999-99"
          placeholder="Digite seu CNPJ ..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(cnpj).length > 0 && (
        <main className="main">
          <h2>CNPJ: {cnpj.cnpj}</h2>
          <span>Empresa: {cnpj.nome}</span>
          <span>Endereço: {cnpj.logradouro}</span>
          <span>Bairro: {cnpj.bairro}</span>
          <span>
            Cidade: {cnpj.municipio}, {cnpj.uf}
          </span>
        
        </main>
      
        
      )}  <br/>  <br/>
      <main className="main">
      <span align="center"><br/>Atividades Principais: {cnpj.atividade_principal[0].text}</span>
      </main>
    </div>
  );
}

export default App;
