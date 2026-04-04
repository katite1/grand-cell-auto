import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { ruleConditionVectors, type rule } from "../rules/rule";
import Grid from "~/data-structures/grid";

const rules: rule[] = [
  { before: false, after: true, conditions: [false, false, false, false, false, null, true, null] },
  { before: true, after: false, conditions: [true, true, true, true, true, true, true, true] }
]
// const rules: rule[] = [
//   { before: false, after: true, conditions: [null, null, null, null, null, false, true, null] },
// ]

export default function CellularGrid() {
  const grid = useRef(new Grid(10, 10))
  const [gridRerender, setGridRerender] = useState(false)

  const width = 1000;
  const height = 1000;

  function ruleApplies(
    cell: boolean | null,
    x: number,
    y: number,
    rule: rule,
  ): boolean {
    if (cell !== rule.before) {
      return false;
    }
    let conditionIndex = 0;
    for (const condition of rule.conditions) {
      if (condition == null) {
        conditionIndex++;
        continue;
      }
      const cell = grid.current.getCell(
        x + ruleConditionVectors[conditionIndex][0],
        y + ruleConditionVectors[conditionIndex][1],
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

  function doStep(): void {
    let gridChanged: boolean = false;
    grid.current.forEachCell((cell, x, y) => {
      for (const rule of rules) {
        if (ruleApplies(cell, x, y, rule)) {
          grid.current.setCell(x, y, rule.after);
          gridChanged = true;
        }
      }
    });
    if (gridChanged) {
      grid.current.commit();
      setGridRerender((v) => !v);
    }
  }
  console.log("render grid");
  console.log(grid.current.content);
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
  }, [gridRerender]);

  return (
    <div className={styles.CellularGrid}>
      <button onClick={doStep}>doStep</button>
      <canvas
        className={styles.Canvas}
        id="myCanvas"
        width={String(width)}
        height={String(height)}
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
}
