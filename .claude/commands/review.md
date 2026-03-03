Review my current changes against feedback patterns from my past PR reviews. Run `git diff` to get all staged and unstaged changes, then check each changed file thoroughly against every rule below. For each issue found, report the file, line, the problematic text, and the specific rule it violates with a suggested fix.

---

## 1. Writing Clarity and Conciseness

- **No circular statements**: Don't say "Replace X with its value." Be specific: "Replace X with your [specific thing]."
- **Tighten wordy instructions**: Cut unnecessary words. Prefer "click" over "click on". Prefer "to" over "in order to".
- **No repeated steps**: If a step is already described, don't restate it. Reference the earlier step instead.
- **No marketing language**: Remove words like "pulse", "seamless", "revolutionary", "powerful". Keep it factual.
- **Fix comma splices**: Two independent clauses joined only by a comma need a conjunction, semicolon, or to be split into separate sentences.
- **Punctuate long sentences**: Use commas to break up long sentences with multiple clauses so they're easier to parse.
- **Avoid double conjunctions**: Don't use two conjunctions ("for" and "where") in the same sentence.
- **Consistent terminology**: Don't switch between "Product Analytics users" and "users" when referring to different populations in the same sentence.
- **Spell out single-digit numbers**: Write "one", "two", "three" instead of "1", "2", "3" in prose (not in steps).

## 2. Formatting Consistency

- **Bold for UI elements**: Use **bold** for buttons, menu items, page names, and dropdown selections. Do NOT use monospace/code fences for UI elements unless they are actual code or config values.
- **Monospace for code**: Only use `backticks` for code, config values, API parameters, file paths, and CLI commands.
- **Heading style**: Use imperative verb phrases for headings ("Create a filter", not "Creating a filter"). Stay consistent across the page - don't mix gerund and imperative.
- **Sentence case for titles**: Use sentence case for page titles and section headings (capitalize only the first word and proper nouns).
- **Product names**: Capitalize product names as proper nouns in headings and body text (Pathways, Analytics Explorer, Fleet Automation, Session Replay).
- **List formatting**: Don't separate bulleted list items with commas, semicolons, or conjunctions. Each item should stand alone.
- **Consistent pluralization**: If terms are pluralized in headers/labels, make sure definitions match. Don't define a plural term with a singular definition.
- **Alt text**: Describe what the screenshot shows, not what the user should do. Alt text is for accessibility, not instruction. Example: "A view of the Segments page showing filter options" NOT "Click the filter button to see options".

## 3. Structure and Organization

- **Add intro sentences**: Don't start a section abruptly. Add a brief intro sentence before jumping into steps or details.
- **Smooth conceptual-to-procedural transitions**: When moving from explaining concepts to UI steps, add transitional language so users know they should start doing things.
- **Don't duplicate right-nav**: Hugo auto-generates a table of contents in the right nav. Don't manually add a TOC at the top of the page unless there's a strong reason.
- **Use note divs for important callouts**: Use `<div class="alert alert-info">` for notes that need visual distinction, not just bold text with a colon.
- **Match ordering**: If you list items in prose (A, B, C), list them in the same order in any corresponding table or UI walkthrough.
- **Prerequisites in dedicated sections**: Don't bury prerequisites in body text. Use a dedicated "Prerequisites" section or a callout.
- **Bold markdown in HTML**: Bold markdown (`**text**`) does NOT render inside HTML `<p>` tags. Use `<strong>` or `<em>` instead.

## 4. Accuracy and Precision

- **Match UI text exactly**: Button labels, page names, tab names, and menu items must match the UI precisely. If the UI says "Create Experiment", don't write "Make Experiment".
- **Verify links**: Check that anchor links match actual heading text (after Hugo slug generation). Check that external links point to the right pages.
- **Don't rely on aliases**: Use direct paths instead of relying on Hugo aliases when linking internally.
- **Verify version syntax**: When documenting version numbers, confirm whether they use dots (7.38.0) or dashes (7-38-0) in the specific context.
- **Consistent env var instructions**: If YAML configs include replacement instructions ("Replace X with..."), include the same instructions for environment variable formats too.
- **No placeholder images**: Verify that image paths point to actual, correct images - not placeholders like `dd-logo.png`.

## 5. Datadog Vale Style Guide

Check for these specific substitutions:

| Don't use | Use instead |
|-----------|-------------|
| once you / once the | after you / after the |
| fine-tune | customize, optimize, or refine |
| ensure / ensures | helps ensure |
| leverage | use, apply, take advantage of |
| utilize | use |
| in order to | to |
| easy / easily | (remove) |
| simple / simply | (remove) |
| just | (remove) |
| please | (remove) |
| via | with, through |
| Note that | **Note**: |
| drill down / drilldown | examine, investigate, analyze |
| refer to / visit | see, read, follow |
| obvious / obviously | (remove) |
| seamless / seamlessly | (remove) |
| quick / quickly | (remove) |
| click on | click |
| currently / now / will / won't | (remove temporal words) |

Also check:
- **No passive voice** in instructions. Use active, imperative voice: "Configure the Agent" not "The Agent should be configured".
- **No time-bound phrasing**: "not supported yet" should be "not supported". Don't promise future features.
- **No roadmap mentions**: Don't reference upcoming features or future plans.
- **No filler words**: Remove "very", "really", "basically", "actually" when they add no meaning.

## 6. Screenshots and Images

- **Obscure PII**: Check that screenshots don't contain internal names, email addresses, account names, or other personally identifiable information.
- **Readable screenshots**: Note if screenshots appear to have excessive white space or tiny text (suggest using Cmd+ to increase browser zoom before capture).
- **Descriptive alt text**: Alt text must describe the image content. Not empty, not instructional.
- **Correct image references**: Verify that `src=` paths in image shortcodes point to files that exist.

## 7. Navigation and Links

- **Nav yaml consistency**: If a page is renamed, ensure the nav yaml file reflects the change.
- **Include action buttons in steps**: When describing a multi-step process, don't skip the "click New/Create/Add" step.
- **Don't include system instructions**: Don't tell users how to paste (Ctrl+V / Cmd+V). Trust that users know basic OS operations.
- **Further Reading links**: Should point to external resources (blogs, related products), not to sub-pages of the current page (those belong in a "Next steps" section).

## 8. Content Safety

- **No internal information**: Don't expose internal team names, Slack channels, Jira tickets, or internal tools.
- **No empty ellipsis**: Remove trailing `...` from UI descriptions.
- **Remove HTML comments**: Delete `<!-- TODO -->` or similar comments before merging.
- **No "for example" fragments**: "For example, X for the Y site." is not a complete sentence. Rewrite as a full sentence.

---

After reviewing, provide a summary organized by severity:
1. **Must fix** - Errors that would be caught in review (wrong links, PII in screenshots, broken images, marketing language)
2. **Should fix** - Style guide violations and formatting inconsistencies
3. **Consider** - Suggestions for clarity and polish that would strengthen the content
