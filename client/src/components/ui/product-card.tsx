import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  className?: string;
}

export default function ProductCard({ title, description, price, image, className = "" }: ProductCardProps) {
  return (
    <Card className={`product-hover bg-card rounded-lg overflow-hidden shadow-lg ${className}`} data-testid={`card-product-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover" 
        data-testid={`img-product-${title.replace(/\s+/g, '-').toLowerCase()}`}
      />
      <CardContent className="p-6">
        <h4 className="text-2xl font-serif font-semibold mb-2" data-testid={`text-product-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </h4>
        <p className="text-muted-foreground mb-4" data-testid={`text-product-description-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {description}
        </p>
        <span className="text-primary font-semibold" data-testid={`text-product-price-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {price}
        </span>
      </CardContent>
    </Card>
  );
}
