import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Assistant from "./components/Assistant";
import Home from "./pages/Home";
import Ajuda from "./pages/Ajuda";
import Atendimento from "./pages/Atendimento";
import Avaliacao from "./pages/Avaliacao";
import Clientes from "./pages/Clientes";
import ClientePerfil from "./pages/ClientePerfil";
import MeuPerfil from "./pages/MeuPerfil";
import avatarJoao from "./assets/clients/cliente-joao.png";
import avatarCarlos from "./assets/clients/cliente-carlos.png";
import avatarMariana from "./assets/clients/cliente-mariana.png";
import avatarRoberto from "./assets/clients/cliente-roberto.png";
import avatarFernanda from "./assets/clients/cliente-fernanda.png";
import "./styles.css";

const defaultProfile = {
  name: "João Silva",
  role: "Produtor rural",
  farm: "Fazenda Boa Esperança",
  city: "Dourados - MS",
  phone: "(67) 99999-0001",
  email: "joao.silva@email.com",
  crops: "Soja e milho",
  since: "Cliente desde 2024",
  bio: "Produtor focado em tecnologia aplicada à gestão da lavoura e monitoramento de campo.",
  avatar: avatarJoao,
};

const clients = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "Produtor rural",
    farm: "Fazenda Santa Clara",
    city: "Maracaju - MS",
    crops: "Soja e milho",
    since: "Cliente desde 2023",
    rating: 5,
    avatar: avatarCarlos,
    products: ["Vision Monitor X2", "Sensor Field Pro"],
    status: "Cliente ativo",
    bio: "Utiliza soluções Vision Agro para acompanhar produtividade, conectividade e indicadores da lavoura.",
  },
  {
    id: 2,
    name: "Mariana Souza",
    role: "Produtora rural",
    farm: "Estância Horizonte",
    city: "Ponta Porã - MS",
    crops: "Milho e pecuária",
    since: "Cliente desde 2024",
    rating: 5,
    avatar: avatarMariana,
    products: ["Vision Connect", "Agro Hub"],
    status: "Cliente ativo",
    bio: "Adota recursos digitais para integrar rotina da propriedade e suporte de campo.",
  },
  {
    id: 3,
    name: "Roberto Lima",
    role: "Produtor rural",
    farm: "Fazenda São Bento",
    city: "Rio Brilhante - MS",
    crops: "Soja",
    since: "Cliente desde 2022",
    rating: 4,
    avatar: avatarRoberto,
    products: ["Sensor Field Pro"],
    status: "Cliente ativo",
    bio: "Trabalha com monitoramento de talhões e abertura de chamados técnicos pelo portal.",
  },
  {
    id: 4,
    name: "Fernanda Alves",
    role: "Produtora rural",
    farm: "Sítio Primavera",
    city: "Dourados - MS",
    crops: "Hortaliças e milho",
    since: "Cliente desde 2025",
    rating: 5,
    avatar: avatarFernanda,
    products: ["Vision Connect"],
    status: "Cliente ativo",
    bio: "Usa o suporte Vision Agro para facilitar o acompanhamento dos equipamentos e da conectividade.",
  },
];

const initialReviews = [
  {
    id: 101,
    name: "Carlos Mendes",
    role: "Produtor rural",
    avatar: avatarCarlos,
    rating: 5,
    highlight: "Agilidade no atendimento",
    comment: "O atendimento foi rápido e consegui resolver minha dúvida sem complicação.",
    date: "10/11/2026",
    verified: true,
  },
  {
    id: 102,
    name: "Mariana Souza",
    role: "Produtora rural",
    avatar: avatarMariana,
    rating: 5,
    highlight: "Clareza nas orientações",
    comment: "Gostei das orientações. O suporte explicou tudo de forma simples e objetiva.",
    date: "08/11/2026",
    verified: true,
  },
  {
    id: 103,
    name: "Roberto Lima",
    role: "Produtor rural",
    avatar: avatarRoberto,
    rating: 4,
    highlight: "Solução do problema",
    comment: "O problema foi resolvido e o atendimento foi muito atencioso.",
    date: "05/11/2026",
    verified: true,
  },
];

function loadSavedProfile() {
  try {
    const saved = localStorage.getItem("visionAgroProfile");
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function loadSavedReviews() {
  try {
    const saved = localStorage.getItem("visionAgroReviews");
    return saved ? JSON.parse(saved) : initialReviews;
  } catch {
    return initialReviews;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [profile, setProfile] = useState(loadSavedProfile);
  const [reviews, setReviews] = useState(loadSavedReviews);
  const [selectedClient, setSelectedClient] = useState(clients[0]);

  useEffect(() => {
    try {
      localStorage.setItem("visionAgroProfile", JSON.stringify(profile));
    } catch {
      // O protótipo continua funcionando mesmo se o navegador bloquear o armazenamento local.
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem("visionAgroReviews", JSON.stringify(reviews));
    } catch {
      // O protótipo continua funcionando mesmo se o navegador bloquear o armazenamento local.
    }
  }, [reviews]);

  const featuredClients = useMemo(() => clients.slice(0, 3), []);

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openClient(client) {
    setSelectedClient(client);
    navigate("clientePerfil");
  }

  function saveProfile(updatedProfile) {
    setProfile(updatedProfile);
  }

  function addReview(review) {
    const newReview = {
      id: Date.now(),
      name: profile.name,
      role: profile.role,
      avatar: profile.avatar,
      rating: review.rating,
      highlight: review.highlight,
      comment: review.comment || "Atendimento muito bom e fácil de utilizar.",
      date: new Date().toLocaleDateString("pt-BR"),
      verified: true,
      isOwn: true,
    };

    setReviews((current) => [newReview, ...current.filter((item) => !item.isOwn)]);
  }

  function renderPage() {
    if (currentPage === "ajuda") {
      return <Ajuda onNavigate={navigate} onOpenAssistant={() => setAssistantOpen(true)} />;
    }

    if (currentPage === "atendimento") {
      return <Atendimento onNavigate={navigate} onOpenAssistant={() => setAssistantOpen(true)} />;
    }

    if (currentPage === "avaliacao") {
      return <Avaliacao reviews={reviews} profile={profile} onAddReview={addReview} onNavigate={navigate} />;
    }

    if (currentPage === "clientes") {
      return <Clientes clients={clients} onOpenClient={openClient} />;
    }

    if (currentPage === "clientePerfil") {
      return <ClientePerfil client={selectedClient} onNavigate={navigate} />;
    }

    if (currentPage === "perfil") {
      return <MeuPerfil profile={profile} onSaveProfile={saveProfile} onNavigate={navigate} />;
    }

    return (
      <Home
        profile={profile}
        featuredClients={featuredClients}
        onOpenClient={openClient}
        onNavigate={navigate}
        onOpenAssistant={() => setAssistantOpen(true)}
      />
    );
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} profile={profile} onNavigate={navigate} />
      {renderPage()}
      <Footer onNavigate={navigate} />

      {assistantOpen && (
        <Assistant
          onClose={() => setAssistantOpen(false)}
          onHumanSupport={() => {
            setAssistantOpen(false);
            navigate("atendimento");
          }}
        />
      )}
    </div>
  );
}
