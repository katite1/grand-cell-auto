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
import RuleEditor from "~/components/rules/edit-rule/edit-rule";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Make ruleset" }];
}

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
          console.log(error);
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
            return <RuleEditor ruleIndex={index} key={index} />;
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
