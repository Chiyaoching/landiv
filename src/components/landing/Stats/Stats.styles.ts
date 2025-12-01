import styled, { css } from 'styled-components';

export const StatsSection = styled.section<{
  $variant: 'inline' | 'cards' | 'background';
}>`
  padding: 4rem 2rem;

  ${({ $variant }) =>
    $variant === 'background'
      ? css`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        `
      : css`
          background: white;
        `}
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Grid = styled.div<{
  $variant: 'inline' | 'cards' | 'background';
}>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  ${({ $variant }) =>
    $variant === 'inline' &&
    css`
      @media (min-width: 769px) {
        display: flex;
        justify-content: space-around;
      }
    `}
`;

export const StatCard = styled.div<{
  $variant: 'inline' | 'cards' | 'background';
}>`
  text-align: center;

  ${({ $variant }) =>
    $variant === 'cards' &&
    css`
      background: #f8fafc;
      padding: 2rem;
      border-radius: 16px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
      }
    `}

  ${({ $variant }) =>
    $variant === 'background' &&
    css`
      padding: 1.5rem;
    `}
`;

export const StatValue = styled.div<{
  $variant: 'inline' | 'cards' | 'background';
}>`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.5rem;

  ${({ $variant }) =>
    $variant === 'background'
      ? css`
          color: white;
        `
      : css`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        `}
`;

export const StatLabel = styled.div<{
  $variant: 'inline' | 'cards' | 'background';
}>`
  font-size: 1rem;
  font-weight: 500;

  ${({ $variant }) =>
    $variant === 'background'
      ? css`
          color: rgba(255, 255, 255, 0.8);
        `
      : css`
          color: #64748b;
        `}
`;

