import styled, { css } from 'styled-components';

export const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: #fafbfc;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const Heading = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

export const Subheading = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
`;

export const Grid = styled.div<{
  $variant: 'grid' | 'list' | 'alternating' | 'cards';
  $columns: 2 | 3 | 4;
}>`
  ${({ $variant, $columns }) => {
    if ($variant === 'list') {
      return css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
      `;
    }

    if ($variant === 'alternating') {
      return css`
        display: flex;
        flex-direction: column;
        gap: 4rem;
      `;
    }

    return css`
      display: grid;
      grid-template-columns: repeat(${$columns}, 1fr);
      gap: 2rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    `;
  }}
`;

export const FeatureCard = styled.div<{
  $variant: 'grid' | 'list' | 'alternating' | 'cards';
  $iconStyle: 'circle' | 'square' | 'none';
  $index?: number;
}>`
  ${({ $variant, $index }) => {
    if ($variant === 'alternating') {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;

        ${$index && $index % 2 === 1
          ? css`
              direction: rtl;
              & > * {
                direction: ltr;
              }
            `
          : ''}

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          direction: ltr;
        }
      `;
    }

    if ($variant === 'list') {
      return css`
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
      `;
    }

    if ($variant === 'cards') {
      return css`
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `;
    }

    return css`
      text-align: center;
    `;
  }}
`;

export const IconWrapper = styled.div<{
  $style: 'circle' | 'square' | 'none';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #667eea;

  ${({ $style }) => {
    if ($style === 'circle') {
      return css`
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        border-radius: 50%;
      `;
    }

    if ($style === 'square') {
      return css`
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
        border-radius: 12px;
      `;
    }

    return css`
      width: auto;
      height: auto;
    `;
  }}

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const FeatureContent = styled.div``;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.7;
`;

export const FeatureImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2);
  }
`;

export const FeatureLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #667eea;
  font-weight: 500;
  text-decoration: none;
  transition: gap 0.3s ease;

  &:hover {
    gap: 0.75rem;
  }
`;

