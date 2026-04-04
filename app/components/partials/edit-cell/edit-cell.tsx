import * as React from "react";
import KSelect from "app/components/partials/select/select";
import KPopover from "app/components/partials/popover/popover";
import styles from "./index.module.css";
import { mergeProps } from "@base-ui/react";

interface EditCellProps extends React.HTMLProps<HTMLElement> {
  onChange: (value: boolean) => void;
}

export default function EditCell({ className, onChange, }: EditCellProps) {
  const [cellState, setCellState] = React.useState(null);
  function onCellStateSelected(value: any) {
    onChange(value);
    setCellState(value);
  }

  return (
    <KPopover
      label="Edit cell"
      trigger={
        <div
          style={
            {
              "--color": `var(--cell-state-${String(cellState)})`,
            } as React.CSSProperties
          }
          {...mergeProps({ className: styles.Cell }, { className: className })}
        >
          {cellState === null && <span>Ignored</span>}
        </div>
      }
    >
      <KSelect
        root={{ onValueChange: onCellStateSelected, defaultValue: "null" }}
        values={[
          { label: "null", value: null },
          { label: "false", value: false },
          { label: "true", value: true },
        ]}
      />
    </KPopover>
  );
}
