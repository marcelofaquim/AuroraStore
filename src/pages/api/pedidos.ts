import { NextApiRequest, NextApiResponse } from "next";

let pedidos = [
  { id: "1", cliente: "João", status: "Pendente", total: 250.0 },
  { id: "2", cliente: "Maria", status: "Concluído", total: 150.0 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(pedidos);
  }

  if (req.method === "POST") {
    const { cliente, status, total } = req.body;
    const novo = {
      id: String(pedidos.length + 1),
      cliente,
      status: status || "Pendente",
      total: Number(total),
    };

    pedidos.push(novo);
    return res.status(201).json(novo);
  }

  if (req.method === "PUT") {
    const { id, cliente, status, total } = req.body;
    pedidos = pedidos.map((p) =>
      p.id === id ? { ...p, cliente: cliente ?? p.cliente, status: status ?? p.status, total: total ?? p.total } : p
    );
    const atualizado = pedidos.find((p) => p.id === id);
    return res.status(200).json(atualizado);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    pedidos = pedidos.filter((p) => p.id !== id);
    return res.status(200).json({ message: "Pedido excluído" });
  }

  return res.status(405).json({ message: "Método não permitido" });
}
