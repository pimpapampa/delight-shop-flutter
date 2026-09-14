import cupcakes from "@/assets/vanilla-cupcakes.jpg";
import chocolate from "@/assets/chocolate-bars.jpg";
import strawberry from "@/assets/strawberry-cake.jpg";
import matcha from "@/assets/matcha-latte.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  image: string;
  description: string;
};

export const categories = [
  { slug: "flour-grains", name: "Flour & Grains", image: cupcakes, tone: "bg-category-flour" },
  { slug: "baking-tools", name: "Baking Tools", image: strawberry, tone: "bg-category-tools" },
  { slug: "sweet-treats", name: "Sweet Treats", image: chocolate, tone: "bg-category-sweets" },
  { slug: "drink-mixes", name: "Drink Mixes", image: matcha, tone: "bg-category-drinks" },
] as const;

export const products: Product[] = [
  { id: "vanilla-cloud-cupcakes", name: "Vanilla Cloud Cupcakes", category: "sweet-treats", categoryLabel: "Sweet Treats", price: 18, image: cupcakes, description: "Four tender vanilla cakes finished with silky vanilla buttercream. Baked fresh in small batches." },
  { id: "gourmet-chocolate-bars", name: "Gourmet Chocolate Bars", category: "sweet-treats", categoryLabel: "Sweet Treats", price: 14, image: chocolate, description: "Deep cocoa chocolate bars with a soft, brownie-like center and a delicate snap." },
  { id: "strawberry-celebration-cake", name: "Strawberry Celebration Cake", category: "sweet-treats", categoryLabel: "Sweet Treats", price: 42, image: strawberry, description: "A light vanilla cake layered with fresh cream and crowned with ripe strawberries." },
  { id: "iced-matcha-latte", name: "Iced Matcha Latte", category: "drink-mixes", categoryLabel: "Drink Mixes", price: 9, image: matcha, description: "Ceremonial matcha blended for a smooth, mellow latte with a clean finish." },
  { id: "cake-flour-blend", name: "Signature Cake Flour", category: "flour-grains", categoryLabel: "Flour & Grains", price: 12, image: cupcakes, description: "Our fine-milled flour blend for an exceptionally soft and even crumb." },
  { id: "mixing-bowl-set", name: "Baker's Mixing Bowl", category: "baking-tools", categoryLabel: "Baking Tools", price: 26, image: strawberry, description: "A sturdy everyday bowl made for whisking, folding, and sharing recipes." },
  { id: "cocoa-baking-mix", name: "Dark Cocoa Baking Mix", category: "flour-grains", categoryLabel: "Flour & Grains", price: 15, image: chocolate, description: "A rich cocoa blend for brownies, cookies, and deeply chocolate cakes." },
  { id: "matcha-cake-mix", name: "Matcha Cake Mix", category: "drink-mixes", categoryLabel: "Drink Mixes", price: 13, image: matcha, description: "Earthy matcha balanced with just enough sweetness for cakes and drinks." },
];

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;