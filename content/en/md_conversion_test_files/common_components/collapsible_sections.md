---
title: Collapsible Sections
---

## Expected .md output

- Each section is enclosed in `{% collapsible-section %}` and `{% /collapsible-section %}` tags. Any attributes, like `title`, are included in the tag.

## Example inputs

### Details

This content is outside the `details` tag.

<details>
  <summary>Details</summary>
  This content would be hidden inside the details panel.
</details>

This content is outside the `details` tag.

### Collapse content

This content is outside the `content-collapse` block.

{{% collapse-content title="Datadog Operator" level="h4" expanded=false id="id-for-anchoring" %}}
This content is inside the `content-collapse` block.
{{% /collapse-content %}} 

This content is outside the `content-collapse` block.