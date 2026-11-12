import { useMemo, useState } from "react";

export default function Clientes({ clients, onOpenClient }) {
  const [query, setQuery] = useState("");

  const filteredClients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return clients;
    return clients.filter((client) => `${client.name} ${client.farm} ${client.city} ${client.crops}`.toLowerCase().includes(normalized));
  }, [clients, query]);

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / CLIENTES</span>
          <h2>Clientes Vision Agro</h2>
          <p>Perfis fictícios criados para demonstrar como a área de relacionamento poderia organizar e apresentar seus clientes.</p>
        </div>
        <div className="metric-chip"><strong>{clients.length}</strong><span>clientes ativos</span></div>
      </section>

      <section className="search-box search-box--narrow">
        <span>⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por cliente, fazenda ou cidade..." />
      </section>

      <section className="clients-grid">
        {filteredClients.map((client) => (
          <article className="client-card" key={client.id}>
            <div className="client-card__cover"></div>
            <img className="client-card__avatar" src={client.avatar} alt={`Foto ilustrativa de ${client.name}`} />
            <div className="client-card__body">
              <span className="status-pill">● {client.status}</span>
              <h3>{client.name}</h3>
              <p className="client-card__farm">{client.farm}</p>
              <div className="client-card__meta">
                <span>📍 {client.city}</span>
                <span>🌾 {client.crops}</span>
                <span>⭐ {client.rating},0</span>
              </div>
              <button className="primary-button primary-button--full" onClick={() => onOpenClient(client)}>Ver perfil do cliente</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
