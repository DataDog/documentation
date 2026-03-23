---
title: Cdocs e2e tests
---

This folder contains a collection of pages used for e2e tests. These pages are not published to production.

## Cdocs integration features

{% table %}
* Page
* Test objectives
---
* [Content filtering](/dd_e2e/cdocs/content_filtering)
* Tests for changes in content based on the user's filtering selections.
---
* Headings and TOC
* - The TOC is generated correctly based on the visible headings on the page.
  - Duplicate headings have their own unique IDs.
---
* Navigation and data persistence
* - When the user navigates to this page, any previous selections they made on other pages apply.
  - When the user navigates to this page, the default applies if their previous selection is not available.
{% /table %}

## Components

{% table %}
* Page
* Test objectives
---
* Snippeted components snapshot
* - All Markdoc-snippeted components initially render as expected (simple Playwright snapshot test).
---
* Stepper: Open
* - The stepper displays only the first step if its `open` attribute is `false` or not present.
  - The `stepper-finished` content is not displayed if the steps are not completed.
  - The stepper advances the active step when the user clicks `Next`.
  - The stepper rewinds when the user clicks `Previous`.
  - The user can expand the steps.
  - The user can collapse the steps, and their previous active step is preserved.
  - The user can manually set the active step by clicking a step title, allowing them to skip steps.
  - When all steps are completed, the `stepper-finished` content displays.
  - The `stepper-finished` content hides itself if the user manually rewinds the active step.
  - The user can reset the stepper.
  - All of the above steps also work using just keyboard navigation.
---
* Stepper: Closed
* - The stepper displays all steps on initial load.
  - The user can collapse the steps.
  - The stepper advances the active step when the user clicks `Next`.
  - The stepper rewinds when the user clicks `Previous`.
  - The user can expand the steps.
  - All of the above steps also work using just keyboard navigation.
{% /table %}