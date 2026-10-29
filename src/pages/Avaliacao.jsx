import { useState } from "react";

export default function Avaliacao({ onNavigate }) {
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);

  function submitEvaluation(event) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <main className="page">
        <section className="evaluation-success">
          <div className="evaluation-success__icon">✓</div>
          <span className="eyebrow">AVALIAÇÃO ENVIADA</span>
          <h2>Obrigado pela sua avaliação!</h2>
          <p>
            Sua opinião ajuda a Vision Agro a melhorar o atendimento e oferecer uma experiência
            cada vez melhor aos produtores rurais.
          </p>

          <div className="evaluation-success__stars">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>

          <button className="primary-button" onClick={() => onNavigate("home")}>
            Voltar ao início
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / AVALIAÇÕES</span>
          <h2>Sua opinião faz a diferença.</h2>
          <p>
            Avalie sua experiência com o atendimento da Vision Agro. É rápido e nos ajuda
            a melhorar continuamente.
          </p>
        </div>
      </section>

      <section className="evaluation-layout">
        <div className="evaluation-summary">
          <span className="eyebrow">SATISFAÇÃO DOS CLIENTES</span>

          <div className="evaluation-summary__score">
            <strong>4,8</strong>
            <div>
              <span className="stars">★★★★★</span>
              <small>com base nas avaliações recebidas</small>
            </div>
          </div>

          <div className="evaluation-stat">
            <span>Clientes satisfeitos</span>
            <strong>96%</strong>
          </div>

          <div className="evaluation-stat">
            <span>Atendimentos bem avaliados</span>
            <strong>92%</strong>
          </div>

          <p className="evaluation-summary__note">
            Dados ilustrativos utilizados apenas para demonstração do protótipo acadêmico.
          </p>
        </div>

        <form className="evaluation-form" onSubmit={submitEvaluation}>
          <span className="eyebrow">AVALIE SEU ATENDIMENTO</span>
          <h3>Como foi sua experiência?</h3>

          <div className="rating-picker">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={star <= rating ? "rating-star rating-star--active" : "rating-star"}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          <div className="rating-label">
            {rating === 1 && "Muito insatisfeito"}
            {rating === 2 && "Insatisfeito"}
            {rating === 3 && "Regular"}
            {rating === 4 && "Satisfeito"}
            {rating === 5 && "Muito satisfeito"}
          </div>

          <label>
            O que mais gostou no atendimento?
            <select defaultValue="agilidade">
              <option value="agilidade">Agilidade no atendimento</option>
              <option value="clareza">Clareza nas orientações</option>
              <option value="solucao">Solução do problema</option>
              <option value="cordialidade">Cordialidade da equipe</option>
            </select>
          </label>

          <label>
            Quer deixar algum comentário?
            <textarea rows="5" placeholder="Conte brevemente como foi sua experiência..." />
          </label>

          <button className="primary-button" type="submit">
            Enviar avaliação
          </button>
        </form>
      </section>

      <section className="testimonial-section">
        <div className="section__heading">
          <div>
            <span className="eyebrow">O QUE NOSSOS CLIENTES DIZEM</span>
            <h3>Experiências recentes</h3>
          </div>
        </div>

        <div className="testimonial-grid">
          <article className="testimonial-card">
            <span className="stars">★★★★★</span>
            <p>“O atendimento foi rápido e consegui resolver minha dúvida sem complicação.”</p>
            <strong>Carlos Mendes</strong>
            <small>Produtor rural</small>
          </article>

          <article className="testimonial-card">
            <span className="stars">★★★★★</span>
            <p>“Gostei das orientações. O suporte explicou tudo de forma simples.”</p>
            <strong>Mariana Souza</strong>
            <small>Produtora rural</small>
          </article>

          <article className="testimonial-card">
            <span className="stars">★★★★☆</span>
            <p>“O problema foi resolvido e o atendimento foi muito atencioso.”</p>
            <strong>Roberto Lima</strong>
            <small>Produtor rural</small>
          </article>
        </div>
      </section>
    </main>
  );
}
