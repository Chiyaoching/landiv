import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/admin/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, layout, seo, settings } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Normalize slug
    const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;

    // Check for duplicate slug
    const existingPage = await prisma.page.findUnique({
      where: { slug: normalizedSlug },
    });

    if (existingPage) {
      return NextResponse.json(
        { error: "A page with this slug already exists" },
        { status: 400 }
      );
    }

    const newPage = await prisma.page.create({
      data: {
        title,
        slug: normalizedSlug,
        description: description || null,
        status: "DRAFT",
        layout: layout || [],
        seo: seo || {
          noIndex: false,
          noFollow: false,
          ogType: "website",
          twitterCard: "summary_large_image",
        },
        settings: settings || {
          showHeader: true,
          showFooter: true,
        },
      },
    });

    return NextResponse.json({ page: newPage }, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Failed to create page. Please check database connection." },
      { status: 500 }
    );
  }
}

// GET /api/admin/pages - List all pages
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          slug: true,
          title: true,
          status: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
      prisma.page.count({ where }),
    ]);

    return NextResponse.json({
      pages,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages. Please check database connection." },
      { status: 500 }
    );
  }
}
