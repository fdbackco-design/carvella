import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  content: string;
  avatar?: string;
}

export default function ReviewCard({ name, rating, content, avatar }: ReviewCardProps) {
  return (
    <Card className="bg-card rounded-lg p-4 sm:p-6 shadow-lg touch-target-comfortable" data-testid={`card-review-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      <CardContent className="p-0">
        <div className="flex items-center mb-3 sm:mb-4">
          {avatar && (
            <img
              src={avatar}
              alt={`${name}의 프로필`}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover flex-shrink-0"
              data-testid={`img-reviewer-${name.replace(/\s+/g, '-').toLowerCase()}`}
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-responsive-sm sm:text-responsive-base font-semibold truncate" data-testid={`text-reviewer-name-${name.replace(/\s+/g, '-').toLowerCase()}`}>
              {name}
            </h4>
            <div className="flex text-accent mt-1" data-testid={`rating-${name.replace(/\s+/g, '-').toLowerCase()}`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? "fill-current" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-responsive-xs sm:text-responsive-sm text-muted-foreground leading-relaxed" data-testid={`text-review-content-${name.replace(/\s+/g, '-').toLowerCase()}`}>
          "{content}"
        </p>
      </CardContent>
    </Card>
  );
}
