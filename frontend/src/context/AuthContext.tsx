import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  userName: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    console.log("Decoded token payload:", payload); // Log para verificar o conteúdo do token
    return payload; // Retorna o payload completo
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  );

  const login = (token: string) => {
    localStorage.setItem("authToken", token);

    const userData = decodeToken(token);
    if (userData) {
      const userId = userData.id || ""; // Certifique-se de que o payload contém "id"
      const userName = userData.email || ""; // Ajuste conforme o campo no token

      console.log("User ID:", userId); // Log para verificar o ID do usuário
      console.log("User Name:", userName); // Log para verificar o nome do usuário

      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

      setUserId(userId);
      setUserName(userName);
    } else {
      console.error("Erro: Dados do usuário não encontrados no token.");
    }

    setToken(token);
  };

  const logout = () => {
    if (confirm("Do you want to proceed?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setToken(null);
      setUserId(null);
      setUserName(null);
      location.href = "/home";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userName,
        login,
        logout,
        isAuthenticated: !!token, // Verifica se o token existe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth needs to be inside the AuthProvider");
  return context;
};
