import * as React from "react";
import KPopover from "app/components/partials/popover/popover";
import styles from "./index.module.css";
import { mergeProps } from "@base-ui/react";
import KCheckboxGroup from "../checkbox-group/checkbox-group";
import {
  CellularGridCells,
  type Cell,
} from "~/components/cellular-grid/cellular-grid";

interface EditCellProps {
  className: string;
  onChange: (value: CellState) => void;
  cellValue: CellState;
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
        items={CellularGridCells.map((item: Cell) => {
          return { label: item.name, value: String(item.state) };
        })}
        caption={"Cell value"}
        onChange={onCellStateSelected}
      ></KCheckboxGroup>
    </KPopover>
  );
}
