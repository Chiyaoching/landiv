'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { Loader2, AlertCircle, Eye } from 'lucide-react';
import { PageRenderer } from '@/components/ComponentRenderer';
import { Footer } from '@/components/landing/Footer';
import { LayoutBlock } from '@/types';

const PreviewBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PreviewContent = styled.div`
  margin-top: 48px; /* Height of preview banner */
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
  color: #64748b;
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
  color: #ef4444;
  text-align: center;
  padding: 2rem;
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

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: string;
  layout: LayoutBlock[];
  settings: {
    showHeader?: boolean;
    showFooter?: boolean;
  };
}

const defaultFooterData = {
  description: 'Built with Landiv - the drag-and-drop landing page builder.',
  columns: [],
  socialLinks: [],
  copyright: `© ${new Date().getFullYear()} All rights reserved.`,
  bottomLinks: [],
};

export default function PreviewPage() {
  const params = useParams();
  const pageId = params.id as string;

  const [page, setPage] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/admin/pages/${pageId}`);
        if (!response.ok) {
          throw new Error('Page not found');
        }
        const data = await response.json();
        setPage({
          ...data.page,
          layout: data.page.layout || [],
          settings: data.page.settings || {},
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load page');
      } finally {
        setIsLoading(false);
      }
    };

    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  if (isLoading) {
    return (
      <LoadingState>
        <Spinner size={32} />
        <p>Loading preview...</p>
      </LoadingState>
    );
  }

  if (error || !page) {
    return (
      <ErrorState>
        <AlertCircle size={48} />
        <h2>Preview Not Available</h2>
        <p>{error || 'Page not found'}</p>
      </ErrorState>
    );
  }

  return (
    <>
      <PreviewBanner>
        <Eye size={16} />
        Preview Mode - This page is not published yet
      </PreviewBanner>
      <PreviewContent>
        <PageRenderer layout={page.layout} />
        {page.settings.showFooter !== false && <Footer {...defaultFooterData} />}
      </PreviewContent>
    </>
  );
}

