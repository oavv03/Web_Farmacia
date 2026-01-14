
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Analgésicos',
    price: 5.50,
    description: 'Efectivo para el alivio del dolor leve a moderado y la fiebre.',
    image: 'https://www.mccabespharmacy.com/cdn/shop/files/PfizerParacetamol500mgFilmCoatedTablets24Pack.jpg?v=1704467734&width=2000',
    stock: 50
  },
  {
    id: '2',
    name: 'Ibuprofeno 400mg',
    category: 'Antiinflamatorios',
    price: 8.20,
    description: 'Alivio de dolores musculares, articulares y menstruales.',
    image: 'https://calox.com/wp-content/uploads/2025/11/Ibuprofeno-400.webp',
    stock: 45
  },
  {
    id: '3',
    name: 'Vitamina C + Zinc',
    category: 'Suplementos',
    price: 15.00,
    description: 'Refuerza el sistema inmunológico con esta combinación esencial de micronutrientes.',
    image: 'https://farmaspanama.com/854-large_default/cebion-zinc-x-10-tabletas-efervecentes.jpg',
    stock: 30
  },
  {
    id: '4',
    name: 'Protector Solar FPS 50+',
    category: 'Dermocosmética',
    price: 25.00,
    description: 'Protección alta contra rayos UVA/UVB, fórmula ligera y no grasa.',
    image: 'https://cruzrosa.mx/cdn/shop/products/LIFTACTIVSPECIALISTB3SERUM30ML_21.jpg?v=1677094271&width=1200',
    stock: 20
  },
  {
    id: '5',
    name: 'Jarabe para la Tos',
    category: 'Respiratorio',
    price: 12.50,
    description: 'Alivio rápido para la tos seca e irritativa. Sabor suave.',
    image: 'https://farmaspanama.com/4586-large_default/vick-44-jarabe-para-tos-seca-y-flema-120ml.jpg',
    stock: 15
  },
  {
    id: '6',
    name: 'Alcohol en Gel 500ml',
    category: 'Higiene',
    price: 4.00,
    description: 'Desinfectante de manos de secado rápido enriquecido con aloe vera.',
    image: 'https://www.masterdirect.com/cdn/shop/products/GelAlcoholado500-envirosep_600x.png?v=1634330936',
    stock: 100
  }
];
