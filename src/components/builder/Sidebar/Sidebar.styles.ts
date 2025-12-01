import styled, { css } from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 280px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ $active }) => ($active ? '#667eea' : '#64748b')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#667eea' : 'transparent')};

  &:hover {
    color: #667eea;
    background: #f1f5f9;
  }
`;

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const CategoryTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 0.75rem;
  padding: 0 0.5rem;
`;

export const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const ComponentCard = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s ease;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      opacity: 0.5;
      cursor: grabbing;
    `}

  &:hover {
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
  }

  &:active {
    cursor: grabbing;
  }
`;

export const ComponentIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
  border-radius: 8px;
  color: #667eea;
`;

export const ComponentName = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
`;

export const LayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LayerItem = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ $isSelected }) => ($isSelected ? '#667eea10' : 'white')};
  border: 1px solid ${({ $isSelected }) => ($isSelected ? '#667eea' : '#e2e8f0')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
  }
`;

export const LayerIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 6px;
  color: #64748b;
`;

export const LayerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LayerName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LayerType = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
`;

export const LayerActions = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const LayerAction = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #667eea;
  }

  &.delete:hover {
    background: #fee2e2;
    color: #ef4444;
  }
`;

