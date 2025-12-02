'use client';

import React, { useEffect, useState } from 'react';
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
  Trash2,
  Loader2,
  Search,
  MoreHorizontal,
  Copy,
  Globe,
  RefreshCw,
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

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  min-width: 250px;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.875rem;
    color: #374151;

    &::placeholder {
      color: #94a3b8;
    }
  }
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

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${({ $active }) => ($active ? '#667eea' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#64748b')};
  box-shadow: ${({ $active }) => ($active ? 'none' : '0 1px 2px rgba(0,0,0,0.05)')};

  &:hover {
    background: ${({ $active }) => ($active ? '#667eea' : '#f8fafc')};
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
  position: relative;
`;

const CardMenu = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`;

const CardMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #f8fafc;
    color: #374151;
  }
`;

const CardDropdown = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  z-index: 10;
`;

const CardDropdownItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: none;
  border: none;
  font-size: 0.8125rem;
  color: ${({ $danger }) => ($danger ? '#ef4444' : '#374151')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fef2f2' : '#f8fafc')};
  }
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
  text-transform: capitalize;
  background: ${({ $status }) =>
    $status === 'PUBLISHED' ? '#dcfce7' : $status === 'ARCHIVED' ? '#f1f5f9' : '#fef3c7'};
  color: ${({ $status }) =>
    $status === 'PUBLISHED' ? '#166534' : $status === 'ARCHIVED' ? '#64748b' : '#92400e'};
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

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: #f8fafc;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  color: #94a3b8;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  color: #64748b;
  margin-bottom: 1.5rem;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #667eea;
`;

const Spinner = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Toast = styled.div<{ $visible: boolean; $type: 'success' | 'error' }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: ${({ $type }) => ($type === 'success' ? '#10b981' : '#ef4444')};
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(20px)')};
  transition: all 0.3s ease;
  z-index: 1001;
`;

interface PageSummary {
  id: string;
  slug: string;
  title: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

type FilterStatus = 'all' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export default function AdminPage() {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.set('status', filter);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const response = await fetch(`/api/admin/pages?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const data = await response.json();
      setPages(data.pages);
    } catch (error) {
      console.error('Error fetching pages:', error);
      showToast('Failed to load pages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [filter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPages();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDuplicate = async (page: PageSummary) => {
    try {
      // First get the full page data
      const getResponse = await fetch(`/api/admin/pages/${page.id}`);
      if (!getResponse.ok) throw new Error('Failed to get page');
      const { page: fullPage } = await getResponse.json();

      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${fullPage.title} (Copy)`,
          slug: `${fullPage.slug}-copy-${Date.now()}`,
          layout: fullPage.layout,
          seo: fullPage.seo,
          settings: fullPage.settings,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to duplicate page');
      }

      showToast('Page duplicated successfully', 'success');
      setActiveMenu(null);
      fetchPages();
    } catch (error) {
      console.error('Error duplicating page:', error);
      showToast('Failed to duplicate page', 'error');
    }
  };

  const handleDelete = async (page: PageSummary) => {
    if (!confirm(`Are you sure you want to delete "${page.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      showToast('Page deleted successfully', 'success');
      setActiveMenu(null);
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      showToast('Failed to delete page', 'error');
    }
  };

  const handlePublish = async (page: PageSummary) => {
    try {
      const response = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: page.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update page status');
      }

      showToast(
        page.status === 'PUBLISHED' ? 'Page unpublished' : 'Page published',
        'success'
      );
      setActiveMenu(null);
      fetchPages();
    } catch (error) {
      console.error('Error updating page:', error);
      showToast('Failed to update page', 'error');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
          <HeaderActions>
            <SearchBox>
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>
            <CreateButton href="/admin/builder">
              <Plus size={18} />
              Create Page
            </CreateButton>
          </HeaderActions>
        </PageHeader>

        <FilterTabs>
          <FilterTab $active={filter === 'all'} onClick={() => setFilter('all')}>
            All Pages
          </FilterTab>
          <FilterTab $active={filter === 'PUBLISHED'} onClick={() => setFilter('PUBLISHED')}>
            Published
          </FilterTab>
          <FilterTab $active={filter === 'DRAFT'} onClick={() => setFilter('DRAFT')}>
            Drafts
          </FilterTab>
          <FilterTab $active={filter === 'ARCHIVED'} onClick={() => setFilter('ARCHIVED')}>
            Archived
          </FilterTab>
        </FilterTabs>

        {isLoading ? (
          <LoadingState>
            <Spinner size={32} />
          </LoadingState>
        ) : pages.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FileText size={32} />
            </EmptyIcon>
            <EmptyTitle>No pages yet</EmptyTitle>
            <EmptyDescription>
              Get started by creating your first landing page
            </EmptyDescription>
            <CreateButton href="/admin/builder">
              <Plus size={18} />
              Create Page
            </CreateButton>
          </EmptyState>
        ) : (
          <Grid>
            {pages.map((page) => (
              <Card key={page.id}>
                <CardPreview>
                  <Layout size={48} />
                  <CardMenu>
                    <CardMenuButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === page.id ? null : page.id);
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </CardMenuButton>
                    <CardDropdown $visible={activeMenu === page.id}>
                      <CardDropdownItem onClick={() => handleDuplicate(page)}>
                        <Copy size={14} />
                        Duplicate
                      </CardDropdownItem>
                      <CardDropdownItem onClick={() => handlePublish(page)}>
                        <Globe size={14} />
                        {page.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                      </CardDropdownItem>
                      <CardDropdownItem $danger onClick={() => handleDelete(page)}>
                        <Trash2 size={14} />
                        Delete
                      </CardDropdownItem>
                    </CardDropdown>
                  </CardMenu>
                </CardPreview>
                <CardContent>
                  <CardHeader>
                    <CardTitle>{page.title}</CardTitle>
                    <StatusBadge $status={page.status}>
                      {page.status.toLowerCase()}
                    </StatusBadge>
                  </CardHeader>
                  <CardMeta>
                    {page.slug} • Updated {formatDate(page.updatedAt)}
                  </CardMeta>
                  <CardActions>
                    <CardAction href={`/admin/builder?id=${page.id}`}>
                      <Edit size={16} />
                      Edit
                    </CardAction>
                    <CardAction
                      href={page.status === 'PUBLISHED' ? page.slug : `/preview/${page.id}`}
                      target="_blank"
                    >
                      <Eye size={16} />
                      {page.status === 'PUBLISHED' ? 'View' : 'Preview'}
                    </CardAction>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Main>

      <Toast $visible={toast.visible} $type={toast.type}>
        {toast.message}
      </Toast>
    </AdminLayout>
  );
}
