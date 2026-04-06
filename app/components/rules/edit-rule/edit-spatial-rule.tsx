import EditCell from "~/components/partials/edit-cell/edit-cell";
import styles from "./index.module.css";
import { useContext } from "react";
import { RuleContext } from "~/contexts/rule-context";
import type { SpatialRule } from "~/data-structures/rule";

interface SpatialRuleEditorProps {
  ruleIndex: number;
}

export default function SpatialRuleEditor({
  ruleIndex,
}: SpatialRuleEditorProps) {
  const { rules, setRules } = useContext(RuleContext);
  function onChange(
    ruleIndex: number,
    type: "impulse" | "response",
    index: number,
    value: CellState,
  ) {
    setRules((rules) => {
      rules = [...rules];
      (rules[ruleIndex] as SpatialRule)[type][index] = value;
      return rules;
    });
  }

  function handleCellEdit(
    index: number,
    type: "impulse" | "response",
    ...args: [CellState]
  ) {
    onChange(ruleIndex, type, index, ...args);
  }
  const rule = rules[ruleIndex] as unknown as SpatialRule;
  return (
    <section className={styles.Rule}>
      <div className={styles.RuleImpulse}>
        {Array.from({ length: 9 }, (_, index) => (
          <EditCell
            cellValue={rule["impulse"][index]}
            key={index}
            onChange={(...args) => handleCellEdit(index, "impulse", ...args)}
            className={styles.Cell}
          />
        ))}
      </div>
      <span>&gt;</span>
      <div className={styles.RuleResponse}>
        {Array.from({ length: 9 }, (_, index) => (
          <EditCell
            cellValue={rule["response"][index]}
            key={index}
            onChange={(...args) => handleCellEdit(index, "response", ...args)}
            className={styles.Cell}
          />
        ))}
      </div>
    </section>
  );
}
