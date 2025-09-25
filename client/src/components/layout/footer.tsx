import { Link } from "wouter";
import { Instagram, Facebook, Youtube } from "lucide-react";
import carbellaLogoWhite from "@/assets/carll.png";

export default function Footer() {
  return (
    <footer
      className="bg-foreground text-background py-16"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src={carbellaLogoWhite}
              alt="카르벨라 Carbella"
              className="h-8 w-auto mb-4"
              data-testid="img-footer-logo"
            />
            <p
              className="text-sm text-gray-300 italic mb-4"
              data-testid="text-footer-tagline"
            >
              Tradizione Italiana dal 1890
            </p>
            <p
              className="text-sm text-gray-300"
              data-testid="text-footer-description"
            >
              130년 전통의 이탈리아 장인정신으로 만든
              <br />
              프리미엄 주방용품
            </p>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              data-testid="text-footer-products-title"
            >
              제품
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-knives"
                >
                  나이프 컬렉션
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-boards"
                >
                  도마 컬렉션
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-tools"
                >
                  주방 도구
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-accessories"
                >
                  액세서리
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              data-testid="text-footer-service-title"
            >
              고객 서비스
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-contact"
                >
                  문의하기
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-shipping"
                >
                  배송 정보
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-returns"
                >
                  반품/교환
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-service"
                >
                  A/S 센터
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              data-testid="text-footer-social-title"
            >
              소셜 미디어
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-footer-instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-footer-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-footer-youtube"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p data-testid="text-footer-copyright">
            &copy; 2025 카르벨라(Carbella). All rights reserved. |
            사업자등록번호: 123-45-67890
          </p>
        </div>
      </div>
    </footer>
  );
}
