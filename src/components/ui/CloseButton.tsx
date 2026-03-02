import type { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

type CloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CloseButton({ className = "", ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={[styles.base, className].filter(Boolean).join(" ")}
      aria-label="Close"
      {...rest}
    >
      ×
    </button>
  );
}
