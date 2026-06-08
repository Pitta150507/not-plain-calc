import { applyOperator } from "./calculate";
import {
  ERROR_DISPLAY,
  MAX_INPUT_DIGITS,
  countDigits,
  formatExpressionValue,
  formatResult,
  getOperatorSymbol,
  parseDisplay
} from "./format";
import { Operator } from "./types";

export type CalculatorState = {
  display: string;
  expression: string;
  storedValue: number | null;
  operator: Operator | null;
  waitingForNextInput: boolean;
};

export const initialCalculatorState: CalculatorState = {
  display: "0",
  expression: "Ready",
  storedValue: null,
  operator: null,
  waitingForNextInput: false
};

export function getFormattedDisplay(state: CalculatorState) {
  if (state.display === ERROR_DISPLAY || state.display.includes("e")) {
    return state.display;
  }

  return state.display;
}

export function clear(): CalculatorState {
  return initialCalculatorState;
}

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (state.display === ERROR_DISPLAY || state.waitingForNextInput) {
    return {
      ...state,
      display: digit,
      waitingForNextInput: false
    };
  }

  if (countDigits(state.display) >= MAX_INPUT_DIGITS) return state;
  if (state.display === "0") {
    return {
      ...state,
      display: digit
    };
  }

  return {
    ...state,
    display: state.display + digit
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.display === ERROR_DISPLAY || state.waitingForNextInput) {
    return {
      ...state,
      display: "0.",
      waitingForNextInput: false
    };
  }

  if (state.display.includes(".")) return state;

  return {
    ...state,
    display: `${state.display}.`
  };
}

export function deleteDigit(state: CalculatorState): CalculatorState {
  if (state.display === ERROR_DISPLAY || state.waitingForNextInput) {
    return {
      ...state,
      display: "0",
      waitingForNextInput: false
    };
  }

  if (state.display.length <= 1) {
    return {
      ...state,
      display: "0"
    };
  }

  if (state.display.length === 2 && state.display.startsWith("-")) {
    return {
      ...state,
      display: "0"
    };
  }

  return {
    ...state,
    display: state.display.slice(0, -1)
  };
}

export function percent(state: CalculatorState): CalculatorState {
  const nextValue = parseDisplay(state.display) / 100;

  return {
    ...state,
    display: formatResult(nextValue),
    waitingForNextInput: false
  };
}

export function chooseOperator(state: CalculatorState, nextOperator: Operator): CalculatorState {
  const currentValue = parseDisplay(state.display);

  if (state.display === ERROR_DISPLAY) {
    return {
      ...initialCalculatorState,
      operator: nextOperator
    };
  }

  if (state.operator && state.storedValue !== null && !state.waitingForNextInput) {
    const result = applyOperator(state.storedValue, currentValue, state.operator);

    return {
      display: formatResult(result),
      expression: `${formatExpressionValue(result)} ${getOperatorSymbol(nextOperator)}`,
      storedValue: result,
      operator: nextOperator,
      waitingForNextInput: true
    };
  }

  return {
    ...state,
    expression: `${formatExpressionValue(currentValue)} ${getOperatorSymbol(nextOperator)}`,
    storedValue: currentValue,
    operator: nextOperator,
    waitingForNextInput: true
  };
}

export function equals(state: CalculatorState): CalculatorState {
  if (!state.operator || state.storedValue === null) return state;

  const rightValue = parseDisplay(state.display);
  const result = applyOperator(state.storedValue, rightValue, state.operator);

  return {
    display: formatResult(result),
    expression: `${formatExpressionValue(state.storedValue)} ${getOperatorSymbol(state.operator)} ${formatExpressionValue(rightValue)}`,
    storedValue: null,
    operator: null,
    waitingForNextInput: true
  };
}
