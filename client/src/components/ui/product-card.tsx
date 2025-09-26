import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export default function ProductCard({ title, description, image, className = "" }: ProductCardProps) {
  return (
    <Card className={`product-hover bg-card rounded-lg overflow-hidden shadow-lg touch-target-comfortable ${className}`} data-testid={`card-product-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          data-testid={`img-product-${title.replace(/\s+/g, '-').toLowerCase()}`}
        />
      </div>
      <CardContent className="p-4 sm:p-6">
        <h4 className="text-responsive-lg sm:text-responsive-xl font-serif font-semibold mb-2 leading-tight" data-testid={`text-product-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </h4>
        <p className="text-responsive-sm sm:text-responsive-base text-muted-foreground mb-0" data-testid={`text-product-description-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
