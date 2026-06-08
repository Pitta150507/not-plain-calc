import { StyleSheet, View } from "react-native";
import { layout, spacing } from "@/design-system/tokens";
import { CalcKey } from "./CalcKey";

type NumericIslandProps = {
  isCompact?: boolean;
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onPercent: () => void;
  onClear: () => void;
  onDelete: () => void;
};

const digitRows = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"]
];

export function NumericIsland({ isCompact = false, onDigit, onDecimal, onPercent, onClear, onDelete }: NumericIslandProps) {
  const keySize = isCompact ? "compact" : "standard";

  return (
    <View style={[styles.container, isCompact && styles.compactContainer]}>
      <View style={styles.row}>
        <CalcKey accessibilityLabel="Clear" kind="utility" label="C" onPress={onClear} size={keySize} style={styles.key} />
        <CalcKey accessibilityLabel="Percent" kind="utility" label="%" onPress={onPercent} size={keySize} style={styles.key} />
        <CalcKey
          accessibilityLabel="Delete last digit"
          kind="utility"
          label="⌫"
          onPress={onDelete}
          size={keySize}
          style={styles.key}
        />
      </View>

      {digitRows.map((row) => (
        <View key={row.join("")} style={styles.row}>
          {row.map((digit) => (
            <CalcKey
              accessibilityLabel={`Number ${digit}`}
              key={digit}
              kind="number"
              label={digit}
              onPress={() => onDigit(digit)}
              size={keySize}
              style={styles.key}
            />
          ))}
        </View>
      ))}

      <View style={styles.row}>
        <CalcKey
          accessibilityLabel="Number 0"
          kind="number"
          label="0"
          onPress={() => onDigit("0")}
          size={isCompact ? "compact" : "wide"}
          style={styles.wideKey}
        />
        <CalcKey accessibilityLabel="Decimal point" kind="utility" label="." onPress={onDecimal} size={keySize} style={styles.key} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md
  },
  compactContainer: {
    gap: spacing.sm
  },
  row: {
    alignItems: "stretch",
    flexDirection: "row",
    flexShrink: 0,
    gap: spacing.md
  },
  key: {
    flex: 1
  },
  wideKey: {
    flex: layout.zeroKeyFlex
  }
});
