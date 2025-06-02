import "./Conta.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import api from "../../service/api";

interface User {
  name: string;
  email: string;
  cpf: string;
}

const AccountPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const getUser = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não encontrado.");
        return;
      }

      const { data } = await api.get(`/users/${userId}`);
      setUser(data);
    } catch (error) {
      alert(
        axios.isAxiosError(error)
          ? error?.response?.data || "Erro ao carregar os dados."
          : "Erro desconhecido."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 6) return "Fraca";
    if (/^[a-zA-Z0-9]*$/.test(pass)) return "Média";
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) return "Forte";
    return "";
  };

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      alert("Por favor, preencha os dois campos de senha.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (passwordStrength === "Fraca") {
      alert("A senha está muito fraca. Use pelo menos 6 caracteres e símbolos.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não encontrado.");
        return;
      }

      await api.put(`/users/${userId}`, {
        password,
      });

      alert("Senha trocada com sucesso!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(
        axios.isAxiosError(error)
          ? error?.response?.data || "Erro ao atualizar a senha."
          : "Erro desconhecido."
      );
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita."
    );

    if (!confirmDelete) return;

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não encontrado.");
        return;
      }

      await api.delete(`/users/${userId}`);
      alert("Conta excluída com sucesso!");
      logout();
    } catch (error) {
      alert(
        axios.isAxiosError(error)
          ? error?.response?.data || "Erro ao excluir a conta."
          : "Erro desconhecido."
      );
    }
  };

  if (loading) {
    return (
      <div
        className="loading"
        style={{ textAlign: "center", padding: "40px 0", fontSize: "32px" }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <main>
      <div className="account-page">
        <h1>Informações da Conta</h1>
        {user ? (
          <div className="user-info">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
          </div>
        ) : (
          <p>Usuário não encontrado.</p>
        )}
        <div className="actions">
          <h2>Trocar Senha</h2>
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Nova senha"
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirmar nova senha"
            style={{ marginTop: "8px" }}
          />
          <div className="password-strength">
            <p>
              Força da senha:{" "}
              <strong
                style={{
                  color:
                    passwordStrength === "Forte"
                      ? "green"
                      : passwordStrength === "Média"
                      ? "orange"
                      : "red",
                }}
              >
                {passwordStrength}
              </strong>
            </p>
          </div>
          <button
            style={{ marginBottom: "10px" }}
            className="change-password-button"
            onClick={handleChangePassword}
          >
            Alterar
          </button>
          <button className="logout-button" onClick={logout}>
            Deslogar
          </button>
          <button className="delete-account-button" onClick={handleDeleteAccount}>
            Excluir Conta
          </button>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
