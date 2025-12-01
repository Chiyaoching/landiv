'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ContactProps } from '@/types';
import * as S from './Contact.styles';

// Dynamic icon component
const DynamicIcon: React.FC<{ name: string; size?: number }> = ({
  name,
  size = 20,
}) => {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>;
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
};

export const Contact: React.FC<ContactProps> = ({
  variant = 'split',
  heading,
  subheading,
  fields,
  submitButton,
  successMessage,
  contactInfo,
  mapEmbed,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'true' : '') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderField = (field: ContactProps['fields'][0]) => {
    switch (field.type) {
      case 'textarea':
        return (
          <S.Textarea
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <S.Select
            name={field.id}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={handleChange}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </S.Select>
        );
      case 'checkbox':
        return (
          <S.CheckboxWrapper>
            <S.Checkbox
              type="checkbox"
              name={field.id}
              required={field.required}
              checked={formData[field.id] === 'true'}
              onChange={handleChange}
            />
            <span>{field.label}</span>
          </S.CheckboxWrapper>
        );
      default:
        return (
          <S.Input
            type={field.type}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={handleChange}
          />
        );
    }
  };

  const renderForm = () => (
    <S.FormWrapper>
      {(heading || subheading) && variant === 'form-only' && (
        <S.Header $variant={variant}>
          {heading && <S.Heading>{heading}</S.Heading>}
          {subheading && <S.Subheading>{subheading}</S.Subheading>}
        </S.Header>
      )}

      {isSubmitted ? (
        <S.SuccessMessage>{successMessage}</S.SuccessMessage>
      ) : (
        <S.Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <S.FormField key={field.id}>
              {field.type !== 'checkbox' && <S.Label>{field.label}</S.Label>}
              {renderField(field)}
            </S.FormField>
          ))}
          <S.SubmitButton type="submit" $isLoading={isSubmitting}>
            {isSubmitting ? submitButton.loadingText || 'Sending...' : submitButton.text}
          </S.SubmitButton>
        </S.Form>
      )}
    </S.FormWrapper>
  );

  const renderInfo = () => (
    <S.InfoSection>
      {(heading || subheading) && variant !== 'form-only' && (
        <S.Header $variant={variant}>
          {heading && <S.Heading>{heading}</S.Heading>}
          {subheading && <S.Subheading>{subheading}</S.Subheading>}
        </S.Header>
      )}

      <S.InfoCard>
        {contactInfo?.email && (
          <S.InfoItem>
            <S.InfoIcon>
              <Mail size={20} />
            </S.InfoIcon>
            <S.InfoContent>
              <S.InfoLabel>Email</S.InfoLabel>
              <S.InfoValue>{contactInfo.email}</S.InfoValue>
            </S.InfoContent>
          </S.InfoItem>
        )}
        {contactInfo?.phone && (
          <S.InfoItem>
            <S.InfoIcon>
              <Phone size={20} />
            </S.InfoIcon>
            <S.InfoContent>
              <S.InfoLabel>Phone</S.InfoLabel>
              <S.InfoValue>{contactInfo.phone}</S.InfoValue>
            </S.InfoContent>
          </S.InfoItem>
        )}
        {contactInfo?.address && (
          <S.InfoItem>
            <S.InfoIcon>
              <MapPin size={20} />
            </S.InfoIcon>
            <S.InfoContent>
              <S.InfoLabel>Address</S.InfoLabel>
              <S.InfoValue>{contactInfo.address}</S.InfoValue>
            </S.InfoContent>
          </S.InfoItem>
        )}

        {contactInfo?.socialLinks && contactInfo.socialLinks.length > 0 && (
          <S.SocialLinks>
            {contactInfo.socialLinks.map((link, index) => (
              <S.SocialLink
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon ? (
                  <DynamicIcon name={link.icon} size={20} />
                ) : (
                  <Send size={20} />
                )}
              </S.SocialLink>
            ))}
          </S.SocialLinks>
        )}
      </S.InfoCard>
    </S.InfoSection>
  );

  if (variant === 'form-only') {
    return (
      <S.ContactSection>
        <S.Container $variant={variant}>{renderForm()}</S.Container>
      </S.ContactSection>
    );
  }

  if (variant === 'with-map') {
    return (
      <S.ContactSection>
        <S.Container $variant={variant}>
          <div>
            {renderInfo()}
            {renderForm()}
          </div>
          {mapEmbed && (
            <S.MapWrapper>
              <iframe src={mapEmbed} title="Location map" />
            </S.MapWrapper>
          )}
        </S.Container>
      </S.ContactSection>
    );
  }

  return (
    <S.ContactSection>
      <S.Container $variant={variant}>
        {renderInfo()}
        {renderForm()}
      </S.Container>
    </S.ContactSection>
  );
};

export default Contact;

