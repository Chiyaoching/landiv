"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQProps } from "@/types";
import * as S from "./FAQ.styles";

export const FAQ: React.FC<FAQProps> = ({
  variant = "accordion",
  heading,
  subheading,
  items,
  expandMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (variant !== "accordion") return;

    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (expandMultiple) {
        return [...prev, id];
      }

      return [id];
    });
  };

  const isOpen = (id: string) => openItems.includes(id);

  return (
    <S.FAQSection>
      <S.Container>
        {(heading || subheading) && (
          <S.Header>
            {heading && <S.Heading>{heading}</S.Heading>}
            {subheading && <S.Subheading>{subheading}</S.Subheading>}
          </S.Header>
        )}

        <S.FAQList $variant={variant}>
          {items.map((item) => (
            <S.FAQItem
              key={item.id}
              $variant={variant}
              $isOpen={isOpen(item.id)}
            >
              <S.FAQQuestion
                $variant={variant}
                $isOpen={isOpen(item.id)}
                onClick={() => toggleItem(item.id)}
                type='button'
              >
                {item.question}
                {variant === "accordion" && <ChevronDown size={20} />}
              </S.FAQQuestion>
              <S.FAQAnswer
                $variant={variant}
                $isOpen={variant !== "accordion" || isOpen(item.id)}
              >
                {item.answer}
              </S.FAQAnswer>
            </S.FAQItem>
          ))}
        </S.FAQList>
      </S.Container>
    </S.FAQSection>
  );
};

export default FAQ;
