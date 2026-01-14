
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AppSection {
  HOME = 'home',
  CATALOG = 'catalog',
  VERIFICATION = 'verification'
}
