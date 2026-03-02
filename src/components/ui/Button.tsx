import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  color?: "default" | "green" | "blue" | "gray";
  size?: "default" | "icon";
  fullWidth?: boolean;
};

export function Button({
  text,
  color = "default",
  size = "default",
  fullWidth = true,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      data-variant={color}
      data-size={size}
      data-full={fullWidth ? "true" : "false"}
      className="ui-button"
      {...rest}
    >
      {text}
    </button>
  );
}
