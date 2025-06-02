import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./CadastroCar.css";
import { FaTrashCan, FaArrowDownAZ, FaArrowUpAZ } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { GoVersions } from "react-icons/go";

interface Carro {
  id: number;
  brandId: number;
  model: string;
  description?: string;
  specs?: string;
  averagePrice?: number;
  type?: string;
  year?: number;
}

interface Marca {
  id: number;
  name: string;
}

const CadastroCar: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [carros, setCarros] = useState<Carro[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMarcas();
    fetchCarros();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/brands");
      setMarcas(response.data);
    } catch {
      console.error("Erro ao buscar marcas");
    }
  };

  const fetchCarros = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarros(response.data);
    } catch {
      console.error("Erro ao buscar carros");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensagem("");

    const token = localStorage.getItem("token");

    try {
      const response = selectedCarId
        ? await axios.put(
            `http://localhost:3000/cars/${selectedCarId}`,
            {
              brandId: Number(brandId),
              model,
              description,
              specs,
              averagePrice: Number(averagePrice),
              type,
              year: Number(year),
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        : await axios.post(
            "http://localhost:3000/cars",
            {
              brandId: Number(brandId),
              model,
              description,
              specs,
              averagePrice: Number(averagePrice),
              type,
              year: Number(year),
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

      if (response.status === 200 || response.status === 201) {
        setMensagem(
          selectedCarId
            ? "Carro atualizado com sucesso!"
            : "Carro cadastrado com sucesso!"
        );
        limparCampos();
        fetchCarros();
      }
    } catch {
      setMensagem("Erro ao salvar carro. Verifique os dados.");
    }
  };

  const handleDeleteCarro = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este carro?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("Carro excluído com sucesso!");
      fetchCarros();
    } catch {
      setMensagem("Erro ao excluir carro. Tente novamente.");
    }
  };

  const handleEditCar = (carro: Carro) => {
    setSelectedCarId(carro.id);
    setBrandId(carro.brandId.toString());
    setModel(carro.model);
    setDescription(carro.description || "");
    setSpecs(carro.specs || "");
    setAveragePrice(carro.averagePrice?.toString() || "");
    setType(carro.type || "");
    setYear(carro.year?.toString() || "");

    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const limparCampos = () => {
    setSelectedCarId(null);
    setBrandId("");
    setModel("");
    setDescription("");
    setSpecs("");
    setAveragePrice("");
    setType("");
    setYear("");
  };

  const filteredCarros = carros
    .filter(
      (carro) =>
        selectedBrand === "" || carro.brandId.toString() === selectedBrand
    )
    .sort((a, b) =>
      order === "asc"
        ? a.model.localeCompare(b.model)
        : b.model.localeCompare(a.model)
    );

  return (
    <div className="cartalogo-container">
      <h1>Cadastro de Veículos</h1>
      {mensagem && <p>{mensagem}</p>}

      <div ref={formRef}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="brand">Marca:</label>
            <select
              id="brand"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              required
            >
              <option value="">Selecione a marca</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="model">Modelo:</label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="specs">Especificações:</label>
            <input
              id="specs"
              type="text"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="averagePrice">Preço Médio:</label>
            <input
              id="averagePrice"
              type="number"
              value={averagePrice}
              onChange={(e) => setAveragePrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo:</label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Ano:</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <button type="submit">
            {selectedCarId ? "Atualizar Carro" : "Cadastrar Carro"}
          </button>
        </form>
      </div>

      <div
        className="filter-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <div>
          <label htmlFor="filtro-marca">Filtrar por marca:</label>
          <select
            id="filtro-marca"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Todas</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id.toString()}>
                {marca.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-buttons">
          <button
            className="btn-sort"
            onClick={() => setOrder("asc")}
            title="Ordem A-Z"
          >
            <FaArrowDownAZ />
          </button>
          <button
            className="btn-sort"
            onClick={() => setOrder("desc")}
            title="Ordem Z-A"
          >
            <FaArrowUpAZ />
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Carro</th>
            <th>Marca</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCarros.map((carro) => (
            <tr key={carro.id}>
              <td>{carro.id}</td>
              <td>{carro.model}</td>
              <td>
                {marcas.find((marca) => marca.id === carro.brandId)?.name}
              </td>
              <td className="action-buttons">
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteCarro(carro.id)}
                >
                  <FaTrashCan size={15} /> Excluir
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEditCar(carro)}
                >
                  <FaPencilAlt size={15} /> Editar
                </button>
                <button className="btn-version">
                  <GoVersions size={15} /> Versões
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroCar;
