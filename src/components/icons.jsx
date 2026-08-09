/**
 * Small inline icons drawn to match the hairline weight of the layout.
 * (react-icons' fa6 build here has no diagonal arrow glyph.)
 */
export function ArrowUpRight({ size = 12, strokeWidth = 1.6, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12 12 4" />
      <path d="M5.5 4H12v6.5" />
    </svg>
  );
}

export default ArrowUpRight;
