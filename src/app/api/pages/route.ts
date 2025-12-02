import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/pages - List all published pages (public)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where: { status: "PUBLISHED" },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          updatedAt: true,
          publishedAt: true,
        },
      }),
      prisma.page.count({ where: { status: "PUBLISHED" } }),
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
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
