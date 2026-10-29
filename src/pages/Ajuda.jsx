import { useState } from "react";

const faqs = [
  {
    category: "Suporte técnico",
    icon: "🚜",
    question: "Meu equipamento está offline. O que fazer?",
    answer:
      "Verifique se o equipamento está ligado, confira a conexão com a internet e reinicie o dispositivo. Aguarde alguns minutos e tente novamente.",
  },
  {
    category: "Suporte técnico",
    icon: "⚙️",
    question: "O equipamento não está ligando.",
    answer:
      "Confira a alimentação elétrica, os cabos e a tomada. Caso o problema continue, entre em contato com nosso atendimento.",
  },
  {
    category: "Pedidos",
    icon: "📦",
    question: "Como acompanhar meu pedido?",
    answer:
      "A consulta pode ser feita pelos canais de atendimento da Vision Agro. Tenha em mãos o nome do produtor e o número do pedido.",
  },
  {
    category: "Conta",
    icon: "🔐",
    question: "Esqueci minha senha. O que faço?",
    answer:
      "Utilize a opção de recuperação de acesso ou entre em contato com nossa equipe para receber orientação.",
  },
  {
    category: "Financeiro",
    icon: "💳",
    question: "Preciso de informações sobre pagamento.",
    answer:
      "Questões financeiras podem ser encaminhadas diretamente para nossa equipe de atendimento, que fará o direcionamento correto.",
  },
];

export default function Ajuda({ onNavigate, onOpenAssistant }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / CENTRAL DE AJUDA</span>
          <h2>Como podemos ajudar?</h2>
          <p>Consulte algumas das dúvidas mais comuns dos clientes Vision Agro.</p>
        </div>

        <button className="primary-button" onClick={onOpenAssistant}>
          🌱 Abrir Assistente Vision
        </button>
      </section>

      <section className="search-mock">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Pesquise uma dúvida, produto ou assunto..."
          aria-label="Pesquisar ajuda"
        />
      </section>

      <section className="help-layout">
        <aside className="help-categories">
          <h3>Categorias</h3>
          <button className="category-button category-button--active">Todas as dúvidas</button>
          <button className="category-button">🚜 Suporte técnico</button>
          <button className="category-button">📦 Pedidos e entregas</button>
          <button className="category-button">💳 Pagamentos</button>
          <button className="category-button">👤 Minha conta</button>
        </aside>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className="faq-item" key={faq.question}>
              <button
                className="faq-item__question"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="faq-item__title">
                  <span className="faq-item__icon">{faq.icon}</span>
                  <span>
                    <small>{faq.category}</small>
                    <strong>{faq.question}</strong>
                  </span>
                </span>

                <span>{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && (
                <div className="faq-item__answer">
                  <p>{faq.answer}</p>
                  <button onClick={() => onNavigate("atendimento")}>
                    Ainda preciso de ajuda →
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
