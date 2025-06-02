import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left footer-text">
            <p>
              &copy; {new Date().getFullYear()} CarTalogo. Todos os direitos
              reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-right footer-links">
            <Link to={"/polpriv"}>Política de Privacidade</Link>
            <span className="divider">|</span>
            <Link to={"/term"}>Termos de Uso</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
