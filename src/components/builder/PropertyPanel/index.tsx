'use client';

import React from 'react';
import { Settings, MousePointer } from 'lucide-react';
import { useBuilderStore } from '@/stores/builder';
import { componentDefinitions } from '@/config/components';
import * as S from './PropertyPanel.styles';

export const PropertyPanel: React.FC = () => {
  const { page, selectedBlockId, updateBlockProps, updateBlock } = useBuilderStore();

  const selectedBlock = page?.layout.find((b) => b.id === selectedBlockId);
  const definition = selectedBlock
    ? componentDefinitions.find((c) => c.type === selectedBlock.type)
    : null;

  if (!selectedBlock) {
    return (
      <S.PanelContainer>
        <S.PanelHeader>
          <S.PanelTitle>
            <Settings size={16} />
            Properties
          </S.PanelTitle>
        </S.PanelHeader>
        <S.EmptyState>
          <S.EmptyIcon>
            <MousePointer size={24} />
          </S.EmptyIcon>
          <p>Select a component to edit its properties</p>
        </S.EmptyState>
      </S.PanelContainer>
    );
  }

  const props = selectedBlock.props as Record<string, any>;

  const handleChange = (key: string, value: any) => {
    updateBlockProps(selectedBlock.id, { [key]: value });
  };

  const handleNestedChange = (parentKey: string, childKey: string, value: any) => {
    const currentParent = props[parentKey] || {};
    updateBlockProps(selectedBlock.id, {
      [parentKey]: { ...currentParent, [childKey]: value },
    });
  };

  const handleVisibilityChange = (device: 'desktop' | 'tablet' | 'mobile', value: boolean) => {
    updateBlock(selectedBlock.id, {
      visibility: { ...selectedBlock.visibility, [device]: value },
    });
  };

  const renderHeroProps = () => (
    <>
      <S.FieldGroup>
        <S.FieldGroupTitle>Content</S.FieldGroupTitle>
        
        <S.Field>
          <S.Label>Heading</S.Label>
          <S.Input
            type="text"
            value={props.heading || ''}
            onChange={(e) => handleChange('heading', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Subheading</S.Label>
          <S.Input
            type="text"
            value={props.subheading || ''}
            onChange={(e) => handleChange('subheading', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Description</S.Label>
          <S.Textarea
            value={props.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </S.Field>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldGroupTitle>Layout</S.FieldGroupTitle>

        <S.Field>
          <S.Label>Variant</S.Label>
          <S.Select
            value={props.variant || 'centered'}
            onChange={(e) => handleChange('variant', e.target.value)}
          >
            <option value="centered">Centered</option>
            <option value="split">Split</option>
            <option value="image-bg">Image Background</option>
            <option value="video-bg">Video Background</option>
          </S.Select>
        </S.Field>

        <S.Field>
          <S.Label>Height</S.Label>
          <S.ToggleGroup>
            {['full', 'large', 'medium', 'auto'].map((h) => (
              <S.ToggleButton
                key={h}
                $active={props.height === h}
                onClick={() => handleChange('height', h)}
              >
                {h.charAt(0).toUpperCase() + h.slice(1)}
              </S.ToggleButton>
            ))}
          </S.ToggleGroup>
        </S.Field>

        <S.Field>
          <S.Label>Alignment</S.Label>
          <S.ToggleGroup>
            {['left', 'center', 'right'].map((a) => (
              <S.ToggleButton
                key={a}
                $active={props.alignment === a}
                onClick={() => handleChange('alignment', a)}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </S.ToggleButton>
            ))}
          </S.ToggleGroup>
        </S.Field>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldGroupTitle>Primary Button</S.FieldGroupTitle>
        
        <S.Field>
          <S.Label>Text</S.Label>
          <S.Input
            type="text"
            value={props.primaryCTA?.text || ''}
            onChange={(e) => handleNestedChange('primaryCTA', 'text', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Link</S.Label>
          <S.Input
            type="text"
            value={props.primaryCTA?.link || ''}
            onChange={(e) => handleNestedChange('primaryCTA', 'link', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Style</S.Label>
          <S.ToggleGroup>
            {['solid', 'outline'].map((s) => (
              <S.ToggleButton
                key={s}
                $active={props.primaryCTA?.style === s}
                onClick={() => handleNestedChange('primaryCTA', 'style', s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </S.ToggleButton>
            ))}
          </S.ToggleGroup>
        </S.Field>
      </S.FieldGroup>
    </>
  );

  const renderGenericProps = () => (
    <>
      <S.FieldGroup>
        <S.FieldGroupTitle>Content</S.FieldGroupTitle>
        
        {props.heading !== undefined && (
          <S.Field>
            <S.Label>Heading</S.Label>
            <S.Input
              type="text"
              value={props.heading || ''}
              onChange={(e) => handleChange('heading', e.target.value)}
            />
          </S.Field>
        )}

        {props.subheading !== undefined && (
          <S.Field>
            <S.Label>Subheading</S.Label>
            <S.Input
              type="text"
              value={props.subheading || ''}
              onChange={(e) => handleChange('subheading', e.target.value)}
            />
          </S.Field>
        )}

        {props.description !== undefined && (
          <S.Field>
            <S.Label>Description</S.Label>
            <S.Textarea
              value={props.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </S.Field>
        )}

        {props.variant !== undefined && (
          <S.Field>
            <S.Label>Variant</S.Label>
            <S.Select
              value={props.variant}
              onChange={(e) => handleChange('variant', e.target.value)}
            >
              <option value={props.variant}>{props.variant}</option>
            </S.Select>
          </S.Field>
        )}
      </S.FieldGroup>
    </>
  );

  const renderPropsEditor = () => {
    switch (selectedBlock.type) {
      case 'hero':
        return renderHeroProps();
      default:
        return renderGenericProps();
    }
  };

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.PanelTitle>
          <Settings size={16} />
          {definition?.name || selectedBlock.type}
        </S.PanelTitle>
        <S.PanelSubtitle>Edit component properties</S.PanelSubtitle>
      </S.PanelHeader>

      <S.PanelContent>
        {renderPropsEditor()}

        <S.FieldGroup>
          <S.FieldGroupTitle>Visibility</S.FieldGroupTitle>
          <S.VisibilityGroup>
            <S.VisibilityItem>
              <S.Checkbox
                type="checkbox"
                checked={selectedBlock.visibility.desktop}
                onChange={(e) => handleVisibilityChange('desktop', e.target.checked)}
              />
              Desktop
            </S.VisibilityItem>
            <S.VisibilityItem>
              <S.Checkbox
                type="checkbox"
                checked={selectedBlock.visibility.tablet}
                onChange={(e) => handleVisibilityChange('tablet', e.target.checked)}
              />
              Tablet
            </S.VisibilityItem>
            <S.VisibilityItem>
              <S.Checkbox
                type="checkbox"
                checked={selectedBlock.visibility.mobile}
                onChange={(e) => handleVisibilityChange('mobile', e.target.checked)}
              />
              Mobile
            </S.VisibilityItem>
          </S.VisibilityGroup>
        </S.FieldGroup>
      </S.PanelContent>
    </S.PanelContainer>
  );
};

export default PropertyPanel;

