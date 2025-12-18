// pages/cart.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/store/useCart";

export default function CartPage() {
  const { items, remove, clear, total } = useCart();

  return (
    <>
      <Head>
        <title>Carrinho — AuroraStore</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

        {items.length === 0 ? (
          <p className="text-gray-600">Seu carrinho está vazio.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold">
                    R${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => remove(item.product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-bold">Total: R${total().toFixed(2)}</p>
              <div className="flex gap-4">
                <button
                  onClick={clear}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Limpar
                </button>
                <button
                  className="bg-aurora.purple text-white px-4 py-2 rounded-md hover:bg-aurora.blue"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
