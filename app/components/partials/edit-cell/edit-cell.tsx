import * as React from "react";
import KPopover from "app/components/partials/popover/popover";
import styles from "./index.module.css";
import { mergeProps } from "@base-ui/react";
import KCheckboxGroup from "../checkbox-group/checkbox-group";

interface EditCellProps {
  className: string;
  onChange: (value: number) => void;
  cellValue: number | null;
}

export default function EditCell({ className, onChange, cellValue }: EditCellProps) {
  function onCellStateSelected(value: string[] | null[]) {
    if (value.length === 0) {
      value = [null];
    }
    onChange(Number(value[0]));
  }

  return (
    <KPopover
      label="Edit cell"
      trigger={
        <div
          style={
            {
              "--color": `var(--cell-state-${String(cellValue)})`,
            } as React.CSSProperties
          }
          {...mergeProps({ className: styles.Cell }, { className: className })}
        >
          {cellValue === null && <span>Ignored</span>}
        </div>
      }
    >
      <KCheckboxGroup items={[
        { label: "false", value: "0" },
        { label: "true", value: "1" },
      ]} caption={"Cell value"} onChange={onCellStateSelected}></KCheckboxGroup>
    </KPopover>
  );
}
