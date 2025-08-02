"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { useNavigation } from "~/hooks";
import { cn } from "~/lib/utils";

interface NavigationButtonProps extends ButtonProps {
  href: string;
  replace?: boolean;
  showLoader?: boolean;
  loadingText?: string;
}

export const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  (
    {
      href,
      replace = false,
      showLoader = true,
      loadingText,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const { navigate, isNavigating } = useNavigation({ showLoader });

    const handleClick = () => {
      if (!disabled && !isNavigating) {
        navigate(href, replace);
      }
    };

    return (
      <Button
        ref={ref}
        className={cn(className)}
        disabled={disabled || isNavigating}
        onClick={handleClick}
        {...props}
      >
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={false}
          animate={{
            opacity: isNavigating ? 0.7 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {isNavigating && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="h-4 w-4 animate-spin text-[#00adb5]" />
            </motion.div>
          )}
          <span>{isNavigating && loadingText ? loadingText : children}</span>
        </motion.div>
      </Button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

export default NavigationButton;
