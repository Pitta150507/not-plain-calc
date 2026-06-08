import { Operator } from "./types";

export function applyOperator(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "add":
      return left + right;
    case "subtract":
      return left - right;
    case "multiply":
      return left * right;
    case "divide":
      return right === 0 ? Number.NaN : left / right;
  }
}
