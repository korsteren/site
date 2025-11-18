import { Link } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Link to={`/produto/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs text-muted-foreground">{product.category}</span>
          {product.featured && (
            <span className="ml-2 inline-flex items-center gap-1 text-xs text-neon-green">
              <Zap className="h-3 w-3 fill-neon-green" />
              Destaque
            </span>
          )}
        </div>
        
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-2xl font-bold text-neon-blue">
              {formatPrice(product.price)}
            </p>
            {product.inStock ? (
              <p className="text-xs text-neon-green">Em estoque</p>
            ) : (
              <p className="text-xs text-destructive">Indisponível</p>
            )}
          </div>
          
          <Button
            size="icon"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
