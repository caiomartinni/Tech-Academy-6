import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

function RecuperarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [emailEnviado, setEmailEnviado] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Solicitação de recuperação de senha enviada para:", data.email);
    setEmailEnviado(true);
  };

  return (
    <div className="center">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Recuperar Senha</h1>
          {emailEnviado ? (
            <p className="success-message">
              Um e-mail de recuperação foi enviado. Verifique sua caixa de entrada.
            </p>
          ) : (
            <>
              <div className="input-box">
                <input type="text" placeholder="Email" {...register("email")} />
                <MdEmail className="icon" />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <button type="submit">Enviar</button>

              <div className="register-link">
                <p>
                  Lembrou sua senha? <a href="Login">Faça login</a>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;
