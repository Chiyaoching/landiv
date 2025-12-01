'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { ArrowLeft, Save, Eye, MoreHorizontal } from 'lucide-react';
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
  background: ${({ $status }) =>
    $status === 'published' ? '#dcfce7' : '#fef3c7'};
  color: ${({ $status }) =>
    $status === 'published' ? '#166534' : '#92400e'};
`;

const HeaderButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
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

const BuilderMain = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

// Demo page data
const demoPage: Page = {
  id: 'demo-page',
  slug: 'home',
  title: 'Home Page',
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
};

export default function BuilderPage() {
  const { page, setPage, addBlock, hasUnsavedChanges } = useBuilderStore();

  useEffect(() => {
    // Initialize with demo page
    if (!page) {
      setPage(demoPage);
    }
  }, [page, setPage]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === 'canvas-drop-zone' && active.data.current?.isNew) {
      const componentType = active.data.current.type;
      addBlock(componentType);
    }
  };

  const handleSave = async () => {
    // TODO: Implement save to API
    console.log('Saving page:', page);
    alert('Page saved! (Demo mode)');
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open('/', '_blank');
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <BuilderLayout>
        <BuilderHeader>
          <HeaderLeft>
            <BackButton href="/admin">
              <ArrowLeft size={18} />
              Back
            </BackButton>
            <PageTitle>{page?.title || 'Untitled Page'}</PageTitle>
            <StatusBadge $status={page?.status || 'draft'}>
              {page?.status || 'Draft'}
            </StatusBadge>
            {hasUnsavedChanges && (
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                (unsaved changes)
              </span>
            )}
          </HeaderLeft>

          <HeaderRight>
            <HeaderButton onClick={handlePreview}>
              <Eye size={16} />
              Preview
            </HeaderButton>
            <HeaderButton $variant="primary" onClick={handleSave}>
              <Save size={16} />
              Save
            </HeaderButton>
            <IconButton>
              <MoreHorizontal size={18} />
            </IconButton>
          </HeaderRight>
        </BuilderHeader>

        <BuilderMain>
          <Sidebar />
          <Canvas />
          <PropertyPanel />
        </BuilderMain>
      </BuilderLayout>
    </DndContext>
  );
}

