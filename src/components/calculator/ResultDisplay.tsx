import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { colors, layout, motion, radius, spacing, typography } from "@/design-system/tokens";

type ResultDisplayProps = {
  display: string;
  expression: string;
  isCompact?: boolean;
  resolveSignal: number;
};

export function ResultDisplay({ display, expression, isCompact = false, resolveSignal }: ResultDisplayProps) {
  const reducedMotion = useReducedMotion();
  const resultTypography = useMemo(() => getResultTypography(display, isCompact), [display, isCompact]);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const auraOpacity = useSharedValue<number>(motion.resultAuraRestOpacity);

  useEffect(() => {
    if (resolveSignal === 0 || reducedMotion) return;

    scale.value = motion.resultResolveScale;
    translateY.value = motion.resultResolveLift;
    auraOpacity.value = motion.resultAuraResolveOpacity;
    scale.value = withSpring(1, motion.confirmSpring);
    translateY.value = withSpring(0, motion.confirmSpring);
    auraOpacity.value = withSequence(
      withSpring(motion.resultAuraResolveOpacity, motion.confirmSpring),
      withSpring(motion.resultAuraRestOpacity, motion.gentleSpring)
    );
  }, [auraOpacity, reducedMotion, resolveSignal, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));

  const auraStyle = useAnimatedStyle(() => ({
    opacity: auraOpacity.value
  }));

  return (
    <View
      accessibilityLabel={`${expression}. Result ${display}`}
      accessibilityLiveRegion="polite"
      accessibilityRole="text"
      accessible
      style={[styles.container, isCompact && styles.compactContainer]}
    >
      <Animated.View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.resultAura, auraStyle]} />
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.displayHeader}>
        <View style={[styles.displayTick, styles.displayTickActive]} />
        <View style={styles.displayTick} />
        <View style={styles.displayTick} />
      </View>
      <Text ellipsizeMode="head" maxFontSizeMultiplier={layout.textMaxFontMultiplier} numberOfLines={1} style={styles.expression}>
        {expression}
      </Text>
      <Animated.View style={[styles.resultFrame, animatedStyle]}>
        <Text
          adjustsFontSizeToFit
          maxFontSizeMultiplier={layout.resultMaxFontMultiplier}
          minimumFontScale={layout.resultMinimumFontScale}
          numberOfLines={1}
          style={[styles.result, resultTypography]}
        >
          {display}
        </Text>
      </Animated.View>
    </View>
  );
}

function getResultTypography(display: string, isCompact: boolean) {
  const visibleLength = display.replace(/[,\s]/g, "").length;

  if (display === "Undefined") {
    return {
      fontSize: isCompact ? typography.size.resultTiny : typography.size.resultCompact,
      fontWeight: typography.weight.semibold,
      lineHeight: isCompact ? typography.lineHeight.resultTiny : typography.lineHeight.resultCompact
    };
  }

  if (display.includes("e") || visibleLength > 11) {
    return {
      fontSize: isCompact ? typography.size.resultTiny : typography.size.resultCompact,
      fontWeight: typography.weight.semibold,
      lineHeight: isCompact ? typography.lineHeight.resultTiny : typography.lineHeight.resultCompact
    };
  }

  if (visibleLength > 7) {
    return {
      fontSize: isCompact ? typography.size.resultCompact : typography.size.resultMedium,
      fontWeight: typography.weight.bold,
      lineHeight: isCompact ? typography.lineHeight.resultCompact : typography.lineHeight.resultMedium
    };
  }

  if (visibleLength <= 3) {
    return {
      fontSize: isCompact ? typography.size.result : typography.size.resultLarge,
      fontWeight: typography.weight.display,
      lineHeight: isCompact ? typography.lineHeight.result : typography.lineHeight.resultLarge
    };
  }

  return {
    fontSize: isCompact ? typography.size.resultMedium : typography.size.result,
    fontWeight: typography.weight.bold,
    lineHeight: isCompact ? typography.lineHeight.resultMedium : typography.lineHeight.result
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: colors.resultSurface,
    borderColor: colors.line,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: "flex-end",
    minHeight: 154,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    position: "relative",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    width: "100%"
  },
  compactContainer: {
    borderRadius: 16,
    minHeight: 116,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm
  },
  resultAura: {
    backgroundColor: colors.resultWash,
    borderRadius: 18,
    bottom: spacing.md,
    left: spacing.md,
    position: "absolute",
    right: spacing.md,
    top: 34
  },
  displayHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: spacing.md
  },
  displayTick: {
    backgroundColor: colors.lineStrong,
    borderRadius: radius.pill,
    height: 4,
    opacity: 0.6,
    width: 12
  },
  displayTickActive: {
    backgroundColor: colors.signalGreen,
    opacity: 1,
    width: 24
  },
  expression: {
    color: colors.textSoft,
    fontFamily: typography.family.regular,
    fontSize: typography.size.expression,
    fontVariant: ["tabular-nums"],
    fontWeight: typography.weight.medium,
    lineHeight: typography.lineHeight.expression,
    marginBottom: spacing.sm,
    textAlign: "right",
    width: "100%"
  },
  result: {
    color: colors.text,
    fontFamily: typography.family.regular,
    fontVariant: ["tabular-nums"],
    includeFontPadding: false,
    textAlign: "right",
    width: "100%"
  },
  resultFrame: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minHeight: typography.lineHeight.result,
    overflow: "hidden",
    width: "100%"
  }
});
