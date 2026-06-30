# TestFlight Status

## Current Status

Not Plain Calc is available as a public beta through TestFlight. EAS produced the signed iOS build, App Store Connect received the upload, and the beta is publicly available to testers. GitHub Pages and the release-support pages are also live.

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
- Apple Developer credentials and iOS signing are configured.
- The production iOS build completed through EAS.
- The build was uploaded to App Store Connect.
- Public TestFlight beta distribution is active.

## Completed Distribution Path

- Confirmed the Apple Developer Team and bundle identifier: `com.notplain.calc`.
- Confirmed the final approved app icon at `assets/icon.png`.
- Passed unit tests, strict type checking, and Expo dependency validation.
- Ran the iOS simulator release flow.
- Built the signed app with `eas build --platform ios --profile production`.
- Uploaded the generated build to App Store Connect.
- Enabled public TestFlight beta distribution.

## Resolved Credential Blocker

The first production build attempt stopped at Apple Developer two-factor authentication while EAS was creating or validating the distribution certificate and provisioning profile.

The account owner later completed 2FA. EAS then finished signing and building the app, and the resulting binary was uploaded to App Store Connect and released as a public TestFlight beta.

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

## Remaining Work

- Gather and triage feedback from public beta testers.
- Run the final physical-device and accessibility regression pass.
- Confirm final App Store metadata and privacy answers.
- Submit the production App Store version when beta validation is complete.
