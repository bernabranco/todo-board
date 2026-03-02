type ArrowIconProps = {
  direction?: "up" | "down";
  className?: string;
};

export function ArrowIcon({ direction = "down", className }: ArrowIconProps) {
  const path = direction === "down" ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={path} />
    </svg>
  );
}
