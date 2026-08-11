---
title: Prefill form fields
description: Prefill form fields with default values or URL query parameters to reduce the work respondents have to do.
further_reading:
  - link: /actions/forms/
    tag: Documentation
    text: Forms
  - link: /actions/forms/components/
    tag: Documentation
    text: Form components
---

## Overview

You can prefill a form's fields so respondents start with answers already filled in. Forms supports two approaches:

- **Default values**: Set the same value for every respondent. Configured on the component in the form editor. See [Default values][1].
- **URL query parameters**: Set values that vary by respondent or context, passed in the form's link. Useful when a [workflow][2] generates the link and already knows some of the answers.

When both are present, a query parameter takes precedence over a component's default value.

## Prefill with URL query parameters

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
| Dropdown, Radio buttons, Rating | A single option value. Must match one of the component's options. |
| Toggle | `true` or `false`, in lowercase. Any other value is treated as `false`. |
| Checkboxes, Ranking | A comma-separated list of option values, such as `field_tags=a,b,c`. |
| Date picker | An ISO 8601 timestamp. See [Date values][4]. |

Image components cannot be prefilled.

#### Use option values, not labels

For Dropdown, Radio buttons, Rating, Checkboxes, and Ranking, the value in the URL must match the option's underlying **value**. It does not match the label shown to the respondent. To view or change option values, click the component, then click {{< ui >}}Advanced{{< /ui >}}.

For Rating components, the value is the number of the option, such as `1` through `5`. Changing a rating's labels does not change its underlying values.

#### Date values

Date picker fields store a full ISO 8601 timestamp, not a plain date. URL-encode the colons as `%3A`:

```text
?field_due_date=2026-08-10T14%3A30%3A00.000Z
```

#### Ranking order

For Ranking components, the order of the comma-separated values sets the ranked order. In the following example, `latency` is ranked first:

```text
?field_priorities=latency,cost,reliability
```

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

## Default values

A default value prefills the same answer for every respondent. For example, you might default a rating field to `3` so respondents adjust it only when their answer differs.

To set a default value:
1. Click a component to open its editor panel.
1. Click {{< ui >}}Advanced{{< /ui >}}.
1. Enter a value in the {{< ui >}}Default Value{{< /ui >}} field.

Default values are available on Short answer, Paragraph, Number input, Dropdown, Rating, and Toggle components. As with query parameters, the value must match the option's underlying value rather than its label.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: #default-values
[2]: /actions/workflows/
[3]: /actions/forms/components/#sections
[4]: #date-values
