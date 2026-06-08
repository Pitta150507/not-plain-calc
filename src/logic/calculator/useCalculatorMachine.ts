import { useMemo, useState } from "react";
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

type CalculatorState = {
  display: string;
  expression: string;
  storedValue: number | null;
  operator: Operator | null;
  waitingForNextInput: boolean;
};

const initialState: CalculatorState = {
  display: "0",
  expression: "Ready",
  storedValue: null,
  operator: null,
  waitingForNextInput: false
};

export function useCalculatorMachine() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const formattedDisplay = useMemo(() => {
    if (state.display === ERROR_DISPLAY || state.display.includes("e")) {
      return state.display;
    }

    return state.display;
  }, [state.display]);

  function clear() {
    setState(initialState);
  }

  function inputDigit(digit: string) {
    setState((current) => {
      if (current.display === ERROR_DISPLAY || current.waitingForNextInput) {
        return {
          ...current,
          display: digit,
          waitingForNextInput: false
        };
      }

      if (countDigits(current.display) >= MAX_INPUT_DIGITS) return current;
      if (current.display === "0") {
        return {
          ...current,
          display: digit
        };
      }

      return {
        ...current,
        display: current.display + digit
      };
    });
  }

  function inputDecimal() {
    setState((current) => {
      if (current.display === ERROR_DISPLAY || current.waitingForNextInput) {
        return {
          ...current,
          display: "0.",
          waitingForNextInput: false
        };
      }

      if (current.display.includes(".")) return current;

      return {
        ...current,
        display: `${current.display}.`
      };
    });
  }

  function deleteDigit() {
    setState((current) => {
      if (current.display === ERROR_DISPLAY || current.waitingForNextInput) {
        return {
          ...current,
          display: "0",
          waitingForNextInput: false
        };
      }

      if (current.display.length <= 1) {
        return {
          ...current,
          display: "0"
        };
      }

      if (current.display.length === 2 && current.display.startsWith("-")) {
        return {
          ...current,
          display: "0"
        };
      }

      return {
        ...current,
        display: current.display.slice(0, -1)
      };
    });
  }

  function percent() {
    setState((current) => {
      const nextValue = parseDisplay(current.display) / 100;

      return {
        ...current,
        display: formatResult(nextValue),
        waitingForNextInput: false
      };
    });
  }

  function chooseOperator(nextOperator: Operator) {
    setState((current) => {
      const currentValue = parseDisplay(current.display);

      if (current.display === ERROR_DISPLAY) {
        return {
          ...initialState,
          operator: nextOperator
        };
      }

      if (current.operator && current.storedValue !== null && !current.waitingForNextInput) {
        const result = applyOperator(current.storedValue, currentValue, current.operator);

        return {
          display: formatResult(result),
          expression: `${formatExpressionValue(result)} ${getOperatorSymbol(nextOperator)}`,
          storedValue: result,
          operator: nextOperator,
          waitingForNextInput: true
        };
      }

      return {
        ...current,
        expression: `${formatExpressionValue(currentValue)} ${getOperatorSymbol(nextOperator)}`,
        storedValue: currentValue,
        operator: nextOperator,
        waitingForNextInput: true
      };
    });
  }

  function equals() {
    setState((current) => {
      if (!current.operator || current.storedValue === null) return current;

      const rightValue = parseDisplay(current.display);
      const result = applyOperator(current.storedValue, rightValue, current.operator);

      return {
        display: formatResult(result),
        expression: `${formatExpressionValue(current.storedValue)} ${getOperatorSymbol(
          current.operator
        )} ${formatExpressionValue(rightValue)}`,
        storedValue: null,
        operator: null,
        waitingForNextInput: true
      };
    });
  }

  return {
    display: formattedDisplay,
    expression: state.expression,
    activeOperator: state.operator,
    clear,
    deleteDigit,
    equals,
    inputDecimal,
    inputDigit,
    percent,
    chooseOperator
  };
}
