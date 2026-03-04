import { Product } from "@/lib/products";
import { useCart } from "@/store/useCart";

type Props = {
  product: Product;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-aurora-gold" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product}) {
  const add = useCart((s) => s.add);

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3 bg-white shadow-sm hover:shadow-md transition w-full max-w-sm mx-auto">
      {/* Imagem real do produto */}
      <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
        {product?.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">Imagem indisponível</span>
    )}

      </div>

      <h3 className="font-semibold">{product.name}</h3>

      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">
          R${(Number(product.price) || 0).toFixed(2)}</p>
        {product.rating !== undefined && (
        <p className="text-yellow-500"> ⭐ {product.rating}</p>

        )}
      </div>

      <button
        onClick={() => add(product)}
        className="mt-auto bg-aurora-blue text-white rounded-md py-2 font-medium hover:bg-aurora-purple transition"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
