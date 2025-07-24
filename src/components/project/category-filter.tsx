"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";
import { categories } from "./_project-mock";

const CategoryFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={cn(
            "px-3 py-1.5 text-xs rounded-full border transition-colors duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            currentCategory === category.id
              ? "bg-[#25dde5] text-background border-[#25dde5]"
              : "bg-background text-muted-foreground border-border"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
