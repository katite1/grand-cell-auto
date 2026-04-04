import { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Grid from "~/data-structures/grid";
import { SpatialRule, type Rule } from "~/data-structures/rule";
import { RuleContext } from "~/contexts/rule-context";


interface CellularGridProps {
  rules: Rule[];
}

export default function CellularGrid() {
  const { rules } = useContext(RuleContext)
  const grid = useRef(new Grid(100, 100))
  const [gridRerender, setGridRerender] = useState(false)

  const width = 1000;
  const height = 1000;

  function ruleApplies(
    cell: boolean | null,
    x: number,
    y: number,
    rule: Rule,
  ): boolean {
    if (rule instanceof SpatialRule) {
      if (cell !== rule.impulseCenter()) {
        return false;
      }
      let conditionIndex = 0;
      for (const condition of rule.impulse) {
        if (condition == null) {
          conditionIndex++;
          continue;
        }
        const cell = grid.current.getCell(
          x + rule.vectors[conditionIndex][0],
          y + rule.vectors[conditionIndex][1],
        )
        if (
          cell !== condition
        ) {
          return false;
        }
        conditionIndex++;
      }
      return true;
    }
    return true;
  }

  function doStep(): void {
    let gridChanged: boolean = false;
    grid.current.forEachCell((cell, x, y) => {
      for (const rule of rules) {
        if (ruleApplies(cell, x, y, rule)) {
          if (rule instanceof SpatialRule) {
            let conditionIndex = 0;
            for (const condition of rule.response) {
              if (condition == null) {
                conditionIndex++;
                continue;
              }
              grid.current.setCell(
                x + rule.vectors[conditionIndex][0],
                y + rule.vectors[conditionIndex][1],
                condition
              )
              gridChanged = true;
              conditionIndex++;
            }
          }
        }
      }
    });
    if (gridChanged) {
      grid.current.commit();
      setGridRerender((v) => !v);
    }
  }
  useEffect(() => {
    var c = document.getElementById("myCanvas") as HTMLCanvasElement;
    var ctx = c.getContext("2d");
    if (ctx === null) {
      return;
    }
    const cellHeight = Math.ceil(height / grid.current.content.length);
    const cellWidth = Math.ceil(width / grid.current.content[0].length);
    for (const [rowIndex, row] of Object.entries(grid.current.content)) {
      for (const [columnIndex, cell] of Object.entries(row)) {
        ctx.fillStyle = cell === true ? "white" : "black";
        ctx.fillRect(
          Number(columnIndex) * cellWidth,
          Number(rowIndex) * cellHeight,
          cellWidth,
          cellHeight,
        );
      }
    }
    ctx.stroke();

    const stepInterval = setInterval(() => {  //assign interval to a variable to clear it.
      doStep()
    }, 10)

    return () => clearInterval(stepInterval); //This is important
  }, [gridRerender]);

  function getMousePosition(canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement>) {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / rect.width;
    let y = (event.clientY - rect.top) / rect.height;
    return { x: x, y: y };
  }
  function onClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const { x, y } = getMousePosition(e.target as HTMLCanvasElement, e);
    grid.current.setCell(
      Math.round(x * grid.current.width),
      Math.round(y * grid.current.height),
      true
    )
    grid.current.commit();
    setGridRerender((v) => !v);
  }

  return (
    <div className={styles.CellularGrid}>
      <button onClick={doStep}>doStep</button>
      <canvas
        className={styles.Canvas}
        id="myCanvas"
        width={String(width)}
        height={String(height)}
        style={{ border: "1px solid #d3d3d3" }}
        onMouseMove={onClick}
      >
      </canvas>
    </div>
  );
}
