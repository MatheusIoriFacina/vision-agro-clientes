export default function HelpCard({ icon, title, description, buttonText, onClick, highlight = false }) {
  return (
    <article className={`help-card ${highlight ? "help-card--highlight" : ""}`}>
      <div className="help-card__icon">{icon}</div>

      <div className="help-card__content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button className="help-card__button" onClick={onClick}>
        {buttonText}
        <span>→</span>
      </button>
    </article>
  );
}
