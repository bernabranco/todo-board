import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  color?: "default" | "green" | "blue" | "gray";
  size?: "default" | "icon";
  fullWidth?: boolean;
};

const colorClass: Record<NonNullable<ButtonProps["color"]>, string> = {
  default: "ui-button-default",
  green: "ui-button-green",
  blue: "ui-button-blue",
  gray: "ui-button-gray",
};

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "ui-button-size-default",
  icon: "ui-button-size-icon",
};

export function Button({
  text,
  color = "default",
  size = "default",
  fullWidth = true,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`ui-button ${colorClass[color]} ${sizeClass[size]} ${fullWidth ? "ui-button-full" : ""} ${className}`.trim()}
      {...rest}
    >
      {text}
    </button>
  );
}
