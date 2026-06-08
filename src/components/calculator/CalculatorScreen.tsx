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
          <View style={styles.brandLockup}>
            <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.monogram}>
              <Text maxFontSizeMultiplier={layout.textMaxFontMultiplier} style={styles.monogramText}>
                NP
              </Text>
            </View>
            <View>
              <Text maxFontSizeMultiplier={layout.textMaxFontMultiplier} style={styles.brand}>
                Not Plain <Text style={styles.brandSoft}>Calc</Text>
              </Text>
              <Text maxFontSizeMultiplier={layout.textMaxFontMultiplier} style={styles.variant}>
                Everyday Calculator
              </Text>
            </View>
          </View>
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.accentMark}>
            <View style={styles.accentDot} />
            <View style={styles.accentLine} />
            <View style={styles.accentLineSoft} />
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
    paddingBottom: spacing.xxl,
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
    paddingTop: spacing.md
  },
  brandLockup: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    minWidth: 0
  },
  monogram: {
    alignItems: "center",
    backgroundColor: colors.chrome,
    borderColor: colors.lineStrong,
    borderRadius: 13,
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    width: 36
  },
  monogramText: {
    color: colors.text,
    fontFamily: typography.family.regular,
    fontSize: 12,
    fontWeight: typography.weight.bold,
    letterSpacing: 0,
    lineHeight: 16
  },
  brand: {
    color: colors.text,
    fontFamily: typography.family.regular,
    fontSize: 14,
    fontWeight: typography.weight.bold,
    letterSpacing: 0,
    lineHeight: 18
  },
  brandSoft: {
    color: colors.textSoft,
    fontWeight: typography.weight.semibold
  },
  variant: {
    color: colors.textMuted,
    fontFamily: typography.family.regular,
    fontSize: 11,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0,
    lineHeight: 15
  },
  accentMark: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    paddingLeft: spacing.sm
  },
  accentDot: {
    backgroundColor: colors.signalGreen,
    borderRadius: layout.accentDotSize,
    height: layout.accentDotSize,
    width: layout.accentDotSize
  },
  accentLine: {
    backgroundColor: colors.pacificBlue,
    borderRadius: layout.accentLineHeight,
    height: layout.accentLineHeight,
    width: layout.accentLineWidth
  },
  accentLineSoft: {
    backgroundColor: colors.marigold,
    borderRadius: layout.accentLineHeight,
    height: layout.accentLineHeight,
    width: 12
  },
  displayArea: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: spacing.xl,
    paddingTop: spacing.md
  },
  keypad: {
    backgroundColor: colors.keypadPlate,
    borderColor: colors.line,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 16
  },
  compactKeypad: {
    borderRadius: 16,
    gap: spacing.sm,
    padding: spacing.sm
  }
});
