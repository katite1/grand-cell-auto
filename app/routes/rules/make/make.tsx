import type { Route } from "./+types/make";
import styles from "./index.module.css";
import CellularGrid from "~/components/cellular-grid/cellular-grid";
import {
  Rule,
  SpatialRule,
  type RuleSerialized,
  type SpatialRuleSerialized,
} from "~/data-structures/rule";
import { useContext, createContext, useState, type ChangeEvent } from "react";
import { RuleContext } from "~/contexts/rule-context";
import EditRule from "~/components/rules/edit-rule/edit-rule";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Make ruleset" }];
}

// Falling sand game
// const rules: Rule[] = [
//   new SpatialRule(
//     [null, null, null, null, true, null, null, false, null],
//     [null, null, null, null, false, null, null, true, null],
//   ),
//   new SpatialRule(
//     [null, null, null, null, true, null, false, true, null],
//     [null, null, null, null, false, null, true, null, null],
//   ),
//   new SpatialRule(
//     [null, null, null, null, true, null, null, true, false],
//     [null, null, null, null, false, null, null, null, true],
//   ),
// ]

// Free epilepsy
// const rules: Rule[] = [
//   new SpatialRule(
//     [null, false, null, false, false, false, null, false, null],
//     [null, null, null, null, true, null, null, null, null],
//   ),
//   new SpatialRule(
//     [null, true, null, true, true, true, null, true, null],
//     [null, null, null, null, false, null, null, null, null],
//   ),
// ]

// Pyramid (draw in top left a bit)
// const rules: Rule[] = [
//   new SpatialRule(
//     [null, null, null, null, false, true, null, true, null],
//     [null, null, null, null, true, null, false, false, false],
//   ),
// ]

// Pyramid (top-left too) (draw in top left a bit)
// const rules: Rule[] = [
//   new SpatialRule(
//     [null, null, null, null, false, true, null, true, null],
//     [null, null, null, null, true, null, false, false, false],
//   ),
//   new SpatialRule(
//     [null, true, null, true, false, null, null, null, null],
//     [false, false, null, null, true, null, null, null, null],
//   ),
// ]

export default function Make() {
  const [rules, setRules] = useState<Rule[]>([]);

  function newRule(): void {
    setRules((rules) => {
      return [...rules, new SpatialRule()];
    });
  }

  function saveRules(): void {
    const a = document.createElement("a");
    const serializedRules = rules.map((rule) => rule.serialized());
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(serializedRules, null, 2)], {
        type: "application/json",
      }),
    );
    a.setAttribute("download", "rules.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function loadRules(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files === null) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        try {
          const serializedRules: RuleSerialized[] = JSON.parse(reader.result);
          const newRules = serializedRules.map((rule) => {
            if (rule.type === "spatial") {
              return SpatialRule.unserialize(rule as SpatialRuleSerialized);
            }
            throw "Rule type is invalid!!";
          });
          setRules(newRules);
        } catch (error) {
          e.target.value = "";
          return;
        }
      }
    };
    reader.readAsText(e.target.files[0]);
  }

  return (
    <RuleContext value={{ rules: rules, setRules: setRules }}>
      <section className={styles.Make}>
        <div className={styles.Rules}>
          {rules.map((_, index) => {
            return <EditRule ruleIndex={index} key={index} />;
          })}
          <button onClick={newRule}>Add rule</button>
          <button onClick={saveRules}>Save rules to JSON</button>
          <div>
            <label>Load rules from JSON - </label>
            <input type="file" onChange={loadRules}></input>
          </div>
        </div>
        <CellularGrid />
      </section>
    </RuleContext>
  );
}
