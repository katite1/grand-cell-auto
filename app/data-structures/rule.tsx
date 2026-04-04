export abstract class Rule { }

type spatialRuleCondition =
    [
        boolean | null,
        boolean | null,
        boolean | null,
        boolean | null,
        boolean,
        boolean | null,
        boolean | null,
        boolean | null,
        boolean | null,
    ]

export class SpatialRule extends Rule {
    impulse: spatialRuleCondition;
    response: spatialRuleCondition;
    vectors: [number, number][] = [];
    constructor(impulse: spatialRuleCondition, response: spatialRuleCondition) {
        super();
        this.impulse = impulse;
        this.response = response;
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
    impulseCenter(): boolean {
        return this.impulse[4];
    }
    responseCenter(): boolean {
        return this.response[4];
    }
}