import express from "express";
import { listarEquipamentos } from "./service.js";

const app = express();

app.use(express.json());

app.get("/equipamentos", async (req, res) => {
    try {
        const equipamentos = await listarEquipamentos();

        res.json(equipamentos);
    } catch (error) {
        console.error("Erro ao consultar o banco:", error);

        res.status(500).json({
            erro: "Erro ao consultar o banco de dados"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});