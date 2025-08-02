"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UseNavigationOptions {
  showLoader?: boolean;
  minLoadingTime?: number;
}

export const useNavigation = (options: UseNavigationOptions = {}) => {
  const { showLoader = true, minLoadingTime = 500 } = options;
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const navigate = useCallback(
    async (href: string, replace = false) => {
      if (!showLoader) {
        if (replace) {
          router.replace(href);
        } else {
          router.push(href);
        }
        return;
      }

      setIsNavigating(true);

      // Start navigation
      const startTime = Date.now();
      
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }

      // Ensure minimum loading time for better UX
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);

      setTimeout(() => {
        setIsNavigating(false);
      }, remainingTime);
    },
    [router, showLoader, minLoadingTime]
  );

  const push = useCallback(
    (href: string) => navigate(href, false),
    [navigate]
  );

  const replace = useCallback(
    (href: string) => navigate(href, true),
    [navigate]
  );

  return {
    push,
    replace,
    navigate,
    isNavigating,
  };
};
