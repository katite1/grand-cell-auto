import ListRules from "~/components/rules/list-rules/list-rule";
import type { Route } from "./+types/make";
import styles from "./index.module.css";
import CellularGrid from "~/components/cellular-grid/cellular-grid";
import { Rule, SpatialRule } from "~/data-structures/rule";
import { useContext, createContext, useState } from "react";
import { RuleContext } from "~/contexts/rule-context";

export function meta({ }: Route.MetaArgs) {
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
  return (
    <RuleContext value={{ rules: rules, setRules: setRules }}>
      <section className={styles.Make}>
        <div className={styles.Rules}>
          <ListRules />
        </div>
        <CellularGrid />
      </section>
    </RuleContext>
  );
}
