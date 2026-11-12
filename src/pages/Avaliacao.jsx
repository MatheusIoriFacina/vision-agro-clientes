import { useMemo, useState } from "react";
import seloVision from "../assets/selo-vision-agro-2026.png";

export default function Avaliacao({ reviews, profile, onAddReview, onNavigate }) {
  const [rating, setRating] = useState(5);
  const [highlight, setHighlight] = useState("Agilidade no atendimento");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const average = useMemo(() => {
    if (!reviews.length) return "5,0";
    return (reviews.reduce((total, item) => total + item.rating, 0) / reviews.length).toFixed(1).replace(".", ",");
  }, [reviews]);

  function submitEvaluation(event) {
    event.preventDefault();
    onAddReview({ rating, highlight, comment });
    setSent(true);
    setComment("");
  }

  return (
    <main className="page">
      <section className="page-heading evaluation-heading">
        <div className="evaluation-heading__copy">
          <span className="eyebrow">VISION AGRO / AVALIAÇÕES</span>
          <h2>Sua opinião faz a diferença.</h2>
          <p>Veja como nossos clientes avaliam a experiência de atendimento e compartilhe também a sua opinião.</p>
        </div>

        <div className="evaluation-heading__seal" aria-label="Selo Vision Agro de qualidade no atendimento">
          <img src={seloVision} alt="Selo Vision Agro 2026 - Atendimento de Confiança" />
        </div>
      </section>

      <section className="trust-seals" aria-label="Selos de confiança demonstrativos">
        <div className="quality-seal"><div className="quality-seal__mark">★</div><div><strong>4,8/5</strong><span>Atendimento bem avaliado</span></div></div>
        <div className="quality-seal"><div className="quality-seal__mark">✓</div><div><strong>Cliente verificado</strong><span>Avaliações identificadas</span></div></div>
        <div className="quality-seal quality-seal--image"><img src={seloVision} alt="Miniatura do selo Vision Agro 2026" /><div><strong>Selo Vision 2026</strong><span>Qualidade no suporte</span></div></div>
      </section>

      <section className="evaluation-layout">
        <div className="evaluation-summary">
          <span className="eyebrow">SATISFAÇÃO DOS CLIENTES</span>
          <div className="evaluation-summary__score"><strong>{average}</strong><div><span className="stars">★★★★★</span><small>{reviews.length} avaliações demonstrativas</small></div></div>
          <div className="evaluation-stat"><span>Clientes satisfeitos</span><strong>96%</strong></div>
          <div className="evaluation-stat"><span>Atendimentos bem avaliados</span><strong>92%</strong></div>
          <div className="evaluation-stat"><span>Recomendariam a Vision Agro</span><strong>94%</strong></div>
          <p className="evaluation-summary__note">Indicadores ilustrativos para apresentação acadêmica.</p>
        </div>

        <form className="evaluation-form" onSubmit={submitEvaluation}>
          <div className="evaluation-form__profile"><img src={profile.avatar} alt={`Foto de ${profile.name}`} /><div><span className="eyebrow">AVALIE SEU ATENDIMENTO</span><h3>{profile.name}, como foi sua experiência?</h3></div></div>
          <div className="rating-picker">{[1,2,3,4,5].map((star) => <button key={star} type="button" className={star <= rating ? "rating-star rating-star--active" : "rating-star"} onClick={() => setRating(star)}>★</button>)}</div>
          <div className="rating-label">{rating === 1 && "Muito insatisfeito"}{rating === 2 && "Insatisfeito"}{rating === 3 && "Regular"}{rating === 4 && "Satisfeito"}{rating === 5 && "Muito satisfeito"}</div>
          <label>O que mais gostou no atendimento?<select value={highlight} onChange={(e) => setHighlight(e.target.value)}><option>Agilidade no atendimento</option><option>Clareza nas orientações</option><option>Solução do problema</option><option>Cordialidade da equipe</option></select></label>
          <label>Quer deixar algum comentário?<textarea rows="5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Conte brevemente como foi sua experiência..." /></label>
          <button className="primary-button" type="submit">Enviar avaliação</button>
          {sent && <div className="success-inline">✓ Avaliação publicada abaixo como “Sua avaliação”.</div>}
        </form>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">O QUE NOSSOS CLIENTES DIZEM</span><h3>Experiências recentes</h3></div></div>
        <div className="testimonial-grid">
          {reviews.map((review) => (
            <article className={`testimonial-card ${review.isOwn ? "testimonial-card--own" : ""}`} key={review.id}>
              <div className="testimonial-card__header">
                <img src={review.avatar} alt={`Foto ilustrativa de ${review.name}`} />
                <div><strong>{review.name}</strong><small>{review.role}</small></div>
                {review.isOwn && <span className="own-badge">Sua avaliação</span>}
              </div>
              <span className="stars">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
              <span className="review-highlight">✓ {review.highlight}</span>
              <p>“{review.comment}”</p>
              <div className="review-footer"><span>✓ Cliente verificado</span><small>{review.date}</small></div>
            </article>
          ))}
        </div>
      </section>

      <div className="center-action"><button className="secondary-button" onClick={() => onNavigate("clientes")}>Conhecer clientes Vision Agro</button></div>
    </main>
  );
}
