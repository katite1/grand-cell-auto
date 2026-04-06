import { useContext } from "react";
import { RuleContext } from "~/contexts/rule-context";
import { SpatialRule, type Rule } from "~/data-structures/rule";
import SpatialRuleEditor from "./edit-spatial-rule";

interface RuleEditor {
  ruleIndex: number;
}

export default function RuleEditor({ ruleIndex }: RuleEditor) {
  const { rules, setRules } = useContext(RuleContext);
  console.log(rules);
  function handleDelete() {
    rules.splice(ruleIndex, 1);
    setRules([...rules]);
  }
  function handleReorder(direction: "up" | "down") {
    const vector = direction === "up" ? -1 : 1;
    const itemToReorder = rules.splice(ruleIndex, 1)[0];
    rules.splice(ruleIndex + vector, 0, itemToReorder);
    setRules([...rules]);
  }
  return (
    <div>
      {rules[ruleIndex] instanceof SpatialRule && (
        <SpatialRuleEditor ruleIndex={ruleIndex} />
      )}
      <button onClick={handleDelete}>Delete</button>
      <button disabled={ruleIndex === 0} onClick={() => handleReorder("up")}>
        ↑
      </button>
      <button
        disabled={ruleIndex === rules.length - 1}
        onClick={() => handleReorder("down")}
      >
        ↓
      </button>
    </div>
  );
}
