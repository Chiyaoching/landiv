import styled, { css } from "styled-components";

export const CTASection = styled.section<{
  $variant: "banner" | "split" | "minimal";
  $background: string;
}>`
  padding: ${({ $variant }) =>
    $variant === "minimal" ? "4rem 2rem" : "6rem 2rem"};
  background: ${({ $background }) => $background};
  position: relative;
  overflow: hidden;

  ${({ $variant }) =>
    $variant === "minimal" &&
    css`
      background: transparent;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    `}
`;

export const Container = styled.div<{
  $variant: "banner" | "split" | "minimal";
}>`
  max-width: 1280px;
  margin: 0 auto;

  ${({ $variant }) => {
    if ($variant === "split") {
      return css`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4rem;
        align-items: center;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          text-align: center;
        }
      `;
    }

    return css`
      text-align: center;
    `;
  }}
`;

export const Content = styled.div<{
  $variant: "banner" | "split" | "minimal";
}>`
  ${({ $variant }) =>
    $variant !== "split" &&
    css`
      max-width: 800px;
      margin: 0 auto;
    `}
`;

export const Heading = styled.h2<{
  $variant: "banner" | "split" | "minimal";
}>`
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  ${({ $variant }) =>
    $variant === "minimal"
      ? css`
          color: #1a1a2e;
        `
      : css`
          color: white;
        `}
`;

export const Description = styled.p<{
  $variant: "banner" | "split" | "minimal";
}>`
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2rem;

  ${({ $variant }) =>
    $variant === "minimal"
      ? css`
          color: #64748b;
        `
      : css`
          color: rgba(255, 255, 255, 0.9);
        `}

  ${({ $variant }) =>
    $variant === "split" &&
    css`
      margin-bottom: 0;

      @media (max-width: 768px) {
        margin-bottom: 2rem;
      }
    `}
`;

export const Actions = styled.div<{
  $variant: "banner" | "split" | "minimal";
}>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  ${({ $variant }) =>
    $variant !== "split" &&
    css`
      justify-content: center;
    `}

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PrimaryButton = styled.a<{
  $variant: "banner" | "split" | "minimal";
}>`
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

  ${({ $variant }) =>
    $variant === "minimal"
      ? css`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -10px rgba(102, 126, 234, 0.5);
          }
        `
      : css`
          background: white;
          color: #1a1a2e;
          border: 2px solid white;

          &:hover {
            background: transparent;
            color: white;
            transform: translateY(-2px);
          }
        `}

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SecondaryButton = styled.a<{
  $variant: "banner" | "split" | "minimal";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ $variant }) =>
    $variant === "minimal"
      ? css`
          background: transparent;
          color: #1a1a2e;
          border: 2px solid #e2e8f0;

          &:hover {
            border-color: #1a1a2e;
          }
        `
      : css`
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);

          &:hover {
            border-color: white;
          }
        `}

  @media (max-width: 480px) {
    width: 100%;
  }
`;
