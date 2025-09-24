import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { apiRequest, queryClient } from "@/lib/queryClient";
import ReviewCard from "@/components/ui/review-card";
import type { Review } from "@shared/schema";

const reviewFormSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상 입력해주세요"),
  rating: z.number().min(1).max(5),
  content: z.string().min(10, "후기는 10글자 이상 작성해주세요")
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export default function Reviews() {
  const { toast } = useToast();
  
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"]
  });

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "리뷰가 등록되었습니다",
        description: "소중한 후기 감사합니다!"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      form.reset();
    },
    onError: () => {
      toast({
        title: "오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive"
      });
    }
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      rating: 5,
      content: ""
    }
  });

  const onSubmit = (data: ReviewFormData) => {
    mutation.mutate(data);
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
        
        {/* Review Form */}
        <Card className="bg-card rounded-lg p-8" data-testid="card-review-form">
          <CardContent className="p-0">
            <h3 className="text-2xl font-serif font-semibold mb-6" data-testid="text-review-form-title">
              리뷰 작성하기
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="이름을 입력해주세요" 
                            {...field} 
                            data-testid="input-review-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>평점</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-review-rating">
                              <SelectValue placeholder="평점을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">⭐⭐⭐⭐⭐ 5점</SelectItem>
                            <SelectItem value="4">⭐⭐⭐⭐ 4점</SelectItem>
                            <SelectItem value="3">⭐⭐⭐ 3점</SelectItem>
                            <SelectItem value="2">⭐⭐ 2점</SelectItem>
                            <SelectItem value="1">⭐ 1점</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>후기 내용</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="제품 사용 후기를 자세히 알려주세요"
                          {...field}
                          data-testid="textarea-review-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold"
                  disabled={mutation.isPending}
                  data-testid="button-submit-review"
                >
                  {mutation.isPending ? "등록 중..." : "리뷰 등록"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
