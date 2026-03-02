import type { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function EditButton({ className = "", ...rest }: EditButtonProps) {
  return (
    <button
      type="button"
      className={[styles.base, className].filter(Boolean).join(" ")}
      aria-label="Edit"
      {...rest}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <path d="M16.862 3.487a2.06 2.06 0 0 1 2.914 2.914l-9.62 9.62-3.742.83.83-3.742 9.618-9.622zM19.19 2.07a4.06 4.06 0 0 0-5.742 0L4.9 10.62a1 1 0 0 0-.27.51l-1.2 5.41a1 1 0 0 0 1.19 1.19l5.41-1.2a1 1 0 0 0 .51-.27l8.548-8.548a4.06 4.06 0 0 0 0-5.742z" />
      </svg>
    </button>
  );
}
