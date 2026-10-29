import { useState } from "react";

const initialMessages = [
  {
    from: "bot",
    text: "Olá! 👋 Sou o Assistente Vision. Posso tentar resolver sua dúvida ou encaminhar você para nossa equipe.",
  },
  {
    from: "bot",
    text: "Como posso ajudar hoje?",
  },
];

export default function Assistant({ onClose, onHumanSupport }) {
  const [messages, setMessages] = useState(initialMessages);
  const [stage, setStage] = useState("start");

  function chooseOption(option) {
    if (option === "tecnico") {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "Estou com um problema técnico." },
        {
          from: "bot",
          text: "Certo. Qual situação mais se parece com o seu problema?",
        },
      ]);
      setStage("technical");
    }

    if (option === "pedido") {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "Quero informações sobre um pedido." },
        {
          from: "bot",
          text: "Você pode acompanhar pedidos pela área de atendimento. Se preferir, posso encaminhar você para nossa equipe.",
        },
      ]);
      setStage("human");
    }

    if (option === "pagamento") {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "Tenho uma dúvida sobre pagamento." },
        {
          from: "bot",
          text: "Entendi. Para questões financeiras, nossa equipe pode verificar o seu caso com mais segurança.",
        },
      ]);
      setStage("human");
    }

    if (option === "offline") {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "Meu equipamento está offline." },
        {
          from: "bot",
          text: "Primeiro, verifique se o equipamento está ligado e se a conexão com a internet está ativa. Depois, reinicie o equipamento e aguarde alguns minutos.",
        },
        {
          from: "bot",
          text: "Se continuar offline, posso preparar o atendimento para você não precisar explicar tudo novamente.",
        },
      ]);
      setStage("human");
    }

    if (option === "naoLiga") {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "Meu equipamento não liga." },
        {
          from: "bot",
          text: "Confira a alimentação elétrica, os cabos e a tomada. Se estiver tudo conectado e ainda assim não ligar, o ideal é falar com nossa equipe.",
        },
      ]);
      setStage("human");
    }
  }

  return (
    <div className="assistant-overlay">
      <section className="assistant">
        <header className="assistant__header">
          <div>
            <strong>Assistente Vision</strong>
            <span>Atendimento virtual</span>
          </div>

          <button className="icon-button" onClick={onClose} aria-label="Fechar assistente">
            ✕
          </button>
        </header>

        <div className="assistant__messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.from === "user" ? "message--user" : "message--bot"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="assistant__actions">
          {stage === "start" && (
            <>
              <button onClick={() => chooseOption("tecnico")}>🚜 Problema técnico</button>
              <button onClick={() => chooseOption("pedido")}>📦 Pedido ou entrega</button>
              <button onClick={() => chooseOption("pagamento")}>💳 Pagamento</button>
              <button className="assistant__human" onClick={onHumanSupport}>
                💬 Falar com atendente
              </button>
            </>
          )}

          {stage === "technical" && (
            <>
              <button onClick={() => chooseOption("offline")}>Equipamento offline</button>
              <button onClick={() => chooseOption("naoLiga")}>Equipamento não liga</button>
              <button className="assistant__human" onClick={onHumanSupport}>
                💬 Prefiro falar com atendente
              </button>
            </>
          )}

          {stage === "human" && (
            <button className="assistant__human assistant__human--full" onClick={onHumanSupport}>
              💬 Falar com nossa equipe
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
