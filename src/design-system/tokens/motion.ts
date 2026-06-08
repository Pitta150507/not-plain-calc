export const motion = {
  pressScale: 0.965,
  operatorPressScale: 0.955,
  equalsPressScale: 0.945,
  pressDepth: 2,
  operatorPressDepth: 3,
  equalsPressDepth: 5,
  resultResolveScale: 0.992,
  resultResolveLift: 3,
  resultAuraRestOpacity: 0.64,
  resultAuraResolveOpacity: 0.86,
  spring: {
    damping: 18,
    stiffness: 320,
    mass: 0.68
  },
  gentleSpring: {
    damping: 20,
    stiffness: 210,
    mass: 0.82
  },
  confirmSpring: {
    damping: 22,
    stiffness: 300,
    mass: 0.72
  },
  timing: {
    quick: 120,
    base: 180,
    calm: 260
  }
} as const;
