# Disallow duplicate option labels

## Prompt

We already disallow duplicate option IDs, but do not currently validate the uniqueness of the option labels across the ingested customization config.

Update the code and the tests to disallow duplicate option labels. 

NOTE: This only applies to English configuration, since the goal here is to prevent tech writers from accidentally adding a duplicate option because they've chosen a slightly different option ID, so their addition is technically unique, even though their desired option already existed.

## Claude's plan

### Context

Duplicate option IDs are currently validated in two places:
1. **Schema-level** ([optionGlossary.ts:70-82](src/schemas/glossaries/optionGlossary.ts#L70-L82)): A Zod `.refine()` on `RawOptionGlossarySchema` catches duplicate IDs within a single YAML file.
2. **Function-level** ([yamlConfigParsing.ts:266-268](src/utils/yamlConfigParsing.ts#L266-L268)): `loadOptionGlossary()` catches duplicate IDs across multiple YAML files.

Since this validation should only apply to English (translated configs may legitimately share labels), the check cannot live in the schema (which is language-agnostic). Instead, the check will be added at the function level in `loadOptionGlossary()`, mirroring the existing cross-file duplicate ID check.

### Changes

#### 1. `src/utils/yamlConfigParsing.ts` — Add duplicate label validation

- Update `loadOptionGlossary()` to accept a new optional parameter `validateLabelUniqueness?: boolean`.
- After the loop that merges all option entries into `result` (line 271), add a check: if `validateLabelUniqueness` is true, collect all labels from `result`, and throw an `Error` if any duplicates are found. Include the duplicate label names in the error message.
- In `loadOptionGlossaries()`, pass `validateLabelUniqueness: true` when calling `loadOptionGlossary()` for the default language (line 42), and omit it (or pass `false`) for non-default languages (line 51).

#### 2. Test fixture — Create `duplicate_label_in_options_glossary` invalid config

Create directory: `test/config/mocks/invalid/customizationConfigDirs/duplicate_label_in_options_glossary/`

Copy the supporting trait and option_group files from the existing `duplicate_id_in_options_glossary` test case, then create a new `en/options/options.yaml` with unique IDs but a duplicate label, e.g.:

```yaml
options:
- id: red
  label: Red
- id: green
  label: Green
# Mistake: The label 'Red' is used on two different option IDs.
- id: scarlet
  label: Red
```

#### 3. Snapshot — Update error snapshot

Run the tests to regenerate `test/__snapshots__/api/loadCustomizationConfig/invalidDirectoryErrors.snap.json`. The new `duplicate_label_in_options_glossary` entry will be added automatically.
