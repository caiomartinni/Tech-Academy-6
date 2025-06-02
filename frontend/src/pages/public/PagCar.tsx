import React, { useState, useEffect, ReactNode } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./PagCar.css";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Car {
  averagePrice: ReactNode;
  model: ReactNode;
  id: number;
  name: string;
  image: string;
  description: string;
  specs: string;
  marketValue: number;
  type: string;
  year: number;
  brandId: number;
}

const CarDetails = () => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Car>(
          `http://localhost:3000/cars/${carId}`
        );
        setCar(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do carro:", err);
        setError("Falha ao carregar os detalhes do carro.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!car) return <p>Carro não encontrado.</p>;

  return (
    <Container className="box mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg p-3 rounded">
            <Row>
              <Col md={6} className="text-center">
                <img
                  src={`/images2/${car.brandId}/${car.id}.jpg`}
                  alt={car.name}
                  className="img-fluid rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images2/default.png";
                  }}
                />
              </Col>
              <Col md={6}>
                <Card.Body className="BoxCar">
                  <h2 className="fw-bold fs-3">{car.model}</h2>
                  <Card.Text>
                    <strong className="title">Descrição:</strong>{" "}
                    {car.description}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Ficha Técnica:</strong>{" "}
                    {car.specs}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Valor Médio:</strong> R${" "}
                    {car.averagePrice}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Tipo do Veículo:</strong>{" "}
                    {car.type}
                  </Card.Text>
                  <Card.Text>
                    <strong className="title">Ano de Fabricação:</strong>{" "}
                    {car.year}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetails;
