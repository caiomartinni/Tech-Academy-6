import { Navigate } from "react-router";

import { JSX } from "react";

interface Props {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
    const isAuthenticated = !!localStorage.getItem("authToken"); // Verifica se o token existe no localStorage

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;