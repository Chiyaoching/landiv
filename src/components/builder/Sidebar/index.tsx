'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import * as LucideIcons from 'lucide-react';
import { Copy, Trash2, GripVertical } from 'lucide-react';
import { componentDefinitions } from '@/config/components';
import { useBuilderStore } from '@/stores/builder';
import { ComponentType } from '@/types';
import * as S from './Sidebar.styles';

// Dynamic icon component
const DynamicIcon: React.FC<{ name: string; size?: number }> = ({
  name,
  size = 20,
}) => {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>;
  const IconComponent = icons[name];
  if (!IconComponent) return <LucideIcons.Box size={size} />;
  return <IconComponent size={size} />;
};

// Draggable component card
const DraggableComponent: React.FC<{
  type: ComponentType;
  name: string;
  icon: string;
}> = ({ type, name, icon }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${type}`,
    data: { type, isNew: true },
  });

  return (
    <S.ComponentCard
      ref={setNodeRef}
      $isDragging={isDragging}
      {...listeners}
      {...attributes}
    >
      <S.ComponentIcon>
        <DynamicIcon name={icon} size={20} />
      </S.ComponentIcon>
      <S.ComponentName>{name}</S.ComponentName>
    </S.ComponentCard>
  );
};

// Group components by category
const groupedComponents = componentDefinitions.reduce((acc, component) => {
  if (!acc[component.category]) {
    acc[component.category] = [];
  }
  acc[component.category].push(component);
  return acc;
}, {} as Record<string, typeof componentDefinitions>);

const categoryLabels: Record<string, string> = {
  hero: 'Hero',
  content: 'Content',
  'social-proof': 'Social Proof',
  conversion: 'Conversion',
  footer: 'Footer',
};

export const Sidebar: React.FC = () => {
  const {
    page,
    sidebarTab,
    selectedBlockId,
    setSidebarTab,
    selectBlock,
    duplicateBlock,
    removeBlock,
  } = useBuilderStore();

  const renderComponentsTab = () => (
    <S.TabContent>
      {Object.entries(groupedComponents).map(([category, components]) => (
        <div key={category}>
          <S.CategoryTitle>{categoryLabels[category] || category}</S.CategoryTitle>
          <S.ComponentGrid>
            {components.map((component) => (
              <DraggableComponent
                key={component.type}
                type={component.type}
                name={component.name}
                icon={component.icon}
              />
            ))}
          </S.ComponentGrid>
        </div>
      ))}
    </S.TabContent>
  );

  const renderLayersTab = () => (
    <S.TabContent>
      <S.LayersList>
        {page?.layout
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            const definition = componentDefinitions.find(
              (c) => c.type === block.type
            );
            return (
              <S.LayerItem
                key={block.id}
                $isSelected={selectedBlockId === block.id}
                onClick={() => selectBlock(block.id)}
              >
                <S.LayerIcon>
                  <GripVertical size={16} />
                </S.LayerIcon>
                <S.LayerInfo>
                  <S.LayerName>
                    {(block.props as any)?.heading || definition?.name || block.type}
                  </S.LayerName>
                  <S.LayerType>{definition?.name || block.type}</S.LayerType>
                </S.LayerInfo>
                <S.LayerActions>
                  <S.LayerAction
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateBlock(block.id);
                    }}
                  >
                    <Copy size={14} />
                  </S.LayerAction>
                  <S.LayerAction
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBlock(block.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </S.LayerAction>
                </S.LayerActions>
              </S.LayerItem>
            );
          })}
      </S.LayersList>
      {(!page?.layout || page.layout.length === 0) && (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
          No components added yet.
          <br />
          Drag components from the Components tab.
        </div>
      )}
    </S.TabContent>
  );

  return (
    <S.SidebarContainer>
      <S.Tabs>
        <S.Tab
          $active={sidebarTab === 'components'}
          onClick={() => setSidebarTab('components')}
        >
          Components
        </S.Tab>
        <S.Tab
          $active={sidebarTab === 'layers'}
          onClick={() => setSidebarTab('layers')}
        >
          Layers
        </S.Tab>
      </S.Tabs>

      {sidebarTab === 'components' && renderComponentsTab()}
      {sidebarTab === 'layers' && renderLayersTab()}
    </S.SidebarContainer>
  );
};

export default Sidebar;

