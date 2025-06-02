import React from "react";
import "./Term.css";

const Term: React.FC = () => {
  return (
    <div className="term-container">
      <h1>Termos de Uso</h1>
      <section>
        <h2>Introdução</h2>
        <p>
          Ao acessar e utilizar este site, você concorda em cumprir os termos e
          condições descritos abaixo. Caso não concorde com alguma parte destes
          termos, recomendamos que interrompa o uso do site.
        </p>
      </section>

      <section>
        <h2>Uso Permitido</h2>
        <p>
          Este site deve ser utilizado exclusivamente para fins legais e dentro
          das regulamentações aplicáveis. É proibido:
        </p>
        <ul>
          <li>
            Copiar, distribuir ou modificar conteúdo sem autorização prévia.
          </li>
          <li>Utilizar o site para atividades ilegais ou prejudiciais.</li>
          <li>
            Violar direitos de propriedade intelectual relacionados ao conteúdo
            do site.
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitação de Responsabilidade</h2>
        <p>
          Nós nos esforçamos para oferecer conteúdos precisos e atualizados. No
          entanto, não nos responsabilizamos por erros, interrupções ou danos
          resultantes do uso do site. O uso do site é por conta e risco do
          usuário.
        </p>
      </section>

      <section>
        <h2>Alterações nos Termos</h2>
        <p>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. Quaisquer mudanças serão efetivadas imediatamente após sua
          publicação neste site.
        </p>
      </section>
    </div>
  );
};

export default Term;
