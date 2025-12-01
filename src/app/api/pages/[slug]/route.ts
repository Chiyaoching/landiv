import { NextRequest, NextResponse } from 'next/server';

// Demo page data (replace with database queries in production)
const getDemoPage = (slug: string) => ({
  id: '1',
  slug,
  title: 'Demo Page',
  description: 'A demo landing page',
  status: 'published',
  layout: [],
  seo: {
    noIndex: false,
    noFollow: false,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  settings: {
    showHeader: true,
    showFooter: true,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// GET /api/pages/[slug] - Get page by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // In production, fetch from database
  const page = getDemoPage(slug);

  if (!page) {
    return NextResponse.json(
      { error: 'Page not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ page });
}

// PUT /api/pages/[slug] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // In production, update in database
    const updatedPage = {
      ...getDemoPage(slug),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ page: updatedPage });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/pages/[slug] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // In production, delete from database
  return NextResponse.json({ success: true, deleted: slug });
}

