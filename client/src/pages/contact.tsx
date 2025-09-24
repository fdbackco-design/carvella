import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상 입력해주세요"),
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "문의 유형을 선택해주세요"),
  message: z.string().min(10, "문의 내용은 10글자 이상 작성해주세요")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "문의가 접수되었습니다",
        description: "빠른 시일 내에 답변드리겠습니다."
      });
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

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "전화번호",
      content: "02-1234-5678"
    },
    {
      icon: Mail,
      title: "이메일",
      content: "contact@carbella.kr"
    },
    {
      icon: MapPin,
      title: "주소",
      content: "서울시 강남구 테헤란로 123\n카르벨라 전시장"
    },
    {
      icon: Clock,
      title: "운영 시간",
      content: "평일 09:00 - 18:00\n토요일 10:00 - 16:00\n일요일 휴무"
    }
  ];

  const faqs = [
    {
      question: "제품 보증 기간은 어떻게 되나요?",
      answer: "모든 카르벨라 제품은 구매일로부터 10년 품질보증을 제공합니다."
    },
    {
      question: "나이프 관리는 어떻게 해야 하나요?",
      answer: "손으로 세척 후 즉시 건조시키고, 정기적인 연마 서비스를 제공합니다."
    },
    {
      question: "전국 배송이 가능한가요?",
      answer: "네, 전국 무료배송이며 2-3일 내 배송 완료됩니다."
    }
  ];

  return (
    <div className="py-20 bg-background" data-testid="page-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-contact-title">
            고객센터
          </h2>
          <p className="text-xl text-muted-foreground italic" data-testid="text-contact-subtitle">
            Servizio Clienti
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-serif font-semibold mb-8" data-testid="text-contact-info-title">
              연락처 정보
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start" data-testid={`contact-info-${index}`}>
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6" data-testid={`icon-contact-${index}`} />
                    </div>
                    <div>
                      <p className="font-semibold" data-testid={`text-contact-title-${index}`}>
                        {info.title}
                      </p>
                      <p className="text-muted-foreground whitespace-pre-line" data-testid={`text-contact-content-${index}`}>
                        {info.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-3xl font-serif font-semibold mb-8" data-testid="text-faq-title">
                자주 묻는 질문
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="bg-card rounded-lg p-6" data-testid={`card-faq-${index}`}>
                    <CardContent className="p-0">
                      <h4 className="font-semibold mb-2" data-testid={`text-faq-question-${index}`}>
                        {faq.question}
                      </h4>
                      <p className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-card rounded-lg p-8" data-testid="card-contact-form">
            <CardContent className="p-0">
              <h3 className="text-2xl font-serif font-semibold mb-6" data-testid="text-contact-form-title">
                문의하기
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름 *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="이름을 입력해주세요" 
                              {...field} 
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>전화번호</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="010-1234-5678" 
                              {...field} 
                              data-testid="input-contact-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일 *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="이메일을 입력해주세요" 
                            {...field} 
                            data-testid="input-contact-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>문의 유형</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-contact-inquiry-type">
                              <SelectValue placeholder="문의 유형을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="제품 문의">제품 문의</SelectItem>
                            <SelectItem value="A/S 문의">A/S 문의</SelectItem>
                            <SelectItem value="주문/배송 문의">주문/배송 문의</SelectItem>
                            <SelectItem value="기타 문의">기타 문의</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>문의 내용 *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="문의하실 내용을 자세히 적어주세요"
                            {...field}
                            data-testid="textarea-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold"
                    disabled={mutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? "전송 중..." : "문의 보내기"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
