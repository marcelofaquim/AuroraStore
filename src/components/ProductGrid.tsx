import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/lib/products";

type Props = {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500"> Nenhum produto em destaque</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.slice(0, 3).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
