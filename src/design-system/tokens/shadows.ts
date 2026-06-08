import { colors } from "./colors";

export const shadows = {
  key: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2
  },
  utility: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 2
  },
  operator: {
    shadowColor: colors.pacificBlue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2
  },
  operatorActive: {
    shadowColor: colors.signalGreen,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 3
  },
  keyPressed: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1
  },
  equals: {
    shadowColor: colors.warmOrange,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 3
  },
  equalsPressed: {
    shadowColor: colors.warmOrange,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 11,
    elevation: 2
  }
} as const;
