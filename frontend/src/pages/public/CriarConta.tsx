import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiIdentificationCard } from "react-icons/pi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { cpf } from "cpf-cnpj-validator";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const schema = z
  .object({
    nomeUsuario: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    cpf: z
      .string()
      .min(11, "CPF deve ter 11 dígitos")
      .max(11, "CPF deve ter 11 dígitos")
      .regex(/^[0-9]+$/, "CPF deve conter apenas números")
      .refine((val) => cpf.isValid(val), {
        message: "CPF inválido",
      }),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

function CriarConta() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const senhaValue = watch("senha");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const calcularNivelSenha = (senha: string): string => {
    const fraco = senha.length < 6;
    const medio = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(senha);
    const forte =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(
        senha
      );

    if (forte) return "Forte";
    if (medio) return "Média";
    if (fraco) return "Fraca";
    return "Fraca";
  };

  const navigate = useNavigate();

  const handleRegister = async (data: FormData) => {
    try {
      await api.post("/users", {
        name: data.nomeUsuario,
        cpf: data.cpf,
        email: data.email,
        password: data.senha,
      });
      alert("Registration completed successfully!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.error
            ?.map((e: { message: string }) => e.message)
            .join(", ") || "Erro ao registrar. Tente novamente.";
        alert(errorMessage);
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="center">
      <div className="wrapper">
        <form onSubmit={handleSubmit(handleRegister)}>
          <h1>Criar Conta</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Nome de Usuário"
              {...register("nomeUsuario")}
              aria-label="Nome de Usuário"
            />
            <FaUser className="icon" />
            {errors.nomeUsuario && (
              <p className="error">{errors.nomeUsuario.message}</p>
            )}
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              aria-label="Email"
            />
            <MdEmail className="icon" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="CPF"
              {...register("cpf")}
              aria-label="CPF"
            />
            <PiIdentificationCard className="icon" />
            {errors.cpf && <p className="error">{errors.cpf.message}</p>}
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("senha")}
              aria-label="Senha"
            />
            <FaLock className="icon" />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.senha && <p className="error">{errors.senha.message}</p>}
            {senhaValue && (
              <p
                className={`password-strength ${calcularNivelSenha(
                  senhaValue
                ).toLowerCase()}`}
              >
                Nível da senha: {calcularNivelSenha(senhaValue)}
              </p>
            )}
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar Senha"
              {...register("confirmarSenha")}
              aria-label="Confirmar Senha"
            />
            <FaLock className="icon" />
            {errors.confirmarSenha && (
              <p className="error">{errors.confirmarSenha.message}</p>
            )}
          </div>

          <button type="submit">Criar Conta</button>

          <div className="register-link">
            <p>
              Você possui conta? <a href="Login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarConta;
