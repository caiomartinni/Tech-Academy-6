import React from "react";
import "./Polpriv.css";

const Polpriv: React.FC = () => {
  return (
    <div className="polpriv-container">
      <h1>Políticas de Privacidade</h1>
      <section>
        <h2>Coleta de Informações</h2>
        <p>
          Nós coletamos informações pessoais que você nos fornece diretamente,
          como nome, email e outras informações relacionadas ao uso do site.
          Esses dados são armazenados com segurança e usados apenas para os fins
          especificados.
        </p>
        <p>
          Também coletamos informações automaticamente, como dados de navegação
          e interação, através de cookies e ferramentas analíticas para melhorar
          sua experiência.
        </p>
      </section>

      <section>
        <h2>Uso das Informações</h2>
        <p>
          As informações coletadas são utilizadas para personalizar sua
          experiência, oferecer suporte ao cliente, e melhorar nossos serviços.
          Nunca compartilhamos seus dados com terceiros sem sua permissão
          explícita.
        </p>
      </section>

      <section>
        <h2>Segurança dos Dados</h2>
        <p>
          Implementamos medidas de segurança avançadas para proteger suas
          informações contra acessos não autorizados, perdas ou violações. No
          entanto, lembre-se de que nenhum sistema é completamente seguro.
        </p>
      </section>

      <section>
        <h2>Alterações nesta Política</h2>
        <p>
          Reservamo-nos o direito de modificar esta política a qualquer momento.
          Atualizações importantes serão comunicadas a você diretamente ou
          através de notificações no site.
        </p>
      </section>
    </div>
  );
};

export default Polpriv;
