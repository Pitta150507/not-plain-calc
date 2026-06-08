# Portfolio Assets

## Screenshot Set

Release screenshots have been generated in two groups:

- Raw simulator/product assets: `docs/screenshots/raw/`
- App Store portrait frames: `docs/screenshots/app-store/`

Generated App Store frames:

1. `01-main-calculator.png`
2. `02-clear-calculation.png`
3. `03-premium-controls.png`
4. `04-product-identity.png`
5. `05-release-ready.png`

## App Store Screenshot Notes

Use the generated frames as the first release screenshot packet. They are sized at 1290 x 2796 and use restrained captions so the product remains the focus.

Caption direction:

- "A precise calculator with a softer touch"
- "Readable results, expression context, calm controls"
- "Tactile keys, blue operators, coral equals"
- "A small utility with a real product identity"
- "Final UI, release icon, and focused test coverage"

Avoid public screenshot captions that imply Apple affiliation or describe the app as an official Macintosh product.

## Portfolio Case Study Outline

### 1. Project Snapshot

- Product: Not Plain Calc
- Role: Product design, React Native engineering, design system, interaction polish
- Platform: iOS-first Expo app
- Scope: v1 calculator experience

### 2. Problem

Most calculator apps are either purely utilitarian or visually overdesigned. The goal was to create a calculator that remains instantly understandable while feeling more crafted and personal.

### 3. Design Direction

Introduce **Friendly Precision**: warm platinum color, tactile depth, quiet motion, compact-device responsiveness, and reliable calculator behavior.

### 4. Interaction Decisions

- Keep the familiar calculator model.
- Use active operator feedback to reduce ambiguity.
- Use haptics and press depth to make each key feel physical.
- Let result typography adapt to long values instead of overflowing.

### 5. Engineering Decisions

- Separate calculator logic from React Native components.
- Centralize visual values in design tokens.
- Keep haptics isolated behind a small hook.
- Support reduced motion in animation-heavy surfaces.

### 6. Outcome

A focused v1 product that demonstrates taste, restraint, implementation quality, release readiness, and the ability to turn a simple utility into a portfolio-worthy mobile experience.

### 7. Next Iteration

- Configure TestFlight credentials and submit the first build candidate.
- Consider optional memory/history features only after the v1 release is stable.
