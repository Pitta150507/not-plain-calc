import { StyleSheet, View } from "react-native";
import { colors, layout, radius, spacing } from "@/design-system/tokens";
import { Operator } from "@/logic/calculator/types";
import { CalcKey } from "./CalcKey";

type OperatorRailProps = {
  activeOperator: Operator | null;
  isCompact?: boolean;
  onOperator: (operator: Operator) => void;
  onEquals: () => void;
};

const operators: Array<{ label: string; accessibilityLabel: string; value: Operator }> = [
  { label: "÷", accessibilityLabel: "Divide", value: "divide" },
  { label: "×", accessibilityLabel: "Multiply", value: "multiply" },
  { label: "-", accessibilityLabel: "Subtract", value: "subtract" },
  { label: "+", accessibilityLabel: "Add", value: "add" }
];

export function OperatorRail({ activeOperator, isCompact = false, onOperator, onEquals }: OperatorRailProps) {
  const keySize = isCompact ? "compact" : "standard";

  return (
    <View style={[styles.container, isCompact && styles.compactContainer]}>
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.thread} />
      {operators.map((operator) => (
        <CalcKey
          accessibilityLabel={operator.accessibilityLabel}
          isActive={activeOperator === operator.value}
          key={operator.value}
          kind="operator"
          label={operator.label}
          onPress={() => onOperator(operator.value)}
          size={keySize}
          style={styles.key}
        />
      ))}
      <CalcKey accessibilityLabel="Equals" kind="equals" label="=" onPress={onEquals} size={keySize} style={styles.equals} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: radius.xxl,
    gap: spacing.md,
    justifyContent: "flex-start",
    paddingHorizontal: spacing.xxs,
    position: "relative",
    width: layout.operatorRailWidth
  },
  compactContainer: {
    gap: spacing.sm,
    paddingHorizontal: spacing.none,
    width: layout.compactOperatorRailWidth
  },
  thread: {
    backgroundColor: colors.operatorThread,
    borderRadius: radius.pill,
    bottom: spacing.xl,
    position: "absolute",
    right: spacing.xs,
    top: spacing.xl,
    width: 2
  },
  key: {
    width: "100%"
  },
  equals: {
    width: "100%"
  }
});
