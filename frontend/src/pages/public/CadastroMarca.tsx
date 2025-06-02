import React, { useState, useEffect } from "react";
import "./CadastroMarca.css";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

interface Brand {
  id: string;
  name: string;
}

const CadastroMarca: React.FC = () => {
  const [marca, setMarca] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/brands", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(response.data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensagem("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/brands",
        { name: marca },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setMensagem("Marca cadastrada com sucesso!");
        setMarca("");
        fetchBrands();
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar marca. Tente novamente.");
      console.error("Erro:", error);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa marca?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("Marca excluída com sucesso!");
      fetchBrands();
    } catch (error) {
      setMensagem("Erro ao excluir a marca. Tente novamente.");
      console.error("Erro ao deletar a marca:", error);
    }
  };

  const handleEditBrand = async (id: string, oldName: string) => {
    const newName = window.prompt("Digite o novo nome da marca:", oldName);
    if (!newName || newName.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/brands/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem("Marca atualizada com sucesso!");
      fetchBrands();
    } catch (error) {
      setMensagem("Erro ao atualizar a marca.");
      console.error("Erro ao atualizar a marca:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Marcas</h1>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          placeholder="Nome da marca"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td className="action-buttons">
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteBrand(brand.id)}
                >
                  <FaTrashCan size={15} color="red" />
                  Excluir
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEditBrand(brand.id, brand.name)}
                >
                  <FaPencilAlt size={15} color="#ffcc00" />
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroMarca;
