import React, { AnchorHTMLAttributes, ReactNode } from "react";
import { ClassValue } from "clsx";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";
import { NavigationLink } from "../ui/navigation-link";

const CustomLink = (
  props: {
    href: string;
    children: ReactNode;
    className?: ClassValue;
  } & AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  const { href, children, className, ...restProps } = props;
  const isInternalLink = href && href.startsWith("/");

  const linkVariant = buttonVariants({
    variant: "link",
    className: cn(
      "!p-0 h-full !inline-block !whitespace-normal !text-base !text-ring",
      className
    ),
  });

  if (isInternalLink) {
    return (
      <NavigationLink 
        href={href}
        className={linkVariant} 
        showLoader={true}
        animated={false}
        {...restProps}
      >
        {children}
      </NavigationLink>
    );
  }

  return (
    <NavigationLink
      href={href}
      external
      className={linkVariant}
      {...restProps}
    >
      {children}
    </NavigationLink>
  );
};

export default CustomLink;
