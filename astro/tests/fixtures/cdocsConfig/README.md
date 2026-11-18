Customization configs for `src/lib/cdocs/cdocsConfigPlugin.test.ts`:

- `valid/`: a minimal config that loads and validates.
- `invalid/`: an option group that references an option the glossary doesn't define.
- `empty/`: a language directory with no traits, like a config whose YAML was never copied.

`main.js` imports the plugin's virtual module, so the test can build it.
