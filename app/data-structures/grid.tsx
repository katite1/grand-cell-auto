export default class Grid {
  width: number;
  height: number;
  content: boolean[][] | null[][];
  newContent: boolean[][] | null[][];
  outOfBoundsValue: boolean;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.content = this.initializeContent();
    this.newContent = this.cloneContent(this.content);
    this.outOfBoundsValue = true;
  }

  initializeContent(): false[][] {
    let content = [];
    for (let i: number = 0; i < this.height; i++) {
      content[i] = [] as false[];
      for (let j: number = 0; j < this.width; j++) {
        content[i][j] = false;
      }
    }
    return content;
  }

  getCell(x: number, y: number): boolean | null {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return this.outOfBoundsValue;
    }
    return this.content[y][x] ?? this.outOfBoundsValue;
  }

  setCell(x: number, y: number, value: boolean | null) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }
    if (this.newContent[y][x] !== undefined) {
      this.newContent[y][x] = value;
    }
  }

  commit() {
    this.content = this.cloneContent(this.newContent)
  }

  forEachCell(
    fn: (arg1: boolean | null, arg2: number, arg3: number) => void,
  ): void {
    for (const [y, row] of Object.entries<Array<boolean | null>>(this.content)) {
      for (const [x, cell] of Object.entries(row)) {
        fn(cell, Number(x), Number(y));
      }
    }
  }

  cloneContent(contentToClone: boolean[][] | null[][]) {
    let cloned: boolean[][] | null[][] = []
    for (const [rowIndex, row] of Object.entries(contentToClone)) {
      cloned[Number(rowIndex)] = [] as boolean[] | null[]
      for (const [columnIndex, cell] of Object.entries<boolean | null>(row)) {
        cloned[Number(rowIndex)][Number(columnIndex)] = cell
      }
    }
    return cloned;
  }
}
