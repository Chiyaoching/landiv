// ============================================
// Landing Page CMS - Type Definitions
// ============================================

// Component Types
export type ComponentType =
  | "hero"
  | "features"
  | "testimonials"
  | "pricing"
  | "cta"
  | "faq"
  | "contact"
  | "gallery"
  | "video"
  | "text-block"
  | "image-text"
  | "stats"
  | "team"
  | "logos"
  | "newsletter"
  | "custom-html";

// Page Status
export type PageStatus = "draft" | "published" | "archived";

// ============================================
// Layout & Page Types
// ============================================

export interface AnimationConfig {
  type: "fade" | "slide" | "scale" | "none";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
}

export interface LayoutBlock {
  id: string;
  type: ComponentType;
  order: number;
  props: Record<string, unknown>;
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  animation?: AnimationConfig;
}

export interface SEOConfig {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex: boolean;
  noFollow: boolean;
  ogImage?: string;
  ogType: "website" | "article";
  twitterCard: "summary" | "summary_large_image";
  structuredData?: StructuredData[];
}

export interface StructuredData {
  type: "Organization" | "LocalBusiness" | "Product" | "FAQPage";
  data: Record<string, unknown>;
}

export interface PageSettings {
  showHeader: boolean;
  showFooter: boolean;
  customCSS?: string;
  analytics?: {
    googleTagId?: string;
    facebookPixelId?: string;
  };
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: PageStatus;
  layout: LayoutBlock[];
  seo: SEOConfig;
  settings: PageSettings;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// ============================================
// Component Props Types
// ============================================

// Hero Component
export interface HeroProps {
  variant: "centered" | "split" | "video-bg" | "image-bg";
  heading: string;
  subheading?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    link: string;
    style: "solid" | "outline";
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  media?: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
  background?: {
    type: "color" | "gradient" | "image" | "video";
    value: string;
    overlay?: string;
  };
  alignment: "left" | "center" | "right";
  height: "full" | "large" | "medium" | "auto";
}

// Features Component
export interface Feature {
  id: string;
  icon?: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface FeaturesProps {
  variant: "grid" | "list" | "alternating" | "cards";
  heading?: string;
  subheading?: string;
  features: Feature[];
  columns: 2 | 3 | 4;
  iconStyle: "circle" | "square" | "none";
}

// Testimonials Component
export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
}

export interface TestimonialsProps {
  variant: "carousel" | "grid" | "masonry" | "single";
  heading?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  showRating: boolean;
}

// Pricing Component
export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  annualPrice?: number;
  currency: string;
  features: string[];
  cta: {
    text: string;
    link: string;
  };
  badge?: string;
}

export interface PricingProps {
  variant: "cards" | "table" | "toggle";
  heading?: string;
  subheading?: string;
  billingToggle?: boolean;
  plans: PricingPlan[];
  highlightedPlan?: string;
}

// CTA Component
export interface CTAProps {
  variant: "banner" | "split" | "minimal";
  heading: string;
  description?: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
  background: {
    type: "color" | "gradient" | "image";
    value: string;
  };
}

// FAQ Component
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQProps {
  variant: "accordion" | "grid" | "two-column";
  heading?: string;
  subheading?: string;
  items: FAQItem[];
  expandMultiple: boolean;
}

// Contact Component
export interface FormField {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ContactProps {
  variant: "form-only" | "split" | "with-map";
  heading?: string;
  subheading?: string;
  fields: FormField[];
  submitButton: {
    text: string;
    loadingText?: string;
  };
  successMessage: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: SocialLink[];
  };
  mapEmbed?: string;
}

// Stats Component
export interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsProps {
  variant: "inline" | "cards" | "background";
  stats: Stat[];
  animated: boolean;
}

// Logos Component
export interface Logo {
  src: string;
  alt: string;
  link?: string;
}

export interface LogosProps {
  heading?: string;
  variant: "inline" | "grid" | "carousel";
  logos: Logo[];
  grayscale: boolean;
}

// Newsletter Component
export interface NewsletterProps {
  variant: "inline" | "banner" | "popup";
  heading: string;
  description?: string;
  placeholder: string;
  buttonText: string;
  integrationId?: string;
}

// Footer Component
export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface FooterProps {
  logo?: string;
  description?: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
  bottomLinks?: {
    label: string;
    href: string;
  }[];
}

// ============================================
// Builder Types
// ============================================

export interface ComponentDefinition {
  type: ComponentType;
  name: string;
  description: string;
  icon: string;
  category: "hero" | "content" | "social-proof" | "conversion" | "footer";
  defaultProps: Record<string, unknown>;
}

export interface BuilderState {
  page: Page | null;
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  isDragging: boolean;
  draggedComponent: ComponentType | null;
  previewMode: "desktop" | "tablet" | "mobile";
  sidebarTab: "components" | "layers" | "settings";
  hasUnsavedChanges: boolean;
}

// ============================================
// API Types
// ============================================

export interface PageSummary {
  id: string;
  slug: string;
  title: string;
  status: PageStatus;
  updatedAt: Date;
}

export interface ListPagesResponse {
  pages: PageSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  createdAt: Date;
}

// ============================================
// Global Settings Types
// ============================================

export interface GlobalSEO {
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  siteUrl: string;
  defaultOgImage: string;
  twitter: {
    handle?: string;
    site?: string;
    cardType: "summary" | "summary_large_image";
  };
  organization: {
    name: string;
    logo: string;
    url: string;
    contactPoint?: {
      telephone: string;
      contactType: string;
    };
    sameAs?: string[];
  };
}

export interface BrandingConfig {
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface SiteSettings {
  seo: GlobalSEO;
  branding: BrandingConfig;
}
