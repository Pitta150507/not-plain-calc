import { Operator } from "./types";

export const MAX_INPUT_DIGITS = 10;
export const ERROR_DISPLAY = "Undefined";

const operatorSymbols: Record<Operator, string> = {
  add: "+",
  subtract: "-",
  multiply: "×",
  divide: "÷"
};

export function getOperatorSymbol(operator: Operator) {
  return operatorSymbols[operator];
}

export function parseDisplay(display: string) {
  if (display === ERROR_DISPLAY) return Number.NaN;
  return Number(display);
}

export function countDigits(display: string) {
  return display.replace("-", "").replace(".", "").length;
}

export function formatResult(value: number) {
  if (!Number.isFinite(value)) return ERROR_DISPLAY;

  const normalized = Object.is(value, -0) ? 0 : value;
  const absoluteValue = Math.abs(normalized);

  if (absoluteValue !== 0 && (absoluteValue < 0.000001 || absoluteValue >= 10000000000)) {
    return normalized.toExponential(5).replace(/\.?0+e/, "e");
  }

  const precise = normalized.toPrecision(MAX_INPUT_DIGITS);
  const cleaned = precise.includes("e")
    ? precise.replace(/\.?0+e/, "e")
    : precise.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");

  return cleaned;
}

export function formatExpressionValue(value: number) {
  const formatted = formatResult(value);
  if (formatted === ERROR_DISPLAY) return formatted;

  return Number(formatted).toLocaleString("en-US", {
    maximumSignificantDigits: MAX_INPUT_DIGITS
  });
}
