import styled from 'styled-components';

export const FooterSection = styled.footer`
  background: #0f172a;
  color: white;
  padding: 4rem 2rem 2rem;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #1e293b;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandSection = styled.div``;

export const Logo = styled.div`
  margin-bottom: 1.5rem;

  img {
    height: 40px;
    width: auto;
  }
`;

export const LogoText = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Description = styled.p`
  color: #94a3b8;
  line-height: 1.7;
  max-width: 300px;
`;

export const Column = styled.div``;

export const ColumnTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #f8fafc;
  margin-bottom: 1.5rem;
`;

export const ColumnLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ColumnLink = styled.li`
  a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e293b;
  border-radius: 10px;
  color: #94a3b8;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Copyright = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

export const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

export const BottomLink = styled.a`
  color: #64748b;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

