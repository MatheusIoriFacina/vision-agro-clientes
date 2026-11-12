export default function ClientePerfil({ client, onNavigate }) {
  return (
    <main className="page">
      <button className="back-button" onClick={() => onNavigate("clientes")}>← Voltar para clientes</button>

      <section className="profile-hero">
        <img src={client.avatar} alt={`Foto ilustrativa de ${client.name}`} />
        <div className="profile-hero__content">
          <span className="status-pill">● {client.status}</span>
          <h2>{client.name}</h2>
          <p>{client.farm} • {client.city}</p>
          <div className="profile-tags">
            <span>🌾 {client.crops}</span>
            <span>⭐ {client.rating},0 de avaliação</span>
            <span>✓ Cliente verificado</span>
          </div>
        </div>
        <button className="secondary-button" onClick={() => onNavigate("atendimento")}>Falar com atendimento</button>
      </section>

      <section className="profile-layout">
        <article className="profile-panel">
          <span className="eyebrow">SOBRE O CLIENTE</span>
          <h3>Perfil da propriedade</h3>
          <p>{client.bio}</p>
          <dl className="profile-details">
            <div><dt>Propriedade</dt><dd>{client.farm}</dd></div>
            <div><dt>Localização</dt><dd>{client.city}</dd></div>
            <div><dt>Produção</dt><dd>{client.crops}</dd></div>
            <div><dt>Relacionamento</dt><dd>{client.since}</dd></div>
          </dl>
        </article>

        <article className="profile-panel">
          <span className="eyebrow">SOLUÇÕES UTILIZADAS</span>
          <h3>Produtos Vision Agro</h3>
          <div className="product-list">
            {client.products.map((product) => <div className="product-row" key={product}><span>✓</span><strong>{product}</strong></div>)}
          </div>
        </article>

        <article className="profile-panel profile-panel--accent">
          <span className="eyebrow">RELACIONAMENTO</span>
          <h3>Resumo do atendimento</h3>
          <div className="profile-stats">
            <div><strong>4</strong><span>atendimentos</span></div>
            <div><strong>100%</strong><span>resolvidos</span></div>
            <div><strong>{client.rating},0</strong><span>satisfação</span></div>
          </div>
        </article>
      </section>
    </main>
  );
}
