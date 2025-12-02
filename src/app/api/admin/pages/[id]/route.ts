import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/admin/pages/[id] - Get page by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page. Please check database connection." },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pages/[id] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, status, layout, seo, settings } = body;

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id },
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // If slug is being changed, check for duplicates
    if (slug && slug !== existingPage.slug) {
      const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
      const duplicatePage = await prisma.page.findUnique({
        where: { slug: normalizedSlug },
      });

      if (duplicatePage && duplicatePage.id !== id) {
        return NextResponse.json(
          { error: "A page with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Build update data dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {};

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined)
      updateData.slug = slug.startsWith("/") ? slug : `/${slug}`;
    if (description !== undefined) updateData.description = description;
    if (layout !== undefined) updateData.layout = layout;
    if (seo !== undefined) updateData.seo = seo;
    if (settings !== undefined) updateData.settings = settings;

    // Handle status changes
    if (status !== undefined) {
      updateData.status = status;

      // Set publishedAt when publishing for the first time
      if (status === "PUBLISHED" && !existingPage.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const updatedPage = await prisma.page.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ page: updatedPage });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Failed to update page. Please check database connection." },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/pages/[id] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id },
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deleted: id });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page. Please check database connection." },
      { status: 500 }
    );
  }
}
