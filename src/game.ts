import { Board, DeadZone } from "./Board";
import { Player, PlayerType } from "./player";

export class Game {
  readonly board = new Board();
  readonly upperDeadZone = new DeadZone("upper");
  readonly lowerDeadZone = new DeadZone("lower");

  readonly upperPlayer = new Player(PlayerType.UPPER);
  readonly lowerPlayer = new Player(PlayerType.LOWER);

  constructor() {
    const boardContainer = document.querySelector(".board-container");
    boardContainer?.firstChild?.remove();
    boardContainer?.appendChild(this.board._el);
  }
}
