import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ReviewCard from "@/components/ui/review-card";
import type { Review } from "@shared/schema";
import staticReviews from "@/data/reviews.json";

const reviewFormSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상 입력해주세요"),
  rating: z.number().min(1).max(5),
  content: z.string().min(10, "후기는 10글자 이상 작성해주세요")
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export default function Reviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 정적 리뷰 데이터 로드
    const loadReviews = () => {
      const localReviews = localStorage.getItem('carbella-reviews');
      
      // JSON 데이터의 날짜 문자열을 Date 객체로 변환
      const convertedStaticReviews = staticReviews.map(review => ({
        ...review,
        createdAt: new Date(review.createdAt)
      }));
      
      if (localReviews) {
        const parsedReviews = JSON.parse(localReviews);
        setReviews([...convertedStaticReviews, ...parsedReviews]);
      } else {
        setReviews(convertedStaticReviews);
      }
      setIsLoading(false);
    };

    loadReviews();
  }, []);

  const submitReview = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      const newReview: Review = {
        id: Date.now().toString(),
        name: data.name,
        rating: data.rating,
        content: data.content,
        createdAt: new Date()
      };

      // 로컬 스토리지에 추가 리뷰 저장
      const existingReviews = localStorage.getItem('carbella-reviews');
      const reviews = existingReviews ? JSON.parse(existingReviews) : [];
      reviews.push(newReview);
      localStorage.setItem('carbella-reviews', JSON.stringify(reviews));

      // 상태 업데이트
      setReviews(prevReviews => [...prevReviews, newReview]);

      toast({
        title: "리뷰가 등록되었습니다",
        description: "소중한 후기 감사합니다!"
      });
      form.reset();
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      rating: 5,
      content: ""
    }
  });

  const onSubmit = (data: ReviewFormData) => {
    submitReview(data);
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const customerAvatars = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  ];

  return (
    <div className="py-20 bg-background" data-testid="page-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-reviews-title">
            고객 후기
          </h2>
          <p className="text-xl text-muted-foreground italic" data-testid="text-reviews-subtitle">
            Recensioni dei Clienti
          </p>
        </div>
        
        {/* Rating Summary */}
        <Card className="bg-card rounded-lg p-8 mb-12 text-center" data-testid="card-rating-summary">
          <CardContent className="p-0">
            <div className="flex items-center justify-center mb-4">
              <div className="text-6xl font-bold text-primary mr-4" data-testid="text-average-rating">
                {averageRating.toFixed(1)}
              </div>
              <div>
                <div className="flex text-accent text-2xl mb-2" data-testid="stars-average-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.round(averageRating) ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground" data-testid="text-review-count">
                  {reviews.length}개 리뷰 기준
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        

        {/* Customer Reviews Grid */}
        {isLoading ? (
          <div className="text-center py-8" data-testid="loading-reviews">
            <p className="text-muted-foreground">리뷰를 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                rating={review.rating}
                content={review.content}
                avatar={customerAvatars[index % customerAvatars.length]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
