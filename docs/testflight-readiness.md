# TestFlight Readiness

## Current Status

Not Plain Calc is close to a TestFlight build candidate. EAS is configured, GitHub Pages is live, and the final app icon is installed. The current blocker is Apple Developer two-factor authentication during iOS credential generation.

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
- GitHub Pages is configured from the `main` branch `/docs` folder.
- Marketing URL is live: `https://pitta150507.github.io/not-plain-calc/`.
- Privacy URL is live: `https://pitta150507.github.io/not-plain-calc/privacy.html`.
- Support URL is live: `https://pitta150507.github.io/not-plain-calc/support.html`.

## Build Checklist

- Confirm Apple Developer Team and bundle identifier: `com.notplain.calc`.
- Confirm final approved app icon is installed at `assets/icon.png`.
- Run `npm test`.
- Run `npm run typecheck`.
- Run `npx expo install --check`.
- Run an iOS simulator smoke test.
- Build with `eas build --platform ios --profile production`.
- Submit the generated build to TestFlight after the build completes and App Store Connect credentials are available.

## Current Blocker

`eas build --platform ios --profile production` reaches Apple Developer login and requires the 6-digit two-factor authentication code for `bertoldo_andrea@icloud.com`.

Without that code, EAS cannot generate or validate the iOS distribution certificate and provisioning profile needed for the production iOS build.

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

- Create the App Store Connect app record.
- Upload screenshots from `docs/screenshots/app-store/`.
- Complete Apple privacy nutrition labels.
- Complete Apple Developer 2FA during the next EAS build attempt.
