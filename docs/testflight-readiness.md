# TestFlight Readiness

## Current Status

Not Plain Calc is close to a TestFlight build candidate. EAS is configured and the final app icon is installed. The public pages must still be published through GitHub Pages before Public TestFlight metadata is complete.

## Completed

- Production app name and slug restored in `app.json`.
- Final Macintosh Refined UI is in the main product surface.
- App icon updated for the final product identity.
- Calculator behavior covered by focused unit tests.
- TypeScript strict typecheck passes.
- Accessibility labels exist for all calculator controls.
- Active operator buttons expose selected state to assistive technologies.
- Result display exposes a text role and polite live region.
- Release screenshot set generated at App Store portrait dimensions.
- Privacy policy draft and App Store metadata draft are available in `docs/`.
- EAS project is linked: `8811cf3a-7905-45b4-8f00-302b6b96783b`.
- Static GitHub Pages source files are available in `docs/`.

## Build Checklist

- Confirm Apple Developer Team and bundle identifier: `com.notplain.calc`.
- Confirm final approved app icon is installed at `assets/icon.png`.
- Run `npm test`.
- Run `npm run typecheck`.
- Run `npx expo install --check`.
- Run an iOS simulator smoke test.
- Build with `eas build --platform ios --profile production`.
- Submit the generated build to TestFlight only after explicit human approval.

## App Store Metadata Draft

Name: Not Plain Calc

Subtitle: A softer everyday calculator

Description:
Not Plain Calc is a focused iPhone calculator designed for everyday arithmetic with a calmer, more tactile interface. It keeps the standard calculator flow familiar while adding clearer operation context, accessible controls, responsive typography, and a polished visual identity.

Keywords:
calculator, arithmetic, math, utility, everyday calculator

Privacy:
The app does not collect personal data, use analytics, or transmit calculator input.

Disclaimer:
Not Plain Calc is independent and is not affiliated with, endorsed by, or sponsored by Apple Inc.

## Remaining External Work

- Enable GitHub Pages from `main` branch `/docs` folder.
- Create the App Store Connect app record.
- Upload screenshots from `docs/screenshots/app-store/`.
- Complete Apple privacy nutrition labels.
- Confirm the support, marketing, and privacy URLs are live.
