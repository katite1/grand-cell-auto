import EditCell from "~/components/partials/edit-cell/edit-cell";
import styles from "./index.module.css";
import { useContext } from "react";
import { RuleContext } from "~/contexts/rule-context";
import { SpatialRule, type Rule } from "~/data-structures/rule";

interface EditRuleProps {
  ruleIndex: number
}

export default function EditRule({ ruleIndex }: EditRuleProps) {
  const { setRules } = useContext(RuleContext)
  function onChange(ruleIndex: number, type: "impulse" | "response", index: number, value: boolean) {
    setRules((rules) => {
      rules = [...rules];
      if (rules[ruleIndex] instanceof SpatialRule) {
        rules[ruleIndex][type][index] = value;
      }
      return rules;
    })
  }
  return (
    <section className={styles.Rule}>
      <div className={styles.RuleImpulse}>
        {Array.from({ length: 9 }, (_, index) =>
          <EditCell key={index} onChange={(...args) => onChange(ruleIndex, "impulse", index, ...args)} className={styles.Cell} />
        )}
      </div>
      <span>&gt;</span>
      <div className={styles.RuleResponse}>
        {Array.from({ length: 9 }, (_, index) =>
          <EditCell key={index} onChange={(...args) => onChange(ruleIndex, "response", index, ...args)} className={styles.Cell} />
        )}
      </div>
    </section>
  );
}
