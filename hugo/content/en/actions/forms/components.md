---
title: Form components
description: Reference for form component types, element options, validation rules, and conditional fields.
further_reading:
  - link: /actions/forms/
    tag: Documentation
    text: Forms
  - link: /actions/forms/guide/prefill/
    tag: Documentation
    text: Prefill form fields
---

## Overview

Forms are made up of components, which are individual question or input blocks. Each component has a set of configurable elements and optional validation rules. You can also set conditional logic on individual fields to show or hide them based on a respondent's previous answers.

## Component types

When building a form, click **Add Component** to get started. The following component types are available:

| Component | Description |
|-----------|-------------|
| Short answer | A single-line text input. |
| Paragraph | A multi-line text input. |
| Number input | A numeric input field. |
| Dropdown | A list of options where the respondent selects one. Supports static options or [dynamic options](#dynamic-dropdown-options). |
| Radio buttons | A list of options where the respondent selects one. |
| Checkboxes | A list of options where the respondent can select multiple. |
| Rating | A set of rating questions. |
| Toggle | A boolean on/off switch. |
| Ranking | A ranked ordering of a list of options. |
| Date picker | A calendar date selector. |
| Image | An image embedded in the form for context or instructions. |
| Section | A container that groups other components together, with optional conditions applied to the whole group. |

## Component elements

Each component has a set of configurable elements in the component editor:

| Element | Description |
|-----|-------------|
| {{< ui >}}Add a description{{< /ui >}} | An optional description displayed below the component question. |
| {{< ui >}}Required{{< /ui >}} | Toggle to determine whether the question requires an answer. Required questions are marked with a red asterisk. |
| {{< ui >}}Advanced{{< /ui >}} | Configure the field name, placeholder text, [default value](#default-values), and option values for the component. |
| {{< ui >}}Rules{{< /ui >}} | Configure validation rules to restrict the values respondents can submit. See [Validation rules](#validation-rules). |
| {{< ui >}}Conditions{{< /ui >}} | Configure conditional logic to show or hide the component based on a respondent's previous answers. See [Conditional fields](#conditional-fields). |
| {{< ui >}}Style{{< /ui >}} | Change the component type while preserving its existing options. For example, switch a dropdown to checkboxes without removing and recreating the component. |

## Validation rules

You can configure validation rules on individual components to restrict the values respondents can submit.

For short answer and paragraph components, you can set a minimum and maximum character length, or restrict input to a specific pattern: email, URL, alphanumeric, or a custom regex.

For number input components, you can set a minimum and maximum value.

## Default values

A default value prefills a component with the same answer for every respondent. For example, you might default a rating field to `3` so respondents adjust it only when their answer differs.

To set a default value:
1. Click a component to open its editor panel.
1. Click {{< ui >}}Advanced{{< /ui >}}.
1. Enter a value in the {{< ui >}}Default Value{{< /ui >}} field.

Default values are available on Short answer, Paragraph, Number input, Dropdown, Rating, and Toggle components. As with query parameters, the value must match the option's underlying value rather than its label.

To prefill values that vary by respondent, use URL query parameters instead. For more information, see [Prefill form fields][1].

## Conditional fields

Conditional fields let you show or hide a question based on a respondent's answer to a previous question. For example, you can show a follow-up question only when a respondent selects a specific option from a dropdown.

To configure a conditional field:
1. Click a component to open its editor panel.
1. Click {{< ui >}}Conditions{{< /ui >}}.
1. Click {{< ui >}}Add Condition{{< /ui >}} and define the rule.
1. Click {{< ui >}}Save{{< /ui >}}.

You can also view conditions in the {{< ui >}}Fields{{< /ui >}} panel by clicking the <i class="icon-source-control-branch-wui" style="display:inline-block;transform:rotate(180deg)"></i> branch icon.

## Sections

Sections let you group components together within a form. For example, you might create one section for personal information and another for preferences. You can drag and drop components between sections to reorganize a form.

You can also configure conditional logic at the section level, showing or hiding an entire section based on a respondent's answer to a previous question, in addition to setting conditions on individual components. See [Conditional fields](#conditional-fields).

To add a section:
1. In the form, click {{< ui >}}\+ Add{{< /ui >}}.
1. Click {{< ui >}}Section{{< /ui >}}.
1. Drag existing components into the section, or add new components directly within it.
1. To set conditions on the section, click the section, then click {{< ui >}}Conditions{{< /ui >}} and define the rule.

## Pages

Pages split a form into multiple screens that respondents complete in order. Use pages to break up a long form, or to show a whole screen of questions only when a respondent's earlier answer calls for it.

A page can contain both fields and [sections](#sections). Pages are all-or-nothing. A form with pages cannot have fields at the root of the form. Adding a first page moves the form's existing fields onto it.

Pages appear in the {{< ui >}}Pages{{< /ui >}} panel on the left side of the form editor, alongside the form's [start and end pages][2]. Click a page to show only that page in the canvas.

### Add, delete, and reorder pages

To add a page, in the {{< ui >}}Pages{{< /ui >}} panel, click {{< ui >}}\+ Page{{< /ui >}}.

To move a field to a different page, drag it onto that page in the {{< ui >}}Pages{{< /ui >}} panel.

To delete a page, hover over it in the {{< ui >}}Pages{{< /ui >}} panel and click the trash <i class="icon-trash"></i> icon. Because a page holds fields, Datadog asks what to do with them:

| Option | Description |
|--------|-------------|
| Merge fields and delete page | Moves the page's fields onto another page, then deletes the page. Choose the destination page in the modal. |
| Delete page and all fields | Deletes the page and every field on it. |

If the fields on a page control whether other pages are shown, there is no safe destination to merge into. In that case, only {{< ui >}}Delete page and all fields{{< /ui >}} is available.

### Validation across pages

Validation runs one page at a time. A respondent cannot advance to the next page until every [validation rule](#validation-rules) and required field on the current page passes. Because of this, responses are submitted progressively as respondents move through the form.

### Conditional pages

You can show or hide an entire page based on a respondent's answer to an earlier question, the same way you can for a field or a section. See [Conditional fields](#conditional-fields).

Conditions flow in one direction: a field can control whether a page is shown, but a page cannot control whether a field is shown. The controlling field must also be on an earlier page than the page it controls.

## Dynamic dropdown options

Dropdown components can fetch options dynamically from Datadog tag values at runtime. Dynamic options update automatically as your tag values change, without requiring manual edits to the form.

To configure dynamic options:
1. Click a dropdown component to open its editor panel.
1. Click {{< ui >}}Advanced{{< /ui >}}.
1. Under {{< ui >}}Options source{{< /ui >}}, select {{< ui >}}Dynamic{{< /ui >}}.
1. Select the tag key to use as the source of options.
1. Optionally, configure substring filtering or cross-tag scope constraints.
1. Click {{< ui >}}Save{{< /ui >}}.

## JSON editor

In addition to the visual component editor, you can edit the underlying JSON Schema of the form directly. In the {{< ui >}}Fields{{< /ui >}} panel, click the <i class="icon-dev-code"></i> code icon to open the JSON code editor.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/forms/guide/prefill/
[2]: /actions/forms/#customize-start-and-end-pages
