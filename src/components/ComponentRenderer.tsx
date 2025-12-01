'use client';

import React from 'react';
import { LayoutBlock, ComponentType } from '@/types';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { Testimonials } from './landing/Testimonials';
import { CTA } from './landing/CTA';
import { FAQ } from './landing/FAQ';
import { Contact } from './landing/Contact';
import { Stats } from './landing/Stats';
import { Footer } from './landing/Footer';

// Component map
const componentMap: Record<ComponentType, React.ComponentType<any>> = {
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  pricing: () => <div>Pricing Component</div>, // TODO: Implement
  cta: CTA,
  faq: FAQ,
  contact: Contact,
  gallery: () => <div>Gallery Component</div>, // TODO: Implement
  video: () => <div>Video Component</div>, // TODO: Implement
  'text-block': () => <div>Text Block Component</div>, // TODO: Implement
  'image-text': () => <div>Image Text Component</div>, // TODO: Implement
  stats: Stats,
  team: () => <div>Team Component</div>, // TODO: Implement
  logos: () => <div>Logos Component</div>, // TODO: Implement
  newsletter: () => <div>Newsletter Component</div>, // TODO: Implement
  'custom-html': () => <div>Custom HTML Component</div>, // TODO: Implement
};

interface ComponentRendererProps {
  block: LayoutBlock;
  isEditing?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  block,
  isEditing = false,
}) => {
  const Component = componentMap[block.type];

  if (!Component) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#fee' }}>
        Unknown component type: {block.type}
      </div>
    );
  }

  return <Component {...block.props} />;
};

interface PageRendererProps {
  layout: LayoutBlock[];
  isEditing?: boolean;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  layout,
  isEditing = false,
}) => {
  const sortedLayout = [...layout].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedLayout.map((block) => (
        <ComponentRenderer
          key={block.id}
          block={block}
          isEditing={isEditing}
        />
      ))}
    </>
  );
};

export default ComponentRenderer;

