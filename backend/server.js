const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/formulario", async (req, res) => {
  const { nome, idade, motivacao } = req.body;
  if (!nome || !idade || !motivacao) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  const webhookUrl = "https://discord.com/api/webhooks/1370919065039798393/9mMrD1I1pUM_XUkhqZSbTuJ7PI3ckDErixbioyOdyZcN3qLPp-Gga4Q-GYTRI9cD8Cv8";

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📥 **Novo Formulário de Recrutamento**\n👤 Nome: ${nome}\n📅 Idade: ${idade}\n📝 Motivação: ${motivacao}`,
      }),
    });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao enviar para o Discord." });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
