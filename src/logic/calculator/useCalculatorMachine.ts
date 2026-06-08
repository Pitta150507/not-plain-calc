import { useMemo, useState } from "react";
import {
  chooseOperator as chooseOperatorState,
  deleteDigit as deleteDigitState,
  equals as equalsState,
  getFormattedDisplay,
  initialCalculatorState,
  inputDecimal as inputDecimalState,
  inputDigit as inputDigitState,
  percent as percentState
} from "./machine";

export function useCalculatorMachine() {
  const [state, setState] = useState(initialCalculatorState);

  const formattedDisplay = useMemo(() => getFormattedDisplay(state), [state]);

  function clear() {
    setState(initialCalculatorState);
  }

  function inputDigit(digit: string) {
    setState((current) => inputDigitState(current, digit));
  }

  function inputDecimal() {
    setState((current) => inputDecimalState(current));
  }

  function deleteDigit() {
    setState((current) => deleteDigitState(current));
  }

  function percent() {
    setState((current) => percentState(current));
  }

  function chooseOperator(nextOperator: Parameters<typeof chooseOperatorState>[1]) {
    setState((current) => chooseOperatorState(current, nextOperator));
  }

  function equals() {
    setState((current) => equalsState(current));
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
