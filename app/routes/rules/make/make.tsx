import ListRules from "~/components/rules/list-rules/list-rule";
import type { Route } from "./+types/make";
import styles from "./index.module.css";
import CellularGrid from "~/components/cellular-grid/cellular-grid";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Make ruleset" }];
}

export default function Make() {
  return (
    <section className={styles.Make}>
      <div className={styles.Rules}>
        <ListRules />
        <ListRules />
      </div>
      <CellularGrid />
    </section>
  );
}
