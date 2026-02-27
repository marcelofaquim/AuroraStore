import { NextApiRequest, NextApiResponse } from "next";

let usuarios = [
    { id: "1", nome: "Admin", email: "admin@aurora.com", papel: "admin" }, 
    { id: "2", nome: "Cliente", email: "cliente@aurora.com", papel: "cliente" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return res.status(200).json(usuarios);
    }

    if (req.method === "POST") {
        const { nome, email, papel } = req.body;

        //valida se ja existe usuario com esse email
        const existente = usuarios.find((u) => u.email === email);
        if (existente) {
            return res.status(400).json({ message: "Email já cadastrado" });
        } 

        const novo = {
            id: String(usuarios.length + 1),
            nome,
            email,
            papel: papel || "cliente",
        };
        usuarios.push(novo);
        return res.status(201).json(novo);
    }

    if (req.method === "PUT") {
        const { id, papel } = req.body;
        usuarios = usuarios.map((u) =>
        u.id === id ? { ...u, papel } : u
    );
    return res.status(200).json({ message: "Papel atualizado" });
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        usuarios = usuarios.filter((u) => u.id !== id);
        return res.status(200).json({ message: "Usuario excluido" });
    }

    return res.status(405).json({ message: "Método não permitido" });
}