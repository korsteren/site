import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const Promotions = () => {
  // For now, showing featured products as promotions
  const promotionalProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-neon-green text-background">Promoções Ativas</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Ofertas por tempo limitado
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Promoções e Ofertas</h1>
          <p className="text-muted-foreground">
            Aproveite as melhores ofertas em produtos de tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promotionalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
