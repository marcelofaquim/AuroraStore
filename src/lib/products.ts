export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number; // 0 a 5
  image?: string;
};

export const products: Product[] = [
  { id: "1", name: "Camiseta Aurora", price: 79.9, rating: 4, image: "/placeholder.png" },
  { id: "2", name: "Mochila Boreal", price: 199.9, rating: 5, image: "/placeholder.png" },
  { id: "3", name: "Tênis Lumine", price: 299.9, rating: 4, image: "/placeholder.png" },
  { id: "4", name: "Boné Prisma", price: 59.9, rating: 3, image: "/placeholder.png" }
];