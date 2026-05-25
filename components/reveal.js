"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({ as: Tag = "div", className = "", delay = 0, instant = false, children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px" 
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [instant]);

  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${visible ? "reveal-visible" : ""}`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
