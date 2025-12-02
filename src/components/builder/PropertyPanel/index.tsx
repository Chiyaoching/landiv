'use client';

import React, { useState } from 'react';
import { Settings, MousePointer, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useBuilderStore } from '@/stores/builder';
import { componentDefinitions } from '@/config/components';
import * as S from './PropertyPanel.styles';

export const PropertyPanel: React.FC = () => {
  const { page, selectedBlockId, updateBlockProps, updateBlock } = useBuilderStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    content: true,
    layout: true,
    buttons: false,
    items: false,
    style: false,
    visibility: false,
  });

  const selectedBlock = page?.layout.find((b) => b.id === selectedBlockId);
  const definition = selectedBlock
    ? componentDefinitions.find((c) => c.type === selectedBlock.type)
    : null;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  const props = selectedBlock.props as Record<string, unknown>;

  const handleChange = (key: string, value: unknown) => {
    updateBlockProps(selectedBlock.id, { [key]: value });
  };

  const handleNestedChange = (parentKey: string, childKey: string, value: unknown) => {
    const currentParent = (props[parentKey] as Record<string, unknown>) || {};
    updateBlockProps(selectedBlock.id, {
      [parentKey]: { ...currentParent, [childKey]: value },
    });
  };

  const handleVisibilityChange = (device: 'desktop' | 'tablet' | 'mobile', value: boolean) => {
    updateBlock(selectedBlock.id, {
      visibility: { ...selectedBlock.visibility, [device]: value },
    });
  };

  // Array item handlers
  const handleArrayItemChange = (arrayKey: string, index: number, itemKey: string, value: unknown) => {
    const currentArray = (props[arrayKey] as Record<string, unknown>[]) || [];
    const newArray = [...currentArray];
    newArray[index] = { ...newArray[index], [itemKey]: value };
    handleChange(arrayKey, newArray);
  };

  const handleAddArrayItem = (arrayKey: string, template: Record<string, unknown>) => {
    const currentArray = (props[arrayKey] as Record<string, unknown>[]) || [];
    handleChange(arrayKey, [...currentArray, { ...template, id: `item_${Date.now()}` }]);
  };

  const handleRemoveArrayItem = (arrayKey: string, index: number) => {
    const currentArray = (props[arrayKey] as Record<string, unknown>[]) || [];
    handleChange(arrayKey, currentArray.filter((_, i) => i !== index));
  };

  // Section Header component
  const SectionHeader: React.FC<{ title: string; section: string }> = ({ title, section }) => (
    <S.SectionHeader onClick={() => toggleSection(section)}>
      {expandedSections[section] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      <span>{title}</span>
    </S.SectionHeader>
  );

  // Render Hero Props
  const renderHeroProps = () => (
    <>
      <S.FieldGroup>
        <SectionHeader title="Content" section="content" />
        {expandedSections.content && (
          <>
            <S.Field>
              <S.Label>Heading</S.Label>
              <S.Input
                type="text"
                value={(props.heading as string) || ''}
                onChange={(e) => handleChange('heading', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Subheading</S.Label>
              <S.Input
                type="text"
                value={(props.subheading as string) || ''}
                onChange={(e) => handleChange('subheading', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Description</S.Label>
              <S.Textarea
                value={(props.description as string) || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </S.Field>
          </>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <SectionHeader title="Layout" section="layout" />
        {expandedSections.layout && (
          <>
            <S.Field>
              <S.Label>Variant</S.Label>
              <S.Select
                value={(props.variant as string) || 'centered'}
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
          </>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <SectionHeader title="Primary Button" section="buttons" />
        {expandedSections.buttons && (
          <>
            <S.Field>
              <S.Label>Text</S.Label>
              <S.Input
                type="text"
                value={(props.primaryCTA as Record<string, unknown>)?.text as string || ''}
                onChange={(e) => handleNestedChange('primaryCTA', 'text', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Link</S.Label>
              <S.Input
                type="text"
                value={(props.primaryCTA as Record<string, unknown>)?.link as string || ''}
                onChange={(e) => handleNestedChange('primaryCTA', 'link', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Style</S.Label>
              <S.ToggleGroup>
                {['solid', 'outline'].map((s) => (
                  <S.ToggleButton
                    key={s}
                    $active={(props.primaryCTA as Record<string, unknown>)?.style === s}
                    onClick={() => handleNestedChange('primaryCTA', 'style', s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </S.ToggleButton>
                ))}
              </S.ToggleGroup>
            </S.Field>
          </>
        )}
      </S.FieldGroup>
    </>
  );

  // Render Features Props
  const renderFeaturesProps = () => {
    const features = (props.features as Record<string, unknown>[]) || [];
    return (
      <>
        <S.FieldGroup>
          <SectionHeader title="Content" section="content" />
          {expandedSections.content && (
            <>
              <S.Field>
                <S.Label>Heading</S.Label>
                <S.Input
                  type="text"
                  value={(props.heading as string) || ''}
                  onChange={(e) => handleChange('heading', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Subheading</S.Label>
                <S.Input
                  type="text"
                  value={(props.subheading as string) || ''}
                  onChange={(e) => handleChange('subheading', e.target.value)}
                />
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title="Layout" section="layout" />
          {expandedSections.layout && (
            <>
              <S.Field>
                <S.Label>Variant</S.Label>
                <S.Select
                  value={(props.variant as string) || 'grid'}
                  onChange={(e) => handleChange('variant', e.target.value)}
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                  <option value="alternating">Alternating</option>
                  <option value="cards">Cards</option>
                </S.Select>
              </S.Field>

              <S.Field>
                <S.Label>Columns</S.Label>
                <S.ToggleGroup>
                  {[2, 3, 4].map((c) => (
                    <S.ToggleButton
                      key={c}
                      $active={props.columns === c}
                      onClick={() => handleChange('columns', c)}
                    >
                      {c}
                    </S.ToggleButton>
                  ))}
                </S.ToggleGroup>
              </S.Field>

              <S.Field>
                <S.Label>Icon Style</S.Label>
                <S.ToggleGroup>
                  {['circle', 'square', 'none'].map((s) => (
                    <S.ToggleButton
                      key={s}
                      $active={props.iconStyle === s}
                      onClick={() => handleChange('iconStyle', s)}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </S.ToggleButton>
                  ))}
                </S.ToggleGroup>
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title={`Features (${features.length})`} section="items" />
          {expandedSections.items && (
            <>
              {features.map((feature, index) => (
                <S.ItemCard key={(feature.id as string) || index}>
                  <S.ItemHeader>
                    <S.ItemTitle>Feature {index + 1}</S.ItemTitle>
                    <S.ItemDelete onClick={() => handleRemoveArrayItem('features', index)}>
                      <Trash2 size={14} />
                    </S.ItemDelete>
                  </S.ItemHeader>
                  <S.Field>
                    <S.Label>Icon (Lucide name)</S.Label>
                    <S.Input
                      type="text"
                      value={(feature.icon as string) || ''}
                      onChange={(e) => handleArrayItemChange('features', index, 'icon', e.target.value)}
                      placeholder="e.g., Zap, Shield, Globe"
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Title</S.Label>
                    <S.Input
                      type="text"
                      value={(feature.title as string) || ''}
                      onChange={(e) => handleArrayItemChange('features', index, 'title', e.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Description</S.Label>
                    <S.Textarea
                      value={(feature.description as string) || ''}
                      onChange={(e) => handleArrayItemChange('features', index, 'description', e.target.value)}
                      rows={2}
                    />
                  </S.Field>
                </S.ItemCard>
              ))}
              <S.AddButton onClick={() => handleAddArrayItem('features', { icon: 'Star', title: 'New Feature', description: 'Feature description' })}>
                <Plus size={16} />
                Add Feature
              </S.AddButton>
            </>
          )}
        </S.FieldGroup>
      </>
    );
  };

  // Render Testimonials Props
  const renderTestimonialsProps = () => {
    const testimonials = (props.testimonials as Record<string, unknown>[]) || [];
    return (
      <>
        <S.FieldGroup>
          <SectionHeader title="Content" section="content" />
          {expandedSections.content && (
            <>
              <S.Field>
                <S.Label>Heading</S.Label>
                <S.Input
                  type="text"
                  value={(props.heading as string) || ''}
                  onChange={(e) => handleChange('heading', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Variant</S.Label>
                <S.Select
                  value={(props.variant as string) || 'carousel'}
                  onChange={(e) => handleChange('variant', e.target.value)}
                >
                  <option value="carousel">Carousel</option>
                  <option value="grid">Grid</option>
                  <option value="masonry">Masonry</option>
                  <option value="single">Single</option>
                </S.Select>
              </S.Field>

              <S.Field>
                <S.CheckboxLabel>
                  <S.Checkbox
                    type="checkbox"
                    checked={props.showRating as boolean}
                    onChange={(e) => handleChange('showRating', e.target.checked)}
                  />
                  Show Rating Stars
                </S.CheckboxLabel>
              </S.Field>

              <S.Field>
                <S.CheckboxLabel>
                  <S.Checkbox
                    type="checkbox"
                    checked={props.autoplay as boolean}
                    onChange={(e) => handleChange('autoplay', e.target.checked)}
                  />
                  Autoplay (carousel)
                </S.CheckboxLabel>
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title={`Testimonials (${testimonials.length})`} section="items" />
          {expandedSections.items && (
            <>
              {testimonials.map((testimonial, index) => (
                <S.ItemCard key={(testimonial.id as string) || index}>
                  <S.ItemHeader>
                    <S.ItemTitle>Testimonial {index + 1}</S.ItemTitle>
                    <S.ItemDelete onClick={() => handleRemoveArrayItem('testimonials', index)}>
                      <Trash2 size={14} />
                    </S.ItemDelete>
                  </S.ItemHeader>
                  <S.Field>
                    <S.Label>Content</S.Label>
                    <S.Textarea
                      value={(testimonial.content as string) || ''}
                      onChange={(e) => handleArrayItemChange('testimonials', index, 'content', e.target.value)}
                      rows={3}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Author Name</S.Label>
                    <S.Input
                      type="text"
                      value={(testimonial.author as Record<string, unknown>)?.name as string || ''}
                      onChange={(e) => {
                        const currentAuthor = (testimonial.author as Record<string, unknown>) || {};
                        handleArrayItemChange('testimonials', index, 'author', { ...currentAuthor, name: e.target.value });
                      }}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Title/Role</S.Label>
                    <S.Input
                      type="text"
                      value={(testimonial.author as Record<string, unknown>)?.title as string || ''}
                      onChange={(e) => {
                        const currentAuthor = (testimonial.author as Record<string, unknown>) || {};
                        handleArrayItemChange('testimonials', index, 'author', { ...currentAuthor, title: e.target.value });
                      }}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Company</S.Label>
                    <S.Input
                      type="text"
                      value={(testimonial.author as Record<string, unknown>)?.company as string || ''}
                      onChange={(e) => {
                        const currentAuthor = (testimonial.author as Record<string, unknown>) || {};
                        handleArrayItemChange('testimonials', index, 'author', { ...currentAuthor, company: e.target.value });
                      }}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Rating (1-5)</S.Label>
                    <S.Input
                      type="number"
                      min={1}
                      max={5}
                      value={(testimonial.rating as number) || 5}
                      onChange={(e) => handleArrayItemChange('testimonials', index, 'rating', parseInt(e.target.value))}
                    />
                  </S.Field>
                </S.ItemCard>
              ))}
              <S.AddButton onClick={() => handleAddArrayItem('testimonials', {
                content: 'This is a great product!',
                author: { name: 'John Doe', title: 'CEO', company: 'Company Inc' },
                rating: 5
              })}>
                <Plus size={16} />
                Add Testimonial
              </S.AddButton>
            </>
          )}
        </S.FieldGroup>
      </>
    );
  };

  // Render CTA Props
  const renderCTAProps = () => (
    <>
      <S.FieldGroup>
        <SectionHeader title="Content" section="content" />
        {expandedSections.content && (
          <>
            <S.Field>
              <S.Label>Heading</S.Label>
              <S.Input
                type="text"
                value={(props.heading as string) || ''}
                onChange={(e) => handleChange('heading', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Description</S.Label>
              <S.Textarea
                value={(props.description as string) || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </S.Field>

            <S.Field>
              <S.Label>Variant</S.Label>
              <S.Select
                value={(props.variant as string) || 'banner'}
                onChange={(e) => handleChange('variant', e.target.value)}
              >
                <option value="banner">Banner</option>
                <option value="split">Split</option>
                <option value="minimal">Minimal</option>
              </S.Select>
            </S.Field>
          </>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <SectionHeader title="Primary Button" section="buttons" />
        {expandedSections.buttons && (
          <>
            <S.Field>
              <S.Label>Text</S.Label>
              <S.Input
                type="text"
                value={(props.primaryButton as Record<string, unknown>)?.text as string || ''}
                onChange={(e) => handleNestedChange('primaryButton', 'text', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Link</S.Label>
              <S.Input
                type="text"
                value={(props.primaryButton as Record<string, unknown>)?.link as string || ''}
                onChange={(e) => handleNestedChange('primaryButton', 'link', e.target.value)}
              />
            </S.Field>
          </>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <SectionHeader title="Style" section="style" />
        {expandedSections.style && (
          <>
            <S.Field>
              <S.Label>Background Type</S.Label>
              <S.Select
                value={(props.background as Record<string, unknown>)?.type as string || 'gradient'}
                onChange={(e) => handleNestedChange('background', 'type', e.target.value)}
              >
                <option value="color">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
              </S.Select>
            </S.Field>

            <S.Field>
              <S.Label>Background Value</S.Label>
              <S.Input
                type="text"
                value={(props.background as Record<string, unknown>)?.value as string || ''}
                onChange={(e) => handleNestedChange('background', 'value', e.target.value)}
                placeholder="CSS color, gradient, or URL"
              />
            </S.Field>
          </>
        )}
      </S.FieldGroup>
    </>
  );

  // Render FAQ Props
  const renderFAQProps = () => {
    const items = (props.items as Record<string, unknown>[]) || [];
    return (
      <>
        <S.FieldGroup>
          <SectionHeader title="Content" section="content" />
          {expandedSections.content && (
            <>
              <S.Field>
                <S.Label>Heading</S.Label>
                <S.Input
                  type="text"
                  value={(props.heading as string) || ''}
                  onChange={(e) => handleChange('heading', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Subheading</S.Label>
                <S.Input
                  type="text"
                  value={(props.subheading as string) || ''}
                  onChange={(e) => handleChange('subheading', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Variant</S.Label>
                <S.Select
                  value={(props.variant as string) || 'accordion'}
                  onChange={(e) => handleChange('variant', e.target.value)}
                >
                  <option value="accordion">Accordion</option>
                  <option value="grid">Grid</option>
                  <option value="two-column">Two Column</option>
                </S.Select>
              </S.Field>

              <S.Field>
                <S.CheckboxLabel>
                  <S.Checkbox
                    type="checkbox"
                    checked={props.expandMultiple as boolean}
                    onChange={(e) => handleChange('expandMultiple', e.target.checked)}
                  />
                  Allow multiple open
                </S.CheckboxLabel>
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title={`Questions (${items.length})`} section="items" />
          {expandedSections.items && (
            <>
              {items.map((item, index) => (
                <S.ItemCard key={(item.id as string) || index}>
                  <S.ItemHeader>
                    <S.ItemTitle>Question {index + 1}</S.ItemTitle>
                    <S.ItemDelete onClick={() => handleRemoveArrayItem('items', index)}>
                      <Trash2 size={14} />
                    </S.ItemDelete>
                  </S.ItemHeader>
                  <S.Field>
                    <S.Label>Question</S.Label>
                    <S.Input
                      type="text"
                      value={(item.question as string) || ''}
                      onChange={(e) => handleArrayItemChange('items', index, 'question', e.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Answer</S.Label>
                    <S.Textarea
                      value={(item.answer as string) || ''}
                      onChange={(e) => handleArrayItemChange('items', index, 'answer', e.target.value)}
                      rows={3}
                    />
                  </S.Field>
                </S.ItemCard>
              ))}
              <S.AddButton onClick={() => handleAddArrayItem('items', {
                question: 'New question?',
                answer: 'Answer goes here.'
              })}>
                <Plus size={16} />
                Add Question
              </S.AddButton>
            </>
          )}
        </S.FieldGroup>
      </>
    );
  };

  // Render Contact Props
  const renderContactProps = () => {
    const fields = (props.fields as Record<string, unknown>[]) || [];
    return (
      <>
        <S.FieldGroup>
          <SectionHeader title="Content" section="content" />
          {expandedSections.content && (
            <>
              <S.Field>
                <S.Label>Heading</S.Label>
                <S.Input
                  type="text"
                  value={(props.heading as string) || ''}
                  onChange={(e) => handleChange('heading', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Subheading</S.Label>
                <S.Input
                  type="text"
                  value={(props.subheading as string) || ''}
                  onChange={(e) => handleChange('subheading', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Variant</S.Label>
                <S.Select
                  value={(props.variant as string) || 'split'}
                  onChange={(e) => handleChange('variant', e.target.value)}
                >
                  <option value="form-only">Form Only</option>
                  <option value="split">Split (Form + Info)</option>
                  <option value="with-map">With Map</option>
                </S.Select>
              </S.Field>

              <S.Field>
                <S.Label>Success Message</S.Label>
                <S.Input
                  type="text"
                  value={(props.successMessage as string) || ''}
                  onChange={(e) => handleChange('successMessage', e.target.value)}
                />
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title="Contact Info" section="layout" />
          {expandedSections.layout && (
            <>
              <S.Field>
                <S.Label>Email</S.Label>
                <S.Input
                  type="email"
                  value={(props.contactInfo as Record<string, unknown>)?.email as string || ''}
                  onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Phone</S.Label>
                <S.Input
                  type="text"
                  value={(props.contactInfo as Record<string, unknown>)?.phone as string || ''}
                  onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                />
              </S.Field>

              <S.Field>
                <S.Label>Address</S.Label>
                <S.Textarea
                  value={(props.contactInfo as Record<string, unknown>)?.address as string || ''}
                  onChange={(e) => handleNestedChange('contactInfo', 'address', e.target.value)}
                  rows={2}
                />
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title={`Form Fields (${fields.length})`} section="items" />
          {expandedSections.items && (
            <>
              {fields.map((field, index) => (
                <S.ItemCard key={(field.id as string) || index}>
                  <S.ItemHeader>
                    <S.ItemTitle>{(field.label as string) || `Field ${index + 1}`}</S.ItemTitle>
                    <S.ItemDelete onClick={() => handleRemoveArrayItem('fields', index)}>
                      <Trash2 size={14} />
                    </S.ItemDelete>
                  </S.ItemHeader>
                  <S.Field>
                    <S.Label>Type</S.Label>
                    <S.Select
                      value={(field.type as string) || 'text'}
                      onChange={(e) => handleArrayItemChange('fields', index, 'type', e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="textarea">Textarea</option>
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                    </S.Select>
                  </S.Field>
                  <S.Field>
                    <S.Label>Label</S.Label>
                    <S.Input
                      type="text"
                      value={(field.label as string) || ''}
                      onChange={(e) => handleArrayItemChange('fields', index, 'label', e.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Placeholder</S.Label>
                    <S.Input
                      type="text"
                      value={(field.placeholder as string) || ''}
                      onChange={(e) => handleArrayItemChange('fields', index, 'placeholder', e.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.CheckboxLabel>
                      <S.Checkbox
                        type="checkbox"
                        checked={field.required as boolean}
                        onChange={(e) => handleArrayItemChange('fields', index, 'required', e.target.checked)}
                      />
                      Required
                    </S.CheckboxLabel>
                  </S.Field>
                </S.ItemCard>
              ))}
              <S.AddButton onClick={() => handleAddArrayItem('fields', {
                type: 'text',
                label: 'New Field',
                placeholder: '',
                required: false
              })}>
                <Plus size={16} />
                Add Field
              </S.AddButton>
            </>
          )}
        </S.FieldGroup>
      </>
    );
  };

  // Render Stats Props
  const renderStatsProps = () => {
    const stats = (props.stats as Record<string, unknown>[]) || [];
    return (
      <>
        <S.FieldGroup>
          <SectionHeader title="Settings" section="content" />
          {expandedSections.content && (
            <>
              <S.Field>
                <S.Label>Variant</S.Label>
                <S.Select
                  value={(props.variant as string) || 'cards'}
                  onChange={(e) => handleChange('variant', e.target.value)}
                >
                  <option value="inline">Inline</option>
                  <option value="cards">Cards</option>
                  <option value="background">Background</option>
                </S.Select>
              </S.Field>

              <S.Field>
                <S.CheckboxLabel>
                  <S.Checkbox
                    type="checkbox"
                    checked={props.animated as boolean}
                    onChange={(e) => handleChange('animated', e.target.checked)}
                  />
                  Animate Numbers
                </S.CheckboxLabel>
              </S.Field>
            </>
          )}
        </S.FieldGroup>

        <S.FieldGroup>
          <SectionHeader title={`Statistics (${stats.length})`} section="items" />
          {expandedSections.items && (
            <>
              {stats.map((stat, index) => (
                <S.ItemCard key={index}>
                  <S.ItemHeader>
                    <S.ItemTitle>Stat {index + 1}</S.ItemTitle>
                    <S.ItemDelete onClick={() => handleRemoveArrayItem('stats', index)}>
                      <Trash2 size={14} />
                    </S.ItemDelete>
                  </S.ItemHeader>
                  <S.Field>
                    <S.Label>Value</S.Label>
                    <S.Input
                      type="text"
                      value={(stat.value as string) || ''}
                      onChange={(e) => handleArrayItemChange('stats', index, 'value', e.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Label</S.Label>
                    <S.Input
                      type="text"
                      value={(stat.label as string) || ''}
                      onChange={(e) => handleArrayItemChange('stats', index, 'label', e.target.value)}
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Prefix</S.Label>
                    <S.Input
                      type="text"
                      value={(stat.prefix as string) || ''}
                      onChange={(e) => handleArrayItemChange('stats', index, 'prefix', e.target.value)}
                      placeholder="e.g., $"
                    />
                  </S.Field>
                  <S.Field>
                    <S.Label>Suffix</S.Label>
                    <S.Input
                      type="text"
                      value={(stat.suffix as string) || ''}
                      onChange={(e) => handleArrayItemChange('stats', index, 'suffix', e.target.value)}
                      placeholder="e.g., +, %"
                    />
                  </S.Field>
                </S.ItemCard>
              ))}
              <S.AddButton onClick={() => handleAddArrayItem('stats', {
                value: '100',
                label: 'New Stat',
                suffix: '+'
              })}>
                <Plus size={16} />
                Add Statistic
              </S.AddButton>
            </>
          )}
        </S.FieldGroup>
      </>
    );
  };

  // Render Newsletter Props
  const renderNewsletterProps = () => (
    <>
      <S.FieldGroup>
        <SectionHeader title="Content" section="content" />
        {expandedSections.content && (
          <>
            <S.Field>
              <S.Label>Heading</S.Label>
              <S.Input
                type="text"
                value={(props.heading as string) || ''}
                onChange={(e) => handleChange('heading', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Description</S.Label>
              <S.Textarea
                value={(props.description as string) || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={2}
              />
            </S.Field>

            <S.Field>
              <S.Label>Placeholder Text</S.Label>
              <S.Input
                type="text"
                value={(props.placeholder as string) || ''}
                onChange={(e) => handleChange('placeholder', e.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label>Button Text</S.Label>
              <S.Input
                type="text"
                value={(props.buttonText as string) || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
              />
            </S.Field>
          </>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <SectionHeader title="Layout" section="layout" />
        {expandedSections.layout && (
          <S.Field>
            <S.Label>Variant</S.Label>
            <S.Select
              value={(props.variant as string) || 'inline'}
              onChange={(e) => handleChange('variant', e.target.value)}
            >
              <option value="inline">Inline</option>
              <option value="banner">Banner</option>
              <option value="popup">Popup</option>
            </S.Select>
          </S.Field>
        )}
      </S.FieldGroup>
    </>
  );

  // Generic props renderer for other components
  const renderGenericProps = () => (
    <>
      <S.FieldGroup>
        <SectionHeader title="Content" section="content" />
        {expandedSections.content && (
          <>
            {props.heading !== undefined && (
              <S.Field>
                <S.Label>Heading</S.Label>
                <S.Input
                  type="text"
                  value={(props.heading as string) || ''}
                  onChange={(e) => handleChange('heading', e.target.value)}
                />
              </S.Field>
            )}

            {props.subheading !== undefined && (
              <S.Field>
                <S.Label>Subheading</S.Label>
                <S.Input
                  type="text"
                  value={(props.subheading as string) || ''}
                  onChange={(e) => handleChange('subheading', e.target.value)}
                />
              </S.Field>
            )}

            {props.description !== undefined && (
              <S.Field>
                <S.Label>Description</S.Label>
                <S.Textarea
                  value={(props.description as string) || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                />
              </S.Field>
            )}

            {props.content !== undefined && (
              <S.Field>
                <S.Label>Content</S.Label>
                <S.Textarea
                  value={(props.content as string) || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
                  rows={5}
                />
              </S.Field>
            )}
          </>
        )}
      </S.FieldGroup>

      {props.variant !== undefined && (
        <S.FieldGroup>
          <SectionHeader title="Layout" section="layout" />
          {expandedSections.layout && (
            <S.Field>
              <S.Label>Variant</S.Label>
              <S.Input
                type="text"
                value={(props.variant as string) || ''}
                onChange={(e) => handleChange('variant', e.target.value)}
              />
            </S.Field>
          )}
        </S.FieldGroup>
      )}
    </>
  );

  const renderPropsEditor = () => {
    switch (selectedBlock.type) {
      case 'hero':
        return renderHeroProps();
      case 'features':
        return renderFeaturesProps();
      case 'testimonials':
        return renderTestimonialsProps();
      case 'cta':
        return renderCTAProps();
      case 'faq':
        return renderFAQProps();
      case 'contact':
        return renderContactProps();
      case 'stats':
        return renderStatsProps();
      case 'newsletter':
        return renderNewsletterProps();
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
          <SectionHeader title="Visibility" section="visibility" />
          {expandedSections.visibility && (
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
          )}
        </S.FieldGroup>
      </S.PanelContent>
    </S.PanelContainer>
  );
};

export default PropertyPanel;
