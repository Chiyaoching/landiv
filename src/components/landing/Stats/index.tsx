"use client";

import React, { useEffect, useState, useRef } from "react";
import { StatsProps } from "@/types";
import * as S from "./Stats.styles";

export const Stats: React.FC<StatsProps> = ({
  variant = "cards",
  stats,
  animated = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <S.StatsSection $variant={variant} ref={sectionRef}>
      <S.Container>
        <S.Grid $variant={variant}>
          {stats.map((stat, index) => (
            <S.StatCard key={index} $variant={variant}>
              <S.StatValue $variant={variant}>
                {stat.prefix}
                {isVisible ? stat.value : "0"}
                {stat.suffix}
              </S.StatValue>
              <S.StatLabel $variant={variant}>{stat.label}</S.StatLabel>
            </S.StatCard>
          ))}
        </S.Grid>
      </S.Container>
    </S.StatsSection>
  );
};

export default Stats;
