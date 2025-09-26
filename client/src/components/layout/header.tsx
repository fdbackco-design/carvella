import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import carbellaLogo from "@/assets/carbella-logo.png";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/brand", label: "브랜드 소개" },
    { path: "/products", label: "제품 소개" },
    { path: "/reviews", label: "고객 후기" },
    { path: "/contact", label: "고객센터" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link href="/" className="flex items-center touch-target" data-testid="link-home">
            <img 
              src={carbellaLogo} 
              alt="카르벨라 Carbella" 
              className="h-8 sm:h-6 w-auto transition-all duration-200" 
            />
          </Link>
          
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link text-foreground hover:text-primary transition-colors font-medium px-2 lg:px-3 py-3 rounded-md touch-target-comfortable flex items-center justify-center text-sm lg:text-base ${
                  isActive(item.path) ? "active" : ""
                }`}
                data-testid={`link-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden touch-target-comfortable" 
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <div className="px-6 py-6 border-b border-border">
                <img 
                  src={carbellaLogo} 
                  alt="카르벨라 Carbella" 
                  className="h-8 w-auto" 
                />
              </div>
              <nav className="flex flex-col px-6 py-6">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-responsive-lg font-medium transition-colors px-4 py-4 rounded-lg touch-target-comfortable ${
                        isActive(item.path) 
                          ? "text-primary bg-primary/10 border-l-4 border-primary" 
                          : "text-foreground hover:text-primary hover:bg-muted/50"
                      }`}
                      data-testid={`mobile-link-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="flex items-center">
                        <span className="text-primary/60 font-bold mr-3 text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground px-4">
                    카르벨라 - 프리미엄 이탈리아 주방용품
                  </p>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
