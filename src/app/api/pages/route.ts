import { NextRequest, NextResponse } from "next/server";

// Demo pages data (replace with database queries in production)
const demoPages = [
  {
    id: "1",
    slug: "/",
    title: "Home Page",
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "/about",
    title: "About Us",
    status: "draft",
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/pages - List all pages
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");

  let filteredPages = demoPages;

  if (status) {
    filteredPages = demoPages.filter((p) => p.status === status);
  }

  return NextResponse.json({
    pages: filteredPages,
    total: filteredPages.length,
    page,
    limit,
  });
}

// POST /api/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, layout } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // In production, save to database using Prisma
    const newPage = {
      id: `page_${Date.now()}`,
      title,
      slug,
      status: "draft",
      layout: layout || [],
      seo: {},
      settings: { showHeader: true, showFooter: true },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}
