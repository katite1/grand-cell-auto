import { useContext } from "react";
import { RuleContext } from "~/contexts/rule-context";
import { SpatialRule, type Rule } from "~/data-structures/rule";
import SpatialRuleEditor from "./edit-spatial-rule";

interface RuleEditor {
  ruleIndex: number;
}

export default function RuleEditor({ ruleIndex }: RuleEditor) {
  const { rules } = useContext(RuleContext);
  if (rules[ruleIndex] instanceof SpatialRule) {
    return <SpatialRuleEditor ruleIndex={ruleIndex} />;
  }
}
