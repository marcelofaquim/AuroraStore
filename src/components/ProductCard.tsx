import { products, type Product } from "@/lib/products";
import { useCart } from "@/store/useCart";

type Props = {
  product: Product;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-aurora.gold" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  const add = useCart((s) => s.add);

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3">
      <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
        {/* Placeholder imagem */}
        <span className="text-sm">Imagem</span>
      </div>

      <h3 className="font-semibold">{product.name}</h3>

      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">R${product.price.toFixed(2)}</p>
        <Stars rating={product.rating} />
      </div>

      <button
        onClick={() => add(product)}
        className="mt-auto bg-aurora.blue text-white rounded-md py-2 font-medium hover:bg-aurora.purple transition"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}

// Utilitário opcional para uma grid pronta
export function ProductGrid() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
