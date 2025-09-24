import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();

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
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <h1 className="text-2xl font-serif font-bold text-primary">
              카르벨라
              <span className="text-sm font-sans text-muted-foreground italic ml-2">Carbella</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link text-foreground hover:text-primary transition-colors font-medium ${
                  isActive(item.path) ? "active" : ""
                }`}
                data-testid={`link-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`text-lg font-medium transition-colors ${
                      isActive(item.path) ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                    data-testid={`mobile-link-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
