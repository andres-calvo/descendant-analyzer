import type { ArraySubscription } from "./array-subscription";
import type { NoTerminalesType, TokensType, tokens } from "./utils";

export class Pila {
  readonly items: Array<NoTerminalesType | TokensType> = ["$", "E"];
  readonly arraySubscription;
  constructor(arraySubscription: ArraySubscription | null) {
    this.items = ["$", "E"];
    this.arraySubscription = arraySubscription;
  }
  push(newItems: typeof this.items) {
    this.items.push(...newItems);
    this.arraySubscription?.onPush(newItems);
  }
  pop() {
    const elementToDelete = this.items.pop();
    this.arraySubscription?.onPop(elementToDelete);

    return elementToDelete;
  }
  getTopItem() {
    return this.items[this.items.length - 1] as NoTerminalesType | TokensType;
  }
  get length() {
    return this.items.length;
  }
  log() {
    console.log(this.items);
  }
}
