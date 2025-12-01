'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroProps } from '@/types';
import * as S from './Hero.styles';

export const Hero: React.FC<HeroProps> = ({
  variant = 'centered',
  heading,
  subheading,
  description,
  primaryCTA,
  secondaryCTA,
  media,
  background,
  alignment = 'center',
  height = 'large',
}) => {
  const getBackgroundValue = () => {
    if (!background) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    switch (background.type) {
      case 'color':
        return background.value;
      case 'gradient':
        return background.value;
      case 'image':
      case 'video':
        return 'transparent';
      default:
        return background.value;
    }
  };

  const renderContent = () => (
    <S.HeroContent $alignment={variant === 'split' ? 'left' : alignment}>
      <S.HeroHeading>{heading}</S.HeroHeading>
      {subheading && <S.HeroSubheading>{subheading}</S.HeroSubheading>}
      {description && <S.HeroDescription>{description}</S.HeroDescription>}
      
      {(primaryCTA || secondaryCTA) && (
        <S.HeroActions $alignment={variant === 'split' ? 'left' : alignment}>
          {primaryCTA && (
            <S.PrimaryButton href={primaryCTA.link} $style={primaryCTA.style}>
              {primaryCTA.text}
            </S.PrimaryButton>
          )}
          {secondaryCTA && (
            <S.SecondaryButton href={secondaryCTA.link}>
              {secondaryCTA.text}
              <ArrowRight size={18} />
            </S.SecondaryButton>
          )}
        </S.HeroActions>
      )}
    </S.HeroContent>
  );

  const renderMedia = () => {
    if (!media) return null;

    if (variant === 'video-bg' || variant === 'image-bg') {
      return (
        <S.BackgroundMedia>
          {media.type === 'video' ? (
            <video autoPlay muted loop playsInline>
              <source src={media.src} />
            </video>
          ) : (
            <img src={media.src} alt={media.alt || ''} />
          )}
        </S.BackgroundMedia>
      );
    }

    if (variant === 'split') {
      return (
        <S.HeroMedia>
          {media.type === 'video' ? (
            <video autoPlay muted loop playsInline>
              <source src={media.src} />
            </video>
          ) : (
            <img src={media.src} alt={media.alt || ''} />
          )}
        </S.HeroMedia>
      );
    }

    return null;
  };

  return (
    <S.HeroSection
      $height={height}
      $background={getBackgroundValue()}
      $overlay={background?.overlay}
    >
      {(variant === 'video-bg' || variant === 'image-bg') && renderMedia()}
      
      <S.HeroContainer $variant={variant}>
        {renderContent()}
        {variant === 'split' && renderMedia()}
      </S.HeroContainer>
    </S.HeroSection>
  );
};

export default Hero;

