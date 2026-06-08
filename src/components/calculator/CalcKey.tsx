import { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from "react-native-reanimated";
import { colors, layout, motion, radius, shadows, typography } from "@/design-system/tokens";
import { CalculatorActionKind } from "@/logic/calculator/types";

type CalcKeyProps = {
  label: string;
  accessibilityLabel: string;
  kind: CalculatorActionKind;
  onPress: () => void;
  size?: "standard" | "tall" | "compact" | "wide";
  isActive?: boolean;
  style?: ViewStyle;
};

export function CalcKey({
  label,
  accessibilityLabel,
  kind,
  onPress,
  size = "standard",
  isActive = false,
  style
}: CalcKeyProps) {
  const [isPressed, setIsPressed] = useState(false);
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const depth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: depth.value }, { scale: scale.value }]
  }));

  const pressScale = getPressScale(kind);
  const pressDepth = getPressDepth(kind);

  function pressIn() {
    setIsPressed(true);
    scale.value = withSpring(reducedMotion ? 1 : pressScale, motion.spring);
    depth.value = withSpring(reducedMotion ? 0 : pressDepth, motion.spring);
  }

  function pressOut() {
    setIsPressed(false);
    scale.value = withSpring(1, motion.spring);
    depth.value = withSpring(0, motion.spring);
  }

  return (
    <Animated.View style={[styles.shadowWrap, getRadiusStyle(size), style, getShadowStyle(kind, isPressed, isActive), animatedStyle]}>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={isActive ? { selected: true } : undefined}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={({ pressed }) => [
          styles.base,
          styles[size],
          styles[kind],
          isActive && styles.active,
          pressed && getPressedStyle(kind)
        ]}
      >
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.topLight, getTopLightStyle(kind)]} />
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[styles.bottomShade, getBottomShadeStyle(kind)]}
        />
        {isActive && kind === "operator" ? (
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.activeInset} />
        ) : null}
        <Text
          maxFontSizeMultiplier={layout.keyMaxFontMultiplier}
          numberOfLines={1}
          style={[styles.label, getLabelStyle(kind), isActive && kind === "operator" && styles.activeOperatorLabel]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function getPressScale(kind: CalculatorActionKind) {
  if (kind === "equals") return motion.equalsPressScale;
  if (kind === "operator") return motion.operatorPressScale;
  return motion.pressScale;
}

function getPressDepth(kind: CalculatorActionKind) {
  if (kind === "equals") return motion.equalsPressDepth;
  if (kind === "operator") return motion.operatorPressDepth;
  return motion.pressDepth;
}

function getPressedStyle(kind: CalculatorActionKind) {
  if (kind === "equals") return styles.equalsPressed;
  if (kind === "operator") return styles.operatorPressed;
  if (kind === "utility") return styles.utilityPressed;
  return styles.pressed;
}

function getLabelStyle(kind: CalculatorActionKind) {
  if (kind === "equals") return styles.equalsLabel;
  if (kind === "operator") return styles.operatorLabel;
  if (kind === "utility") return styles.utilityLabel;
  return styles.numberLabel;
}

function getShadowStyle(kind: CalculatorActionKind, isPressed: boolean, isActive: boolean) {
  if (isPressed) return kind === "equals" ? shadows.equalsPressed : shadows.keyPressed;
  if (kind === "equals") return shadows.equals;
  if (kind === "operator" && isActive) return shadows.operatorActive;
  if (kind === "operator") return shadows.operator;
  if (kind === "utility") return shadows.utility;
  return shadows.key;
}

function getTopLightStyle(kind: CalculatorActionKind) {
  if (kind === "equals") return styles.equalsTopLight;
  if (kind === "utility") return styles.utilityTopLight;
  return styles.defaultTopLight;
}

function getBottomShadeStyle(kind: CalculatorActionKind) {
  if (kind === "equals") return styles.equalsBottomShade;
  if (kind === "utility") return styles.utilityBottomShade;
  return styles.defaultBottomShade;
}

function getRadiusStyle(size: CalcKeyProps["size"]) {
  if (size === "compact") return styles.compactRadius;
  if (size === "wide") return styles.wideRadius;
  return styles.standardRadius;
}

const styles = StyleSheet.create({
  shadowWrap: {
    backgroundColor: "transparent",
    flexShrink: 0
  },
  base: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: layout.keyMinSize,
    minWidth: layout.keyMinSize,
    overflow: "hidden",
    width: "100%"
  },
  standard: {
    height: layout.keyHeight,
    borderRadius: radius.lg
  },
  wide: {
    height: layout.keyHeight,
    borderRadius: radius.lg
  },
  compact: {
    height: layout.compactKeyHeight,
    minHeight: layout.compactKeyMinHeight,
    borderRadius: radius.md
  },
  tall: {
    flex: 1,
    minHeight: layout.tallKeyMinHeight,
    borderRadius: radius.lg
  },
  number: {
    backgroundColor: colors.surface,
    borderColor: colors.line
  },
  utility: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.lineStrong
  },
  operator: {
    backgroundColor: colors.chrome,
    borderColor: colors.operatorThread
  },
  equals: {
    backgroundColor: colors.warmOrange,
    borderColor: colors.warmOrange
  },
  active: {
    backgroundColor: colors.warmOrangePale,
    borderColor: colors.signalGreen
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
    borderColor: colors.lineStrong
  },
  utilityPressed: {
    backgroundColor: colors.surfaceUtilityPressed,
    borderColor: colors.lineStrong
  },
  operatorPressed: {
    backgroundColor: colors.resultSurfaceInset,
    borderColor: colors.signalGreen
  },
  equalsPressed: {
    backgroundColor: colors.warmOrangePressed,
    borderColor: colors.warmOrangePressed
  },
  standardRadius: {
    borderRadius: radius.lg
  },
  wideRadius: {
    borderRadius: radius.lg
  },
  compactRadius: {
    borderRadius: radius.md
  },
  topLight: {
    borderRadius: radius.pill,
    height: 1,
    left: 12,
    opacity: 0.9,
    position: "absolute",
    right: 12,
    top: 6
  },
  defaultTopLight: {
    backgroundColor: colors.buttonTopLight
  },
  utilityTopLight: {
    backgroundColor: colors.buttonUtilityTopLight
  },
  equalsTopLight: {
    backgroundColor: colors.buttonTopLight,
    opacity: 0.72
  },
  bottomShade: {
    bottom: 0,
    height: 4,
    left: 0,
    position: "absolute",
    right: 0
  },
  defaultBottomShade: {
    backgroundColor: colors.buttonBottomShade
  },
  utilityBottomShade: {
    backgroundColor: colors.buttonUtilityBottomShade
  },
  equalsBottomShade: {
    backgroundColor: colors.buttonEqualsBottomShade
  },
  activeInset: {
    backgroundColor: colors.operatorActiveGlow,
    borderRadius: radius.pill,
    bottom: 6,
    height: 4,
    left: 14,
    position: "absolute",
    right: 14
  },
  label: {
    color: colors.text,
    fontFamily: typography.family.regular,
    fontSize: typography.size.key,
    fontVariant: ["tabular-nums"],
    fontWeight: typography.weight.semibold,
    includeFontPadding: false,
    lineHeight: typography.lineHeight.key,
    minWidth: 0,
    textAlign: "center"
  },
  numberLabel: {
    color: colors.text
  },
  utilityLabel: {
    color: colors.textMuted,
    fontSize: typography.size.utility
  },
  operatorLabel: {
    color: colors.pacificBlue,
    fontSize: typography.size.operator
  },
  activeOperatorLabel: {
    color: colors.signalGreen
  },
  equalsLabel: {
    color: colors.resultSurface,
    fontSize: typography.size.operator
  }
});
