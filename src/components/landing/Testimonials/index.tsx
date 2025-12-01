"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { TestimonialsProps } from "@/types";
import * as S from "./Testimonials.styles";

export const Testimonials: React.FC<TestimonialsProps> = ({
  variant = "grid",
  heading,
  testimonials,
  showRating = true,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        fill={i < rating ? "#fbbf24" : "none"}
        stroke={i < rating ? "#fbbf24" : "#d1d5db"}
      />
    ));
  };

  return (
    <S.TestimonialsSection>
      <S.Container>
        {heading && (
          <S.Header>
            <S.Heading>{heading}</S.Heading>
          </S.Header>
        )}

        <S.Grid $variant={variant}>
          {testimonials.map((testimonial) => (
            <S.TestimonialCard key={testimonial.id} $variant={variant}>
              <S.QuoteIcon>
                <Quote size={variant === "single" ? 48 : 32} />
              </S.QuoteIcon>

              <S.Content $variant={variant}>{testimonial.content}</S.Content>

              {showRating && testimonial.rating && (
                <S.Rating>{renderStars(testimonial.rating)}</S.Rating>
              )}

              <S.Author $variant={variant}>
                <S.Avatar>
                  {testimonial.author.avatar ? (
                    <img
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                    />
                  ) : (
                    getInitials(testimonial.author.name)
                  )}
                </S.Avatar>
                <S.AuthorInfo>
                  <S.AuthorName>{testimonial.author.name}</S.AuthorName>
                  <S.AuthorTitle>
                    {testimonial.author.title}
                    {testimonial.author.company &&
                      ` at ${testimonial.author.company}`}
                  </S.AuthorTitle>
                </S.AuthorInfo>
              </S.Author>
            </S.TestimonialCard>
          ))}
        </S.Grid>
      </S.Container>
    </S.TestimonialsSection>
  );
};

export default Testimonials;
