"use client";

import { useCart } from "@/store/useCart";

export default function CartSummary() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());

  return (
    <div className="mt-10 border-t pt-4">
      <h2 className="text-xl font-semibold text-aurora-purple mb-4">
        Carrinho
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <span>
                  {item.product.name}{" "}
                  <span className="text-sm text-gray-500">
                    (x{item.quantity})
                  </span>
                </span>
                <span className="font-medium">
                  R${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>R${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
