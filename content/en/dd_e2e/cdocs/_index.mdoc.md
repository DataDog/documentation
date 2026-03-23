---
title: Cdocs e2e tests
---

This folder contains a collection of pages used for e2e tests. These pages are not published to production.

## Cdocs integration features

{% table %}
* Page
* Test objective
---
* [Content filtering](/dd_e2e/cdocs/content_filtering)
* The content changes based on the user's filtering selections.
---
* [Headings and TOC](/dd_e2e/cdocs/headings_and_toc)
* The TOC (right nav) is correct for any given filter selection.
---
* Navigation and data persistence (TODO)
* - When the user navigates to this page, any previous selections they made on other pages apply.
  - When the user navigates to this page, the default applies if their previous selection is not available.
{% /table %}

## Components

{% table %}
* Page
* Test objective
---
* Snippeted components snapshot
* All Markdoc-snippeted components initially render as expected (simple Playwright snapshot test).
---
* Stepper: Closed
* The closed stepper behaves as expected.
---
* Stepper: Open
* - The stepper displays all steps on initial load.
  - The user can collapse the steps.
  - The stepper advances the active step when the user clicks `Next`.
  - The stepper rewinds when the user clicks `Previous`.
  - The user can expand the steps.
  - All of the above steps also work using just keyboard navigation.
{% /table %}