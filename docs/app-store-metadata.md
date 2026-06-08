# App Store Metadata Draft

Do not submit this automatically. Use this as a human-reviewed draft for App Store Connect.

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

Support URL: `https://example.com/support`

Marketing URL: `https://example.com/not-plain-calc`

Replace both placeholders before App Store submission.

## Screenshot Plan

Use the generated screenshots in `docs/screenshots/app-store/`:

1. Main calculator
2. Clear calculation
3. Premium controls
4. Product identity
5. Release ready

## Icon Checklist

- Original artwork.
- No Apple logos.
- No Macintosh computer reproduction.
- No old system-window recreation.
- Cream, blue, and coral palette.
- Recognizable at 60 x 60.
- Connected to the app UI.

## TestFlight Checklist

- Apple Developer account active.
- App Store Connect app record created.
- Bundle ID confirmed: `com.notplain.calc`.
- Support URL replaced.
- Marketing URL replaced or omitted if allowed.
- Apple privacy labels completed as Data Not Collected.
- `npm test` passes.
- `npm run typecheck` passes.
- `npx expo install --check` passes.
- EAS credentials configured.
- Production build created with `eas build --platform ios --profile production`.
