"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import { BookOpen, Compass, Copy, Globe, Moon, Search, Star, Sun, X } from "lucide-react";
import { toast } from "sonner";
import config from "~/config";
import { portfolioRepositoryUrl } from "~/constants/portfolio";
import { useThemeToggle } from "~/components/ui/sleek-theme-switch";
import type { CommandSearchEntry } from "~/types/command-search";

const CommandMenuContext = createContext<(() => void) | null>(null);
export function useCommandMenu() {
  const open = useContext(CommandMenuContext);
  if (!open) throw new Error("Command menu provider is missing");
  return open;
}

type Command = CommandSearchEntry & { run?: () => void | Promise<void> };

export function CommandMenuProvider({
  children,
  entries,
}: {
  children: React.ReactNode;
  entries: CommandSearchEntry[];
}) {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeToggle({
    variant: "circle",
    start: "top-right",
    blur: true,
  });
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const results = useRef<HTMLDivElement>(null);
  const listId = useId();

  const commands: Command[] = [
    ...entries,
    {
      id: "action-theme",
      group: "Actions",
      title: isDark ? "Switch to Light Theme" : "Switch to Dark Theme",
      description: "Change the appearance",
      run: toggleTheme,
    },
    {
      id: "action-email",
      group: "Actions",
      title: "Copy Email Address",
      description: config.social.email,
      run: async () => {
        try {
          await navigator.clipboard.writeText(config.social.email);
          toast.success("Email address copied");
        } catch {
          toast.error("Could not copy email: " + config.social.email);
        }
      },
    },
    {
      id: "action-star",
      group: "Actions",
      title: "Star this portfolio",
      description: "Support the open-source portfolio on GitHub",
      run: () => {
        window.open(portfolioRepositoryUrl, "_blank", "noopener,noreferrer");
      },
    },
  ];
  const filtered = commands.filter((command) => {
    const text = [command.title, command.description, command.group, command.keywords ?? ""]
      .join(" ")
      .toLowerCase();
    return query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .every((word) => text.includes(word));
  });
  const active = Math.min(selected, Math.max(0, filtered.length - 1));

  const show = () => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setSelected(0);
    setOpen(true);
  };
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !event.repeat) {
        event.preventDefault();
        if (!open)
          returnFocus.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setQuery("");
        setSelected(0);
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);
  useEffect(() => {
    results.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, query]);

  const execute = (command: Command) => {
    flushSync(() => setOpen(false));
    if (command.run) void command.run();
    else if (command.href) {
      const target = new URL(command.href, location.href);
      if (target.pathname !== location.pathname || target.search !== location.search) {
        flushSync(() =>
          window.dispatchEvent(
            new CustomEvent("portfolio:navigation-start", { detail: command.href })
          )
        );
      }
      router.push(command.href);
    }
  };

  return (
    <CommandMenuContext.Provider value={show}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-neutral-950/80 backdrop-blur-md" />
          <Dialog.Content
            className="fixed left-1/2 top-[12dvh] z-[100] flex max-h-[75dvh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl sm:top-[15dvh] sm:max-h-[65dvh]"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const target = returnFocus.current?.isConnected
                ? returnFocus.current
                : document.querySelector<HTMLElement>("[data-command-search-trigger]");
              target?.focus({ preventScroll: true });
            }}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              input.current?.focus();
            }}
          >
            <Dialog.Title className="sr-only">Search portfolio</Dialog.Title>
            <Dialog.Description className="sr-only">
              Search pages, projects, articles, or actions. Use arrow keys to navigate and Enter to
              select.
            </Dialog.Description>
            <div className="flex items-center gap-2.5 border-b border-neutral-800 px-4 py-3.5">
              <Search aria-hidden="true" className="size-[18px] shrink-0 text-neutral-400" />
              <input
                ref={input}
                role="combobox"
                aria-label="Search pages, projects, articles, or actions"
                aria-expanded="true"
                aria-autocomplete="list"
                aria-controls={listId}
                aria-activedescendant={filtered.length ? listId + "-" + active : undefined}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                onKeyDown={(event) => {
                  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                    event.preventDefault();
                    if (!filtered.length) return;
                    if (event.key === "Home") setSelected(0);
                    else if (event.key === "End") setSelected(filtered.length - 1);
                    else
                      setSelected(
                        (active + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) %
                          filtered.length
                      );
                  } else if (event.key === "Enter" && filtered[active]) {
                    event.preventDefault();
                    execute(filtered[active]);
                  }
                }}
                placeholder="Search pages, projects, articles, or actions..."
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
              />
              <Dialog.Close
                className="rounded-md p-1 text-neutral-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                aria-label="Close search"
              >
                <X aria-hidden="true" className="size-4" />
              </Dialog.Close>
            </div>
            <div
              ref={results}
              id={listId}
              role="listbox"
              aria-label="Search results"
              className="min-h-0 flex-1 overflow-y-auto py-2"
            >
              {filtered.length === 0 && (
                <p role="status" className="px-4 py-8 text-center text-xs text-neutral-400">
                  No results for &quot;{query}&quot;
                </p>
              )}
              {(["Navigation", "Projects", "Articles", "Actions"] as const).map((group) => {
                const groupItems = filtered.filter((command) => command.group === group);
                if (!groupItems.length) return null;
                return (
                  <div
                    key={group}
                    role="group"
                    aria-label={group}
                    className="border-b border-neutral-800/50 px-2 py-2 last:border-0"
                  >
                    <div
                      aria-hidden="true"
                      className="px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-500"
                    >
                      {group}
                    </div>
                    {groupItems.map((command) => {
                      const index = filtered.indexOf(command);
                      const Icon =
                        command.id === "action-theme"
                          ? isDark
                            ? Sun
                            : Moon
                          : command.id === "action-email"
                            ? Copy
                            : command.id === "action-star"
                              ? Star
                              : group === "Articles"
                                ? BookOpen
                                : group === "Projects"
                                  ? Globe
                                  : Compass;
                      return (
                        <div
                          key={command.id}
                          role="option"
                          id={listId + "-" + index}
                          aria-selected={index === active}
                          onMouseEnter={() => setSelected(index)}
                          onClick={() => execute(command)}
                          className={
                            "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 " +
                            (index === active
                              ? "border-neutral-700 bg-neutral-800 text-white"
                              : "border-transparent text-neutral-300 hover:bg-neutral-800/50")
                          }
                        >
                          <Icon aria-hidden="true" className="size-4 shrink-0 text-neutral-400" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold">{command.title}</p>
                            <p className="mt-0.5 truncate text-[10px] text-neutral-400">
                              {command.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-800 px-4 py-2 text-[10px] text-neutral-400">
              <span>Up / Down to navigate</span>
              <span>Enter to select</span>
              <span>Esc to close</span>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandMenuContext.Provider>
  );
}
