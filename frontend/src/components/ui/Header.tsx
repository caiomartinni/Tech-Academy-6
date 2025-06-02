import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/icons/logo.png";
import "./Header.css";

function Header() {
  const isLoggedIn = !!localStorage.getItem("authToken"); // ✅ Verifica se o usuário está autenticado

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Navbar expand="lg" className="header-container">
        <Container fluid>
          <Navbar.Brand href="#">
            <img className="iconpr" src={Logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 header-nav" navbarScroll>
              <Nav.Link>
                <Link to="/home" className="header-link">
                  Home
                </Link>
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              {isLoggedIn ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link to="/Conta" className="login-button">
                    Conta
                  </Link>
                  <Link to="/cadastrocar" className="login-button">
                    Cadastro Car
                  </Link>
                  <Link to="/cadastro-marca" className="login-button">
                    Cadastro Marca
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="login-button">
                  Login
                </Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default Header;
