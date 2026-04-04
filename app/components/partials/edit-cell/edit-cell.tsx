import * as React from "react";
import KSelect from "app/components/partials/select/select";
import KPopover from "app/components/partials/popover/popover";
import styles from "./index.module.css";
import { mergeProps } from "@base-ui/react";

interface EditCellProps extends React.HTMLProps<HTMLElement> { }

export default function EditCell({ className }: EditCellProps) {
  const [cellState, setCellState] = React.useState(0);
  function onCellStateSelected(value: any) {
    setCellState(value);
  }

  return (
    <KPopover
      label="Edit cell"
      trigger={
        <div
          style={
            {
              "--color": `var(--cell-state-${cellState})`,
            } as React.CSSProperties
          }
          {...mergeProps({ className: styles.Cell }, { className: className })}
        >
          {cellState == 0 && <span>Unaffected</span>}
        </div>
      }
    >
      <KSelect
        root={{ onValueChange: onCellStateSelected, defaultValue: "0" }}
        values={[
          { label: "0", value: 0 },
          { label: "1", value: 1 },
          { label: "2", value: 2 },
        ]}
      />
    </KPopover>
  );
}
