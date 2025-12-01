import styled, { css } from 'styled-components';

export const ContactSection = styled.section`
  padding: 6rem 2rem;
  background: #f8fafc;
`;

export const Container = styled.div<{
  $variant: 'form-only' | 'split' | 'with-map';
}>`
  max-width: ${({ $variant }) => ($variant === 'form-only' ? '600px' : '1280px')};
  margin: 0 auto;

  ${({ $variant }) =>
    $variant === 'split' &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `}

  ${({ $variant }) =>
    $variant === 'with-map' &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `}
`;

export const Header = styled.div<{
  $variant: 'form-only' | 'split' | 'with-map';
}>`
  text-align: ${({ $variant }) => ($variant === 'form-only' ? 'center' : 'left')};
  margin-bottom: 2rem;
`;

export const Heading = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
`;

export const Subheading = styled.p`
  font-size: 1.125rem;
  color: #64748b;
`;

export const FormWrapper = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormField = styled.div``;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background: #667eea;
    border-color: #667eea;
  }
`;

export const SubmitButton = styled.button<{ $isLoading?: boolean }>`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: ${({ $isLoading }) => ($isLoading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(102, 126, 234, 0.5);
  }
`;

export const SuccessMessage = styled.div`
  padding: 1rem;
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  text-align: center;
`;

export const InfoSection = styled.div``;

export const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
  }
`;

export const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
  border-radius: 10px;
  color: #667eea;
  flex-shrink: 0;
`;

export const InfoContent = styled.div``;

export const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
`;

export const InfoValue = styled.div`
  font-weight: 500;
  color: #1a1a2e;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 10px;
  color: #64748b;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

export const MapWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  min-height: 400px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

