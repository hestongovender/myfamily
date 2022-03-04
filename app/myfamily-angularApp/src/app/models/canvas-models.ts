export class PositionModel {
    x: number;
    y: number;
}

export enum BasicShapeEnum {
    circle = 0,
    rectangle,
    square,
    line,
}

export class CanvasShapeModel {
    shape: BasicShapeEnum;
    width: number;
    height: number;

    colour: string;

    startPosition: PositionModel;
    midPosition: PositionModel;
    endPosition: PositionModel;

    topLeft: PositionModel;
    topCenter: PositionModel;
    topRight: PositionModel;

    midLeft: PositionModel;
    midCenter: PositionModel;
    midRight: PositionModel;

    bottomLeft: PositionModel;
    bottomCenter: PositionModel;
    bottomRight: PositionModel;

    labelPosition: PositionModel;
}
