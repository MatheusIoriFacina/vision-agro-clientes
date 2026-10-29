import { useState } from "react";
import Header from "./components/Header";
import Assistant from "./components/Assistant";
import Home from "./pages/Home";
import Ajuda from "./pages/Ajuda";
import Atendimento from "./pages/Atendimento";
import Avaliacao from "./pages/Avaliacao";
import "./styles.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [assistantOpen, setAssistantOpen] = useState(false);

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPage() {
    if (currentPage === "ajuda") {
      return <Ajuda onNavigate={navigate} onOpenAssistant={() => setAssistantOpen(true)} />;
    }

    if (currentPage === "atendimento") {
      return <Atendimento onNavigate={navigate} onOpenAssistant={() => setAssistantOpen(true)} />;
    }

    if (currentPage === "avaliacao") {
      return <Avaliacao onNavigate={navigate} />;
    }

    return <Home onNavigate={navigate} onOpenAssistant={() => setAssistantOpen(true)} />;
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={navigate} />

      {renderPage()}

      <footer className="footer">
        <div>
          <strong>VISION AGRO</strong>
          <span>Tecnologia que impulsiona o campo</span>
        </div>

        <span>Módulo Clientes</span>
      </footer>

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
