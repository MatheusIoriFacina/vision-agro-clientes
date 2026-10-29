import HelpCard from "../components/HelpCard";

export default function Home({ onNavigate, onOpenAssistant }) {
  const tips = [
    { icon: "🚜", title: "Equipamento offline", description: "Veja verificações rápidas antes de solicitar suporte." },
    { icon: "📦", title: "Acompanhar pedido", description: "Saiba como consultar informações sobre compras e entregas." },
    { icon: "🔐", title: "Acesso à conta", description: "Confira orientações para entrar ou recuperar seu acesso." },
  ];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__tag">VISION AGRO / CLIENTES</div>
        <h2>Olá, João! Como podemos ajudar?</h2>
        <p>Encontre respostas rápidas, consulte nossa central de ajuda ou fale com a equipe Vision Agro.</p>
      </section>

      <section className="main-actions">
        <HelpCard
          icon="💬"
          title="Falar com atendimento"
          description="Precisa de ajuda mais específica? Nossa equipe está pronta para atender você."
          buttonText="Falar conosco"
          onClick={() => onNavigate("atendimento")}
          highlight
        />
        <HelpCard
          icon="📚"
          title="Central de ajuda"
          description="Encontre respostas para dúvidas frequentes sobre produtos, pedidos e suporte."
          buttonText="Ver dúvidas"
          onClick={() => onNavigate("ajuda")}
        />
        <HelpCard
          icon="🌱"
          title="Assistente Vision"
          description="Receba uma orientação rápida antes de falar com nossa equipe."
          buttonText="Começar"
          onClick={onOpenAssistant}
        />
      </section>

      <section className="section">
        <div className="section__heading">
          <div>
            <span className="eyebrow">DICAS RÁPIDAS</span>
            <h3>Resolva situações comuns em poucos passos</h3>
          </div>
          <button className="link-button" onClick={() => onNavigate("ajuda")}>
            Ver todas as dúvidas →
          </button>
        </div>

        <div className="quick-grid">
          {tips.map((tip) => (
            <article className="quick-card" key={tip.title}>
              <div className="quick-card__icon">{tip.icon}</div>
              <h4>{tip.title}</h4>
              <p>{tip.description}</p>
              <button onClick={() => onNavigate("ajuda")}>Ver orientação →</button>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <div>
          <span className="eyebrow">SUA EXPERIÊNCIA IMPORTA</span>
          <h3>Já foi atendido pela Vision Agro?</h3>
          <p>Conte como foi sua experiência. Sua avaliação nos ajuda a melhorar cada vez mais.</p>
        </div>

        <div className="experience-section__rating">
          <strong>4,8</strong>
          <span className="stars">★★★★★</span>
          <small>Satisfação dos clientes</small>
        </div>

        <button className="secondary-button" onClick={() => onNavigate("avaliacao")}>
          Avaliar atendimento
        </button>
      </section>

      <section className="support-banner">
        <div>
          <span className="eyebrow">AINDA PRECISA DE AJUDA?</span>
          <h3>Estamos aqui para facilitar sua rotina no campo.</h3>
          <p>Fale com nossa equipe para receber um atendimento mais personalizado.</p>
        </div>
        <button onClick={() => onNavigate("atendimento")}>Entrar em contato</button>
      </section>
    </main>
  );
}
