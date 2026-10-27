---
title: Resource Renaming Rules
description: Rewrite APM resource names in Datadog with regular expressions to collapse high-cardinality resources, without changing tracer or Agent configuration.
further_reading:
- link: "/tracing/services/service_remapping_rules/"
  tag: "Documentation"
  text: "Service remapping rules"
- link: "/tracing/troubleshooting/quantization/"
  tag: "Documentation"
  text: "Quantization of APM data"
---

{{< callout url="https://www.datadoghq.com/product-preview/resource-renaming-rules/" header="Join the Preview!" >}}
Resource renaming rules are in Preview. To request access, fill out this form.
{{< /callout >}}

## Overview

Collapse resources that differ only by an ID without changing tracer configuration, updating Agent settings, or redeploying code. Resource renaming rules use a regular expression and a replacement to rewrite the `resource_name` of APM data in Datadog, as the data is received (at intake). For example, a rule can rewrite `GET /users/39874984` and `GET /users/4987398` to a single `GET /users/{user_id}` resource, so the service page, trace metrics, and monitors track the endpoint instead of each ID.

<div class="alert alert-info">Each organization can contain up to 1,000 resource renaming rules.</div>

## Prerequisites

You must have the **APM Service Remapping Write** permission (`apm_service_renaming_write`) to create, edit, enable, disable, and delete resource renaming rules. See [Permissions][1] for details on Datadog role-based access control.

There is no tracer or Agent version requirement.

## Create a resource renaming rule

### Step 1: Select the service to target

1. In Datadog, navigate to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Resource Rules{{< /ui >}}][2] and click {{< ui >}}Add rule{{< /ui >}}.
1. Under {{< ui >}}Target an attribute and a service{{< /ui >}}, select the service to target, or leave the {{< ui >}}Service{{< /ui >}} field empty to apply the rule to all services. The {{< ui >}}Attribute{{< /ui >}} field is set to `resource_name`.
   - Select the service name as sent by the tracer, not a name set by a [service remapping rule][3].
   - Scope rules to a single service unless the pattern applies to all of your services.

### Step 2: Define the transformation

1. In the {{< ui >}}Pattern{{< /ui >}} field, enter a regular expression that matches the resource names to rewrite. For example, `(\w+) /api/v1/users/[0-9a-fA-F-]{36}/orders/\d+`.
   - The pattern must match the entire resource name. For example, `/users/\d+` does not match `GET /users/123`. Use `.*` or capture groups to cover the parts of the resource name you want to keep.
   - Patterns use [RE2 syntax][4]. Lookarounds and backreferences are not supported.
   - Write the pattern against the resource name as it appears in Datadog, after [quantization][5]. For example, Datadog replaces GUIDs with `{guid}` and numeric IDs of six or more digits with `{num}` before rules run.
   - Toggle {{< ui >}}See examples{{< /ui >}} to view sample patterns.
1. In the {{< ui >}}Replacement{{< /ui >}} field, enter the new resource name. For example, `$1 /api/v1/users/{user_id}/orders/{order_id}`.
   - Reference capture groups with `$1` through `$9`, or with `${name}` for named groups. To place a digit directly after a group reference, use braces, for example `${1}2`.
   - All other text is literal. Placeholders such as `{user_id}` have no special meaning.
1. Review the preview. As you type, the preview shows the current and new values of resource names sampled from spans and metrics received in the last 15 minutes. Select {{< ui >}}Matches only{{< /ui >}} to show only the values the pattern captures. Confirm that the matched values collapse into the expected resources, and that the rule does not merge distinct endpoints.

**Note**: Only one rule applies to each resource name, and rules are not chained. If a resource name contains several IDs, such as a user ID and an order ID, use a single rule that handles all of them.

### Step 3: Review the impact and save

1. Review the monitors listed under {{< ui >}}Review the impact{{< /ui >}}. These are APM monitors and `trace.*` metric monitors that filter or group on `resource_name`, and _might_ be affected by the rule. Update any monitor that references a resource name the rule rewrites.
1. Click {{< ui >}}Enable{{< /ui >}} to save the rule and apply it to new data, or click {{< ui >}}Save as draft{{< /ui >}} to save the rule without applying it. After you enable a rule, _it may take a few minutes for it to take effect_.

## Resource renaming rules behavior

Resource renaming rules work by rewriting the `resource_name` of APM data at intake. Creating a rule does not change any tracer or Agent configuration.

Resource renaming rules are applied to APM spans, including indexed spans and span-based metrics, and to trace metrics (`trace.*`).

- **Historical data:** Changes made by resource renaming rules affect only data ingested while a rule is enabled, and past data is not updated retroactively. Disabling or deleting a rule stops it from applying to new data, but does not restore resource names on previously ingested data.
- **Original resource name:** Rewritten spans keep the original resource name in the `renaming_rules.resource_name.original` attribute and the ID of the matching rule in the `renaming_rules.resource_name.rule` attribute. Trace metrics do not keep the original resource name. Because the original resource name is high-cardinality, avoid using it in span-based metrics or monitor groupings.
- **Rule order:** Rules scoped to a service are applied before rules that apply to all services. Rules within the same scope have no defined order, so make sure rules for the same service do not overlap. A resource name is rewritten only by the first rule that matches it.
- **Service matching:** A rule's service must exactly match the span's `base_service`, or the span's `service` if there is no `base_service`. Resource renaming rules are applied before [service remapping rules][3].
- **Regular expressions:** Patterns must match the entire resource name and are applied after Datadog's built-in quantization and obfuscation. Patterns and replacements can each contain up to 5,000 characters.
- **Dropped data:** Resource renaming rules do not drop or sample data. If a rule cannot be applied, the resource name is not changed.
- **Resource limits:** If a service has reached its resource limit, a new resource name may take up to about 40 minutes to appear after a rule is enabled.
- **Dashboards and monitors:** Existing queries that reference old resource names are not automatically updated. Review and update monitors, dashboards, SLOs, retention filters, and span-based metrics manually.
- **Agent-side quantization:** Resource renaming rules are an alternative to [replacing tags with `DD_APM_REPLACE_TAGS`][5] in the Agent. Resource renaming rules apply to all hosts at once, without an Agent configuration change or redeploy.

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/apm/settings/renaming-rules
[3]: /tracing/services/service_remapping_rules/
[4]: https://github.com/google/re2/wiki/Syntax
[5]: /tracing/troubleshooting/quantization/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
