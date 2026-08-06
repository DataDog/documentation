---
title: Form components
description: Reference for form component types, element options, validation rules, and conditional fields.
further_reading:
  - link: /actions/forms/
    tag: Documentation
    text: Forms
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
| {{< ui >}}Advanced{{< /ui >}} | Configure the placeholder text and default value for the component. |
| {{< ui >}}Rules{{< /ui >}} | Configure validation rules to restrict the values respondents can submit. See [Validation rules](#validation-rules). |
| {{< ui >}}Conditions{{< /ui >}} | Configure conditional logic to show or hide the component based on a respondent's previous answers. See [Conditional fields](#conditional-fields). |
| {{< ui >}}Style{{< /ui >}} | Change the component type while preserving its existing options. For example, switch a dropdown to checkboxes without removing and recreating the component. |

## Validation rules

You can configure validation rules on individual components to restrict the values respondents can submit.

For short answer and paragraph components, you can set a minimum and maximum character length, or restrict input to a specific pattern: email, URL, alphanumeric, or a custom regex.

For number input components, you can set a minimum and maximum value.

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
1. In the form, click {{< ui >}}+ Add{{< /ui >}}.
1. Click {{< ui >}}Section{{< /ui >}}.
1. Drag existing components into the section, or add new components directly within it.
1. To set conditions on the section, click the section, then click {{< ui >}}Conditions{{< /ui >}} and define the rule.

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
