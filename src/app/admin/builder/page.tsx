'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import styled from 'styled-components';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Eye,
  MoreHorizontal,
  Loader2,
  Check,
  Globe,
  FileText,
  Trash2,
  Copy,
} from 'lucide-react';
import { useBuilderStore } from '@/stores/builder';
import { Sidebar } from '@/components/builder/Sidebar';
import { Canvas } from '@/components/builder/Canvas';
import { PropertyPanel } from '@/components/builder/PropertyPanel';
import { Page } from '@/types';

const BuilderLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f1f5f9;
`;

const BuilderHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: #64748b;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
    color: #1a1a2e;
  }
`;

const PageTitle = styled.div`
  font-weight: 600;
  color: #1a1a2e;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const UnsavedIndicator = styled.span`
  color: #94a3b8;
  font-size: 0.75rem;
`;

const HeaderButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'success' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    
    &:hover {
      opacity: 0.9;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `
      : $variant === 'success'
      ? `
    background: #10b981;
    color: white;
    border: none;
    
    &:hover {
      background: #059669;
    }
  `
      : `
    background: white;
    color: #374151;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background: #f8fafc;
      border-color: #d1d5db;
    }
  `}
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #1a1a2e;
  }
`;

const DropdownMenu = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  min-width: 180px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.2s ease;
  z-index: 1000;
`;

const DropdownItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: ${({ $danger }) => ($danger ? '#ef4444' : '#374151')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fef2f2' : '#f8fafc')};
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 0.25rem 0;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const BuilderMain = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f8fafc;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const Spinner = styled(Loader2)`
  animation: spin 1s linear infinite;
  color: #667eea;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Modal styles
const ModalOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: all 0.2s ease;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 1rem;
`;

const ModalField = styled.div`
  margin-bottom: 1rem;
`;

const ModalLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
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

// Default page template for new pages
const createNewPage = (title: string, slug: string): Page => ({
  id: '',
  slug: slug.startsWith('/') ? slug : `/${slug}`,
  title,
  status: 'draft',
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
  createdAt: new Date(),
  updatedAt: new Date(),
});

function BuilderPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('id');
  
  const { page, setPage, addBlock, hasUnsavedChanges, markSaved, reorderBlocks } = useBuilderStore();

  // Configure drag sensors with activation constraints
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before starting drag
      },
    })
  );
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  // Load page from API
  const loadPage = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/pages/${id}`);
      if (!response.ok) {
        throw new Error('Failed to load page');
      }
      const data = await response.json();
      // Transform API data to match our Page type
      const loadedPage: Page = {
        ...data.page,
        status: data.page.status.toLowerCase(),
        layout: data.page.layout || [],
        seo: data.page.seo || {},
        settings: data.page.settings || {},
        createdAt: new Date(data.page.createdAt),
        updatedAt: new Date(data.page.updatedAt),
      };
      setPage(loadedPage);
    } catch (error) {
      console.error('Error loading page:', error);
      showToast('Failed to load page', 'error');
      // Create new page if load fails
      setPage(createNewPage('New Page', '/new-page'));
    } finally {
      setIsLoading(false);
    }
  }, [setPage]);

  // Initialize page
  useEffect(() => {
    if (pageId) {
      loadPage(pageId);
    } else {
      // No page ID - show new page modal
      setIsLoading(false);
      setShowNewPageModal(true);
    }
  }, [pageId, loadPage]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Adding new component from sidebar
    if (active.data.current?.isNew) {
      const componentType = active.data.current.type;
      addBlock(componentType);
      return;
    }

    // Reordering existing blocks
    if (active.id !== over.id && page?.layout) {
      const sortedLayout = [...page.layout].sort((a, b) => a.order - b.order);
      const oldIndex = sortedLayout.findIndex((b) => b.id === active.id);
      const newIndex = sortedLayout.findIndex((b) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(oldIndex, newIndex);
      }
    }
  };

  const handleSave = async () => {
    if (!page) return;
    
    setIsSaving(true);
    try {
      const isNew = !page.id;
      const url = isNew ? '/api/admin/pages' : `/api/admin/pages/${page.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          description: page.description,
          status: page.status.toUpperCase(),
          layout: page.layout,
          seo: page.seo,
          settings: page.settings,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save page');
      }

      const data = await response.json();
      
      // Update page with server response
      setPage({
        ...page,
        id: data.page.id,
        updatedAt: new Date(data.page.updatedAt),
      });
      
      markSaved();
      showToast('Page saved successfully!', 'success');

      // Update URL if this was a new page
      if (isNew) {
        router.replace(`/admin/builder?id=${data.page.id}`);
      }
    } catch (error) {
      console.error('Error saving page:', error);
      showToast(error instanceof Error ? error.message : 'Failed to save page', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!page) return;
    
    setIsSaving(true);
    try {
      // Save first if there are unsaved changes
      if (hasUnsavedChanges || !page.id) {
        await handleSave();
      }
      
      const response = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'PUBLISHED',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish page');
      }

      const data = await response.json();
      setPage({
        ...page,
        status: 'published',
        updatedAt: new Date(data.page.updatedAt),
      });
      
      showToast('Page published successfully!', 'success');
    } catch (error) {
      console.error('Error publishing page:', error);
      showToast('Failed to publish page', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnpublish = async () => {
    if (!page) return;
    
    try {
      const response = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'DRAFT',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to unpublish page');
      }

      const data = await response.json();
      setPage({
        ...page,
        status: 'draft',
        updatedAt: new Date(data.page.updatedAt),
      });
      
      showToast('Page unpublished', 'success');
      setShowMenu(false);
    } catch (error) {
      console.error('Error unpublishing page:', error);
      showToast('Failed to unpublish page', 'error');
    }
  };

  const handleDuplicate = async () => {
    if (!page) return;
    
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy-${Date.now()}`,
          layout: page.layout,
          seo: page.seo,
          settings: page.settings,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to duplicate page');
      }

      const data = await response.json();
      showToast('Page duplicated! Redirecting...', 'success');
      setShowMenu(false);
      
      setTimeout(() => {
        router.push(`/admin/builder?id=${data.page.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error duplicating page:', error);
      showToast('Failed to duplicate page', 'error');
    }
  };

  const handleDelete = async () => {
    if (!page || !page.id) return;
    
    if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      showToast('Page deleted', 'success');
      setShowMenu(false);
      
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } catch (error) {
      console.error('Error deleting page:', error);
      showToast('Failed to delete page', 'error');
    }
  };

  const handlePreview = () => {
    if (page?.id) {
      // Use preview route for draft pages, or published slug for published pages
      if (page.status === 'published') {
        window.open(page.slug, '_blank');
      } else {
        window.open(`/preview/${page.id}`, '_blank');
      }
    }
  };

  const handleCreatePage = async () => {
    if (!newPageTitle || !newPageSlug) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    const newPage = createNewPage(newPageTitle, newPageSlug);
    setPage(newPage);
    setShowNewPageModal(false);
    
    // Auto-save the new page
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPage.title,
          slug: newPage.slug,
          layout: newPage.layout,
          seo: newPage.seo,
          settings: newPage.settings,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create page');
      }

      const data = await response.json();
      setPage({
        ...newPage,
        id: data.page.id,
      });
      
      router.replace(`/admin/builder?id=${data.page.id}`);
      showToast('Page created successfully!', 'success');
    } catch (error) {
      console.error('Error creating page:', error);
      showToast(error instanceof Error ? error.message : 'Failed to create page', 'error');
    }
  };

  // Generate slug from title
  const handleTitleChange = (title: string) => {
    setNewPageTitle(title);
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setNewPageSlug(slug);
  };

  if (isLoading) {
    return (
      <LoadingOverlay>
        <Spinner size={32} />
        <LoadingText>Loading page...</LoadingText>
      </LoadingOverlay>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <BuilderLayout>
        <BuilderHeader>
          <HeaderLeft>
            <BackButton href="/admin">
              <ArrowLeft size={18} />
              Back
            </BackButton>
            <PageTitle>{page?.title || 'Untitled Page'}</PageTitle>
            <StatusBadge $status={page?.status?.toUpperCase() || 'DRAFT'}>
              {page?.status || 'Draft'}
            </StatusBadge>
            {hasUnsavedChanges && (
              <UnsavedIndicator>(unsaved changes)</UnsavedIndicator>
            )}
          </HeaderLeft>

          <HeaderRight>
            <HeaderButton onClick={handlePreview}>
              <Eye size={16} />
              Preview
            </HeaderButton>
            
            {page?.status !== 'published' ? (
              <HeaderButton $variant="success" onClick={handlePublish} disabled={isSaving}>
                {isSaving ? <Spinner size={16} /> : <Globe size={16} />}
                Publish
              </HeaderButton>
            ) : null}
            
            <HeaderButton $variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Spinner size={16} />
              ) : hasUnsavedChanges ? (
                <Save size={16} />
              ) : (
                <Check size={16} />
              )}
              {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save' : 'Saved'}
            </HeaderButton>
            
            <MenuWrapper>
              <IconButton onClick={() => setShowMenu(!showMenu)}>
                <MoreHorizontal size={18} />
              </IconButton>
              <DropdownMenu $visible={showMenu}>
                <DropdownItem onClick={handleDuplicate}>
                  <Copy size={16} />
                  Duplicate Page
                </DropdownItem>
                {page?.status === 'published' && (
                  <DropdownItem onClick={handleUnpublish}>
                    <FileText size={16} />
                    Unpublish
                  </DropdownItem>
                )}
                <DropdownDivider />
                <DropdownItem $danger onClick={handleDelete}>
                  <Trash2 size={16} />
                  Delete Page
                </DropdownItem>
              </DropdownMenu>
            </MenuWrapper>
          </HeaderRight>
        </BuilderHeader>

        <BuilderMain>
          <Sidebar />
          <Canvas />
          <PropertyPanel />
        </BuilderMain>
      </BuilderLayout>

      {/* New Page Modal */}
      <ModalOverlay $visible={showNewPageModal} onClick={() => {}}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <ModalTitle>Create New Page</ModalTitle>
          <ModalField>
            <ModalLabel>Page Title</ModalLabel>
            <ModalInput
              type="text"
              placeholder="e.g., About Us"
              value={newPageTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              autoFocus
            />
          </ModalField>
          <ModalField>
            <ModalLabel>URL Slug</ModalLabel>
            <ModalInput
              type="text"
              placeholder="e.g., about-us"
              value={newPageSlug}
              onChange={(e) => setNewPageSlug(e.target.value)}
            />
          </ModalField>
          <ModalActions>
            <HeaderButton onClick={() => router.push('/admin')}>
              Cancel
            </HeaderButton>
            <HeaderButton $variant="primary" onClick={handleCreatePage}>
              Create Page
            </HeaderButton>
          </ModalActions>
        </Modal>
      </ModalOverlay>

      {/* Toast Notification */}
      <Toast $visible={toast.visible} $type={toast.type}>
        {toast.type === 'success' ? <Check size={18} /> : null}
        {toast.message}
      </Toast>
    </DndContext>
  );
}

// Wrap with Suspense for useSearchParams
export default function BuilderPage() {
  return (
    <Suspense fallback={
      <LoadingOverlay>
        <Spinner size={32} />
        <LoadingText>Loading builder...</LoadingText>
      </LoadingOverlay>
    }>
      <BuilderPageContent />
    </Suspense>
  );
}
