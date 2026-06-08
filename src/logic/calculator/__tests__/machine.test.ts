import { describe, expect, it } from "vitest";
import { applyOperator } from "../calculate";
import { ERROR_DISPLAY, countDigits, formatExpressionValue, formatResult, parseDisplay } from "../format";
import {
  CalculatorState,
  chooseOperator,
  clear,
  deleteDigit,
  equals,
  initialCalculatorState,
  inputDecimal,
  inputDigit,
  percent
} from "../machine";

function enterDigits(state: CalculatorState, digits: string) {
  return digits.split("").reduce((current, digit) => inputDigit(current, digit), state);
}

describe("calculator arithmetic", () => {
  it("applies the four standard operators", () => {
    expect(applyOperator(9, 3, "add")).toBe(12);
    expect(applyOperator(9, 3, "subtract")).toBe(6);
    expect(applyOperator(9, 3, "multiply")).toBe(27);
    expect(applyOperator(9, 3, "divide")).toBe(3);
  });

  it("returns an undefined display for divide by zero", () => {
    const dividedByZero = applyOperator(8, 0, "divide");

    expect(Number.isNaN(dividedByZero)).toBe(true);
    expect(formatResult(dividedByZero)).toBe(ERROR_DISPLAY);
  });
});

describe("calculator formatting", () => {
  it("normalizes rounded, negative zero, undefined, and exponential results", () => {
    expect(formatResult(1 / 3)).toBe("0.3333333333");
    expect(formatResult(-0)).toBe("0");
    expect(formatResult(Number.NaN)).toBe(ERROR_DISPLAY);
    expect(formatResult(10000000000)).toBe("1e+10");
    expect(formatResult(0.0000001)).toBe("1e-7");
  });

  it("parses and formats expression values for readable context", () => {
    expect(parseDisplay("12.5")).toBe(12.5);
    expect(countDigits("-12.50")).toBe(4);
    expect(formatExpressionValue(1234567)).toBe("1,234,567");
  });
});

describe("calculator state machine", () => {
  it("enters digits, replaces leading zero, and caps input digits", () => {
    const state = enterDigits(initialCalculatorState, "012345678901");

    expect(state.display).toBe("1234567890");
  });

  it("handles decimal input without duplicating decimal points", () => {
    let state = inputDigit(initialCalculatorState, "4");
    state = inputDecimal(state);
    state = inputDecimal(state);
    state = inputDigit(state, "5");

    expect(state.display).toBe("4.5");
  });

  it("deletes digits and resets single-character values to zero", () => {
    let state = enterDigits(initialCalculatorState, "123");
    state = deleteDigit(state);
    state = deleteDigit(state);
    state = deleteDigit(state);

    expect(state.display).toBe("0");
  });

  it("clears display, expression, stored value, and active operator", () => {
    let state = enterDigits(initialCalculatorState, "12");
    state = chooseOperator(state, "add");
    state = enterDigits(state, "3");

    expect(clear()).toEqual(initialCalculatorState);
  });

  it("converts the current display to a percent", () => {
    const state = percent(enterDigits(initialCalculatorState, "25"));

    expect(state.display).toBe("0.25");
  });

  it("resolves a standard operation and preserves expression context", () => {
    let state = enterDigits(initialCalculatorState, "9");
    state = chooseOperator(state, "multiply");
    state = enterDigits(state, "9");
    state = equals(state);

    expect(state.display).toBe("81");
    expect(state.expression).toBe("9 × 9");
    expect(state.operator).toBeNull();
    expect(state.waitingForNextInput).toBe(true);
  });

  it("resolves subtraction through the state machine", () => {
    let state = enterDigits(initialCalculatorState, "9");
    state = chooseOperator(state, "subtract");
    state = enterDigits(state, "4");
    state = equals(state);

    expect(state.display).toBe("5");
    expect(state.expression).toBe("9 - 4");
  });

  it("shows undefined after divide by zero through the state machine", () => {
    let state = enterDigits(initialCalculatorState, "8");
    state = chooseOperator(state, "divide");
    state = enterDigits(state, "0");
    state = equals(state);

    expect(state.display).toBe(ERROR_DISPLAY);
    expect(state.expression).toBe("8 ÷ 0");
    expect(state.waitingForNextInput).toBe(true);
  });

  it("resolves chained operations when a second operator is chosen", () => {
    let state = enterDigits(initialCalculatorState, "2");
    state = chooseOperator(state, "add");
    state = enterDigits(state, "3");
    state = chooseOperator(state, "multiply");
    state = enterDigits(state, "4");
    state = equals(state);

    expect(state.display).toBe("20");
    expect(state.expression).toBe("5 × 4");
  });

  it("starts fresh input after equals", () => {
    let state = enterDigits(initialCalculatorState, "8");
    state = chooseOperator(state, "divide");
    state = enterDigits(state, "2");
    state = equals(state);
    state = inputDigit(state, "7");

    expect(state.display).toBe("7");
    expect(state.expression).toBe("8 ÷ 2");
  });
});
