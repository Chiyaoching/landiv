import styled, { css, keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeroSection = styled.section<{
  $height: 'full' | 'large' | 'medium' | 'auto';
  $background?: string;
  $overlay?: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;

  ${({ $height }) => {
    switch ($height) {
      case 'full':
        return css`min-height: 100vh;`;
      case 'large':
        return css`min-height: 85vh;`;
      case 'medium':
        return css`min-height: 60vh;`;
      default:
        return css`min-height: auto; padding: 6rem 0;`;
    }
  }}

  ${({ $background }) =>
    $background &&
    css`
      background: ${$background};
    `}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $overlay }) => $overlay || 'transparent'};
    pointer-events: none;
  }
`;

export const HeroContainer = styled.div<{
  $variant: 'centered' | 'split' | 'video-bg' | 'image-bg';
}>`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  ${({ $variant }) =>
    $variant === 'split' &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
    `}
`;

export const HeroContent = styled.div<{
  $alignment: 'left' | 'center' | 'right';
}>`
  text-align: ${({ $alignment }) => $alignment};

  ${({ $alignment }) =>
    $alignment === 'center' &&
    css`
      max-width: 800px;
      margin: 0 auto;
    `}
`;

export const HeroHeading = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s ease-out;
  letter-spacing: -0.02em;
`;

export const HeroSubheading = styled.h2`
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  animation: ${fadeInUp} 0.8s ease-out 0.1s both;
`;

export const HeroDescription = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

export const HeroActions = styled.div<{
  $alignment: 'left' | 'center' | 'right';
}>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;

  ${({ $alignment }) => {
    switch ($alignment) {
      case 'center':
        return css`justify-content: center;`;
      case 'right':
        return css`justify-content: flex-end;`;
      default:
        return css`justify-content: flex-start;`;
    }
  }}

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const PrimaryButton = styled.a<{ $style: 'solid' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ $style }) =>
    $style === 'solid'
      ? css`
          background: white;
          color: #1a1a2e;
          border: 2px solid white;

          &:hover {
            background: transparent;
            color: white;
            transform: translateY(-2px);
          }
        `
      : css`
          background: transparent;
          color: white;
          border: 2px solid white;

          &:hover {
            background: white;
            color: #1a1a2e;
            transform: translateY(-2px);
          }
        `}

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const HeroMedia = styled.div`
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  img,
  video {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

export const BackgroundMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

