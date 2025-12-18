// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API do portfólio rodando" });
});

// Endpoint para criar mensagem de contato
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios ausentes." });
    }

    const query = `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, message, created_at;
    `;

    const values = [name, email, message];

    const result = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao salvar mensagem:", err);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// (Opcional) listar mensagens
app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Erro ao listar mensagens:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
