"use client";

import { Search, Star } from "lucide-react";
import { portfolioRepositoryUrl } from "~/constants/portfolio";
import { useCommandMenu } from "~/components/command-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export default function PortfolioActions() {
  const openSearch = useCommandMenu();
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={portfolioRepositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star this portfolio on GitHub"
            className="el-focus-styles grid size-5 place-items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Star aria-hidden="true" className="size-4" />
          </a>
        </TooltipTrigger>
        <TooltipContent>Star this portfolio</TooltipContent>
      </Tooltip>
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search portfolio (Ctrl+K or Command+K)"
        data-command-search-trigger=""
        aria-keyshortcuts="Control+k Meta+k"
        className="el-focus-styles inline-flex h-8 cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground"
        title="Open Command Palette (Ctrl+K)"
      >
        <Search aria-hidden="true" className="size-3.5" />
        <kbd aria-hidden="true" className="font-sans text-xs leading-none">
          {String.fromCharCode(0x2318)}K
        </kbd>
      </button>
    </div>
  );
}
