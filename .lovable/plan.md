Globally hide the Lovable badge by ensuring the existing `#lovable-badge { display: none !important; }` rule is loaded on every route.

Current state:
- `src/custom.css` already contains the hiding rule.
- The file is not imported anywhere, so the rule is not applied.

Plan:
1. Import `src/custom.css` in `src/routes/__root.tsx` next to the existing `styles.css` import so it loads globally.
2. Run a build/typecheck to confirm no regressions.

No new CSS rule is needed — just wiring the existing one into the app shell.