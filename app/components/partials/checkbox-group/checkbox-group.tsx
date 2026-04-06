"use client";
import * as React from "react";
import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import styles from "./index.module.css";
import type { BaseUIEvent } from "@base-ui/react";

interface KCheckboxGroupItem {
  label: string;
  value: string;
}
interface KCheckboxGroupProps {
  items: KCheckboxGroupItem[];
  caption: string;
  onChange: (value: string[]) => void;
}
export default function KCheckboxGroup({
  items,
  caption,
  onChange,
}: KCheckboxGroupProps) {
  const id = React.useId();
  function onItemChecked(value: string[]) {
    onChange(value);
  }
  return (
    <CheckboxGroup
      defaultValue={[]}
      onValueChange={onItemChecked}
      aria-labelledby={id}
      className={styles.CheckboxGroup}
    >
      <div className={styles.Caption} id={id}>
        {caption}
      </div>

      {items.map((item, index) => {
        return (
          <label key={index} className={styles.Item}>
            <Checkbox.Root
              name={item.label}
              value={item.value}
              className={styles.Checkbox}
            >
              <Checkbox.Indicator className={styles.Indicator}>
                <CheckIcon className={styles.Icon} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            {item.label}
          </label>
        );
      })}
    </CheckboxGroup>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
