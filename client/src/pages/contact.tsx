import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import building from "@/assets/building.jpg";
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
    { icon: Phone, title: "전화번호", content: "031-429-8570" },
    { icon: Mail, title: "이메일", content: "contact@carbella.kr" },
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
    <div className="py-20 bg-background font-sans" data-testid="page-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-5xl font-sans font-bold text-foreground mb-6"
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
          {/* Customer Service Center */}
          <div className="relative rounded-lg overflow-hidden mb-8 sm:mb-12">
            {/* 배경 이미지 */}
            <img
              src={building}
              alt="Carvella A/S Center Building"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* 반투명 오버레이 */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* 내용 영역 */}
            <div className="relative z-10 text-primary-foreground text-center p-6 sm:p-8">
              <h2
                className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
                data-testid="text-service-center-title"
              >
                고객 지원 안내
              </h2>

              <p
                className="text-primary-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed"
                data-testid="text-service-center-description"
              >
                아래 연락처로 빠르게 도와드리겠습니다.
              </p>

              {/* ✅ 2열 연락처 카드: A/S / B2B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-left max-w-3xl mx-auto mb-5 sm:mb-6">
                {/* A/S 고객센터 */}
                <div
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 sm:p-5"
                  data-testid="card-cs-as"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base sm:text-lg font-semibold leading-tight">
                        고객센터 (A/S)
                      </div>
                      <div className="mt-1 text-sm sm:text-base">
                        <span className="font-bold tracking-wide text-primary-foreground">
                          031-429-8570
                        </span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-primary-foreground/80 leading-relaxed">
                        제품 고장 및 불량 문의는 고객센터로 연락해주세요.
                      </p>
                    </div>
                  </div>
                </div>

                {/* B2B 문의 */}
                <div
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 sm:p-5"
                  data-testid="card-cs-b2b"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base sm:text-lg font-semibold leading-tight">
                        B2B 납품 문의
                      </div>
                      <div className="mt-1 text-sm sm:text-base">
                        <span className="font-bold tracking-wide text-primary-foreground">
                          070-8211-1761
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs sm:text-sm text-primary-foreground/90">
                        <li>
                          <span className="opacity-80">담당:</span>{" "}
                          <span className="font-medium">손성훈 이사</span>
                        </li>
                        <li className="break-all">
                          <span className="opacity-80">대표메일:</span>{" "}
                          <a
                            href="mailto:fdbackteams@gmail.com"
                            className="font-medium underline"
                          >
                            fdbackteams@gmail.com
                          </a>
                        </li>
                        <li className="leading-relaxed">
                          대량 구매 및 B2B 납품 문의는 담당자에게 연락
                          부탁드립니다.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 운영 시간 */}
              <div className="text-primary-foreground/80 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <div data-testid="text-service-hours-weekday">
                  운영시간 : AM 10:00 ~ PM 18:00
                </div>
                <div data-testid="text-service-hours-weekend">
                  점심시간 PM 12:30 ~ PM 13:30
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3
              className="text-responsive-2xl sm:text-responsive-3xl font-sans font-semibold text-center mb-8"
              data-testid="text-faq-title"
            >
              자주 묻는 질문
            </h3>
            <div className="space-y-4 font-sans">
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
