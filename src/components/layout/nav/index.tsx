import Logo from "./logo";
import MobileNav from "./mobile-nav";
import NavList from "./nav-list";
import { ThemeToggle } from "~/components/ui/theme-toggle";

const Navbar = () => {
  return (
    <nav className="mb-4 mt-2 flex items-center justify-between gap-4" role="navigation">
      <Logo />

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <NavList />
        </div>
        
        <ThemeToggle />

        <div className="block sm:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
