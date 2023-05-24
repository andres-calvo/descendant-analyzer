export const lambda = "λ" as const;
export const tokens = ["+", "-", "*", "/", "(", ")", "num", "id", "$"] as const;
export const noTerminales = ["E", "E`", "T", "T`", "F"] as const;
export type TokensType = (typeof tokens)[number];
export type NoTerminalesType = (typeof noTerminales)[number];
type TablaLL1 = {
  [token in TokensType]: Record<NoTerminalesType, Array<string>>;
};
//Donde normalmente iria lambda lo reemplazare por un array vacio
export const tablaLL1: TablaLL1 = {
  "+": { E: [], "E`": ["+", "T", "E`"], T: [], "T`": [], F: [] },
  "-": { E: [], "E`": ["-", "T", "E`"], T: [], "T`": [], F: [] },
  "*": { E: [], "E`": [], T: [], "T`": ["*", "F", "T`"], F: [] },
  "/": { E: [], "E`": [], T: [], "T`": ["/", "F", "T`"], F: [] },
  "(": { E: ["T", "E`"], "E`": [], T: ["F", "T`"], "T`": [], F: ["(", "E", ")"] },
  ")": { E: [], "E`": [], T: [], "T`": [], F: [] },
  num: { E: ["T", "E`"], "E`": [], T: ["F", "T`"], "T`": [], F: ["num"] },
  id: { E: ["T", "E`"], "E`": [], T: ["F", "T`"], "T`": [], F: ["id"] },
  $: { E: [], "E`": [], T: [], "T`": [], F: [] },
};
