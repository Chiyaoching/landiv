import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/ComponentRenderer";
import { Footer } from "@/components/landing/Footer";
import prisma from "@/lib/db";
import { LayoutBlock } from "@/types";

// Type for our page data
interface PageData {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  status: string;
  layout: unknown[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
  } | null;
  settings: {
    showHeader?: boolean;
    showFooter?: boolean;
  } | null;
}

// Fetch page data
async function getPageBySlug(slug: string): Promise<PageData | null> {
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;

  try {
    const page = await prisma.page.findUnique({
      where: { slug: normalizedSlug },
    });

    if (!page || page.status !== "PUBLISHED") {
      return null;
    }

    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      description: page.description,
      status: page.status,
      layout: page.layout as unknown[],
      seo: page.seo as PageData["seo"],
      settings: page.settings as PageData["settings"],
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = `/${slug.join("/")}`;
  const page = await getPageBySlug(slugPath);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const seo = page.seo || {};

  return {
    title: seo.metaTitle || page.title,
    description: seo.metaDescription || page.description || "",
    openGraph: {
      title: seo.metaTitle || page.title,
      description: seo.metaDescription || page.description || "",
      type: (seo.ogType as "website" | "article") || "website",
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    twitter: {
      card:
        (seo.twitterCard as "summary" | "summary_large_image") ||
        "summary_large_image",
      title: seo.metaTitle || page.title,
      description: seo.metaDescription || page.description || "",
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  };
}

// Default footer data
const defaultFooterData = {
  description: "Built with Landiv - the drag-and-drop landing page builder.",
  columns: [],
  socialLinks: [],
  copyright: `© ${new Date().getFullYear()} All rights reserved.`,
  bottomLinks: [],
};

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = `/${slug.join("/")}`;
  const page = await getPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  const settings = page.settings || {};
  const layout = (page.layout || []) as Array<{
    id: string;
    type: string;
    order: number;
    props: Record<string, unknown>;
    visibility: { desktop: boolean; tablet: boolean; mobile: boolean };
  }>;

  return (
    <>
      <PageRenderer layout={layout as LayoutBlock[]} />
      {settings.showFooter !== false && <Footer {...defaultFooterData} />}
    </>
  );
}
