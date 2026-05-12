/**
 * Accessibility primitive — invisible until keyboard-focused.
 * Lets screen-reader & keyboard users jump past the nav directly to <main>.
 * Required by ui-ux-pro-max rule 1.7 (skip-links).
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-3 focus:left-3 focus:z-[100]
        focus:rounded-lg focus:bg-kpc-signal focus:text-white
        focus:px-4 focus:py-2 focus:text-sm focus:font-semibold
        focus:shadow-kpc-glow focus:outline-none
      "
    >
      Skip to main content
    </a>
  );
}
