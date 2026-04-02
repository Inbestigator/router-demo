export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export interface ProductsRes {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Toast {
  id: string;
  style: "Danger" | "Success" | "Secondary" | "Primary";
  content: string;
  link?: string;
  emoji?: string;
  delay?: number;
}
