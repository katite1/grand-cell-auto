export abstract class Rule { }

type spatialRuleCondition =
    [
        number | null,
        number | null,
        number | null,
        number | null,
        number,
        number | null,
        number | null,
        number | null,
        number | null,
    ]

export class SpatialRule extends Rule {
    impulse: spatialRuleCondition;
    response: spatialRuleCondition;
    vectors: [number, number][] = [];
    constructor(impulse?: spatialRuleCondition, response?: spatialRuleCondition) {
        super();
        this.impulse = impulse ? impulse : [null, null, null, null, 0, null, null, null, null];
        this.response = response ? response : [null, null, null, null, 0, null, null, null, null];
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
}