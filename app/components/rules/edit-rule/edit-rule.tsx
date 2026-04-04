import EditCell from "~/components/partials/edit-cell/edit-cell";
import styles from "./index.module.css";

export default function EditRule() {
  return (
    <section className={styles.Rule}>
      <div className={styles.RuleImpulse}>
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
      </div>
      <span>&gt;</span>
      <div className={styles.RuleResponse}>
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
        <EditCell className={styles.Cell} />
      </div>
    </section>
  );
}
