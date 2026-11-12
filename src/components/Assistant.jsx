import { useState } from "react";

const initialMessages = [
  { from: "bot", text: "Olá! 👋 Sou o Assistente Vision. Posso resolver sua dúvida ou encaminhar você para nossa equipe." },
  { from: "bot", text: "Como posso ajudar hoje?" },
];

export default function Assistant({ onClose, onHumanSupport }) {
  const [messages, setMessages] = useState(initialMessages);
  const [stage, setStage] = useState("start");

  function addConversation(userText, botText, nextStage = "human") {
    setMessages((prev) => [...prev, { from: "user", text: userText }, { from: "bot", text: botText }]);
    setStage(nextStage);
  }

  function reset() {
    setMessages(initialMessages);
    setStage("start");
  }

  return (
    <div className="assistant-overlay">
      <section className="assistant">
        <header className="assistant__header">
          <div><strong>Assistente Vision</strong><span>Atendimento virtual</span></div>
          <button className="icon-button" onClick={onClose} aria-label="Fechar assistente">✕</button>
        </header>

        <div className="assistant__messages">
          {messages.map((message, index) => <div key={index} className={`message ${message.from === "user" ? "message--user" : "message--bot"}`}>{message.text}</div>)}
        </div>

        <div className="assistant__actions">
          {stage === "start" && (
            <>
              <button onClick={() => addConversation("Estou com um problema técnico.", "Certo. Qual situação mais se parece com o seu problema?", "technical")}>🚜 Problema técnico</button>
              <button onClick={() => addConversation("Quero informações sobre um pedido.", "Posso orientar sobre o pedido ou encaminhar você para a equipe de atendimento.")}>📦 Pedido ou entrega</button>
              <button onClick={() => addConversation("Tenho uma dúvida sobre pagamento.", "Para questões financeiras, nossa equipe pode verificar seu caso com mais segurança.")}>💳 Pagamento</button>
              <button onClick={() => addConversation("Preciso de ajuda com minha conta.", "Você pode revisar seus dados em Meu Perfil. Se o problema for acesso, nossa equipe também pode ajudar.")}>👤 Minha conta</button>
              <button className="assistant__human" onClick={onHumanSupport}>💬 Falar com atendente</button>
            </>
          )}

          {stage === "technical" && (
            <>
              <button onClick={() => addConversation("Meu equipamento está offline.", "Verifique energia e conexão, reinicie o equipamento e aguarde alguns minutos. Se continuar offline, posso encaminhar para um atendente.")}>Equipamento offline</button>
              <button onClick={() => addConversation("Meu equipamento não liga.", "Confira alimentação elétrica, cabos e tomada. Se estiver tudo conectado, o ideal é falar com nossa equipe.")}>Equipamento não liga</button>
              <button className="assistant__human" onClick={onHumanSupport}>💬 Prefiro falar com atendente</button>
            </>
          )}

          {stage === "human" && (
            <>
              <button className="assistant__human assistant__human--full" onClick={onHumanSupport}>💬 Falar com nossa equipe</button>
              <button onClick={reset}>↺ Fazer outra pergunta</button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
