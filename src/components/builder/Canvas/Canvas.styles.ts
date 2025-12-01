import styled, { css } from 'styled-components';

export const CanvasContainer = styled.div`
  flex: 1;
  background: #e2e8f0;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const CanvasHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
`;

export const ViewportButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? '#667eea' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : '#64748b')};

  &:hover {
    background: ${({ $active }) => ($active ? '#667eea' : '#f1f5f9')};
  }
`;

export const CanvasContent = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

export const CanvasFrame = styled.div<{
  $viewportMode: 'desktop' | 'tablet' | 'mobile';
}>`
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: width 0.3s ease;

  ${({ $viewportMode }) => {
    switch ($viewportMode) {
      case 'mobile':
        return css`
          width: 375px;
          border-radius: 24px;
        `;
      case 'tablet':
        return css`
          width: 768px;
          border-radius: 12px;
        `;
      default:
        return css`
          width: 100%;
          max-width: 1440px;
          border-radius: 8px;
        `;
    }
  }}
`;

export const CanvasScroll = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const DropZone = styled.div<{
  $isOver?: boolean;
  $isEmpty?: boolean;
}>`
  min-height: ${({ $isEmpty }) => ($isEmpty ? '400px' : 'auto')};
  display: flex;
  flex-direction: column;
  
  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      align-items: center;
      justify-content: center;
    `}

  ${({ $isOver }) =>
    $isOver &&
    css`
      background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
    `}
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #94a3b8;
  padding: 3rem;
`;

export const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #f1f5f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

export const EmptyDescription = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const BlockWrapper = styled.div<{
  $isSelected?: boolean;
  $isHovered?: boolean;
}>`
  position: relative;
  transition: all 0.2s ease;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      outline: 2px solid #667eea;
      outline-offset: -2px;
    `}

  ${({ $isHovered, $isSelected }) =>
    $isHovered &&
    !$isSelected &&
    css`
      outline: 2px dashed #94a3b8;
      outline-offset: -2px;
    `}
`;

export const BlockActions = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  gap: 0.25rem;
  z-index: 10;
  background: white;
  padding: 0.25rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const BlockAction = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #667eea;
  }

  &.delete:hover {
    background: #fee2e2;
    color: #ef4444;
  }

  &.move {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
`;

export const DropIndicator = styled.div<{ $isActive: boolean }>`
  height: 4px;
  background: ${({ $isActive }) => ($isActive ? '#667eea' : 'transparent')};
  transition: all 0.2s ease;
  margin: ${({ $isActive }) => ($isActive ? '0.5rem 0' : '0')};
`;

