import React from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-3xl leading-tight text-primary sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-foreground/72 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}