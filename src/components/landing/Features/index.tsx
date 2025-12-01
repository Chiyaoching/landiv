'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { FeaturesProps } from '@/types';
import * as S from './Features.styles';

// Dynamic icon component
const DynamicIcon: React.FC<{ name: string; size?: number }> = ({
  name,
  size = 24,
}) => {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>;
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
};

export const Features: React.FC<FeaturesProps> = ({
  variant = 'grid',
  heading,
  subheading,
  features,
  columns = 3,
  iconStyle = 'circle',
}) => {
  return (
    <S.FeaturesSection>
      <S.Container>
        {(heading || subheading) && (
          <S.Header>
            {heading && <S.Heading>{heading}</S.Heading>}
            {subheading && <S.Subheading>{subheading}</S.Subheading>}
          </S.Header>
        )}

        <S.Grid $variant={variant} $columns={columns}>
          {features.map((feature, index) => (
            <S.FeatureCard
              key={feature.id}
              $variant={variant}
              $iconStyle={iconStyle}
              $index={index}
            >
              {variant === 'alternating' && feature.image ? (
                <>
                  <S.FeatureImage>
                    <img src={feature.image} alt={feature.title} />
                  </S.FeatureImage>
                  <S.FeatureContent>
                    {feature.icon && iconStyle !== 'none' && (
                      <S.IconWrapper $style={iconStyle}>
                        <DynamicIcon name={feature.icon} size={28} />
                      </S.IconWrapper>
                    )}
                    <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                    <S.FeatureDescription>
                      {feature.description}
                    </S.FeatureDescription>
                    {feature.link && (
                      <S.FeatureLink href={feature.link}>
                        Learn more <ArrowRight size={16} />
                      </S.FeatureLink>
                    )}
                  </S.FeatureContent>
                </>
              ) : (
                <>
                  {feature.icon && iconStyle !== 'none' && (
                    <S.IconWrapper $style={iconStyle}>
                      <DynamicIcon name={feature.icon} size={28} />
                    </S.IconWrapper>
                  )}
                  <S.FeatureContent>
                    <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                    <S.FeatureDescription>
                      {feature.description}
                    </S.FeatureDescription>
                    {feature.link && (
                      <S.FeatureLink href={feature.link}>
                        Learn more <ArrowRight size={16} />
                      </S.FeatureLink>
                    )}
                  </S.FeatureContent>
                </>
              )}
            </S.FeatureCard>
          ))}
        </S.Grid>
      </S.Container>
    </S.FeaturesSection>
  );
};

export default Features;

