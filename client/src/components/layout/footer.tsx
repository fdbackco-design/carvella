import carbellaLogoWhite from "@/assets/carll.png";

export default function Footer() {
  return (
    <footer
      className="bg-foreground text-background py-16"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <img
            src={carbellaLogoWhite}
            alt="카르벨라 Carbella"
            className="h-8 w-auto mb-4 mx-auto"
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

        <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p data-testid="text-footer-copyright">
            &copy; 2025 제이일렉트릭(J.ELECTRIC). 모든 권리 보유.
          </p>
          <p className="mt-2" data-testid="text-footer-business-info">
            사업자등록번호: 591-26-00132 | 대표이사: 김진수
          </p>
          <p className="mt-1" data-testid="text-footer-address">
            사업장: 서울특별시 구로구 디지털로26길 43, L동 4층 407호
          </p>
        </div>
      </div>
    </footer>
  );
}
