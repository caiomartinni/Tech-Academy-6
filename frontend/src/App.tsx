import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import CriarConta from "./pages/public/CriarConta";
import LayoutLogin from "./components/layout/LayoutLogin";
import BackgroudLogin from "./assets/backgrod/backgroud.webp";
import LayoutHome from "./components/layout/layouthome";
import RecuperarSenha from "./pages/public/RecuperarSenha";
import CarList from "./pages/public/CarList";
import Conta from "./pages/public/Conta";
import PagCar from "./pages/public/PagCar";
import Polpriv from "./pages/public/Polpriv";
import Term from "./pages/public/Term";
import CadastroCar from "./pages/public/CadastroCar";
import CadastroMarca from "./pages/public/CadastroMarca";
import PrivateRoute from "./components/PrivateRoute";
import Erro404 from "./pages/public/Erro404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Rotas Públicas com LayoutHome */}
        <Route
          element={
            <LayoutHome>
              <Outlet />
            </LayoutHome>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cars/:brandId" element={<CarList />} />
          {/* Rota atualizada para receber carId */}
          <Route path="/pagcar/:carId" element={<PagCar />} />
          <Route path="/polpriv" element={<Polpriv />} />
          <Route path="/term" element={<Term />} />
        </Route>

        {/* Rotas Privadas com LayoutHome */}
        <Route
          element={
            <PrivateRoute>
              <LayoutHome>
                <Outlet />
              </LayoutHome>
            </PrivateRoute>
          }
        >
          <Route path="/cadastrocar" element={<CadastroCar />} />
          <Route path="/cadastro-marca" element={<CadastroMarca />} />
          <Route path="/conta" element={<Conta />} />
        </Route>

        {/* Rotas de Login/Cadastro com LayoutLogin */}
        <Route
          element={
            <LayoutLogin backgroundImage={BackgroudLogin}>
              <Outlet />
            </LayoutLogin>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/CriarConta" element={<CriarConta />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        </Route>

        {/* Rota 404 */}
        <Route
          path="*"
          element={
            <LayoutHome>
              <Erro404 />
            </LayoutHome>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
