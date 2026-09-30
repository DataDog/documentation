---
title: Prefill Form Fields with URL Query Parameters
description: Prefill form fields with URL query parameters so respondents skip questions the system already has answers to, including value formats, section-scoped fields, and precedence rules.
further_reading:
  - link: /actions/forms/
    tag: Documentation
    text: Forms
  - link: /actions/forms/components/
    tag: Documentation
    text: Form components
---

## Overview

Prefill a form's fields with URL query parameters passed in the form's link, so respondents don't have to answer questions the system, or the [workflow][2] that generated their link, already knows the answer to.

Forms also supports [default values][1], which set the same answer for every respondent instead of varying by link. When both are present, a query parameter takes precedence over a component's default value.

## Query parameters

Add a `field_` parameter to the form URL for each field you want to prefill:

```text
https://app.datadoghq.com/forms/<FORM_ID>?field_<FIELD_NAME>=<VALUE>
```

The `field_` prefix identifies the parameter as a prefill value. `<FIELD_NAME>` is the field's name, which you can view and edit under {{< ui >}}Advanced{{< /ui >}} in the component editor. Renaming a field to something short and semantic makes URLs easier to read and encode.

For example, a form that surveys incident responders might be sent by a workflow that already knows the incident number and team:

```text
https://app.datadoghq.com/forms/<FORM_ID>?field_incident_number=123456&field_team=SRE
```

The respondent opens the link with both fields populated and fills in only the remaining questions.

### Fields inside sections

A field inside a [section][3] must be addressed by its full path: the section name, a dot, then the field name.

```text
?field_<SECTION_NAME>.<FIELD_NAME>=<VALUE>
```

A bare field name is ignored for fields inside a section. For example:

```text
https://app.datadoghq.com/forms/<FORM_ID>?field_responder_details.team=SRE&field_incident_details.incident_number=123456
```

Top-level fields, which are not inside a section, are addressed by name alone.

### Value formats

Each field type accepts a specific value format:

| Component | Value format |
|-----------|--------------|
| Short answer, Paragraph | Any string. |
| Number input | A number, such as `42`. Fields restricted to whole numbers reject decimal values. |
| Toggle | `true` or `false`, in lowercase. Any other value is treated as `false`. |
| Dropdown, Radio buttons, Rating | A single option value. See [Use option values, not labels](#use-option-values-not-labels). |
| Checkboxes, Ranking | A comma-separated list of option values, such as `field_tags=a,b,c`. See [Use option values, not labels](#use-option-values-not-labels) and [Ranking order](#ranking-order). |
| Date picker | An ISO 8601 timestamp. See [Date values](#date-values). |

Image components cannot be prefilled.

{{% collapse-content title="Use option values, not labels" level="h4" id="use-option-values-not-labels" %}}
For Dropdown, Radio buttons, Rating, Checkboxes, and Ranking, the value in the URL must match the option's underlying **value**. It does not match the label shown to the respondent. To view or change option values, click the component, then click {{< ui >}}Advanced{{< /ui >}}.

For Rating components, the value is the number of the option, such as `1` through `5`. Changing a rating's labels does not change its underlying values.
{{% /collapse-content %}}

{{% collapse-content title="Date values" level="h4" id="date-values" %}}
Date picker fields store a full ISO 8601 timestamp, not a plain date. URL-encode the colons as `%3A`:

```text
?field_due_date=2026-08-10T14%3A30%3A00.000Z
```

{{% /collapse-content %}}

{{% collapse-content title="Ranking order" level="h4" id="ranking-order" %}}
For Ranking components, the order of the comma-separated values sets the ranked order. In the following example, `latency` is ranked first:

```text
?field_priorities=latency,cost,reliability
```
{{% /collapse-content %}}

### Values that are not applied

A `field_` parameter is ignored, without an error, when:

- The field name does not match a field in the form.
- The value is empty.
- The value does not match the field's type, such as text in a Number input field.
- The parameter addresses a whole section rather than a field inside it.

The rest of the form still loads, and any valid parameters are applied.

### Saved drafts take precedence

Forms saves a respondent's in-progress answers as a draft. If a respondent has a saved draft for a form, the draft is restored and **none** of the `field_` parameters are applied. This includes parameters for fields the draft left blank.

A draft is saved after the respondent edits a field. If you send a corrected link to someone who opened the earlier link but did not answer anything, the corrected values are applied. If they entered an answer, the corrected link has no visible effect until they click {{< ui >}}Clear form{{< /ui >}} and reload it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/forms/components/#default-values
[2]: /actions/workflows/
[3]: /actions/forms/components/#sections
