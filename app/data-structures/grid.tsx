export default class Grid {
  width: number;
  height: number;
  content: number[][] | null[][];
  newContent: number[][] | null[][];
  outOfBoundsValue: number;
  processOrder: "sequential" | "random"
  // Deferred - as we loop the grid we create a new grid with the changes. Each cell is reading the previous grid's state
  // Instant - as we loop the grid we apply each cell's response instantly - cells next in the iteration will be affected by the responses from previous cells
  processMode: "deferred" | "instant"

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.content = this.initializeContent();
    this.newContent = this.cloneContent(this.content); // TODO: don't initialize if we're on "instant" drawMode, but not important for now
    this.outOfBoundsValue = 1;
    this.processOrder = "sequential";
    this.processMode = "deferred";
  }

  initializeContent(): 0[][] {
    let content = [];
    for (let i: number = 0; i < this.height; i++) {
      content[i] = [] as 0[];
      for (let j: number = 0; j < this.width; j++) {
        content[i][j] = 0;
      }
    }
    return content;
  }

  getCell(x: number, y: number): number | null {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return this.outOfBoundsValue;
    }
    return this.content[y][x] ?? this.outOfBoundsValue;
  }

  setCell(x: number, y: number, value: number | null) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }
    const content = this.processMode === "deferred" ? this.newContent : this.content;
    if (content[y][x] !== undefined) {
      content[y][x] = value;
    }
  }

  commit() {
    if (this.processMode === "instant") {
      return;
    }
    this.content = this.cloneContent(this.newContent)
  }

  shuffle2D() {
    let shuffledCells = [] as [number | null, number, number][];
    for (const [y, row] of Object.entries<Array<number | null>>(this.content)) {
      for (const [x, cell] of Object.entries(row)) {
        shuffledCells.push([cell, Number(x), Number(y)]);
      }
    }
    // https://javascript.info/task/shuffle - in solution
    for (let i = shuffledCells.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [shuffledCells[i], shuffledCells[j]] = [shuffledCells[j], shuffledCells[i]];
    }

    return shuffledCells;
  }

  forEachCell(
    fn: (arg1: number | null, arg2: number, arg3: number) => void,
  ): void {
    if (this.processOrder === "random") {
      const items = this.shuffle2D()
      for (const item of items) {
        fn(item[0], item[1], item[2]);
      }
      return;
    }
    for (const [y, row] of Object.entries<Array<number | null>>(this.content)) {
      for (const [x, cell] of Object.entries(row)) {
        fn(cell, Number(x), Number(y));
      }
    }
  }

  cloneContent(contentToClone: number[][] | null[][]) {
    let cloned: number[][] | null[][] = []
    for (const [rowIndex, row] of Object.entries(contentToClone)) {
      cloned[Number(rowIndex)] = [] as number[] | null[]
      for (const [columnIndex, cell] of Object.entries<number | null>(row)) {
        cloned[Number(rowIndex)][Number(columnIndex)] = cell
      }
    }
    return cloned;
  }
}
