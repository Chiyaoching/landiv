"use client";

import React from "react";
import { CTAProps } from "@/types";
import * as S from "./CTA.styles";

export const CTA: React.FC<CTAProps> = ({
  variant = "banner",
  heading,
  description,
  primaryButton,
  secondaryButton,
  background,
}) => {
  const getBackgroundValue = () => {
    if (variant === "minimal") return "transparent";

    switch (background.type) {
      case "color":
        return background.value;
      case "gradient":
        return background.value;
      case "image":
        return `url(${background.value}) center/cover no-repeat`;
      default:
        return background.value;
    }
  };

  return (
    <S.CTASection $variant={variant} $background={getBackgroundValue()}>
      <S.Container $variant={variant}>
        <S.Content $variant={variant}>
          <S.Heading $variant={variant}>{heading}</S.Heading>
          {description && (
            <S.Description $variant={variant}>{description}</S.Description>
          )}
          {variant !== "split" && (
            <S.Actions $variant={variant}>
              <S.PrimaryButton href={primaryButton.link} $variant={variant}>
                {primaryButton.text}
              </S.PrimaryButton>
              {secondaryButton && (
                <S.SecondaryButton
                  href={secondaryButton.link}
                  $variant={variant}
                >
                  {secondaryButton.text}
                </S.SecondaryButton>
              )}
            </S.Actions>
          )}
        </S.Content>

        {variant === "split" && (
          <S.Actions $variant={variant}>
            <S.PrimaryButton href={primaryButton.link} $variant={variant}>
              {primaryButton.text}
            </S.PrimaryButton>
            {secondaryButton && (
              <S.SecondaryButton href={secondaryButton.link} $variant={variant}>
                {secondaryButton.text}
              </S.SecondaryButton>
            )}
          </S.Actions>
        )}
      </S.Container>
    </S.CTASection>
  );
};

export default CTA;
