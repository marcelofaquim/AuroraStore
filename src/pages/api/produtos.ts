import { NextApiRequest, NextApiResponse } from "next";
import { string } from "zod";

let produtos = [
    { id: "1", nome: "Camiseta Aurora", preco: 79.9},
    { id: "2", nome: "Moletom Aurora", preco: 149.9},
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET")  {
        return res.status(200).json(produtos);
    }

    if (req.method === "POST") {
        const { nome, preco } = req.body;
        const novo = {
            id:String(produtos.length + 1),
            nome,
            preco
        };
        produtos.push(novo);
        return res.status(201).json(novo);
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        produtos = produtos.filter((p) => p.id !== id);
        return res.status(200).json({ message: "Produto excluido "});
    }

    return res.status(405).json({ message: "Método não permitido "});

};

