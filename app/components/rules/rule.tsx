export const ruleConditionVectors = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
export interface rule {
  before: boolean;
  after: boolean;
  conditions: [
    boolean | null,
    boolean | null,
    boolean | null,
    boolean | null,
    boolean | null,
    boolean | null,
    boolean | null,
    boolean | null,
  ];
}
