---
title: Troubleshoot Sensitive Data Scanner
description: Troubleshoot common Sensitive Data Scanner issues, including scanning rules that do not match data as expected and obfuscation actions that are unavailable.
further_reading:
- link: "/security/sensitive_data_scanner/setup/telemetry_data/"
  tag: "Documentation"
  text: "Set up Sensitive Data Scanner for Telemetry Data"
---

## A scanning rule does not match data as expected

If a Sensitive Data Scanner rule does not match data that you expect it to match, check the following causes:

- **Numeric values**: Sensitive Data Scanner does not scan integer, float, or double values. To scan a numeric value, store it as a string.
- **Attribute paths**: The `@` prefix used in log search queries is not supported in attribute path fields. Use `function.request.body.password`, not `@function.request.body.password`.
- **Tags**: Sensitive Data Scanner cannot scan tags directly. To scan a tag, remap the tag to an attribute first, and then scan the attribute. See [Redact sensitive data in tags][1] for the steps.

## An obfuscation action is unavailable

The Sensitive Data Scanner obfuscation actions are **Redact**, **Partially redact**, **Hash**, and **Mask**. If you cannot select one of these actions, check the following causes:

- **Sampling is enabled**: The **Redact**, **Partially redact**, **Hash**, and **Mask** actions are not available when a scanning group has sampling enabled. To use these actions, disable sampling in the scanning group settings so that all data matching the group query filter is scanned.
- **Mask is supported for logs only**: The **Mask** action is not available for APM, RUM, or Event Management data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/setup/telemetry_data/#redact-sensitive-data-in-tags
