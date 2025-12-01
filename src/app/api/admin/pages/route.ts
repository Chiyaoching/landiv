import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/pages - Create new page (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    const body = await request.json();
    const { title, slug, layout, seo, settings } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    // In production, check database

    const newPage = {
      id: `page_${Date.now()}`,
      title,
      slug: slug.startsWith('/') ? slug : `/${slug}`,
      status: 'draft',
      layout: layout || [],
      seo: seo || {
        noIndex: false,
        noFollow: false,
        ogType: 'website',
        twitterCard: 'summary_large_image',
      },
      settings: settings || {
        showHeader: true,
        showFooter: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In production, save to database using Prisma
    // await prisma.page.create({ data: newPage });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}

// GET /api/admin/pages - List all pages (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // In production, fetch from database
    // const pages = await prisma.page.findMany({
    //   where: { status, title: { contains: search } },
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   orderBy: { updatedAt: 'desc' },
    // });

    const demoPages = [
      {
        id: '1',
        slug: '/',
        title: 'Home Page',
        status: 'published',
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      pages: demoPages,
      total: demoPages.length,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

