import logoVisionAgro from "../assets/vision-agro-logo.png";

export default function Header({ currentPage, profile, onNavigate }) {
  const items = [
    { id: "home", label: "Início" },
    { id: "ajuda", label: "Central de ajuda" },
    { id: "clientes", label: "Clientes" },
    { id: "atendimento", label: "Fale conosco" },
    { id: "avaliacao", label: "Avaliações" },
  ];

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="Voltar ao início">
          <div className="brand__logo">
            <img src={logoVisionAgro} alt="Vision Agro" />
          </div>

          <div className="brand__text">
            <h1>VISION AGRO</h1>
            <span>PORTAL DO CLIENTE</span>
          </div>
        </button>

        <nav className="nav" aria-label="Navegação do Portal do Cliente">
          {items.map((item) => (
            <button
              key={item.id}
              className={`nav__item ${currentPage === item.id ? "nav__item--active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="account-button" onClick={() => onNavigate("perfil")}> 
          <img className="account-button__avatar" src={profile.avatar} alt={`Foto de ${profile.name}`} />
          <span className="account-button__text">
            <strong>{profile.name}</strong>
            <small>Meu perfil</small>
          </span>
        </button>
      </div>
    </header>
  );
}
