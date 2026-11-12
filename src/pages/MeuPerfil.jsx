import { useState } from "react";

export default function MeuPerfil({ profile, onSaveProfile, onNavigate }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  function updateField(field, value) {
    setSaved(false);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 500;
        const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        updateField("avatar", canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function submit(event) {
    event.preventDefault();
    onSaveProfile(form);
    setSaved(true);
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">VISION AGRO / MEU PERFIL</span>
          <h2>Seu Perfil</h2>
          <p>Personalize seu perfil conforme desejar.</p>
        </div>
        <button className="secondary-button" onClick={() => onNavigate("home")}>Voltar ao início</button>
      </section>

      <section className="my-profile-layout">
        <aside className="profile-photo-panel">
          <img src={form.avatar} alt={`Foto de ${form.name}`} />
          <h3>{form.name}</h3>
          <p>{form.farm}</p>
          <label className="upload-button">Trocar foto<input type="file" accept="image/*" onChange={handlePhoto} /></label>
          <small>Selecione uma imagem para sua foto de perfil</small>
        </aside>

        <form className="profile-form" onSubmit={submit}>
          <div className="form-section-title"><span className="eyebrow">DADOS DO CLIENTE</span><h3>Informações principais</h3></div>
          <div className="form-grid">
            <label>Nome completo<input value={form.name} onChange={(e) => updateField("name", e.target.value)} /></label>
            <label>Perfil<input value={form.role} onChange={(e) => updateField("role", e.target.value)} /></label>
            <label>Fazenda / propriedade<input value={form.farm} onChange={(e) => updateField("farm", e.target.value)} /></label>
            <label>Cidade<input value={form.city} onChange={(e) => updateField("city", e.target.value)} /></label>
            <label>Telefone<input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></label>
            <label>E-mail<input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></label>
            <label>Produção<input value={form.crops} onChange={(e) => updateField("crops", e.target.value)} /></label>
            <label>Relacionamento<input value={form.since} onChange={(e) => updateField("since", e.target.value)} /></label>
          </div>
          <label>Sobre você<textarea rows="4" value={form.bio} onChange={(e) => updateField("bio", e.target.value)} /></label>

          {saved && <div className="success-inline">✓ Perfil atualizado com sucesso. O cabeçalho também foi atualizado.</div>}
          <div className="form-actions"><button className="primary-button" type="submit">Salvar alterações</button></div>
        </form>
      </section>
    </main>
  );
}
