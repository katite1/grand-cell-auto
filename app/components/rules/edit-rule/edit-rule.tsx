import EditCell from "~/components/partials/edit-cell/edit-cell";
import styles from "./index.module.css";
import { useContext } from "react";
import { RuleContext } from "~/contexts/rule-context";
import { SpatialRule, type Rule } from "~/data-structures/rule";

export default function EditRule() {
  const { setRules } = useContext(RuleContext)
  function onChange(type: "impulse" | "response", index: number, value: boolean) {
    setRules((rules) => {
      rules = [...rules];
      if (rules[0] === undefined) {
        rules[0] = new SpatialRule([null, null, null, null, false, null, null, null, null], [null, null, null, null, false, null, null, null, null])
      }
      if (rules[0] instanceof SpatialRule) {
        rules[0][type][index] = value;
      }
      return rules;
    })
  }
  return (
    <section className={styles.Rule}>
      <div className={styles.RuleImpulse}>
        <EditCell type="impulse" index={0} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={1} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={2} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={3} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={4} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={5} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={6} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={7} onChange={onChange} className={styles.Cell} />
        <EditCell type="impulse" index={8} onChange={onChange} className={styles.Cell} />
      </div>
      <span>&gt;</span>
      <div className={styles.RuleResponse}>
        <EditCell type="response" index={0} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={1} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={2} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={3} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={4} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={5} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={6} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={7} onChange={onChange} className={styles.Cell} />
        <EditCell type="response" index={8} onChange={onChange} className={styles.Cell} />
      </div>
    </section>
  );
}
