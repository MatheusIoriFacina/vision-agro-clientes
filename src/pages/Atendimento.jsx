import { useRef, useState } from "react";

export default function Atendimento({ onNavigate, onOpenAssistant }) {
  const formRef = useRef(null);
  const [modal, setModal] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [form, setForm] = useState({ subject: "tecnico", product: "", message: "" });

  const channels = [
    { id: "whatsapp", icon: "💬", title: "WhatsApp", description: "Converse com nossa equipe de forma rápida e prática.", action: "Iniciar conversa", info: "Seg. a sex. • 08h às 18h" },
    { id: "phone", icon: "📞", title: "Telefone", description: "Fale diretamente com um de nossos atendentes.", action: "Ver telefone", info: "(67) 3333-0000" },
    { id: "support", icon: "✉️", title: "Solicitação de suporte", description: "Envie os detalhes do seu problema para nossa equipe.", action: "Criar solicitação", info: "Resposta em horário comercial" },
  ];

  function channelAction(id) {
    if (id === "support") {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setModal(id);
  }

  function submitSupport(event) {
    event.preventDefault();
    const protocol = `VA-${String(Date.now()).slice(-6)}`;
    setTicket({ protocol, ...form });
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / ATENDIMENTO</span>
          <h2>Fale com a nossa equipe</h2>
          <p>Os canais abaixo possuem interações demonstrativas para simular como o atendimento funcionaria no produto final.</p>
        </div>
        <button className="secondary-button" onClick={onOpenAssistant}>🌱 Tentar ajuda rápida</button>
      </section>

      <section className="contact-grid">
        {channels.map((channel) => (
          <article className="contact-card" key={channel.id}>
            <div className="contact-card__icon">{channel.icon}</div>
            <h3>{channel.title}</h3>
            <p>{channel.description}</p>
            <span>{channel.info}</span>
            <button onClick={() => channelAction(channel.id)}>{channel.action} →</button>
          </article>
        ))}
      </section>

      <section className="support-form" ref={formRef}>
        <div className="support-form__info">
          <span className="eyebrow">ATENDIMENTO PERSONALIZADO</span>
          <h3>Conte rapidamente o que aconteceu</h3>
          <p>Ao enviar, o protótipo gera um protocolo fictício e mostra o resumo da solicitação.</p>
          <div className="support-form__tip"><strong>💡 Dica</strong><span>Quanto mais detalhes, mais rápido conseguimos direcionar seu atendimento.</span></div>
        </div>

        <form className="mock-form" onSubmit={submitSupport}>
          <label>Assunto
            <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              <option value="tecnico">Suporte técnico</option>
              <option value="pedido">Pedido ou entrega</option>
              <option value="financeiro">Financeiro</option>
              <option value="conta">Minha conta</option>
            </select>
          </label>
          <label>Equipamento ou produto<input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="Ex.: Vision Monitor X2" /></label>
          <label>Descreva sua dúvida<textarea rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Conte em poucas palavras o que está acontecendo..." /></label>
          <button className="primary-button" type="submit">Preparar atendimento</button>
        </form>
      </section>

      {ticket && (
        <section className="ticket-result">
          <div className="ticket-result__icon">✓</div>
          <div><span className="eyebrow">SOLICITAÇÃO PREPARADA</span><h3>Protocolo {ticket.protocol}</h3><p>Assunto: {ticket.subject} {ticket.product && `• Produto: ${ticket.product}`}</p></div>
          <button className="secondary-button" onClick={() => setTicket(null)}>Fechar</button>
        </section>
      )}

      <section className="after-support">
        <div><span className="eyebrow">ATENDIMENTO CONCLUÍDO?</span><h3>Conte como foi sua experiência.</h3><p>Leva menos de um minuto e ajuda nossa equipe a oferecer um atendimento cada vez melhor.</p></div>
        <button className="primary-button" onClick={() => onNavigate("avaliacao")}>Avaliar atendimento</button>
      </section>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            {modal === "whatsapp" ? (
              <>
                <div className="modal-icon">💬</div><span className="eyebrow">WHATSAPP</span><h3>Mensagem pronta para atendimento</h3>
                <div className="message-preview">Olá! Sou cliente da Vision Agro e preciso de ajuda. Gostaria de falar com um atendente sobre uma dúvida no meu atendimento.</div>
                <button className="primary-button" onClick={() => setModal("sent")}>Simular envio da mensagem</button>
              </>
            ) : modal === "phone" ? (
              <>
                <div className="modal-icon">📞</div><span className="eyebrow">TELEFONE</span><h3>(67) 3333-0000</h3><p>Atendimento de segunda a sexta, das 08h às 18h.</p>
                <button className="primary-button" onClick={() => setModal("calling")}>Simular ligação</button>
              </>
            ) : modal === "calling" ? (
              <><div className="modal-icon">📞</div><h3>Ligação iniciada</h3><p>Demonstração: em um sistema real, o dispositivo abriria o aplicativo de telefone.</p><button className="secondary-button" onClick={() => setModal(null)}>Entendi</button></>
            ) : (
              <><div className="modal-icon">✓</div><h3>Mensagem preparada!</h3><p>Demonstração concluída. Em produção, o usuário seria direcionado para o canal oficial.</p><button className="secondary-button" onClick={() => setModal(null)}>Fechar</button></>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
