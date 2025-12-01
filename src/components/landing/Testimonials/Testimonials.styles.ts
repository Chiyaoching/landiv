import styled, { css } from 'styled-components';

export const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea08 0%, #764ba208 100%);
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

export const Grid = styled.div<{
  $variant: 'carousel' | 'grid' | 'masonry' | 'single';
}>`
  ${({ $variant }) => {
    if ($variant === 'single') {
      return css`
        max-width: 800px;
        margin: 0 auto;
      `;
    }

    if ($variant === 'carousel') {
      return css`
        display: flex;
        gap: 2rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;

        &::-webkit-scrollbar {
          height: 8px;
        }

        &::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;

          &:hover {
            background: #94a3b8;
          }
        }
      `;
    }

    return css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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

export const TestimonialCard = styled.div<{
  $variant: 'carousel' | 'grid' | 'masonry' | 'single';
}>`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  ${({ $variant }) =>
    $variant === 'carousel' &&
    css`
      flex: 0 0 350px;
      scroll-snap-align: start;
    `}

  ${({ $variant }) =>
    $variant === 'single' &&
    css`
      text-align: center;
      padding: 3rem;
    `}
`;

export const QuoteIcon = styled.div`
  color: #667eea;
  margin-bottom: 1.5rem;
  opacity: 0.5;
`;

export const Content = styled.p<{
  $variant: 'carousel' | 'grid' | 'masonry' | 'single';
}>`
  font-size: ${({ $variant }) => ($variant === 'single' ? '1.5rem' : '1.125rem')};
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

export const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  justify-content: inherit;

  svg {
    color: #fbbf24;
  }
`;

export const Author = styled.div<{
  $variant: 'carousel' | 'grid' | 'masonry' | 'single';
}>`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ $variant }) =>
    $variant === 'single' &&
    css`
      justify-content: center;
    `}
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AuthorInfo = styled.div`
  text-align: left;
`;

export const AuthorName = styled.div`
  font-weight: 600;
  color: #1a1a2e;
`;

export const AuthorTitle = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

