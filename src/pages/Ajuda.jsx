import { useMemo, useState } from "react";

const categories = [
  { id: "all", icon: "▦", label: "Todas as dúvidas", title: "Tudo em um só lugar", text: "Consulte as principais dúvidas dos clientes Vision Agro." },
  { id: "account", icon: "👤", label: "Minha conta", title: "Minha conta", text: "Acesso, cadastro, dados pessoais e configurações do perfil." },
  { id: "technical", icon: "🚜", label: "Suporte técnico", title: "Suporte técnico", text: "Orientações rápidas para equipamentos, conexão e funcionamento." },
  { id: "orders", icon: "📦", label: "Pedidos e entregas", title: "Pedidos e entregas", text: "Acompanhamento de pedidos, entrega e informações sobre produtos." },
  { id: "payments", icon: "💳", label: "Pagamentos", title: "Pagamentos", text: "Dúvidas sobre cobrança, comprovantes e direcionamento financeiro." },
];

const faqs = [
  { category: "account", categoryLabel: "Minha conta", icon: "🔐", question: "Esqueci minha senha. O que faço?", answer: "Utilize a opção de recuperação de acesso ou entre em contato com nossa equipe para receber orientação." },
  { category: "account", categoryLabel: "Minha conta", icon: "📝", question: "Como altero meus dados cadastrais?", answer: "Acesse Meu Perfil no canto superior direito. Neste protótipo você pode editar nome, fazenda, cidade, telefone, e-mail e até a foto do perfil." },
  { category: "technical", categoryLabel: "Suporte técnico", icon: "🚜", question: "Meu equipamento está offline. O que fazer?", answer: "Verifique se o equipamento está ligado, confira a conexão com a internet e reinicie o dispositivo. Aguarde alguns minutos e tente novamente." },
  { category: "technical", categoryLabel: "Suporte técnico", icon: "⚙️", question: "O equipamento não está ligando.", answer: "Confira a alimentação elétrica, os cabos e a tomada. Caso o problema continue, entre em contato com nosso atendimento." },
  { category: "orders", categoryLabel: "Pedidos e entregas", icon: "📦", question: "Como acompanhar meu pedido?", answer: "A consulta pode ser feita pelos canais de atendimento da Vision Agro. Tenha em mãos o nome do produtor e o número do pedido." },
  { category: "orders", categoryLabel: "Pedidos e entregas", icon: "🚚", question: "Minha entrega está atrasada. E agora?", answer: "Entre em contato pelo Fale Conosco e informe o número do pedido. A equipe poderá simular o direcionamento da solicitação." },
  { category: "payments", categoryLabel: "Pagamentos", icon: "💳", question: "Preciso de informações sobre pagamento.", answer: "Questões financeiras podem ser encaminhadas diretamente para nossa equipe de atendimento, que fará o direcionamento correto." },
  { category: "payments", categoryLabel: "Pagamentos", icon: "🧾", question: "Como solicito um comprovante?", answer: "Use a opção de Solicitação de suporte em Fale Conosco e selecione Financeiro como assunto." },
];

export default function Ajuda({ onNavigate, onOpenAssistant }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState(faqs[0].question);

  const currentCategory = categories.find((item) => item.id === activeCategory) || categories[0];

  const filteredFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      const categoryMatch = activeCategory === "all" || faq.category === activeCategory;
      const queryMatch = !normalized || `${faq.question} ${faq.answer} ${faq.categoryLabel}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / CENTRAL DE AJUDA</span>
          <h2>Como podemos ajudar?</h2>
          <p>Escolha uma categoria ou pesquise sua dúvida. As opções agora mudam o conteúdo exibido na tela.</p>
        </div>
        <button className="primary-button" onClick={onOpenAssistant}>🌱 Abrir Assistente Vision</button>
      </section>

      <section className="search-box">
        <span>⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Pesquise uma dúvida, produto ou assunto..." />
      </section>

      <section className="help-layout">
        <aside className="help-categories">
          <span className="eyebrow">CATEGORIAS</span>
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? "category-button--active" : ""}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenQuestion("");
                }}
              >
                <span>{category.icon}</span>{category.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="help-content">
          <div className="category-hero">
            <span className="category-hero__icon">{currentCategory.icon}</span>
            <div>
              <span className="eyebrow">ÁREA SELECIONADA</span>
              <h3>{currentCategory.title}</h3>
              <p>{currentCategory.text}</p>
            </div>
            {activeCategory === "account" && <button className="secondary-button" onClick={() => onNavigate("perfil")}>Abrir meu perfil</button>}
            {activeCategory === "technical" && <button className="secondary-button" onClick={onOpenAssistant}>Iniciar ajuda rápida</button>}
            {activeCategory === "orders" && <button className="secondary-button" onClick={() => onNavigate("atendimento")}>Falar sobre um pedido</button>}
            {activeCategory === "payments" && <button className="secondary-button" onClick={() => onNavigate("atendimento")}>Falar com atendimento</button>}
          </div>

          <div className="faq-list">
            {filteredFaqs.length === 0 && <div className="empty-state">Nenhuma dúvida encontrada para essa busca.</div>}
            {filteredFaqs.map((faq) => {
              const isOpen = openQuestion === faq.question;
              return (
                <article className="faq-item" key={faq.question}>
                  <button className="faq-item__question" onClick={() => setOpenQuestion(isOpen ? "" : faq.question)}>
                    <span className="faq-item__title">
                      <span className="faq-item__icon">{faq.icon}</span>
                      <span><small>{faq.categoryLabel}</small><strong>{faq.question}</strong></span>
                    </span>
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-item__answer">
                      <p>{faq.answer}</p>
                      <button onClick={() => onNavigate("atendimento")}>Ainda preciso de ajuda →</button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
