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
    <Card className="bg-card rounded-lg p-6 shadow-lg" data-testid={`card-review-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          {avatar && (
            <img
              src={avatar}
              alt={`${name}의 프로필`}
              className="w-12 h-12 rounded-full mr-4 object-cover"
              data-testid={`img-reviewer-${name.replace(/\s+/g, '-').toLowerCase()}`}
            />
          )}
          <div>
            <h4 className="font-semibold" data-testid={`text-reviewer-name-${name.replace(/\s+/g, '-').toLowerCase()}`}>
              {name}
            </h4>
            <div className="flex text-accent" data-testid={`rating-${name.replace(/\s+/g, '-').toLowerCase()}`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "fill-current" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground" data-testid={`text-review-content-${name.replace(/\s+/g, '-').toLowerCase()}`}>
          "{content}"
        </p>
      </CardContent>
    </Card>
  );
}
