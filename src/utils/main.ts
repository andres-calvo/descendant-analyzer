import type { ArraySubscription } from "./array-subscription";
import { Pila } from "./pila";
import { tablaLL1, TokensType, NoTerminalesType } from "./utils";

export function analizeString(
  inputString: string,
  arraySubscription: ArraySubscription
) {
  const tokens = inputString.split(" ") as Array<TokensType>;
  const myPila = new Pila(arraySubscription);
  myPila.log();
  console.log(inputString);
  console.log(tokens);
  for (const token of tokens) {
    let shouldLoop = true;
    while (shouldLoop) {
      let lastElement = myPila.getTopItem();
      const substitution = tablaLL1[token][
        lastElement as NoTerminalesType
      ] as Array<NoTerminalesType | TokensType>;
      myPila.pop();
      if (Array.isArray(substitution)) {
        myPila.push(substitution.reverse());
      }
      myPila.log();
      lastElement = myPila.getTopItem() as TokensType;
      if (tokens.includes(lastElement)) {
        myPila.pop();
        inputString = inputString.replace(token, "");
        //Go to next token
        shouldLoop = false;
      }
      //This prevents infinite loops
      if (myPila.length == 0) {
        shouldLoop = false;
      }
    }
  }
}
