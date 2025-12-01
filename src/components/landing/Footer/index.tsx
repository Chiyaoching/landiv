"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { FooterProps } from "@/types";
import * as S from "./Footer.styles";

// Dynamic icon component
const DynamicIcon: React.FC<{ name: string; size?: number }> = ({
  name,
  size = 20,
}) => {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ size?: number }>
  >;
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
};

export const Footer: React.FC<FooterProps> = ({
  logo,
  description,
  columns,
  socialLinks,
  copyright,
  bottomLinks,
}) => {
  return (
    <S.FooterSection>
      <S.Container>
        <S.TopSection>
          <S.BrandSection>
            <S.Logo>
              {logo ? (
                <img src={logo} alt='Logo' />
              ) : (
                <S.LogoText>Your Brand</S.LogoText>
              )}
            </S.Logo>
            {description && <S.Description>{description}</S.Description>}
            {socialLinks && socialLinks.length > 0 && (
              <S.SocialLinks>
                {socialLinks.map((link, index) => (
                  <S.SocialLink
                    key={index}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={link.platform}
                  >
                    {link.icon ? (
                      <DynamicIcon name={link.icon} size={20} />
                    ) : (
                      link.platform.charAt(0).toUpperCase()
                    )}
                  </S.SocialLink>
                ))}
              </S.SocialLinks>
            )}
          </S.BrandSection>

          {columns.map((column, index) => (
            <S.Column key={index}>
              <S.ColumnTitle>{column.title}</S.ColumnTitle>
              <S.ColumnLinks>
                {column.links.map((link, linkIndex) => (
                  <S.ColumnLink key={linkIndex}>
                    <a href={link.href}>{link.label}</a>
                  </S.ColumnLink>
                ))}
              </S.ColumnLinks>
            </S.Column>
          ))}
        </S.TopSection>

        <S.BottomSection>
          <S.Copyright>{copyright}</S.Copyright>
          {bottomLinks && bottomLinks.length > 0 && (
            <S.BottomLinks>
              {bottomLinks.map((link, index) => (
                <S.BottomLink key={index} href={link.href}>
                  {link.label}
                </S.BottomLink>
              ))}
            </S.BottomLinks>
          )}
        </S.BottomSection>
      </S.Container>
    </S.FooterSection>
  );
};

export default Footer;
