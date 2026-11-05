# Frontend Design System - Testing & Verification Guide

## Quick Start

1. Navigate to frontend directory:
```bash
cd c:\Users\basak\Desktop\legal_consultancy\frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:5173`

## Visual Testing Checklist

### Typography & Fonts 🎨

- [ ] **Headings (h1-h6)**
  - Verify font is Poppins (distinctive, bold appearance)
  - Check on Home, Articles, Team, Contact pages
  - Verify Font weight is 700-800
  
- [ ] **Body Text**
  - Verify font is Inter (clean, readable)
  - Check Articles, Team member bios, Contact form labels
  - Verify line-height is comfortable (1.6-1.8)

- [ ] **Google Fonts Loading**
  - Open DevTools → Network tab
  - Check for `fonts.googleapis.com` requests for Inter and Poppins
  - Fonts should load from CSS @import in styles.css

### Layout & Spacing 📏

- [ ] **Hero Sections (Home, Articles, Team, Contact)**
  - Check hero section spans full width (no side padding)
  - Content should be centered but section extends edge-to-edge
  - Hero background gradient should extend to viewport edges
  - Mobile (xs): Check proper padding on small screens
  - Tablet (sm): Check spacing adjusts appropriately
  - Desktop (md): Check spacing scales up correctly

- [ ] **Container Padding**
  - Content sections should have `maxWidth="lg"` (1280px)
  - Padding should be responsive: `paddingX: { xs: 2, md: 4 }`
  - On mobile: 8px-12px padding per side
  - On desktop: 16px-24px padding per side

- [ ] **Card Heights**
  - Services grid (Home): All cards same height
  - Articles grid: All cards same height
  - Team grid: All cards same height (CardMedia 340px)
  - Contact info cards: All cards same height
  - Open Grid inspector to verify uniform heights

### Colors & Contrast ✅

