# Not Plain Calc

Not Plain Calc v1.0 is a polished offline calculator built with Expo and React Native. It keeps the familiar speed of a standard calculator while giving the product a softer, more intentional utility feeling.

## Hero Description

A calculator does not need to look generic to feel reliable. Not Plain Calc combines precise arithmetic flows, tactile controls, responsive typography, accessibility-minded interaction states, and restrained motion into a small iOS-first product that feels calm, structured, and carefully finished.

## Release Status

Not Plain Calc v1.0 is prepared as a public GitHub release and TestFlight-ready build candidate. It is not yet submitted to Apple. Final TestFlight and App Store submission still require human setup for Apple Developer credentials, App Store Connect metadata, support/marketing URLs, and Apple privacy labels.

## Design Philosophy: Friendly Precision

Friendly Precision is the visual and interaction direction behind the app:

- **Friendly**: warm platinum surfaces, tactile squircle controls, gentle depth, readable hierarchy, and haptics that support the action instead of calling attention to themselves.
- **Precision**: strict input limits, predictable operator behavior, accessible labels, compact-screen adaptation, and display formatting that protects legibility.
- **Not plain**: small visual details such as the blue operator rail, coral equals key, result well, active operator state, and press depth give the app a memorable identity without changing the expected calculator mental model.

## Design Exploration

The final production design, **Macintosh Refined**, was inspired by the friendliness, clarity, and structured interaction philosophy of early personal-computer interfaces. It is an original reinterpretation for a modern mobile calculator: it is not a copy, not an emulator, not a recreation of a Macintosh window or calculator, and does not use Apple logos, Apple-owned artwork, or copyrighted Macintosh imagery.

Not Plain Calc is independent and is not affiliated with, endorsed by, or sponsored by Apple Inc.

## Privacy-First Offline App

Not Plain Calc is a local calculator:

- No login
- No user accounts
- No backend
- No database
- No analytics
- No ads
- No tracking
- No personal data collection
- No calculator input leaves the device

## Features

- Standard calculator operations: add, subtract, multiply, divide, equals, percent, decimal input, clear, and delete.
- Responsive iPhone layout with compact-screen adjustments.
- Active operator state for clearer multi-step calculations.
- Animated press states and result resolution feedback with reduced-motion support.
- Native haptic feedback for number, utility, operator, and equals interactions.
- Accessible button labels and result announcements.
- Focused unit tests for arithmetic, formatting, and calculator state transitions.
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
- Vitest

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

Run unit tests:

```bash
npm test
```

Validate Expo package compatibility:

```bash
npx expo install --check
```

## Release Assets

- Release audit: `docs/release-audit.md`
- Privacy policy draft: `docs/privacy-policy.md`
- App Store metadata draft: `docs/app-store-metadata.md`
- TestFlight readiness: `docs/testflight-readiness.md`
- GitHub Pages setup: `docs/github-pages.md`
- Public pages source: `docs/index.html`, `docs/privacy.html`, `docs/support.html`
- App Store screenshots: `docs/screenshots/app-store/`

## Roadmap

- Configure Apple Developer credentials for TestFlight.
- Create the App Store Connect record and upload screenshots.
- Explore optional v2 interactions only after the v1 release is fully locked.

## Lessons Learned

- A small utility app benefits from a real design system; tokens made the visual polish consistent without scattering magic values.
- Calculator UX depends on predictable state transitions more than on visual novelty.
- Motion and haptics feel best when they confirm intent quietly.
- Compact-device support is easier when layout constraints are named and centralized early.
- Portfolio-quality work is not only the final screen; it is also clear structure, readable architecture, and disciplined scope control.
