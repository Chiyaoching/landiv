import { ComponentDefinition, ComponentType } from "@/types";

// Default props for each component type
export const defaultComponentProps: Record<
  ComponentType,
  Record<string, unknown>
> = {
  hero: {
    variant: "centered",
    heading: "Your Amazing Headline",
    subheading: "Supporting text that explains your value proposition",
    description: "",
    primaryCTA: {
      text: "Get Started",
      link: "#",
      style: "solid",
    },
    secondaryCTA: undefined,
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    alignment: "center",
    height: "large",
  },
  features: {
    variant: "grid",
    heading: "Our Features",
    subheading: "Everything you need to succeed",
    columns: 3,
    iconStyle: "circle",
    features: [
      {
        id: "1",
        icon: "Zap",
        title: "Fast Performance",
        description: "Optimized for speed and efficiency.",
      },
      {
        id: "2",
        icon: "Shield",
        title: "Secure by Default",
        description: "Built with security best practices.",
      },
      {
        id: "3",
        icon: "Globe",
        title: "Global Scale",
        description: "Deploy anywhere in the world.",
      },
    ],
  },
  testimonials: {
    variant: "carousel",
    heading: "What Our Customers Say",
    showRating: true,
    autoplay: true,
    testimonials: [
      {
        id: "1",
        content:
          "This product has transformed how we work. Highly recommended!",
        author: {
          name: "John Doe",
          title: "CEO",
          company: "Tech Corp",
        },
        rating: 5,
      },
    ],
  },
  pricing: {
    variant: "cards",
    heading: "Simple Pricing",
    subheading: "Choose the plan that works for you",
    billingToggle: true,
    plans: [
      {
        id: "1",
        name: "Starter",
        description: "Perfect for small teams",
        monthlyPrice: 29,
        annualPrice: 290,
        currency: "USD",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        cta: { text: "Get Started", link: "#" },
      },
      {
        id: "2",
        name: "Pro",
        description: "For growing businesses",
        monthlyPrice: 79,
        annualPrice: 790,
        currency: "USD",
        features: ["Everything in Starter", "Feature 4", "Feature 5"],
        cta: { text: "Get Started", link: "#" },
        badge: "Most Popular",
      },
    ],
    highlightedPlan: "2",
  },
  cta: {
    variant: "banner",
    heading: "Ready to Get Started?",
    description: "Join thousands of satisfied customers today.",
    primaryButton: {
      text: "Start Free Trial",
      link: "#",
    },
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  },
  faq: {
    variant: "accordion",
    heading: "Frequently Asked Questions",
    subheading: "Find answers to common questions",
    expandMultiple: false,
    items: [
      {
        id: "1",
        question: "How do I get started?",
        answer:
          "Simply sign up for an account and follow our quick setup guide.",
      },
      {
        id: "2",
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a 14-day free trial with no credit card required.",
      },
    ],
  },
  contact: {
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
        placeholder: "Your message...",
        required: true,
      },
    ],
    submitButton: {
      text: "Send Message",
      loadingText: "Sending...",
    },
    successMessage: "Thank you! We'll be in touch soon.",
    contactInfo: {
      email: "hello@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, Country",
    },
  },
  stats: {
    variant: "cards",
    animated: true,
    stats: [
      { value: "10K", label: "Active Users", suffix: "+" },
      { value: "99.9", label: "Uptime", suffix: "%" },
      { value: "24/7", label: "Support" },
      { value: "50", label: "Countries", suffix: "+" },
    ],
  },
  logos: {
    heading: "Trusted by Industry Leaders",
    variant: "inline",
    grayscale: true,
    logos: [],
  },
  newsletter: {
    variant: "inline",
    heading: "Stay Updated",
    description: "Subscribe to our newsletter for the latest updates.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  gallery: {
    variant: "grid",
    columns: 3,
    lightbox: true,
    images: [],
  },
  video: {
    variant: "inline",
    source: "youtube",
    videoId: "",
    autoplay: false,
  },
  "text-block": {
    content: "# Your Title\n\nAdd your content here using markdown.",
    alignment: "left",
    maxWidth: "md",
  },
  "image-text": {
    variant: "image-left",
    image: { src: "", alt: "" },
    heading: "Section Title",
    content: "Add your content here.",
  },
  team: {
    heading: "Meet Our Team",
    variant: "grid",
    members: [],
  },
  "custom-html": {
    content: "<div>Custom HTML content</div>",
  },
};

// Component definitions for the builder sidebar
export const componentDefinitions: ComponentDefinition[] = [
  {
    type: "hero",
    name: "Hero Section",
    description: "Eye-catching header with headline and CTA",
    icon: "Layout",
    category: "hero",
    defaultProps: defaultComponentProps.hero,
  },
  {
    type: "features",
    name: "Features",
    description: "Showcase your product features",
    icon: "Grid3x3",
    category: "content",
    defaultProps: defaultComponentProps.features,
  },
  {
    type: "testimonials",
    name: "Testimonials",
    description: "Customer testimonials and reviews",
    icon: "Quote",
    category: "social-proof",
    defaultProps: defaultComponentProps.testimonials,
  },
  {
    type: "pricing",
    name: "Pricing",
    description: "Pricing plans and comparisons",
    icon: "CreditCard",
    category: "conversion",
    defaultProps: defaultComponentProps.pricing,
  },
  {
    type: "cta",
    name: "Call to Action",
    description: "Conversion-focused CTA section",
    icon: "MousePointerClick",
    category: "conversion",
    defaultProps: defaultComponentProps.cta,
  },
  {
    type: "faq",
    name: "FAQ",
    description: "Frequently asked questions",
    icon: "HelpCircle",
    category: "content",
    defaultProps: defaultComponentProps.faq,
  },
  {
    type: "contact",
    name: "Contact Form",
    description: "Contact form with info",
    icon: "Mail",
    category: "conversion",
    defaultProps: defaultComponentProps.contact,
  },
  {
    type: "stats",
    name: "Statistics",
    description: "Key metrics and numbers",
    icon: "BarChart3",
    category: "social-proof",
    defaultProps: defaultComponentProps.stats,
  },
  {
    type: "logos",
    name: "Logo Cloud",
    description: "Partner or client logos",
    icon: "Building2",
    category: "social-proof",
    defaultProps: defaultComponentProps.logos,
  },
  {
    type: "newsletter",
    name: "Newsletter",
    description: "Email subscription form",
    icon: "Newspaper",
    category: "conversion",
    defaultProps: defaultComponentProps.newsletter,
  },
  {
    type: "text-block",
    name: "Text Block",
    description: "Rich text content",
    icon: "Type",
    category: "content",
    defaultProps: defaultComponentProps["text-block"],
  },
  {
    type: "image-text",
    name: "Image + Text",
    description: "Image with text content",
    icon: "ImageIcon",
    category: "content",
    defaultProps: defaultComponentProps["image-text"],
  },
];
