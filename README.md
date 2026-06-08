# Not Plain Calc

Not Plain Calc is a polished mobile calculator built with Expo and React Native. It focuses on the familiar speed of a standard calculator while giving every interaction a softer, more intentional feel.

## Hero Description

A calculator does not need to look generic to feel reliable. Not Plain Calc combines precise arithmetic flows, tactile controls, responsive typography, and restrained motion into a small iOS-first product that feels calm, warm, and carefully finished.

## Design Philosophy: Soft Precision

Soft Precision is the visual and interaction direction behind the app:

- **Soft**: warm surfaces, rounded forms, gentle depth, readable hierarchy, and haptics that support the action instead of calling attention to themselves.
- **Precision**: strict input limits, predictable operator behavior, accessible labels, compact-screen adaptation, and display formatting that protects legibility.
- **Not plain**: small visual details such as the operator rail, result aura, active operator state, and press depth give the app a memorable identity without changing the expected calculator mental model.

## Features

- Standard calculator operations: add, subtract, multiply, divide, equals, percent, decimal input, clear, and delete.
- Responsive iPhone layout with compact-screen adjustments.
- Active operator state for clearer multi-step calculations.
- Animated press states and result resolution feedback with reduced-motion support.
- Native haptic feedback for number, utility, operator, and equals interactions.
- Accessible button labels and result announcements.
- Centralized design tokens for color, spacing, typography, motion, shadows, radius, and layout.

## Tech Stack

- Expo 54
- React 19
- React Native 0.81
- Expo Router
- TypeScript
- React Native Reanimated
- React Native Gesture Handler
- Expo Haptics

## Architecture

The project separates routing, interface components, design tokens, haptics, and calculator logic:

- `app/` contains Expo Router entry points.
- `src/components/calculator/` contains the visible calculator UI.
- `src/design-system/tokens/` contains reusable visual system primitives.
- `src/haptics/` isolates native feedback behavior.
- `src/logic/calculator/` contains calculation, formatting, types, and state-machine logic.

This keeps visual polish independent from calculator behavior, making the code easier to review and safer to extend.

## Folder Structure

```text
.
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
│   └── icon.png
├── src/
│   ├── components/
│   │   └── calculator/
│   ├── design-system/
│   │   └── tokens/
│   ├── haptics/
│   └── logic/
│       └── calculator/
├── app.json
├── babel.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Installation

Install dependencies from the project root:

```bash
npm install
```

## Running Locally

Start the Expo development server:

```bash
npm start
```

Run on iOS:

```bash
npm run ios
```

Run type checking:

```bash
npm run typecheck
```

Validate Expo package compatibility:

```bash
npx expo install --check
```

## Roadmap

- Capture production screenshots for GitHub, portfolio, and App Store use.
- Add focused calculator logic tests for arithmetic, formatting, percent behavior, and edge cases.
- Prepare an EAS build profile for TestFlight distribution.
- Add app metadata, privacy copy, and store listing materials.
- Explore optional v2 interactions only after the v1 behavior is fully locked.

## Lessons Learned

- A small utility app benefits from a real design system; tokens made the visual polish consistent without scattering magic values.
- Calculator UX depends on predictable state transitions more than on visual novelty.
- Motion and haptics feel best when they confirm intent quietly.
- Compact-device support is easier when layout constraints are named and centralized early.
- Portfolio-quality work is not only the final screen; it is also clear structure, readable architecture, and disciplined scope control.
