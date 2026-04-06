import type Grid from "./grid";

export abstract class Rule {
  serialized(): RuleSerialized {
    throw "Serialize method not implemented for rule!";
  }
  static unserialize(rule: RuleSerialized): Rule {
    throw "Serialize method not implemented for rule!";
  }
  applies(grid: Grid, cell: CellState, x: number, y: number): boolean {
    throw "Applies method not implemented for rule!";
  }
  apply(grid: Grid, cell: CellState, x: number, y: number): void {
    throw "Apply method not implemented for rule!";
  }
}
export interface RuleSerialized {
  type: string;
}

type spatialRuleCondition = [
  CellState,
  CellState,
  CellState,
  CellState,
  number,
  CellState,
  CellState,
  CellState,
  CellState,
];
export interface SpatialRuleSerialized extends RuleSerialized {
  type: "spatial";
  impulse: spatialRuleCondition;
  response: spatialRuleCondition;
}

export class SpatialRule extends Rule {
  impulse: spatialRuleCondition;
  response: spatialRuleCondition;
  vectors: [number, number][] = [];
  constructor(impulse?: spatialRuleCondition, response?: spatialRuleCondition) {
    super();
    this.impulse = impulse
      ? impulse
      : [null, null, null, null, 0, null, null, null, null];
    this.response = response
      ? response
      : [null, null, null, null, 0, null, null, null, null];
    this.vectors = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [0, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];
  }
  impulseCenter(): number {
    return this.impulse[4];
  }
  responseCenter(): number {
    return this.response[4];
  }
  serialized(): SpatialRuleSerialized {
    return {
      type: "spatial",
      impulse: this.impulse,
      response: this.response,
    };
  }
  static unserialize(rule: SpatialRuleSerialized): SpatialRule {
    return new SpatialRule(rule.impulse, rule.response);
  }
  applies(grid: Grid, cell: CellState, x: number, y: number): boolean {
    if (cell !== this.impulseCenter()) {
      return false;
    }
    let conditionIndex = 0;
    for (const condition of this.impulse) {
      if (condition == null) {
        conditionIndex++;
        continue;
      }
      const cell = grid.getCell(
        x + this.vectors[conditionIndex][0],
        y + this.vectors[conditionIndex][1],
      );
      if (cell !== condition) {
        return false;
      }
      conditionIndex++;
    }
    return true;
  }
  apply(grid: Grid, x: number, y: number): void {
    let conditionIndex = 0;
    for (const condition of this.response) {
      if (condition == null) {
        conditionIndex++;
        continue;
      }
      grid.setCell(
        x + this.vectors[conditionIndex][0],
        y + this.vectors[conditionIndex][1],
        condition,
      );
      conditionIndex++;
    }
  }
}

// export class NeighbourRule extends Rule {
//   cellState: number | boolean;
//   comparison: ">" | "==" | "<";
//   count: number;
//   neighbourType: number | boolean;
//   response: number | boolean;
//   neighbourVectors: [number, number][] = [];
//   constructor() {
//     super();
//     this.neighbourVectors = [
//       [-1, -1],
//       [0, -1],
//       [1, -1],
//       [-1, 0],
//       [1, 0],
//       [-1, 1],
//       [0, 1],
//       [1, 1],
//     ];
//   }
//   serialized(): SpatialRuleSerialized {
//     return {
//       type: "spatial",
//     };
//   }
//   static unserialize(rule: SpatialRuleSerialized): SpatialRule {
//     return new SpatialRule(rule.impulse, rule.response);
//   }
//   applies(grid: Grid, cell: CellState, x: number, y: number): boolean {
//     if (cell !== this.impulseCenter()) {
//       return false;
//     }
//     let conditionIndex = 0;
//     for (const condition of this.impulse) {
//       if (condition == null) {
//         conditionIndex++;
//         continue;
//       }
//       const cell = grid.getCell(
//         x + this.vectors[conditionIndex][0],
//         y + this.vectors[conditionIndex][1],
//       );
//       if (cell !== condition) {
//         return false;
//       }
//       conditionIndex++;
//     }
//     return true;
//   }
//   apply(grid: Grid, cell: CellState, x: number, y: number): void {
//     let conditionIndex = 0;
//     for (const condition of this.response) {
//       if (condition == null) {
//         conditionIndex++;
//         continue;
//       }
//       grid.setCell(
//         x + this.vectors[conditionIndex][0],
//         y + this.vectors[conditionIndex][1],
//         condition,
//       );
//       conditionIndex++;
//     }
//   }
// }
