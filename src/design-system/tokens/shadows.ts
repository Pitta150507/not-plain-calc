import { colors } from "./colors";

export const shadows = {
  key: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.085,
    shadowRadius: 13,
    elevation: 2
  },
  utility: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.075,
    shadowRadius: 11,
    elevation: 2
  },
  operator: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 11,
    elevation: 2
  },
  operatorActive: {
    shadowColor: colors.warmOrange,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
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
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
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
