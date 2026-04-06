import { useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "./index.module.css";
import Grid from "~/data-structures/grid";
import { SpatialRule, type Rule } from "~/data-structures/rule";
import { RuleContext } from "~/contexts/rule-context";


export default function CellularGrid() {
  const { rules } = useContext(RuleContext)
  const grid = useRef(new Grid(30, 30))
  const [gridRerender, setGridRerender] = useState(false)
  const [play, setPlay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(50);
  const [brush, setBrush] = useState(1);
  const mouseDragging = useRef(false);


  const width = 1000;
  const height = 1000;
  const cellHeight = Math.ceil(height / grid.current.content.length);
  const cellWidth = Math.ceil(width / grid.current.content[0].length);

  function ruleApplies(
    cell: number | null,
    x: number,
    y: number,
    rule: Rule,
  ): boolean {
    return rule.applies(grid.current, cell, x, y);
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
    for (const [rowIndex, row] of Object.entries(grid.current.content)) {
      for (const [columnIndex, cell] of Object.entries(row)) {
        ctx.fillStyle = cell === 1 ? "white" : "black";
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

  useEffect(() => {
    if (play === true) {
      const stepInterval = setInterval(() => {
        doStep()
      }, playbackSpeed)

      return () => clearInterval(stepInterval);
    }
  }, [play, playbackSpeed])

  function getMousePosition(canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement>) {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / rect.width;
    let y = (event.clientY - rect.top) / rect.height;
    return { x: x, y: y };
  }
  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (mouseDragging.current === false) {
      return;
    }
    const { x, y } = getMousePosition(e.target as HTMLCanvasElement, e);
    grid.current.setCell(
      Math.round(x * grid.current.width),
      Math.round(y * grid.current.height),
      brush
    )
    grid.current.commit();
    setGridRerender((v) => !v);
  }

  function togglePlay() {
    setPlay((v) => !v);
  }

  function clearField() {
    grid.current.content = grid.current.initializeContent();
    grid.current.newContent = grid.current.initializeContent();
    setGridRerender((v) => !v);
  }

  function handlePlaybackSpeedChanged(e: ChangeEvent<HTMLInputElement>) {
    setPlaybackSpeed(Number(e.target.value))
  }
  function handleProcessOrderChanged(e: ChangeEvent<HTMLSelectElement>) {
    grid.current.processOrder = e.target.value as "sequential" | "random";
  }
  function handleProcessModeChanged(e: ChangeEvent<HTMLSelectElement>) {
    grid.current.processMode = e.target.value as "deferred" | "instant";
  }
  function handleBrushChanged(e: ChangeEvent<HTMLSelectElement>) {
    setBrush(Number(e.target.value))
  }

  return (
    <div className={styles.CellularGrid}>
      <button onClick={doStep}>doStep</button>
      <button onClick={togglePlay}>Play {play === true ? "on" : "off"}</button>
      <button onClick={clearField}>Clear</button>
      <input onChange={handlePlaybackSpeedChanged} type="range" min="10" max="200" value={playbackSpeed}
      />
      <select name="processOrder" onChange={handleProcessOrderChanged}>
        <option defaultChecked value="sequential">Sequential</option>
        <option value="random">Random</option>
      </select>
      <select name="processMode" onChange={handleProcessModeChanged}>
        <option defaultChecked value="deferred">Deferred</option>
        <option value="instant">Instant</option>
      </select>
      <select defaultValue="1" name="brush" onChange={handleBrushChanged}>
        <option value="0">0</option>
        <option value="1">1</option>
      </select>
      <canvas
        className={styles.Canvas}
        id="myCanvas"
        width={String(width)}
        height={String(height)}
        onMouseMove={onMouseMove}
        onMouseDown={() => mouseDragging.current = true}
        onMouseUp={() => mouseDragging.current = false}
      >
      </canvas>
    </div>
  );
}
