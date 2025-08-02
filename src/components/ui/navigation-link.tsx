"use client";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { useNavigation } from "~/hooks";

interface NavigationLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: React.ReactNode;
  className?: string;
  showLoader?: boolean;
  replace?: boolean;
  external?: boolean;
  animated?: boolean;
}

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  (
    {
      href,
      children,
      className,
      showLoader = true,
      replace = false,
      external = false,
      animated = true,
      ...props
    },
    ref
  ) => {
    const { navigate, isNavigating } = useNavigation({ showLoader });

    // Handle external links normally
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <Link
          href={href}
          ref={ref}
          className={cn(className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </Link>
      );
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (showLoader) {
        e.preventDefault();
        navigate(href, replace);
      }
    };

    const linkContent = (
      <Link
        href={href}
        ref={ref}
        className={cn(
          "transition-colors duration-200",
          isNavigating && "pointer-events-none opacity-70",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );

    if (!animated) {
      return linkContent;
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {linkContent}
      </motion.div>
    );
  }
);

NavigationLink.displayName = "NavigationLink";

export default NavigationLink;
