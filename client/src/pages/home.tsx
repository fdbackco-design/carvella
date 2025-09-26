import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HeroVideo from "@/components/ui/hero-video";
import ProductCard from "@/components/ui/product-card";
import car44 from "@/assets/car44.png";
import car4 from "@/assets/car4.png";

export default function Home() {
  const featuredProducts = [
    {
      title: "프리미엄 나이프",
      description:
        "이탈리아 전통 기법으로 제작된 최고급 스테인리스 스틸 나이프",
      image: car44,
    },
    {
      title: "올리브 우드 도마",
      description: "토스카나산 올리브 원목으로 제작된 천연 항균 도마",
      image: car44,
    },
    {
      title: "주방 도구 세트",
      description: "이탈리아 디자인의 완벽한 주방 도구 컬렉션",
      image: car44,
    },
  ];

  return (
    <div data-testid="page-home">
      {/* Hero Video Section */}
      <HeroVideo>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-responsive-5xl sm:text-responsive-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            <em className="text-accent italic">Carvella</em>{" "}
            <span className="text-white">Italiana</span>
          </h2>
          <p
            className="text-responsive-lg sm:text-responsive-xl mb-6 sm:mb-8 font-light leading-relaxed max-w-2xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            이탈리아 전통 장인정신으로 만든 프리미엄 주방용품
          </p>
        </div>
      </HeroVideo>

      {/* Product Introduction Section */}
      <section className="py-20 bg-background" data-testid="section-products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3
              className="text-4xl font-serif font-bold text-foreground mb-4"
              data-testid="text-products-title"
            >
              제품
            </h3>
            <p
              className="text-xl text-muted-foreground italic"
              data-testid="text-products-subtitle"
            >
              Crafted with Italian Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Heritage Section */}
      <section className="py-20 bg-secondary" data-testid="section-heritage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="이탈리아 장인 작업장"
                className="rounded-lg shadow-lg"
                data-testid="img-heritage-workshop"
              />
            </div>
            <div>
              <h3
                className="text-4xl font-serif font-bold text-foreground mb-6"
                data-testid="text-heritage-title"
              >
                <em className="text-primary italic">Dal 1890</em>
                <br />
                이탈리아 장인의 전통
              </h3>
              <p
                className="text-lg text-muted-foreground mb-6"
                data-testid="text-heritage-description-1"
              >
                130년 전통의 이탈리아 장인 가문에서 시작된 카르벨라는 세대를
                거쳐 전승되어온 정교한 수작업 기술로 각각의 제품을 정성스럽게
                제작합니다.
              </p>
              <p
                className="text-lg text-muted-foreground mb-8"
                data-testid="text-heritage-description-2"
              >
                최고급 소재만을 사용하여 만든 우리의 제품은 단순한 도구가 아닌
                예술 작품입니다.
              </p>
              <Link href="/brand">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-semibold"
                  data-testid="button-brand-story"
                >
                  브랜드 스토리 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
