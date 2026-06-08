import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { colors, layout, motion, spacing, typography } from "@/design-system/tokens";

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
      accessible
      style={[styles.container, isCompact && styles.compactContainer]}
    >
      <Animated.View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.resultAura, auraStyle]} />
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
    justifyContent: "flex-end",
    minHeight: 176,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.displayGap,
    position: "relative",
    width: "100%"
  },
  compactContainer: {
    minHeight: 128,
    paddingBottom: spacing.md,
    paddingTop: spacing.lg
  },
  resultAura: {
    backgroundColor: colors.resultWash,
    borderRadius: 44,
    bottom: spacing.sm,
    left: spacing.lg,
    position: "absolute",
    right: spacing.lg,
    top: spacing.xl
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
    fontFamily: typography.family.rounded,
    fontVariant: ["tabular-nums"],
    includeFontPadding: false,
    textAlign: "right",
    width: "100%"
  },
  resultFrame: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    minHeight: typography.lineHeight.resultLarge,
    overflow: "hidden",
    width: "100%"
  }
});
