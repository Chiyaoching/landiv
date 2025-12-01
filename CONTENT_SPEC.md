# Landiv - Content Specification

> Version: 1.1.0  
> Last Updated: December 1, 2025  
> Status: In Development
>
> **Landiv** - Build stunning landing pages with drag-and-drop simplicity.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Quick Start](#4-quick-start)
5. [Content Schema](#5-content-schema)
6. [Component Library](#6-component-library)
7. [Page Builder System](#7-page-builder-system)
8. [SEO Configuration](#8-seo-configuration)
9. [API Specification](#9-api-specification)
10. [Data Models](#10-data-models)
11. [Deployment Strategy](#11-deployment-strategy)
12. [Implementation Status](#12-implementation-status)

---

## 1. Project Overview

### 1.1 Purpose

Build a dynamic landing page system where content and layout can be controlled through a CMS (Content Management System) interface. Operators can customize page layouts using drag-and-drop functionality.

### 1.2 Key Features

- **CMS-Controlled Content**: All text, images, and media managed through admin panel
- **Drag & Drop Page Builder**: Visual editor for layout customization
- **SEO Optimization**: Server-side rendering, meta tags, structured data
- **Responsive Design**: Mobile-first approach with viewport preview
- **Component-Based Architecture**: Reusable, configurable UI blocks
- **Fast Development**: Turbopack for instant HMR

### 1.3 User Roles

| Role     | Permissions                                     |
| -------- | ----------------------------------------------- |
| Visitor  | View published landing pages                    |
| Operator | Edit content, customize layouts, manage media   |
| Admin    | Full access including settings, user management |

### 1.4 URLs

| Route              | Description              |
| ------------------ | ------------------------ |
| `/`                | Public landing page      |
| `/admin`           | Admin dashboard          |
| `/admin/builder`   | Drag & drop page builder |
| `/api/pages`       | Pages API                |
| `/api/admin/pages` | Admin pages API          |

---

## 2. Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                  │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   Landing Page   │    │   Admin Panel    │                    │
│  │   (Next.js SSR)  │    │   (Page Builder) │                    │
│  └────────┬─────────┘    └────────┬─────────┘                    │
└───────────┼──────────────────────┼───────────────────────────────┘
            │                      │
            ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                                │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              Next.js API Routes (App Router)                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Database   │  │    Media     │  │    Cache     │          │
│  │  (Postgres)  │  │  (S3/Cloud)  │  │   (Optional) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Current Folder Structure

```
landing-page/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Public landing page ✅
│   │   ├── layout.tsx                # Root layout with SEO ✅
│   │   ├── globals.css               # Global styles ✅
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin dashboard ✅
│   │   │   └── builder/
│   │   │       └── page.tsx          # Page builder ✅
│   │   └── api/
│   │       ├── pages/
│   │       │   ├── route.ts          # GET/POST pages ✅
│   │       │   └── [slug]/
│   │       │       └── route.ts      # GET/PUT/DELETE page ✅
│   │       └── admin/
│   │           └── pages/
│   │               └── route.ts      # Admin pages API ✅
│   │
│   ├── components/
│   │   ├── landing/                  # Landing page components
│   │   │   ├── Hero/                 ✅ Implemented
│   │   │   │   ├── index.tsx
│   │   │   │   └── Hero.styles.ts
│   │   │   ├── Features/             ✅ Implemented
│   │   │   ├── Testimonials/         ✅ Implemented
│   │   │   ├── CTA/                  ✅ Implemented
│   │   │   ├── FAQ/                  ✅ Implemented
│   │   │   ├── Contact/              ✅ Implemented
│   │   │   ├── Stats/                ✅ Implemented
│   │   │   ├── Footer/               ✅ Implemented
│   │   │   ├── Pricing/              🔲 Planned
│   │   │   ├── Logos/                🔲 Planned
│   │   │   ├── Newsletter/           🔲 Planned
│   │   │   └── index.ts              # Barrel exports ✅
│   │   │
│   │   ├── builder/                  # Page builder components
│   │   │   ├── Sidebar/              ✅ Implemented
│   │   │   │   ├── index.tsx
│   │   │   │   └── Sidebar.styles.ts
│   │   │   ├── Canvas/               ✅ Implemented
│   │   │   │   ├── index.tsx
│   │   │   │   └── Canvas.styles.ts
│   │   │   └── PropertyPanel/        ✅ Implemented
│   │   │       ├── index.tsx
│   │   │       └── PropertyPanel.styles.ts
│   │   │
│   │   └── ComponentRenderer.tsx     # Dynamic component renderer ✅
│   │
│   ├── stores/
│   │   └── builder.ts                # Zustand state management ✅
│   │
│   ├── types/
│   │   └── index.ts                  # TypeScript definitions ✅
│   │
│   ├── config/
│   │   └── components.ts             # Component registry ✅
│   │
│   └── lib/
│       ├── db/
│       │   └── index.ts              # Prisma client ✅
│       └── StyledComponentsRegistry.tsx  # SSR support ✅
│
├── prisma/
│   └── schema.prisma                 # Database schema ✅
│
├── public/                           # Static assets
├── package.json                      # pnpm config ✅
├── pnpm-lock.yaml                    # Lock file ✅
├── next.config.ts                    # Next.js + Turbopack config ✅
├── tsconfig.json                     # TypeScript config ✅
├── .npmrc                            # pnpm settings ✅
└── CONTENT_SPEC.md                   # This file ✅
```

---

## 3. Technology Stack

### 3.1 Core Framework

| Technology | Purpose                      | Version  |
| ---------- | ---------------------------- | -------- |
| Next.js    | React framework with SSR/SSG | 16.0.6   |
| React      | UI library                   | 19.2.0   |
| TypeScript | Type safety                  | ^5.9.3   |
| Turbopack  | Fast bundler for development | Built-in |

### 3.2 Package Manager

| Tool | Purpose                              | Version |
| ---- | ------------------------------------ | ------- |
| pnpm | Fast, disk-efficient package manager | 10.24.0 |

### 3.3 Styling

| Technology        | Purpose                    | Version   |
| ----------------- | -------------------------- | --------- |
| styled-components | Component styling with SSR | ^6.1.19   |
| Tailwind CSS      | Utility classes            | ^4.1.17   |
| Framer Motion     | Animations                 | ^12.23.25 |

### 3.4 State & Data

| Technology            | Purpose                 | Version  |
| --------------------- | ----------------------- | -------- |
| Zustand               | Client state management | ^5.0.9   |
| @tanstack/react-query | Server state & caching  | ^5.90.11 |
| Prisma                | Database ORM            | ^6.19.0  |
| PostgreSQL            | Primary database        | Latest   |

### 3.5 Drag & Drop

| Technology         | Purpose                  | Version |
| ------------------ | ------------------------ | ------- |
| @dnd-kit/core      | Drag and drop primitives | ^6.3.1  |
| @dnd-kit/sortable  | Sortable lists           | ^10.0.0 |
| @dnd-kit/utilities | DnD utilities            | ^3.2.2  |

### 3.6 Additional Libraries

| Technology   | Purpose           | Version  |
| ------------ | ----------------- | -------- |
| lucide-react | Icons             | ^0.555.0 |
| next-seo     | SEO management    | ^7.0.1   |
| zod          | Schema validation | ^4.1.13  |

### 3.7 Dev Tools

| Technology | Purpose         | Version |
| ---------- | --------------- | ------- |
| ESLint     | Code linting    | ^9.39.1 |
| Prettier   | Code formatting | ^3.7.3  |

---

## 4. Quick Start

### 4.1 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.0.0
- PostgreSQL (optional, for database features)

### 4.2 Installation

```bash
# Clone and install
cd landing-page
pnpm install

# Generate Prisma client (if using database)
pnpm db:generate
```

### 4.3 Development

```bash
# Start dev server with Turbopack (⚡ fast HMR)
pnpm dev
```

### 4.4 Available Scripts

| Script             | Description                     |
| ------------------ | ------------------------------- |
| `pnpm dev`         | Start dev server with Turbopack |
| `pnpm build`       | Production build                |
| `pnpm start`       | Start production server         |
| `pnpm lint`        | Run ESLint                      |
| `pnpm lint:fix`    | Auto-fix lint issues            |
| `pnpm type-check`  | TypeScript type checking        |
| `pnpm format`      | Format code with Prettier       |
| `pnpm db:generate` | Generate Prisma client          |
| `pnpm db:push`     | Push schema to database         |
| `pnpm db:migrate`  | Run database migrations         |
| `pnpm db:studio`   | Open Prisma Studio              |
| `pnpm clean`       | Clean build artifacts           |

### 4.5 Build Performance

| Metric           | Value           |
| ---------------- | --------------- |
| Dev HMR          | ~200ms          |
| Production Build | ~2-3 seconds    |
| Page Generation  | ~300ms per page |

---

## 5. Content Schema

### 5.1 Page Schema

```typescript
interface Page {
  id: string;
  slug: string; // URL path
  title: string; // Page title
  description?: string; // Meta description
  status: "draft" | "published" | "archived";
  layout: LayoutBlock[]; // Page content blocks
  seo: SEOConfig;
  settings: PageSettings;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

interface PageSettings {
  showHeader: boolean;
  showFooter: boolean;
  customCSS?: string;
  analytics?: {
    googleTagId?: string;
    facebookPixelId?: string;
  };
}
```

### 5.2 Layout Block Schema

```typescript
interface LayoutBlock {
  id: string;
  type: ComponentType; // Component identifier
  order: number; // Position in layout
  props: Record<string, unknown>; // Component-specific props
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  animation?: AnimationConfig;
}

type ComponentType =
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
```

### 5.3 SEO Configuration

```typescript
interface SEOConfig {
  metaTitle?: string; // Overrides page title
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex: boolean;
  noFollow: boolean;
  ogImage?: string;
  ogType: "website" | "article";
  twitterCard: "summary" | "summary_large_image";
  structuredData?: StructuredData[];
}

interface StructuredData {
  type: "Organization" | "LocalBusiness" | "Product" | "FAQPage";
  data: Record<string, unknown>;
}
```

---

## 6. Component Library

### 6.1 Implemented Components

| Component    | Variants                            | Status |
| ------------ | ----------------------------------- | ------ |
| Hero         | centered, split, video-bg, image-bg | ✅     |
| Features     | grid, list, alternating, cards      | ✅     |
| Testimonials | carousel, grid, masonry, single     | ✅     |
| CTA          | banner, split, minimal              | ✅     |
| FAQ          | accordion, grid, two-column         | ✅     |
| Contact      | form-only, split, with-map          | ✅     |
| Stats        | inline, cards, background           | ✅     |
| Footer       | multi-column with social links      | ✅     |

### 6.2 Planned Components

| Component  | Variants                  | Status |
| ---------- | ------------------------- | ------ |
| Pricing    | cards, table, toggle      | 🔲     |
| Logos      | inline, grid, carousel    | 🔲     |
| Team       | grid, carousel            | 🔲     |
| Gallery    | grid, masonry, carousel   | 🔲     |
| Video      | inline, modal, background | 🔲     |
| Newsletter | inline, banner, popup     | 🔲     |

### 6.3 Hero Component

```typescript
interface HeroProps {
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
```

### 6.4 Features Component

```typescript
interface FeaturesProps {
  variant: "grid" | "list" | "alternating" | "cards";
  heading?: string;
  subheading?: string;
  features: Feature[];
  columns: 2 | 3 | 4;
  iconStyle: "circle" | "square" | "none";
}

interface Feature {
  id: string;
  icon?: string; // Lucide icon name
  title: string;
  description: string;
  link?: string;
  image?: string;
}
```

### 6.5 Testimonials Component

```typescript
interface TestimonialsProps {
  variant: "carousel" | "grid" | "masonry" | "single";
  heading?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  showRating: boolean;
}

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number; // 1-5
}
```

### 6.6 CTA Component

```typescript
interface CTAProps {
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
```

### 6.7 FAQ Component

```typescript
interface FAQProps {
  variant: "accordion" | "grid" | "two-column";
  heading?: string;
  subheading?: string;
  items: FAQItem[];
  expandMultiple: boolean;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string; // Supports markdown
  category?: string;
}
```

### 6.8 Contact Component

```typescript
interface ContactProps {
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
  mapEmbed?: string; // Google Maps embed URL
}

interface FormField {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select type
}
```

### 6.9 Stats Component

```typescript
interface StatsProps {
  variant: "inline" | "cards" | "background";
  stats: {
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }[];
  animated: boolean;
}
```

### 6.10 Footer Component

```typescript
interface FooterProps {
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

interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}
```

---

## 7. Page Builder System

### 7.1 Builder Interface

```
┌────────────────────────────────────────────────────────────────────────┐
│  [← Back]   Page: Home   [Desktop|Tablet|Mobile]   [Save]   [Publish]  │
├──────────────┬────────────────────────────────────────┬────────────────┤
│              │                                        │                │
│  COMPONENTS  │           CANVAS (Drop Zone)           │   PROPERTIES   │
│  ──────────  │                                        │   ──────────   │
│              │  ┌────────────────────────────────┐   │                │
│  ┌────────┐  │  │         Hero Section            │   │  Component:    │
│  │  Hero  │  │  │  [drag handle] [copy] [delete]  │   │  Hero          │
│  └────────┘  │  └────────────────────────────────┘   │                │
│  ┌────────┐  │                                        │  Variant:      │
│  │Features│  │  ┌────────────────────────────────┐   │  [Centered ▾]  │
│  └────────┘  │  │       Features Section          │   │                │
│  ┌────────┐  │  │                                 │   │  Heading:      │
│  │  Stats │  │  └────────────────────────────────┘   │  [___________] │
│  └────────┘  │                                        │                │
│  ┌────────┐  │  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐   │  Visibility:   │
│  │  CTA   │  │  │     Drop component here        │   │  ☑ Desktop     │
│  └────────┘  │  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘   │  ☑ Tablet      │
│              │                                        │  ☑ Mobile      │
│  LAYERS      │                                        │                │
│  ──────────  │                                        │  [Delete]      │
└──────────────┴────────────────────────────────────────┴────────────────┘
```

### 7.2 Builder State (Zustand)

```typescript
interface BuilderState {
  // Current page data
  page: Page | null;

  // Active selections
  selectedBlockId: string | null;
  hoveredBlockId: string | null;

  // Drag state
  isDragging: boolean;
  draggedComponent: ComponentType | null;

  // UI state
  previewMode: "desktop" | "tablet" | "mobile";
  sidebarTab: "components" | "layers" | "settings";
  hasUnsavedChanges: boolean;

  // Actions
  setPage: (page: Page | null) => void;
  selectBlock: (id: string | null) => void;
  addBlock: (type: ComponentType, position?: number) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, props: Partial<LayoutBlock>) => void;
  updateBlockProps: (id: string, props: Record<string, unknown>) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  duplicateBlock: (id: string) => void;
  markSaved: () => void;
}
```

### 7.3 Component Registration

```typescript
interface ComponentDefinition {
  type: ComponentType;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  category: "hero" | "content" | "social-proof" | "conversion" | "footer";
  defaultProps: Record<string, unknown>;
}

// Example from src/config/components.ts
const componentDefinitions: ComponentDefinition[] = [
  {
    type: "hero",
    name: "Hero Section",
    description: "Eye-catching header with headline and CTA",
    icon: "Layout",
    category: "hero",
    defaultProps: {
      variant: "centered",
      heading: "Your Amazing Headline",
      subheading: "Supporting text",
      alignment: "center",
      height: "large",
    },
  },
  // ... more components
];
```

---

## 8. SEO Configuration

### 8.1 Next.js Metadata API

SEO is handled using Next.js 14+ Metadata API in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Landiv - Build Stunning Landing Pages",
    template: "%s | Landiv",
  },
  description: "Create stunning landing pages with drag-and-drop",
  keywords: ["landing page builder", "cms", "page builder"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Landiv",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@landiv",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 8.2 Page-Level SEO

Each page can override metadata:

```typescript
// In page.tsx
export const metadata: Metadata = {
  title: "Welcome to Our Platform",
  description: "Build beautiful landing pages",
  openGraph: {
    title: "Welcome to Our Platform",
    description: "Build beautiful landing pages",
    type: "website",
  },
};
```

### 8.3 Structured Data

```typescript
// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Company Name",
  url: "https://example.com",
  logo: "https://example.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-xxx-xxx-xxxx",
    contactType: "customer service",
  },
};

// FAQ Schema (auto-generated from FAQ component)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
```

---

## 9. API Specification

### 9.1 Pages API

```typescript
// GET /api/pages
// List all pages
interface ListPagesResponse {
  pages: PageSummary[];
  total: number;
  page: number;
  limit: number;
}

// GET /api/pages/:slug
// Get page by slug (public)
interface GetPageResponse {
  page: Page;
}

// POST /api/admin/pages
// Create new page (admin)
interface CreatePageRequest {
  title: string;
  slug: string;
  layout?: LayoutBlock[];
}

// PUT /api/pages/:slug
// Update page
interface UpdatePageRequest {
  title?: string;
  slug?: string;
  layout?: LayoutBlock[];
  seo?: SEOConfig;
  settings?: PageSettings;
  status?: "draft" | "published" | "archived";
}

// DELETE /api/pages/:slug
// Delete page
```

### 9.2 API Routes Location

| Route                 | Method | Description       | Status |
| --------------------- | ------ | ----------------- | ------ |
| `/api/pages`          | GET    | List pages        | ✅     |
| `/api/pages`          | POST   | Create page       | ✅     |
| `/api/pages/[slug]`   | GET    | Get page by slug  | ✅     |
| `/api/pages/[slug]`   | PUT    | Update page       | ✅     |
| `/api/pages/[slug]`   | DELETE | Delete page       | ✅     |
| `/api/admin/pages`    | GET    | Admin list pages  | ✅     |
| `/api/admin/pages`    | POST   | Admin create page | ✅     |
| `/api/admin/media`    | \*     | Media upload      | 🔲     |
| `/api/admin/settings` | \*     | Site settings     | 🔲     |

---

## 10. Data Models

### 10.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Page {
  id          String     @id @default(cuid())
  slug        String     @unique
  title       String
  description String?
  status      PageStatus @default(DRAFT)
  layout      Json       // LayoutBlock[]
  seo         Json?      // SEOConfig
  settings    Json?      // PageSettings
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  publishedAt DateTime?

  @@index([status])
  @@index([slug])
  @@map("pages")
}

enum PageStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Media {
  id           String   @id @default(cuid())
  filename     String
  originalName String
  url          String
  thumbnailUrl String?
  mimeType     String
  size         Int
  folder       String?
  width        Int?
  height       Int?
  createdAt    DateTime @default(now())

  @@index([folder])
  @@index([mimeType])
  @@map("media")
}

model Settings {
  id           String   @id @default("global")
  seo          Json?    // GlobalSEO
  branding     Json?    // BrandingConfig
  navigation   Json?    // NavigationConfig
  integrations Json?    // IntegrationsConfig
  updatedAt    DateTime @updatedAt

  @@map("settings")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      UserRole @default(OPERATOR)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

enum UserRole {
  ADMIN
  OPERATOR
}

model FormSubmission {
  id        String   @id @default(cuid())
  pageId    String?
  formId    String
  data      Json
  ip        String?
  userAgent String?
  createdAt DateTime @default(now())

  @@index([pageId])
  @@index([formId])
  @@map("form_submissions")
}

model PageView {
  id        String   @id @default(cuid())
  pageId    String
  sessionId String?
  path      String
  referrer  String?
  userAgent String?
  device    String?
  createdAt DateTime @default(now())

  @@index([pageId])
  @@index([createdAt])
  @@map("page_views")
}
```

---

## 11. Deployment Strategy

### 11.1 Environment Variables

```env
# env.example

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/landiv"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication (NextAuth.js) - Future
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# Media Storage (S3/Cloudflare R2) - Future
S3_BUCKET="your-bucket-name"
S3_REGION="us-east-1"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-secret-key"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### 11.2 Deployment Options

| Platform         | Pros                                   | Considerations           |
| ---------------- | -------------------------------------- | ------------------------ |
| Vercel           | Native Next.js support, Edge functions | Usage-based pricing      |
| AWS (ECS/Lambda) | Full control, scalability              | More setup required      |
| Railway          | Easy setup, managed DB                 | Newer platform           |
| Render           | Simple deployment                      | Cold starts on free tier |

### 11.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build
      # Deploy step based on platform
```

---

## 12. Implementation Status

### 12.1 Core Features

| Feature                 | Status | Notes                       |
| ----------------------- | ------ | --------------------------- |
| Next.js App Router      | ✅     | v16 with Turbopack          |
| TypeScript Setup        | ✅     | Strict mode enabled         |
| Styled Components SSR   | ✅     | With registry               |
| Landing Page Components | ✅     | 8 components implemented    |
| Page Builder UI         | ✅     | Sidebar, Canvas, Properties |
| Drag & Drop             | ✅     | Using @dnd-kit              |
| State Management        | ✅     | Zustand store               |
| API Routes              | ✅     | CRUD for pages              |
| Prisma Schema           | ✅     | Ready for PostgreSQL        |
| SEO Metadata            | ✅     | Next.js Metadata API        |

### 12.2 Pending Features

| Feature              | Status | Priority |
| -------------------- | ------ | -------- |
| Authentication       | 🔲     | High     |
| Media Upload         | 🔲     | High     |
| Database Integration | 🔲     | High     |
| Pricing Component    | 🔲     | Medium   |
| Logo Cloud Component | 🔲     | Medium   |
| Newsletter Component | 🔲     | Medium   |
| Undo/Redo in Builder | 🔲     | Medium   |
| Page Versioning      | 🔲     | Low      |
| Analytics Dashboard  | 🔲     | Low      |

### 12.3 Next Steps

1. **Connect Database**: Set up PostgreSQL and run migrations
2. **Add Authentication**: Implement NextAuth.js for admin protection
3. **Media Upload**: Add S3/Cloudflare R2 integration
4. **Complete Components**: Implement remaining component types
5. **Testing**: Add unit and integration tests

---

## Appendix A: Icon Reference (Lucide)

Common icons used in landing pages:

```typescript
// Navigation & Actions
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";

// Features & Benefits
import {
  Check,
  Star,
  Zap,
  Shield,
  Clock,
  Globe,
  Rocket,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";

// Contact & Social
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";

// Builder Icons
import {
  Layout,
  Grid3x3,
  Quote,
  CreditCard,
  MousePointerClick,
  HelpCircle,
  BarChart3,
  Building2,
  Newspaper,
  Type,
  ImageIcon,
} from "lucide-react";
```

---

## Revision History

| Version | Date        | Author  | Changes                                   |
| ------- | ----------- | ------- | ----------------------------------------- |
| 1.0.0   | Dec 1, 2025 | Initial | Initial specification                     |
| 1.1.0   | Dec 1, 2025 | Updated | Updated to reflect current implementation |
|         |             |         | - Added pnpm package manager              |
|         |             |         | - Updated to Next.js 16 + Turbopack       |
|         |             |         | - Added Quick Start section               |
|         |             |         | - Added Implementation Status             |
|         |             |         | - Updated folder structure                |
|         |             |         | - Updated all dependency versions         |

---

_This specification is a living document and will be updated as requirements evolve._
