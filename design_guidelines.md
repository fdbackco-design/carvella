# Premium Italian Kitchenware Brand - Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from premium European kitchenware brands (Le Creuset, Smeg, Alessi) combined with Italian luxury e-commerce aesthetics. Focus on warmth, craftsmanship, and heritage while maintaining modern usability.

## Core Design Principles
- Mediterranean warmth meets contemporary elegance
- Product-as-art showcase philosophy
- Craftsmanship storytelling through visual hierarchy
- Mobile-first responsive architecture with zero horizontal overflow

---

## Color Palette

### Primary Colors
- **Terracotta Warm**: 15 75% 55% - Primary brand color, Italian clay inspiration
- **Olive Deep**: 75 25% 35% - Secondary, Mediterranean depth
- **Cream Soft**: 40 30% 95% - Background warmth, parchment feel

### Accent & Neutral
- **Copper Accent**: 25 60% 50% - Sparingly for CTAs and highlights
- **Charcoal**: 220 15% 25% - Premium text, strong contrast
- **Warm Gray**: 30 8% 60% - Supporting text, borders
- **Pure White**: 0 0% 100% - Clean contrast moments

### Dark Mode (if needed)
- Invert with deep charcoal base (220 20% 15%), terracotta as accent glow

---

## Typography

**Font Stack**:
- **Display/Headers**: 'Cormorant Garamond' (Google Fonts) - Elegant serif for Italian sophistication
- **Body/UI**: 'Inter' (Google Fonts) - Clean sans-serif for readability
- **Accent**: 'Playfair Display' for special callouts

**Type Scale**:
- Hero: text-6xl/text-7xl (Cormorant, font-light)
- H1: text-4xl/text-5xl (Cormorant, font-normal)
- H2: text-3xl/text-4xl (Cormorant, font-normal)
- H3: text-xl/text-2xl (Inter, font-semibold)
- Body: text-base/text-lg (Inter, font-normal, leading-relaxed)
- Small: text-sm (Inter, font-medium)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm

**Responsive Breakpoints**:
- Mobile-first approach: base styles for mobile
- sm: 640px (tablets)
- md: 768px (small desktop)
- lg: 1024px (desktop)
- xl: 1280px (wide)

**Container Strategy**:
- Full-width hero: w-full with px-4 md:px-8 lg:px-12
- Content sections: max-w-7xl mx-auto px-4 md:px-8
- Product grids: max-w-6xl mx-auto
- Text content: max-w-4xl for readability

**Critical Mobile Rules**:
- ALL containers: overflow-x-hidden
- Images: max-w-full h-auto
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- No fixed widths, use percentage/flex-based layouts

---

## Component Library

### Navigation
- Sticky header with backdrop-blur-md bg-white/90
- Logo left (130px width on desktop, 100px mobile)
- Center: text-sm uppercase tracking-wide links (hidden mobile, hamburger menu)
- Right: Cart icon + language toggle
- Mobile: Full-screen overlay menu with large Cormorant links

### Hero Section
- Full-width image (1920x900px) with warm kitchen scene - Italian villa aesthetic
- Overlay: bg-gradient-to-r from-black/40 to-transparent
- Content: Left-aligned on lg, centered on mobile
- H1: Large Cormorant display with terracotta underline accent
- CTA buttons: Copper primary + outline white (with backdrop-blur-sm bg-white/10)

### Product Cards
- Aspect ratio 4:3 for product images
- Hover: subtle scale-105 transform, shadow-xl
- White card with rounded-lg (radius: 8px)
- Padding: p-6
- Typography: Cormorant for product name (text-2xl), Inter for price
- Add to cart: Full-width copper button at bottom

### Collection Grid
- 1 column mobile, 2 columns tablet, 3 columns desktop
- gap-6 md:gap-8
- Each collection: Large image + overlay text (Cormorant text-3xl)

### Feature/USP Section
- 4 icons across desktop (2x2 grid mobile)
- Custom SVG icons: Italian flag colors subtly integrated
- Terracotta icon backgrounds (circular, size-16)
- Centered text below icons

### Testimonials
- Carousel on mobile (swipe-enabled), 3-column grid desktop
- Italic Cormorant quotes (text-xl)
- Customer photos: rounded-full (size-20)
- 5-star rating in copper color

### Footer
- Rich footer: 4 columns desktop (stack mobile)
  - Column 1: Brand story snippet (Cormorant)
  - Column 2: Quick links
  - Column 3: Customer service
  - Column 4: Newsletter signup (terracotta button)
- Bottom bar: Social icons + payment badges + Italian flag icon
- Background: warm-gray with subtle texture

---

## Images

### Hero Image
- Large hero: Sunlit Italian kitchen, marble countertop, premium cookware displayed artfully
- Aspect: 16:9, warm morning light, depth of field on products

### Product Photography
- Clean white backgrounds OR lifestyle (Italian dining settings)
- Consistent lighting: soft, warm
- Multiple angles per product

### Lifestyle Sections
- Family cooking scenes in rustic Italian kitchens
- Close-ups of craftsmanship details (copper rivets, wooden handles)
- Table settings with products in use

### Collection Headers
- Category banners: Pasta makers with fresh pasta, espresso makers with steam, etc.
- Moody, editorial photography style

---

## Animations (Minimal)
- Scroll-triggered fade-in for product cards (stagger delay)
- Smooth hover transforms on products (scale-105, 300ms ease)
- Parallax effect on hero (subtle, 20% speed)
- Cart icon bounce on add-to-cart action

---

## Page Sections (Homepage)

1. **Hero**: Full-width image, centered message "Cucina Italiana Excellence"
2. **Featured Collections**: 3-column grid (Cookware, Tableware, Accessories)
3. **Bestsellers**: Horizontal product carousel (8 items, 4 visible desktop, 1 mobile)
4. **Brand Story**: Split layout - image left, text right (stack mobile), Cormorant headlines
5. **Craftsmanship**: Video embed or image gallery showcasing artisan process
6. **Testimonials**: 3 reviews with photos
7. **Instagram Feed**: 6-image grid linking to social
8. **Newsletter**: Centered, terracotta background, "Ricevi Ispirazione" headline
9. **Footer**: Comprehensive as described

**Mobile Optimization**:
- Each section: py-12 md:py-20 (vertical rhythm)
- All grids collapse to single column
- Touch-friendly: min-height-12 for all clickable elements
- Images: object-cover with defined max-heights to prevent stretching