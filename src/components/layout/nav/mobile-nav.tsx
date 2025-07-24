"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import Logo from "./logo";
import NavList from "./nav-list";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { useState } from "react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="px-4">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          <NavList setOpen={setOpen} />
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
