import * as React from "react";
import KPopover from "app/components/partials/popover/popover";
import styles from "./index.module.css";
import { mergeProps } from "@base-ui/react";
import KCheckboxGroup from "../checkbox-group/checkbox-group";

interface EditCellProps {
  className: string;
  onChange: (value: number | null) => void;
  cellValue: number | null;
}

export default function EditCell({
  className,
  onChange,
  cellValue,
}: EditCellProps) {
  function onCellStateSelected(value: string[] | null[]) {
    // We get index 0 of value since it's a radio checkbox, for now we just take the first checked item and ignore multiselects
    if (value.length === 0) {
      value = [null];
    }
    const selection =
      typeof value[0] === "string" ? Number(value[0]) : value[0];
    onChange(selection);
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
      <KCheckboxGroup
        items={[
          { label: "black", value: "0" },
          { label: "white", value: "1" },
        ]}
        caption={"Cell value"}
        onChange={onCellStateSelected}
      ></KCheckboxGroup>
    </KPopover>
  );
}
