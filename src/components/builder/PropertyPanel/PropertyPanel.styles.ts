import styled from 'styled-components';

export const PanelContainer = styled.aside`
  width: 320px;
  background: white;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const PanelTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a2e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PanelSubtitle = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.25rem;
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
`;

export const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  background: #f1f5f9;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

export const FieldGroup = styled.div`
  margin-bottom: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const SectionHeader = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: none;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
  text-align: left;
  transition: background 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }

  span {
    flex: 1;
  }
`;

export const FieldGroupTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 1rem;
`;

export const Field = styled.div`
  margin-bottom: 0.75rem;
  padding: 0 1rem;

  &:first-child {
    padding-top: 0.75rem;
  }

  &:last-child {
    padding-bottom: 0.75rem;
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.375rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  min-height: 60px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const ColorInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ColorPicker = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

export const ToggleGroup = styled.div`
  display: flex;
  gap: 0.25rem;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 6px;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1a1a2e' : '#64748b')};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    color: #1a1a2e;
  }
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #667eea;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #374151;
  cursor: pointer;
`;

export const VisibilityGroup = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem 1rem;
`;

export const VisibilityItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #64748b;
`;

// Item Card styles for array items (features, testimonials, etc.)
export const ItemCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0.75rem 1rem;
  border: 1px solid #e2e8f0;

  ${Field} {
    padding: 0;
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const ItemTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
`;

export const ItemDelete = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fef2f2;
    border-color: #fecaca;
    color: #ef4444;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: calc(100% - 2rem);
  margin: 0.75rem 1rem;
  padding: 0.625rem;
  background: white;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  color: #64748b;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #667eea;
    color: #667eea;
  }
`;
