'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Monitor,
  Tablet,
  Smartphone,
  GripVertical,
  Copy,
  Trash2,
  Layout,
} from 'lucide-react';
import { useBuilderStore } from '@/stores/builder';
import { ComponentRenderer } from '@/components/ComponentRenderer';
import { LayoutBlock } from '@/types';
import * as S from './Canvas.styles';

// Sortable block component
const SortableBlock: React.FC<{
  block: LayoutBlock;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hover: boolean) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}> = ({
  block,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onDuplicate,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <S.BlockWrapper
      ref={setNodeRef}
      style={style}
      $isSelected={isSelected}
      $isHovered={isHovered}
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <S.BlockActions $visible={isSelected || isHovered}>
        <S.BlockAction className="move" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </S.BlockAction>
        <S.BlockAction onClick={(e) => { e.stopPropagation(); onDuplicate(); }}>
          <Copy size={16} />
        </S.BlockAction>
        <S.BlockAction className="delete" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <Trash2 size={16} />
        </S.BlockAction>
      </S.BlockActions>
      <ComponentRenderer block={block} isEditing />
    </S.BlockWrapper>
  );
};

export const Canvas: React.FC = () => {
  const {
    page,
    previewMode,
    selectedBlockId,
    hoveredBlockId,
    setPreviewMode,
    selectBlock,
    setHoveredBlock,
    duplicateBlock,
    removeBlock,
  } = useBuilderStore();

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
  });

  const sortedLayout = page?.layout.slice().sort((a, b) => a.order - b.order) || [];

  return (
    <S.CanvasContainer>
      <S.CanvasHeader>
        <S.ViewportButton
          $active={previewMode === 'desktop'}
          onClick={() => setPreviewMode('desktop')}
          title="Desktop view"
        >
          <Monitor size={18} />
        </S.ViewportButton>
        <S.ViewportButton
          $active={previewMode === 'tablet'}
          onClick={() => setPreviewMode('tablet')}
          title="Tablet view"
        >
          <Tablet size={18} />
        </S.ViewportButton>
        <S.ViewportButton
          $active={previewMode === 'mobile'}
          onClick={() => setPreviewMode('mobile')}
          title="Mobile view"
        >
          <Smartphone size={18} />
        </S.ViewportButton>
      </S.CanvasHeader>

      <S.CanvasContent>
        <S.CanvasFrame $viewportMode={previewMode}>
          <S.CanvasScroll>
            <S.DropZone
              ref={setNodeRef}
              $isOver={isOver}
              $isEmpty={sortedLayout.length === 0}
            >
              {sortedLayout.length === 0 ? (
                <S.EmptyState>
                  <S.EmptyIcon>
                    <Layout size={32} />
                  </S.EmptyIcon>
                  <S.EmptyTitle>Start Building</S.EmptyTitle>
                  <S.EmptyDescription>
                    Drag components from the sidebar to start building your page
                  </S.EmptyDescription>
                </S.EmptyState>
              ) : (
                <SortableContext
                  items={sortedLayout.map((b) => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {sortedLayout.map((block) => (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      isHovered={hoveredBlockId === block.id}
                      onSelect={() => selectBlock(block.id)}
                      onHover={(hover) => setHoveredBlock(hover ? block.id : null)}
                      onDuplicate={() => duplicateBlock(block.id)}
                      onDelete={() => removeBlock(block.id)}
                    />
                  ))}
                </SortableContext>
              )}
            </S.DropZone>
          </S.CanvasScroll>
        </S.CanvasFrame>
      </S.CanvasContent>
    </S.CanvasContainer>
  );
};

export default Canvas;

