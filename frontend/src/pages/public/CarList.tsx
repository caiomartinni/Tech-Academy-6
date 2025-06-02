import React, { useState, useEffect, ReactNode } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./CarList.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const itemsPerPage = 9;

interface Car {
  model: ReactNode;
  id: number;
  name: string;
  brandId: number;
}

interface Brand {
  id: number;
  name: string;
}

const CarList: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [brandName, setBrandName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brandId) return;

    const fetchCarData = async () => {
      setLoading(true);
      setError(null);
      try {
        const brandResponse = await axios.get<Brand>(
          `http://localhost:3000/brands/${brandId}`
        );
        setBrandName(brandResponse.data.name);

        const carsResponse = await axios.get<Car[]>(
          "http://localhost:3000/cars"
        );

        const brandIdNumber = parseInt(brandId, 10);
        const carsForBrand = carsResponse.data.filter(
          (car) => car.brandId === brandIdNumber
        );

        setFilteredCars(carsForBrand);
        setCurrentPage(1);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(
          "Falha ao carregar os carros. Verifique o ID da marca ou tente novamente."
        );
        setBrandName("");
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [brandId]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : totalPages
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="home-container">
      <h1 className="escrita1">
        {brandName ? `Carros da ${brandName}` : "Lista de Carros"}
      </h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p>Carregando carros...</p>
        </div>
      )}
      {error && (
        <p style={{ color: "red" }} className="text-center">
          {error}
        </p>
      )}

      {!loading && !error && filteredCars.length === 0 && (
        <p className="text-center">Nenhum carro encontrado para esta marca.</p>
      )}

      {!loading && !error && filteredCars.length > 0 && (
        <>
          <AnimatePresence mode="wait">
            <Row key={`${brandId}-${currentPage}`} className="card-grid">
              {paginatedCars.map((car) => (
                <Col key={car.id} md={4} className="card-column mb-4">
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="h-100"
                  >
                    <Card className="custom-card h-100">
                      <Card.Img
                        variant="top"
                        src={`/images2/${brandId}/${car.id}.jpg`}
                        alt={car.name}
                        style={{ objectFit: "cover", height: "200px" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images2/default.png";
                        }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{car.model}</Card.Title>
                        {}
                        <Link
                          to={`/pagcar/${car.id}`}
                          className="cardbt mt-auto"
                        >
                          Ver Detalhes
                        </Link>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="pagination-container">
              <Button
                className="arrow-btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                &#8592;
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  className={`pagination-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                className="arrow-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                &#8594;
              </Button>
            </div>
          )}
        </>
      )}

      <div
        className="home-button-container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Link className="home-button" to="/">
          Voltar para Marcas
        </Link>
      </div>
    </Container>
  );
};

export default CarList;
