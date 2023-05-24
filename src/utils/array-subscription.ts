import type { NoTerminalesType, TokensType } from "./utils";

type Events = {
  onPush: (pushedElements: Array<NoTerminalesType | TokensType>) => void;
  onPop: (deletedElement: string| undefined) => void;
};
export class ArraySubscription {
  onPush;
  onPop;
  constructor({ onPush, onPop }: Events) {
    this.onPush = onPush;
    this.onPop = onPop;
  }
}
