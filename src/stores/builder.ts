import { create } from 'zustand';
import { ComponentType, LayoutBlock, Page, BuilderState } from '@/types';
import { defaultComponentProps } from '@/config/components';

interface BuilderActions {
  setPage: (page: Page | null) => void;
  selectBlock: (id: string | null) => void;
  setHoveredBlock: (id: string | null) => void;
  setDragging: (isDragging: boolean, component?: ComponentType | null) => void;
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  setSidebarTab: (tab: 'components' | 'layers' | 'settings') => void;
  addBlock: (type: ComponentType, position?: number) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, updates: Partial<LayoutBlock>) => void;
  updateBlockProps: (id: string, props: Record<string, unknown>) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  duplicateBlock: (id: string) => void;
  markSaved: () => void;
}

type BuilderStore = BuilderState & BuilderActions;

const generateId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  // Initial state
  page: null,
  selectedBlockId: null,
  hoveredBlockId: null,
  isDragging: false,
  draggedComponent: null,
  previewMode: 'desktop',
  sidebarTab: 'components',
  hasUnsavedChanges: false,

  // Actions
  setPage: (page) => set({ page, hasUnsavedChanges: false }),

  selectBlock: (id) => set({ selectedBlockId: id }),

  setHoveredBlock: (id) => set({ hoveredBlockId: id }),

  setDragging: (isDragging, component = null) =>
    set({ isDragging, draggedComponent: component }),

  setPreviewMode: (mode) => set({ previewMode: mode }),

  setSidebarTab: (tab) => set({ sidebarTab: tab }),

  addBlock: (type, position) => {
    const { page } = get();
    if (!page) return;

    const newBlock: LayoutBlock = {
      id: generateId(),
      type,
      order: position ?? page.layout.length,
      props: defaultComponentProps[type] || {},
      visibility: {
        desktop: true,
        tablet: true,
        mobile: true,
      },
    };

    const newLayout = [...page.layout];
    const insertIndex = position ?? newLayout.length;
    newLayout.splice(insertIndex, 0, newBlock);

    // Update order for all blocks
    const updatedLayout = newLayout.map((block, index) => ({
      ...block,
      order: index,
    }));

    set({
      page: { ...page, layout: updatedLayout },
      selectedBlockId: newBlock.id,
      hasUnsavedChanges: true,
    });
  },

  removeBlock: (id) => {
    const { page, selectedBlockId } = get();
    if (!page) return;

    const newLayout = page.layout
      .filter((block) => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));

    set({
      page: { ...page, layout: newLayout },
      selectedBlockId: selectedBlockId === id ? null : selectedBlockId,
      hasUnsavedChanges: true,
    });
  },

  updateBlock: (id, updates) => {
    const { page } = get();
    if (!page) return;

    const newLayout = page.layout.map((block) =>
      block.id === id ? { ...block, ...updates } : block
    );

    set({
      page: { ...page, layout: newLayout },
      hasUnsavedChanges: true,
    });
  },

  updateBlockProps: (id, props) => {
    const { page } = get();
    if (!page) return;

    const newLayout = page.layout.map((block) =>
      block.id === id
        ? { ...block, props: { ...block.props, ...props } }
        : block
    );

    set({
      page: { ...page, layout: newLayout },
      hasUnsavedChanges: true,
    });
  },

  reorderBlocks: (fromIndex, toIndex) => {
    const { page } = get();
    if (!page) return;

    const newLayout = [...page.layout];
    const [removed] = newLayout.splice(fromIndex, 1);
    newLayout.splice(toIndex, 0, removed);

    // Update order for all blocks
    const updatedLayout = newLayout.map((block, index) => ({
      ...block,
      order: index,
    }));

    set({
      page: { ...page, layout: updatedLayout },
      hasUnsavedChanges: true,
    });
  },

  duplicateBlock: (id) => {
    const { page } = get();
    if (!page) return;

    const blockIndex = page.layout.findIndex((block) => block.id === id);
    if (blockIndex === -1) return;

    const originalBlock = page.layout[blockIndex];
    const newBlock: LayoutBlock = {
      ...originalBlock,
      id: generateId(),
      order: blockIndex + 1,
    };

    const newLayout = [...page.layout];
    newLayout.splice(blockIndex + 1, 0, newBlock);

    // Update order for all blocks
    const updatedLayout = newLayout.map((block, index) => ({
      ...block,
      order: index,
    }));

    set({
      page: { ...page, layout: updatedLayout },
      selectedBlockId: newBlock.id,
      hasUnsavedChanges: true,
    });
  },

  markSaved: () => set({ hasUnsavedChanges: false }),
}));

