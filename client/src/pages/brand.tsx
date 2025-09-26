import { Award, HandHeart, Gem } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveImage from "@/components/ui/responsive-image";

export default function Brand() {
  const values = [
    {
      icon: Award,
      title: "130년 전통",
      description: "5세대에 걸쳐 전승되어온 장인 정신"
    },
    {
      icon: HandHeart,
      title: "수작업 제작",
      description: "모든 제품은 숙련된 장인이 직접 제작"
    },
    {
      icon: Gem,
      title: "최고급 소재",
      description: "선별된 이탈리아 현지 프리미엄 소재만 사용"
    }
  ];

  return (
    <div className="py-20 bg-background" data-testid="page-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-brand-title">
            <em className="text-primary italic">La Nostra Storia</em>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-brand-subtitle">
            우리의 이야기
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="전통 이탈리아 대장간 작업장"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              data-testid="img-brand-blacksmith"
            />
          </div>
          <div>
            <h3 className="text-3xl font-serif font-semibold mb-6" data-testid="text-brand-beginning-title">
              전통의 시작
            </h3>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-brand-beginning-p1">
              1890년, 토스카나의 작은 마을에서 시작된 카르벨라의 여정은
              Giuseppe Carbella의 작은 대장간에서 시작되었습니다.
              그의 정교한 손길로 탄생한 첫 번째 나이프는 지역 요리사들 사이에서
              빠르게 명성을 얻었습니다.
            </p>
            <p className="text-lg text-muted-foreground" data-testid="text-brand-beginning-p2">
              오늘날까지도 우리는 Giuseppe의 철학을 이어받아
              '완벽함은 디테일에 있다'는 믿음으로 각각의 제품을 만들고 있습니다.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="text-center bg-card p-8" data-testid={`card-value-${index}`}>
                <CardContent className="p-0">
                  <div className="text-primary text-4xl mb-4 flex justify-center">
                    <IconComponent className="w-10 h-10" data-testid={`icon-value-${index}`} />
                  </div>
                  <h4 className="text-2xl font-serif font-semibold mb-4" data-testid={`text-value-title-${index}`}>
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground" data-testid={`text-value-description-${index}`}>
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Additional Brand Story Section */}
        <div className="bg-card rounded-lg p-12 text-center">
          <h3 className="text-3xl font-serif font-semibold mb-6" data-testid="text-philosophy-title">
            우리의 철학
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto" data-testid="text-philosophy-content">
            카르벨라는 단순히 주방용품을 만드는 것이 아닙니다. 우리는 요리하는 모든 순간을 특별하게 만드는 
            도구를 창조합니다. 각각의 나이프는 수백 번의 단조를 거쳐 완성되며, 모든 도마는 자연이 수십 년간 
            키워낸 나무에서 탄생합니다.
          </p>
          <p className="text-lg text-muted-foreground italic" data-testid="text-philosophy-quote">
            "La perfezione è nei dettagli" - 완벽함은 디테일에 있다
          </p>
        </div>
      </div>
    </div>
  );
}
