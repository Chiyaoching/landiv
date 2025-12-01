import styled, { css } from "styled-components";

export const FAQSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const Heading = styled.h2`
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

export const Subheading = styled.p`
  font-size: 1.25rem;
  color: #64748b;
`;

export const FAQList = styled.div<{
  $variant: "accordion" | "grid" | "two-column";
}>`
  ${({ $variant }) => {
    if ($variant === "grid" || $variant === "two-column") {
      return css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      `;
    }

    return css`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `;
  }}
`;

export const FAQItem = styled.div<{
  $variant: "accordion" | "grid" | "two-column";
  $isOpen?: boolean;
}>`
  ${({ $variant }) => {
    if ($variant === "grid" || $variant === "two-column") {
      return css`
        padding: 1.5rem;
        background: #f8fafc;
        border-radius: 12px;
      `;
    }

    return css`
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        border-color: #667eea;
      }
    `;
  }}
`;

export const FAQQuestion = styled.button<{
  $variant: "accordion" | "grid" | "two-column";
  $isOpen?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: ${({ $variant }) =>
    $variant === "accordion" ? "1.25rem 1.5rem" : "0"};
  background: transparent;
  border: none;
  cursor: ${({ $variant }) =>
    $variant === "accordion" ? "pointer" : "default"};
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a2e;
  transition: all 0.3s ease;

  ${({ $variant }) =>
    $variant === "accordion" &&
    css`
      &:hover {
        color: #667eea;
      }
    `}

  svg {
    flex-shrink: 0;
    transition: transform 0.3s ease;
    color: #667eea;

    ${({ $isOpen }) =>
      $isOpen &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

export const FAQAnswer = styled.div<{
  $variant: "accordion" | "grid" | "two-column";
  $isOpen?: boolean;
}>`
  color: #64748b;
  line-height: 1.7;

  ${({ $variant, $isOpen }) => {
    if ($variant === "accordion") {
      return css`
        max-height: ${$isOpen ? "500px" : "0"};
        opacity: ${$isOpen ? "1" : "0"};
        padding: ${$isOpen ? "0 1.5rem 1.25rem" : "0 1.5rem"};
        overflow: hidden;
        transition: all 0.3s ease;
      `;
    }

    return css`
      margin-top: 1rem;
    `;
  }}
`;