- [ ] **Language Switcher**
  - Located in top-right of header (after nav links)
  - Check background: White with slight transparency
  - Check text color: Pure white (#ffffff)
  - Check border: White with rounded corners
  - Hover state: Brighter white background
  - **CRITICAL**: Should be clearly visible on dark navy header

- [ ] **Hero Text**
  - Main heading (h1): White color (#ffffff)
  - Check text has subtle shadow below it
  - Text should pop against the gradient background
  - Subtitle: Light beige color (#f5efe2)

- [ ] **Color Consistency**
  - Primary navy: #0b2740 (dark backgrounds, buttons, links)
  - Secondary beige: #e6d7b9 (footer text, accents)
  - Background: Gradients of beige tones
  - Text: Dark navy for contrast on light backgrounds

### Responsive Design 📱

- [ ] **Mobile (xs: < 600px)**
  - Use Chrome DevTools: Toggle device toolbar
  - Check iPhone SE (375px width) or similar
  - Navigation menu: Hidden or compact
  - Cards: Should stack to 1 column
  - Images: Should scale properly
  - Touch targets: Buttons at least 44×44px
  - Padding: Reduced on small screens

- [ ] **Tablet (sm: 600px - 960px)**
  - Use Chrome DevTools with tablet viewport
  - Check iPad dimensions (768px)
  - Grid layouts: Should be 2 columns
  - Spacing: Medium padding
  - Header: Should adapt without overflow

- [ ] **Desktop (md: 960px+)**
  - Standard desktop resolution (1920×1080)
  - Grid layouts: Should be 3-4 columns
  - Full spacing applied
  - All features visible and accessible

### Interactive Elements ✨

- [ ] **Buttons**
  - Hover state: Slight lift effect (`translateY(-2px)`)
  - Shadow increases on hover
  - Click feedback: Smooth transition
  - Text color contrast: Readable on all backgrounds
  - Size: At least 44×44px on mobile

- [ ] **Links**
  - Color: Navy (#0b2740)
  - Hover state: Slightly darker navy
  - Underline appears on hover (underline style)
  - Focus state: Clear 2px outline with offset

- [ ] **Cards**
  - Hover state: Slight lift effect (`translateY(-8px)`)
  - Shadow increases on hover
  - Cursor changes to pointer
  - Smooth transition (0.3s)
  - All borders/decorations visible

- [ ] **Form Inputs**
  - Border: Navy color (#0b2740)
  - Focus state: Slightly thicker border + shadow
  - Placeholder text: Visible and readable
  - Hover state: Smooth border color change

### Pages - Detailed Checklist

#### Home Page (`/tr`)
- [ ] Hero section spans full width
- [ ] Hero title is white and visible
- [ ] About section cards: 3 columns on desktop, stack on mobile
- [ ] Services grid: 3 columns with uniform card heights
- [ ] CTA section visible with proper spacing
- [ ] Footer fully visible at bottom

#### Articles Page (`/tr/makaleler`)
- [ ] Header spans full width with proper padding
- [ ] Category cards display in responsive grid (xs:1, sm:2, md:3)
- [ ] Card images have proper gradient backgrounds
- [ ] All cards have same height
- [ ] Hover effect works smoothly
- [ ] Click navigation works

#### Team Page (`/tr/ekibimiz`)
- [ ] Header spans full width
- [ ] Member cards: responsive grid layout
- [ ] CardMedia height: 340px (verify with inspector)
- [ ] Cards have consistent spacing
- [ ] Hover effects work smoothly
- [ ] Click opens detail page

#### Contact Page (`/tr/iletisim`)
- [ ] Header spans full width
- [ ] Info cards: 4 columns on desktop, 2 on tablet, 1 on mobile
- [ ] Form layout: Side-by-side on desktop, stacked on mobile
- [ ] All form inputs styled correctly
- [ ] reCAPTCHA appears and works
- [ ] Submit button visible and clickable

#### Detail Pages
- **Article Detail (`/tr/makale/[slug]`)**
  - [ ] Back button visible and works
  - [ ] Header section has proper styling
  - [ ] Article image responsive
  - [ ] Content readable with proper line-height
  - [ ] Related metadata (category, date) visible

- **Team Detail (`/tr/ekibimiz/[id]`)**
  - [ ] Back button visible and works
  - [ ] Photo and info side-by-side on desktop
  - [ ] Stacked on mobile
  - [ ] Social links properly formatted
  - [ ] Consistent spacing throughout

- **Articles by Category (`/tr/makaleler/[slug]`)**
  - [ ] Header matches other pages
  - [ ] Article cards: responsive grid
  - [ ] Empty state message if no articles
  - [ ] Back to articles button available
  - [ ] Click opens article detail page

### Header & Navigation

- [ ] **Header**
  - Logo/title visible in top-left
  - Navigation links visible on desktop (hidden/menu on mobile)
  - Language switcher visible in top-right
  - Language switcher color: White (contrasts with dark navy)
  - Sticky positioning (stays at top when scrolling)

- [ ] **Language Switcher**
  - Dropdown shows available languages
  - Selection changes page language
  - UI updates with selected language
  - Flag/label clearly indicates current language

### Footer

- [ ] Footer spans full width at bottom
- [ ] Background: Dark navy gradient
- [ ] Text color: Beige (readable on dark background)
- [ ] 4-column layout on desktop, 2×2 on tablet, stacked on mobile
- [ ] Links work and change color on hover
- [ ] Social icons visible and styled properly
- [ ] Copyright year updates automatically

### Accessibility ♿

- [ ] **Keyboard Navigation**
  - Tab through all interactive elements
  - Focus state visible on all buttons/links
  - Focus order makes sense (left-to-right, top-to-bottom)
  - No focus traps

- [ ] **Color Contrast**
  - Use Chrome DevTools: DevTools → Rendering → Emulate CSS media feature prefers-color-scheme
  - All text has sufficient contrast
  - Icons are visible and distinguishable
  - No information conveyed by color alone

- [ ] **Screen Reader (Optional)**
  - Headings have proper hierarchy (h1 > h2 > h3)
  - Images have alt text
  - Form labels associated with inputs
  - Skip navigation not needed but good to have

### Performance 🚀

- [ ] **Font Loading**
  - No layout shift when fonts load
  - Fonts appear correct from page load
  - No fallback fonts visible (unless fonts fail)

- [ ] **Image Loading**
  - Images scale properly on all sizes
  - No distortion on mobile
  - Loading placeholders visible if applicable

- [ ] **Animations**
  - Smooth transitions (no jank)
  - Animations complete quickly (not too fast)
  - No performance issues on mobile

## Language Switching Test

1. Go to any page (e.g., `/tr`)
2. Click language switcher in header
3. Select Turkish (TR) → Page updates
4. Select English (EN) → Page updates with English text
5. Select Russian (RU) → Page updates with Russian text
6. Select Arabic (AR) → Page updates with Arabic text + RTL layout
7. All pages should update correctly
8. Images/structure should remain consistent across languages

## Browser Testing

Test in multiple browsers:
- [ ] Chrome (latest) - Desktop
- [ ] Firefox (latest) - Desktop
- [ ] Safari (latest) - Desktop
- [ ] Chrome Mobile - Mobile (use DevTools emulation)
- [ ] Safari Mobile - iOS (if available)

## Known Issues & Notes

- Admin panel not tested in this session
- Detail pages improved: ArticleDetail, TeamDetail, ArticlesByCategory
- All changes maintain backward compatibility
- No database changes required
- All functionality preserved

## Success Criteria ✨

- [x] Google Fonts loading (Inter + Poppins)
- [x] Typography system implemented
- [x] Responsive design across all breakpoints
- [x] Hero sections full-width without side padding
- [x] Language switcher clearly visible
- [x] Hero text has proper contrast
- [x] Card heights uniform across pages
- [x] All detail pages styled consistently
- [x] Color system implemented
- [x] Accessibility basics covered

## Support

If issues are found:
1. Check browser console for errors
2. Verify network requests (fonts, images)
3. Check MUI theme in main.jsx
4. Check CSS variables in styles.css
5. Verify component props in each page

## Next Steps (Optional)

1. Add image lazy-loading for performance
2. Implement dark mode toggle
3. Add mobile navigation menu
4. Optimize font loading with font-display: swap
5. Add breadcrumb navigation
6. Implement page transitions
7. Add PWA support
8. SEO optimization
