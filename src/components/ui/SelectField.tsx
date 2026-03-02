import type { SelectHTMLAttributes } from "react";
import { ArrowIcon } from "./ArrowIcon";
import styles from "./SelectField.module.css";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ className, children, ...props }: SelectFieldProps) {
  return (
    <div className={styles.wrapper}>
      <select className={`${styles.select} ${className ?? ""}`} {...props}>
        {children}
      </select>
      <ArrowIcon className={styles.icon} direction="down" />
    </div>
  );
}
