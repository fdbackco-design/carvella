import { Card, CardContent } from "@/components/ui/card";
import ResponsiveImage from "@/components/ui/responsive-image";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ title, description, image, className = "", priority = false }: ProductCardProps) {
  return (
    <Card className={`product-hover bg-card rounded-lg overflow-hidden shadow-lg touch-target-comfortable ${className}`} data-testid={`card-product-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <ResponsiveImage
        src={image}
        alt={title}
        aspectRatio="aspect-[4/3]"
        className="transition-transform duration-300 hover:scale-105"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        data-testid={`img-product-${title.replace(/\s+/g, '-').toLowerCase()}`}
      />
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
