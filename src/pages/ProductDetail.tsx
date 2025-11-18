import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/produtos">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/produtos">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para produtos
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary border border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              {product.inStock ? (
                <p className="text-neon-green flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Em estoque
                </p>
              ) : (
                <p className="text-destructive">Indisponível</p>
              )}
            </div>

            <div className="border-t border-b border-border py-6">
              <p className="text-4xl font-bold text-neon-blue mb-2">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                ou 12x de {formatPrice(product.price / 12)} sem juros
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Descrição</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.specs && product.specs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Especificações</h2>
                <ul className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-lg h-12"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="sm:w-auto border-primary text-primary hover:bg-primary/10 h-12"
                disabled={!product.inStock}
              >
                Comprar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
