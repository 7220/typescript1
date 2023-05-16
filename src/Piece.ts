import { Cell, Position } from "./Board";
import { PlayerType } from "./player";

export class MoveResult {
  constructor(private killedPiaece: Piece) {}

  getKilled() {
    return this.killedPiaece;
  }
}

export interface Piece {
  ownerType: PlayerType;
  currentPosition: Position;
  move(from: Cell, to: Cell): MoveResult;
  render(): string;
}

abstract class DefaultPiece implements Piece {
  constructor(public ownerType: PlayerType, public currentPosition: Position) {}

  move(from: Cell, to: Cell): MoveResult {
    if (!this.canMove(to.position)) {
      throw new Error("can't move")
    }

    const moveResult = new MoveResult((to.getPiece() != null) ? to.getPiece() : null)
    to.put(this)
    from.put(null)
    this.currentPosition = to.position
    return moveResult
  }

  abstract canMove(position: Position): boolean
  abstract render(): 
}

export class Lion extends DefaultPiece {
  canMove(pos: Position) {
    const canMove = (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col)
      || (pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row)
      || (pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row)
      || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1)
      || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1);
    return canMove;
  }

  render(): string {
    return `<img class="piece ${this.ownerType}" src="${loinImage}" width="90%" height="90%"/>`;
  }
}

export class Elephant extends DefaultPiece {
  canMove(pos: Position) {
    return (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1)
      || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1);
  }

  render(): string {
    return `<img class="piece ${this.ownerType}" src="${elophantImage}" width="90%" height="90%"/>`;
  }
}

export class Griff extends DefaultPiece {
  canMove(pos: Position) {
    return (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col)
      || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col)
      || (pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row)
      || (pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row);
  }

  render(): string {
    return `<img class="piece ${this.ownerType}" src="${griffImage}" width="90%" height="90%"/>`;
  }
}

export class Chick extends DefaultPiece {
  canMove(pos: Position) {
    return this.currentPosition.row + ((this.ownerType == PlayerType.UPPER) ? +1 : -1) === pos.row;
  }

  render(): string {
    return `<img class="piece ${this.ownerType}" src="${chickenImage}" width="90%" height="90%"/>`;
  }
}
