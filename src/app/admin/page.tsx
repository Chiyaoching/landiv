'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  Layout,
  FileText,
  Image,
  Settings,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
} from 'lucide-react';

const AdminLayout = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: #667eea;
    background: #667eea10;
  }
`;

const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a2e;
`;

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const CardPreview = styled.div`
  height: 180px;
  background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
`;

const CardContent = styled.div`
  padding: 1.25rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background: ${({ $status }) =>
    $status === 'published' ? '#dcfce7' : '#fef3c7'};
  color: ${({ $status }) =>
    $status === 'published' ? '#166534' : '#92400e'};
`;

const CardMeta = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 1rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CardAction = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  background: #f8fafc;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #667eea10;
    color: #667eea;
  }
`;

// Demo pages
const demoPages = [
  {
    id: '1',
    title: 'Home Page',
    slug: '/',
    status: 'published',
    updatedAt: 'Dec 1, 2025',
  },
  {
    id: '2',
    title: 'About Us',
    slug: '/about',
    status: 'draft',
    updatedAt: 'Nov 28, 2025',
  },
  {
    id: '3',
    title: 'Contact',
    slug: '/contact',
    status: 'draft',
    updatedAt: 'Nov 25, 2025',
  },
];

export default function AdminPage() {
  return (
    <AdminLayout>
      <Header>
        <Logo>Landiv</Logo>
        <Nav>
          <NavLink href="/admin">
            <FileText size={18} />
            Pages
          </NavLink>
          <NavLink href="/admin/builder">
            <Layout size={18} />
            Builder
          </NavLink>
          <NavLink href="/admin/media">
            <Image size={18} />
            Media
          </NavLink>
          <NavLink href="/admin/settings">
            <Settings size={18} />
            Settings
          </NavLink>
        </Nav>
      </Header>

      <Main>
        <PageHeader>
          <Title>Pages</Title>
          <CreateButton href="/admin/builder">
            <Plus size={18} />
            Create Page
          </CreateButton>
        </PageHeader>

        <Grid>
          {demoPages.map((page) => (
            <Card key={page.id}>
              <CardPreview>
                <Layout size={48} />
              </CardPreview>
              <CardContent>
                <CardHeader>
                  <CardTitle>{page.title}</CardTitle>
                  <StatusBadge $status={page.status}>{page.status}</StatusBadge>
                </CardHeader>
                <CardMeta>
                  {page.slug} • Updated {page.updatedAt}
                </CardMeta>
                <CardActions>
                  <CardAction href="/admin/builder">
                    <Edit size={16} />
                    Edit
                  </CardAction>
                  <CardAction href={page.slug}>
                    <Eye size={16} />
                    View
                  </CardAction>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Main>
    </AdminLayout>
  );
}

