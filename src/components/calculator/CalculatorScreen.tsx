import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, layout, spacing, typography } from "@/design-system/tokens";
import { useCalcHaptics } from "@/haptics/useCalcHaptics";
import { useCalculatorMachine } from "@/logic/calculator/useCalculatorMachine";
import { NumericIsland } from "./NumericIsland";
import { OperatorRail } from "./OperatorRail";
import { ResultDisplay } from "./ResultDisplay";

export function CalculatorScreen() {
  const [resolveSignal, setResolveSignal] = useState(0);
  const { height, width } = useWindowDimensions();
  const calculator = useCalculatorMachine();
  const haptics = useCalcHaptics();
  const isCompact = height < layout.compactScreenHeight || width < layout.compactScreenWidth;

  function pressDigit(digit: string) {
    haptics.play("number");
    calculator.inputDigit(digit);
  }

  function pressDecimal() {
    haptics.play("utility");
    calculator.inputDecimal();
  }

  function pressPercent() {
    haptics.play("utility");
    calculator.percent();
  }

  function pressClear() {
    haptics.play("utility");
    calculator.clear();
  }

  function pressDelete() {
    haptics.play("utility");
    calculator.deleteDigit();
  }

  function pressOperator(operator: Parameters<typeof calculator.chooseOperator>[0]) {
    haptics.play("operator");
    calculator.chooseOperator(operator);
  }

  function pressEquals() {
    haptics.play("equals");
    if (calculator.activeOperator) {
      setResolveSignal((value) => value + 1);
    }
    calculator.equals();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.screen, isCompact && styles.compactScreen]}>
        <View style={styles.topBar}>
          <Text maxFontSizeMultiplier={layout.textMaxFontMultiplier} style={styles.brand}>
            Not Plain <Text style={styles.brandSoft}>Calc</Text>
          </Text>
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.accentMark}>
            <View style={styles.accentDot} />
            <View style={styles.accentLine} />
          </View>
        </View>

        <View style={styles.displayArea}>
          <ResultDisplay
            display={calculator.display}
            expression={calculator.expression}
            isCompact={isCompact}
            resolveSignal={resolveSignal}
          />
        </View>

        <View style={[styles.keypad, isCompact && styles.compactKeypad]}>
          <NumericIsland
            isCompact={isCompact}
            onClear={pressClear}
            onDecimal={pressDecimal}
            onDelete={pressDelete}
            onDigit={pressDigit}
            onPercent={pressPercent}
          />
          <OperatorRail
            activeOperator={calculator.activeOperator}
            isCompact={isCompact}
            onEquals={pressEquals}
            onOperator={pressOperator}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  screen: {
    alignSelf: "center",
    backgroundColor: colors.background,
    flex: 1,
    maxWidth: layout.screenMaxWidth,
    paddingBottom: spacing.lg,
    paddingHorizontal: layout.screenHorizontalPadding,
    width: "100%"
  },
  compactScreen: {
    paddingBottom: spacing.sm,
    paddingHorizontal: layout.compactScreenHorizontalPadding
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: layout.topBarMinHeight,
    paddingTop: spacing.sm
  },
  brand: {
    color: colors.text,
    fontFamily: typography.family.regular,
    fontSize: typography.size.eyebrow,
    fontWeight: typography.weight.bold,
    letterSpacing: 0,
    lineHeight: typography.lineHeight.eyebrow
  },
  brandSoft: {
    color: colors.textSoft,
    fontWeight: typography.weight.semibold
  },
  accentMark: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs
  },
  accentDot: {
    backgroundColor: colors.marigold,
    borderRadius: layout.accentDotSize,
    height: layout.accentDotSize,
    width: layout.accentDotSize
  },
  accentLine: {
    backgroundColor: colors.warmOrange,
    borderRadius: layout.accentLineHeight,
    height: layout.accentLineHeight,
    width: layout.accentLineWidth
  },
  displayArea: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: spacing.sm
  },
  keypad: {
    flexDirection: "row",
    gap: spacing.md,
    paddingBottom: spacing.sm,
    paddingTop: spacing.md
  },
  compactKeypad: {
    gap: spacing.sm,
    paddingBottom: spacing.xs,
    paddingTop: spacing.sm
  }
});
