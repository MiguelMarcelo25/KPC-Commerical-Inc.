import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally compose Tailwind class strings.
 * `clsx` handles conditionals; `tailwind-merge` resolves conflicts
 * (e.g. `bg-red-500` + `bg-blue-500` → `bg-blue-500`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
