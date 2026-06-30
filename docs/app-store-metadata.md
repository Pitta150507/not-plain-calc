# App Store Metadata Draft

This metadata draft is retained for the production App Store release. A signed build is already available through a public TestFlight beta.

## Product

Name: Not Plain Calc

Subtitle: A softer everyday calculator

Category: Utilities

Version: 1.0.0

Bundle ID: `com.notplain.calc`

## Short Description

A focused iPhone calculator with clear results, tactile controls, and a calmer visual identity.

## Long Description

Not Plain Calc is a focused iPhone calculator designed for everyday arithmetic with a softer, more tactile interface.

It keeps the standard calculator flow familiar while adding clear expression context, accessible controls, responsive typography, and a polished visual identity. Calculations happen locally on your device, with no login, no ads, no analytics, and no tracking.

Not Plain Calc is designed for people who want a calculator that feels considered without becoming complicated.

## Keywords

calculator, arithmetic, math, utility, everyday calculator, simple calculator

## Privacy

Data Not Collected.

Not Plain Calc does not collect personal data, use analytics, show ads, track users, use accounts, or send calculator input to a server.

## Independence Disclaimer

Not Plain Calc is independent and is not affiliated with, endorsed by, or sponsored by Apple Inc.

Avoid App Store wording that calls the product a "Macintosh app" or suggests official Apple affiliation.

## URLs

Support URL: `https://pitta150507.github.io/not-plain-calc/support.html`

Marketing URL: `https://pitta150507.github.io/not-plain-calc/`

Privacy Policy URL: `https://pitta150507.github.io/not-plain-calc/privacy.html`

These URLs assume GitHub Pages is enabled for the `main` branch using the `/docs` folder.

## Screenshot Plan

Use the generated screenshots in `docs/screenshots/app-store/`:

1. Main calculator
2. Clear calculation
3. Premium controls
4. Product identity
5. Release ready

## Icon Checklist

- Final icon artwork installed at `assets/icon.png`.
- No Apple logos.
- No Macintosh computer reproduction.
- No old system-window recreation.
- Cream, blue, and coral palette.
- Recognizable at 60 x 60.
- Connected to the app UI.

Final direction: `docs/icon-concepts/product-recognition-final/candidate-e-disciplined-product-crop.png`.

## Completed TestFlight Checklist

- Apple Developer account active.
- App Store Connect app record created.
- Bundle ID confirmed: `com.notplain.calc`.
- Final approved icon installed in `assets/icon.png`.
- Support URL published.
- Marketing URL published or omitted if allowed.
- Privacy Policy URL published.
- Apple privacy labels completed as Data Not Collected.
- `npm test` passes.
- `npm run typecheck` passes.
- `npx expo install --check` passes.
- EAS credentials configured.
- Production build created with `eas build --platform ios --profile production`.
- Signed build uploaded to App Store Connect.
- Public TestFlight beta enabled.
