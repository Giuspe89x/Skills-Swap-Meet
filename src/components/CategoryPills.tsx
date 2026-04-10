import React from 'react';

type CategoryPillsProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryPills({
  categories,
  activeCategory,
  onSelect,
}: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
              active
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'border border-border/80 bg-card text-foreground/75 hover:scale-105 hover:border-primary/30 hover:text-primary'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}