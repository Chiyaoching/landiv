import { Metadata } from "next";
import { PageRenderer } from "@/components/ComponentRenderer";
import { Footer } from "@/components/landing/Footer";
import { LayoutBlock } from "@/types";

// SEO Metadata
export const metadata: Metadata = {
  title: "Build Stunning Landing Pages | Landiv",
  description:
    "Create beautiful, high-converting landing pages with drag-and-drop simplicity. No coding required.",
  keywords: ["landing page", "page builder", "website builder", "no code", "drag and drop"],
  openGraph: {
    title: "Landiv - Build Stunning Landing Pages",
    description: "Create beautiful landing pages with drag-and-drop simplicity.",
    type: "website",
    locale: "en_US",
    siteName: "Landiv",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landiv - Build Stunning Landing Pages",
    description: "Create beautiful landing pages with drag-and-drop simplicity.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Demo page content - In production, this would come from the database
const demoLayout: LayoutBlock[] = [
  {
    id: "hero-1",
    type: "hero",
    order: 0,
    props: {
      variant: "centered",
      heading: "Build Landing Pages That Convert",
      subheading: "Drag. Drop. Launch.",
      description:
        "Create stunning, high-converting landing pages in minutes. No coding required. Just pure creative freedom.",
      primaryCTA: {
        text: "Start Building Free",
        link: "/admin/builder",
        style: "solid",
      },
      secondaryCTA: {
        text: "See How It Works",
        link: "#features",
      },
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      alignment: "center",
      height: "large",
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "stats-1",
    type: "stats",
    order: 1,
    props: {
      variant: "cards",
      animated: true,
      stats: [
        { value: "10K", label: "Pages Built", suffix: "+" },
        { value: "99.9", label: "Uptime", suffix: "%" },
        { value: "50", label: "Components", suffix: "+" },
        { value: "2", label: "Min Setup", suffix: "min" },
      ],
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "features-1",
    type: "features",
    order: 2,
    props: {
      variant: "grid",
      heading: "Everything You Need",
      subheading: "Powerful features for beautiful landing pages",
      columns: 3,
      iconStyle: "circle",
      features: [
        {
          id: "1",
          icon: "MousePointerClick",
          title: "Drag & Drop Builder",
          description:
            "Visual page builder with intuitive drag and drop interface. No coding required.",
        },
        {
          id: "2",
          icon: "Palette",
          title: "Customizable Components",
          description:
            "Over 50 pre-built components that you can customize to match your brand.",
        },
        {
          id: "3",
          icon: "Search",
          title: "SEO Optimized",
          description:
            "Built-in SEO tools and server-side rendering for better search rankings.",
        },
        {
          id: "4",
          icon: "Smartphone",
          title: "Responsive Design",
          description:
            "All pages look great on desktop, tablet, and mobile devices.",
        },
        {
          id: "5",
          icon: "Zap",
          title: "Lightning Fast",
          description:
            "Powered by Turbopack for blazing-fast development and optimal performance.",
        },
        {
          id: "6",
          icon: "Lock",
          title: "Secure by Default",
          description:
            "Enterprise-grade security with SSL, authentication, and access controls.",
        },
      ],
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "testimonials-1",
    type: "testimonials",
    order: 3,
    props: {
      variant: "grid",
      heading: "Loved by Teams Worldwide",
      showRating: true,
      testimonials: [
        {
          id: "1",
          content:
            "Landiv has transformed how we create landing pages. What used to take weeks now takes hours.",
          author: {
            name: "Sarah Johnson",
            title: "Marketing Director",
            company: "TechCorp",
          },
          rating: 5,
        },
        {
          id: "2",
          content:
            "The drag-and-drop interface is incredibly intuitive. Our design team absolutely loves it!",
          author: {
            name: "Michael Chen",
            title: "Product Manager",
            company: "StartupXYZ",
          },
          rating: 5,
        },
        {
          id: "3",
          content:
            "Finally, a page builder that gives us full control without sacrificing performance.",
          author: {
            name: "Emily Davis",
            title: "CTO",
            company: "DigitalAgency",
          },
          rating: 5,
        },
      ],
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "faq-1",
    type: "faq",
    order: 4,
    props: {
      variant: "accordion",
      heading: "Frequently Asked Questions",
      subheading: "Find answers to common questions",
      expandMultiple: false,
      items: [
        {
          id: "1",
          question: "How do I get started with Landiv?",
          answer:
            "Simply sign up for an account and start building! Our intuitive drag-and-drop builder makes it easy to create beautiful landing pages in minutes.",
        },
        {
          id: "2",
          question: "Is there a free trial?",
          answer:
            "Yes! We offer a 14-day free trial with full access to all features. No credit card required.",
        },
        {
          id: "3",
          question: "Can I use my own domain?",
          answer:
            "Absolutely! You can connect your custom domain with just a few clicks. We handle all the SSL certificates automatically.",
        },
        {
          id: "4",
          question: "Is Landiv SEO friendly?",
          answer:
            "Yes! Our pages are built with SEO best practices. We use server-side rendering, proper meta tags, and structured data to help your pages rank better.",
        },
      ],
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "cta-1",
    type: "cta",
    order: 5,
    props: {
      variant: "banner",
      heading: "Ready to Build Your Landing Page?",
      description:
        "Join thousands of businesses creating high-converting pages with Landiv.",
      primaryButton: {
        text: "Start Building Now",
        link: "/admin/builder",
      },
      secondaryButton: {
        text: "View Examples",
        link: "#",
      },
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "contact-1",
    type: "contact",
    order: 6,
    props: {
      variant: "split",
      heading: "Get in Touch",
      subheading: "We'd love to hear from you",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Name",
          placeholder: "Your name",
          required: true,
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          placeholder: "your@email.com",
          required: true,
        },
        {
          id: "message",
          type: "textarea",
          label: "Message",
          placeholder: "How can we help?",
          required: true,
        },
      ],
      submitButton: {
        text: "Send Message",
        loadingText: "Sending...",
      },
      successMessage: "Thank you! We'll be in touch soon.",
      contactInfo: {
        email: "hello@landiv.io",
        phone: "+1 (555) 123-4567",
        address: "123 Builder Street, SF, CA 94107",
      },
    },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
];

const footerData = {
  description:
    "Build beautiful landing pages with intuitive drag-and-drop simplicity.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Templates", href: "#templates" },
        { label: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Help Center", href: "/help" },
        { label: "API Reference", href: "/api" },
        { label: "Status", href: "/status" },
      ],
    },
  ],
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com/landiv", icon: "Twitter" },
    { platform: "GitHub", url: "https://github.com/landiv", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/landiv", icon: "Linkedin" },
  ],
  copyright: "© 2025 Landiv. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function HomePage() {
  return (
    <>
      <PageRenderer layout={demoLayout} />
      <Footer {...footerData} />
    </>
  );
}
