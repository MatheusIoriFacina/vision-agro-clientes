export default function Atendimento({ onNavigate, onOpenAssistant }) {
  const channels = [
    {
      icon: "💬",
      title: "WhatsApp",
      description: "Converse com nossa equipe de forma rápida e prática.",
      action: "Iniciar conversa",
      info: "Seg. a sex. • 08h às 18h",
    },
    {
      icon: "📞",
      title: "Telefone",
      description: "Fale diretamente com um de nossos atendentes.",
      action: "Ver telefone",
      info: "(67) 3333-0000",
    },
    {
      icon: "✉️",
      title: "Solicitação de suporte",
      description: "Envie os detalhes do seu problema para nossa equipe.",
      action: "Criar solicitação",
      info: "Resposta em horário comercial",
    },
  ];

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / ATENDIMENTO</span>
          <h2>Fale com a nossa equipe</h2>
          <p>Escolha o canal que preferir. Nosso objetivo é resolver sua necessidade de forma simples e próxima.</p>
        </div>

        <button className="secondary-button" onClick={onOpenAssistant}>
          🌱 Tentar ajuda rápida
        </button>
      </section>

      <section className="contact-grid">
        {channels.map((channel) => (
          <article className="contact-card" key={channel.title}>
            <div className="contact-card__icon">{channel.icon}</div>
            <h3>{channel.title}</h3>
            <p>{channel.description}</p>
            <span>{channel.info}</span>
            <button>{channel.action} →</button>
          </article>
        ))}
      </section>

      <section className="support-form">
        <div className="support-form__info">
          <span className="eyebrow">ATENDIMENTO PERSONALIZADO</span>
          <h3>Conte rapidamente o que aconteceu</h3>
          <p>
            Este formulário é apenas demonstrativo. Em uma versão real, essas informações
            ajudariam nossa equipe a chegar ao atendimento já entendendo o seu problema.
          </p>

          <div className="support-form__tip">
            <strong>💡 Dica</strong>
            <span>Quanto mais detalhes, mais rápido conseguimos direcionar seu atendimento.</span>
          </div>
        </div>

        <form className="mock-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Assunto
            <select defaultValue="tecnico">
              <option value="tecnico">Suporte técnico</option>
              <option value="pedido">Pedido ou entrega</option>
              <option value="financeiro">Financeiro</option>
              <option value="conta">Minha conta</option>
            </select>
          </label>

          <label>
            Equipamento ou produto
            <input type="text" placeholder="Ex.: Vision Monitor X2" />
          </label>

          <label>
            Descreva sua dúvida
            <textarea rows="5" placeholder="Conte em poucas palavras o que está acontecendo..." />
          </label>

          <button className="primary-button" type="submit">
            Preparar atendimento
          </button>
        </form>
      </section>

      <section className="after-support">
        <div>
          <span className="eyebrow">ATENDIMENTO CONCLUÍDO?</span>
          <h3>Conte como foi sua experiência.</h3>
          <p>Leva menos de um minuto e ajuda nossa equipe a oferecer um atendimento cada vez melhor.</p>
        </div>

        <button className="primary-button" onClick={() => onNavigate("avaliacao")}>
          Avaliar atendimento
        </button>
      </section>
    </main>
  );
}
