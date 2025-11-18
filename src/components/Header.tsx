import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-neon-blue fill-neon-blue group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 blur-lg bg-neon-blue/30 group-hover:bg-neon-blue/50 transition-all" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                AL Tech Store
              </h1>
              <p className="text-xs text-muted-foreground">Tecnologia de ponta</p>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 bg-secondary border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-neon-green text-background">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 pb-4 text-sm">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Início
          </Link>
          <Link to="/produtos" className="text-muted-foreground hover:text-primary transition-colors">
            Produtos
          </Link>
          <Link to="/promocoes" className="text-muted-foreground hover:text-primary transition-colors">
            Promoções
          </Link>
          <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
};
