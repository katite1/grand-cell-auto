import EditCell from "~/components/partials/edit-cell/edit-cell";
import styles from "./index.module.css";
import { useContext } from "react";
import { RuleContext } from "~/contexts/rule-context";
import { SpatialRule, type Rule } from "~/data-structures/rule";

interface EditRuleProps {
  ruleIndex: number
}

export default function EditRule({ ruleIndex }: EditRuleProps) {
  const { rules, setRules } = useContext(RuleContext)
  function onChange(ruleIndex: number, type: "impulse" | "response", index: number, value: number | null) {
    setRules((rules) => {
      rules = [...rules];
      if (rules[ruleIndex] instanceof SpatialRule) {
        rules[ruleIndex][type][index] = value;
      }
      return rules;
    })
  }

  function onCellEdit(index: number, type: "impulse" | "response", ...args: [number | null]) {
    onChange(ruleIndex, type, index, ...args)
  }
  const rule = rules[ruleIndex] as unknown as SpatialRule;
  return (
    <section className={styles.Rule}>
      <div className={styles.RuleImpulse}>
        {Array.from({ length: 9 }, (_, index) =>
          <EditCell
            cellValue={rule["impulse"][index]} key={index}
            onChange={(...args) => onCellEdit(index, "impulse", ...args)} className={styles.Cell}
          />
        )}
      </div>
      <span>&gt;</span>
      <div className={styles.RuleResponse}>
        {Array.from({ length: 9 }, (_, index) =>
          <EditCell
            cellValue={rule["response"][index]} key={index}
            onChange={(...args) => onCellEdit(index, "response", ...args)} className={styles.Cell}
          />
        )}
      </div>
    </section>
  );
}
