# Not Plain Calc Release Audit

Date: 2026-06-08

Scope: developer-level release, security, privacy, accessibility, dependency, and App Store readiness review. This is not legal advice.

## GitHub And Versioning

- Current release version: `1.0.0`.
- Current production branch: `main`.
- Production design: Macintosh Refined.
- GitHub remote: `https://github.com/Pitta150507/not-plain-calc.git`.
- App identifier: `com.notplain.calc`.

## Security Findings

No repo-owned secrets or credentials were found.

Checked for:

- `.env` files
- API keys, tokens, secrets, passwords, private key text
- `fetch`, `XMLHttpRequest`, `axios`
- analytics/tracking SDK names
- backend/database SDK names
- `eval` and `new Function`

Findings:

- No backend exists.
- No database exists.
- No analytics SDKs were found.
- No tracking SDKs were found.
- No network request code was found in app source.
- No dynamic code execution was found in app source.
- Calculations are performed locally in `src/logic/calculator/`.
- The app should work fully offline after the app bundle is installed.

Dependency audit:

- `npm audit` reports 13 moderate vulnerabilities.
- The advisories are in Expo/config/tooling dependency chains, including Expo CLI/config packages, `postcss`, `uuid`, and `xcode`.
- Reported fixes require major Expo-package upgrades.
- `npm audit fix --force` was intentionally not used because it would perform broad major-version upgrades and could destabilize the Expo app.

Risk rating:

- App-source security risk: low.
- Dependency advisory risk: moderate, pending Expo SDK upgrade review.

## Privacy Findings

The app is privacy-first and local/offline:

- No login.
- No database.
- No backend.
- No analytics.
- No ads.
- No tracking.
- No user accounts.
- No personal data collection.
- No calculator input leaves the device.

App Store data collection classification:

- Data Not Collected.

## Legal And IP Findings

This is a practical developer-level review, not legal advice.

Findings:

- App name `Not Plain Calc` does not directly copy `Not Boring`, `Arc`, `Apple`, or `Macintosh`.
- Public App Store wording should not call the app a "Macintosh app" or imply Apple affiliation.
- The final design is inspired by a broad visual philosophy, not by Apple assets.
- The current app icon is original and avoids Apple logos, Macintosh computer imagery, or exact UI recreation.
- The UI has Macintosh-inspired structure, cream surfaces, and tactile controls, but is not a direct copy of a specific Apple calculator or computer interface.

Remaining risk:

- The word "Macintosh" may remain useful in internal case-study context, but public marketing should frame the work as "inspired by early personal-computer interface principles" and include the independence disclaimer.
- Human legal review is recommended before App Store submission if the portfolio case study heavily discusses Apple or Macintosh influence.

## Accessibility QA

Implemented:

- Calculator keys use button roles.
- Keys have descriptive accessibility labels.
- Active operator exposes selected state.
- Result display exposes a text role and polite live region.
- Decorative accents are hidden from assistive technologies.
- Reduced motion is respected for key press and result animations.
- Touch targets are at least 50 points in compact mode and 54 points or larger in standard mode.

Manual review still recommended:

- VoiceOver traversal on a physical iPhone.
- Dynamic Type at large accessibility sizes.
- Color contrast under Increase Contrast.
- Reduced Motion on-device smoke test.

## Test Results

Latest local checks:

- `npm test`: passing, 14 tests.
- `npm run typecheck`: passing.
- `npx expo install --check`: passing.
- `npm audit`: 13 moderate advisories, no forced fixes applied.

## App Store Readiness Score

Historical pre-upload score: 8.4 / 10

The public GitHub release and public TestFlight beta are live. The earlier Apple credential blocker was resolved and the signed build was uploaded to App Store Connect. Production App Store release remains separate from beta distribution and should follow final legal, privacy, metadata, and device review.
