import * as Haptics from "expo-haptics";
import { CalculatorActionKind } from "@/logic/calculator/types";

export function useCalcHaptics() {
  function play(kind: CalculatorActionKind) {
    if (kind === "number") {
      playSafely(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
      return;
    }

    if (kind === "operator") {
      playSafely(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft));
      return;
    }

    if (kind === "equals") {
      playSafely(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid));
      return;
    }

    playSafely(() => Haptics.selectionAsync());
  }

  return { play };
}

function playSafely(effect: () => Promise<void>) {
  try {
    void effect().catch(() => {
      // Haptics are additive; failed feedback should never interrupt calculation.
    });
  } catch {
    // Haptics are additive; failed feedback should never interrupt calculation.
  }
}
