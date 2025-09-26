import ProductCard from "@/components/ui/product-card";
import { Card, CardContent } from "@/components/ui/card";

export default function Products() {
  const collections = [
    {
      title: "나이프 컬렉션",
      image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
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
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {collections.map((collection, index) => (
            <Card key={index} className="bg-card rounded-lg overflow-hidden shadow-lg" data-testid={`card-collection-${index}`}>
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-64 object-cover"
                data-testid={`img-collection-${index}`}
              />
              <CardContent className="p-8">
                <h3 className="text-3xl font-serif font-semibold mb-4" data-testid={`text-collection-title-${index}`}>
                  {collection.title}
                </h3>
                <p className="text-muted-foreground mb-6" data-testid={`text-collection-description-${index}`}>
                  {collection.description}
                </p>
                <ul className="space-y-2 text-muted-foreground">
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
        
        
      </div>
    </div>
  );
}
