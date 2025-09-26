import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Contact } from "@shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상 입력해주세요"),
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
  phone: z
    .string()
    .optional()
    .transform((val) => val || null),
  inquiryType: z.string().min(1, "문의 유형을 선택해주세요"),
  message: z.string().min(10, "문의 내용은 10글자 이상 작성해주세요"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContact = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        inquiryType: data.inquiryType,
        message: data.message,
        createdAt: new Date(),
      };

      // 로컬 스토리지에 연락처 정보 저장
      const existingContacts = localStorage.getItem("carbella-contacts");
      const contacts = existingContacts ? JSON.parse(existingContacts) : [];
      contacts.push(newContact);
      localStorage.setItem("carbella-contacts", JSON.stringify(contacts));

      toast({
        title: "문의가 접수되었습니다",
        description: "빠른 시일 내에 답변드리겠습니다.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitContact(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "전화번호",
      content: "031-429-8570",
    },
    {
      icon: Mail,
      title: "이메일",
      content: "contact@carbella.kr",
    },
    {
      icon: MapPin,
      title: "주소",
      content: "서울시 강남구 테헤란로 123\n카르벨라 전시장",
    },
    {
      icon: Clock,
      title: "운영 시간",
      content: "평일 09:00 - 18:00\n토요일 10:00 - 16:00\n일요일 휴무",
    },
  ];

  const faqs = [
    {
      question: "제품 보증 기간은 어떻게 되나요?",
      answer: "모든 카르벨라 제품은 구매일로부터 10년 품질보증을 제공합니다.",
    },
    {
      question: "나이프 관리는 어떻게 해야 하나요?",
      answer:
        "손으로 세척 후 즉시 건조시키고, 정기적인 연마 서비스를 제공합니다.",
    },
    {
      question: "전국 배송이 가능한가요?",
      answer: "네, 전국 무료배송이며 2-3일 내 배송 완료됩니다.",
    },
  ];

  return (
    <div className="py-20 bg-background" data-testid="page-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-5xl font-serif font-bold text-foreground mb-6"
            data-testid="text-contact-title"
          >
            고객센터
          </h2>
          <p
            className="text-xl text-muted-foreground italic"
            data-testid="text-contact-subtitle"
          >
            Servizio Clienti
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form Section */}
          <div className="mb-16">
            <Card className="bg-card rounded-2xl p-6 sm:p-8 lg:p-12 mb-8">
              <CardContent className="p-0">
                <h3
                  className="text-responsive-2xl sm:text-responsive-3xl font-serif font-bold text-center mb-6 sm:mb-8"
                  data-testid="text-contact-form-title"
                >
                  문의하기
                </h3>
                <p
                  className="text-responsive-base text-muted-foreground text-center mb-8 sm:mb-12"
                  data-testid="text-contact-form-subtitle"
                >
                  궁금한 점이나 문의사항을 남겨주세요. 빠른 시일 내에 답변드리겠습니다.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                    {/* Name and Email Row - Stack on mobile, side by side on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">이름 *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="성함을 입력해주세요"
                                {...field}
                                className="touch-target-comfortable"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">이메일 *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="example@email.com"
                                {...field}
                                className="touch-target-comfortable"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Phone and Inquiry Type Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">연락처</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="010-1234-5678"
                                {...field}
                                value={field.value || ""}
                                className="touch-target-comfortable"
                                data-testid="input-phone"
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
                            <FormLabel className="text-sm font-medium">문의 유형 *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? ""}>
                              <FormControl>
                                <SelectTrigger className="touch-target-comfortable" data-testid="select-inquiry-type">
                                  <SelectValue placeholder="문의 유형을 선택해주세요" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="product">제품 문의</SelectItem>
                                <SelectItem value="order">주문 문의</SelectItem>
                                <SelectItem value="shipping">배송 문의</SelectItem>
                                <SelectItem value="warranty">A/S 문의</SelectItem>
                                <SelectItem value="other">기타 문의</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Message Field - Full width */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">문의 내용 *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="문의하실 내용을 자세히 적어주세요..."
                              className="min-h-[120px] resize-none"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full touch-target-comfortable bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 sm:py-4"
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? "전송 중..." : "문의 전송"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Customer Service Section */}
          <div className="text-center mb-16">
            <div className="bg-stone-800 text-white rounded-2xl p-6 sm:p-8 lg:p-12 mb-8">
              <h3
                className="text-responsive-2xl sm:text-responsive-3xl font-bold mb-4"
                data-testid="text-service-center-title"
              >
                카르벨라 고객센터
              </h3>
              <p
                className="text-slate-300 mb-6 sm:mb-8"
                data-testid="text-service-center-subtitle"
              >
                카르벨라는 모든 고객을 소중히 여깁니다.
              </p>

              <div className="flex items-center justify-center mb-6">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-amber-400" />
                <span
                  className="text-responsive-2xl sm:text-responsive-3xl font-bold"
                  data-testid="text-service-phone"
                >
                  031-429-8570
                </span>
              </div>

              <div className="space-y-2 text-slate-300 mb-6 sm:mb-8">
                <p data-testid="text-service-hours-weekday">
                  운영시간: 평일 10:00 ~ 18:00
                </p>
                <p data-testid="text-service-hours-weekend">
                  점심시간 12:00 ~ 13:00
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3
              className="text-responsive-2xl sm:text-responsive-3xl font-serif font-semibold text-center mb-8"
              data-testid="text-faq-title"
            >
              자주 묻는 질문
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-card rounded-lg p-4 sm:p-6"
                  data-testid={`card-faq-${index}`}
                >
                  <CardContent className="p-0">
                    <h4
                      className="font-semibold mb-2 text-sm sm:text-base"
                      data-testid={`text-faq-question-${index}`}
                    >
                      {faq.question}
                    </h4>
                    <p
                      className="text-muted-foreground text-sm sm:text-base"
                      data-testid={`text-faq-answer-${index}`}
                    >
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
