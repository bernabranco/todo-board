import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  label?: string;
  total: number;
  done: number;
  percent: number;
};

export function ProgressBar({
  label = "Progress",
  total,
  done,
  percent,
}: ProgressBarProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span>{label}</span>
        <span>
          {done}/{total} ({percent}%)
        </span>
      </div>
      <div className={styles.track}>
        <div className={styles.bar} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
