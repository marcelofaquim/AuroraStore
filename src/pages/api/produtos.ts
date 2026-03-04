import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const produtoSchema = z.object({
    nome: z.string().min(2, "Nome Obrigatório"),
    preco: z.number().positive("Preço deve ser positivo"),
});

let produtos = [
    { id: "1", nome: "Camiseta Aurora", preco: 79.9},
    { id: "2", nome: "Moletom Aurora", preco: 149.9},
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET")  {
        return res.status(200).json(produtos);
    }


    if (req.method === "POST") {
        try {
            const body = produtoSchema.parse({
               nome: req.body.nome,
               preco: Number(req.body.preco),
            });    
        
            const novo = {
                id: String(produtos.length + 1), // gera id como string 
                nome: body.nome, 
                preco: Number(body.preco),
        };

        produtos.push(novo);
        return res.status(201).json(novo);
    } catch (error) {
        return res.status(400).json({ message: "Dados inválidos", error });
    }
} 

    if (req.method === "DELETE") {
        const id = String(req.query.id);
        const produtoExcluido = produtos.find((p) => p.id === id);

        if(!produtoExcluido) {
            return res.status(200).json({ message: "Produto não encontrado"});    
        }

        produtos = produtos.filter((p) => p.id !== id);
        return res.status(200).json({ message: "Produto excluido", produto: produtoExcluido})

        
    }

    if (req.method === "PUT") {
        const { id, nome, preco } = req.body;
        const index = produtos.findIndex((p) => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Produto não encontrado"});
        };

        produtos[index] = { id, nome, preco };
        return res.status(200).json(produtos[index]);
    }

    return res.status(405).json({ message: "Método não permitido "});

};

