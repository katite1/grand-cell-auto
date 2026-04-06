import { createContext } from "react";
import type { Rule } from "~/data-structures/rule";

export const RuleContext = createContext<{
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
}>({ rules: [], setRules: () => {} });
