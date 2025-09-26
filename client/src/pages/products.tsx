import ProductCard from "@/components/ui/product-card";
import { Card, CardContent } from "@/components/ui/card";
import car44 from "@/assets/car44.png";
import car4 from "@/assets/car4.png";

export default function Products() {
  const collections = [
    {
      title: "나이프 컬렉션",
      image: car44,
      description: "최고급 독일산 스테인리스 스틸과 이탈리아 전통 기법이 만나 탄생한 완벽한 균형의 프리미엄 나이프 라인입니다.",
      items: [
        "셰프 나이프 (8\", 10\", 12\")",
        "산토쿠 나이프",
        "페어링 나이프",
        "브레드 나이프",
        "유틸리티 나이프"
      ]
    },
    {
      title: "도마 컬렉션",
      image: car4,
      description: "토스카나산 올리브 나무와 참나무로 제작된 천연 항균 도마는 기능성과 아름다움을 동시에 제공합니다.",
      items: [
        "올리브 우드 도마 (소형, 중형, 대형)",
        "참나무 도마",
        "엔드 그레인 도마",
        "치즈 보드",
        "서빙 플래터"
      ]
    }
  ];

  const featuredProducts = [
    {
      title: "마스터 셰프 나이프",
      description: "10\" 다마스커스 스틸",
      price: "₩450,000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "프리미엄 올리브 도마",
      description: "대형 (45x30cm)",
      price: "₩280,000",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "컴플리트 나이프 세트",
      description: "7피스 + 우드 블록",
      price: "₩890,000",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "키친 유텐실 세트",
      description: "12피스 프리미엄 세트",
      price: "₩320,000",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <div className="py-20 bg-background" data-testid="page-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-products-title">
            제품 컬렉션
          </h2>
          <p className="text-xl text-muted-foreground italic" data-testid="text-products-subtitle">
            Collezione Carbella
          </p>
        </div>
        
        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20">
          {collections.map((collection, index) => (
            <Card key={index} className="bg-card rounded-lg overflow-hidden shadow-lg touch-target-comfortable" data-testid={`card-collection-${index}`}>
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-testid={`img-collection-${index}`}
                />
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-responsive-xl sm:text-responsive-2xl lg:text-responsive-3xl font-serif font-semibold mb-3 sm:mb-4 leading-tight" data-testid={`text-collection-title-${index}`}>
                  {collection.title}
                </h3>
                <p className="text-responsive-sm sm:text-responsive-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed" data-testid={`text-collection-description-${index}`}>
                  {collection.description}
                </p>
                <ul className="space-y-1 sm:space-y-2 text-responsive-xs sm:text-responsive-sm text-muted-foreground">
                  {collection.items.map((item, itemIndex) => (
                    <li key={itemIndex} data-testid={`text-collection-item-${index}-${itemIndex}`}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Products Section */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-responsive-2xl sm:text-responsive-3xl font-serif font-bold text-center mb-8 sm:mb-12" data-testid="text-featured-products-title">
            인기 제품
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="bg-card rounded-lg overflow-hidden shadow-lg touch-target-comfortable" data-testid={`card-featured-product-${index}`}>
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    data-testid={`img-featured-product-${index}`}
                  />
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h4 className="text-responsive-sm sm:text-responsive-base font-serif font-semibold mb-1 sm:mb-2 leading-tight" data-testid={`text-featured-product-title-${index}`}>
                    {product.title}
                  </h4>
                  <p className="text-responsive-xs sm:text-responsive-sm text-muted-foreground mb-2 sm:mb-3" data-testid={`text-featured-product-description-${index}`}>
                    {product.description}
                  </p>
                  <p className="text-responsive-base sm:text-responsive-lg font-bold text-primary" data-testid={`text-featured-product-price-${index}`}>
                    {product.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
