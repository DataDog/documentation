---
title: Resource Renaming Rules
description: Rewrite APM resource names at intake with regular expressions to collapse high-cardinality resources, without changing tracer or Agent configuration.
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

Some services send resource names that contain IDs, such as `GET /users/39874984` or `GET /orders/8f14e45f-ceea-467a-9c3a-2f5e4c8b1d2a`. Each ID becomes its own resource, which causes the following problems:

- The service page lists thousands of resources that represent the same endpoint.
- The service reaches its resource cardinality limit, after which new resources, including legitimate ones, are no longer tracked.
- Trace metrics and monitors scoped to a resource lose their value.

Resource renaming rules let you fix this from the Datadog UI without changing tracer configuration, updating Agent settings, or redeploying code. Each rule is a regular expression and a replacement that Datadog applies at intake to rewrite the `resource_name` of incoming APM data.

| Original resource name | Pattern | Replacement | New resource name |
|------------------------|---------|-------------|-------------------|
| `GET /users/39874984` | `GET /users/\d+` | `GET /users/{user_id}` | `GET /users/{user_id}` |
| `POST /users/4987398` | `(GET\|POST\|PUT) /users/\d+` | `$1 /users/{user_id}` | `POST /users/{user_id}` |

<div class="alert alert-info">Each organization can contain up to 1,000 resource renaming rules.</div>

## Prerequisites

You must have the **APM Service Remapping Write** permission (`apm_service_renaming_write`) to create, edit, enable, disable, and delete resource renaming rules. Viewing rules requires the **APM Read** permission (`apm_read`). See [Permissions][1] for details on Datadog role-based access control.

Resource renaming rules apply at intake, so there is no tracer or Agent version requirement.

## Create a resource renaming rule

The following steps use a service named `web-store` as an example. The service reports thousands of resources such as `GET /api/v1/users/8f14e45f-ceea-467a-9c3a-2f5e4c8b1d2a/orders/12345`.

### Step 1: Identify the patterns to collapse

1. Find the resources that differ only by an ID. Signs of a resource cardinality issue include:
   - The **Resources** list on the [service page][2] shows many resources that differ only by an ID.
   - In the [Trace Explorer][3], filtering on `service:web-store` and grouping by `resource_name` shows a long tail of near-identical values, each with a few hits.
1. Look at several of these values and identify the variable parts. Common patterns include:

   | Kind | Example | Regular expression |
   |------|---------|--------------------|
   | Numeric ID | `12345` | `\d+` |
   | UUID | `8f14e45f-ceea-467a-9c3a-2f5e4c8b1d2a` | `[0-9a-fA-F-]{36}` |
   | Any path segment | `/users/jdoe42/details` | `/users/[^/]+/details` |
   | HTTP method (to keep) | `GET` | `(\w+)` or `(GET\|POST\|PUT\|DELETE)` |

1. Decide what the new resource name should look like. For example: `GET /api/v1/users/{user_id}/orders/{order_id}`.

### Step 2: Select the attribute and service to target

1. In Datadog, navigate to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Resource Rules{{< /ui >}}][4] and click {{< ui >}}Add rule{{< /ui >}}.

   Alternatively, open the service page, open the service configuration panel, and select the {{< ui >}}Resource Rules{{< /ui >}} tab. This prefills the service.
1. In {{< ui >}}Target an attribute and a service{{< /ui >}}:
   - {{< ui >}}Attribute{{< /ui >}} is set to `resource_name`.
   - For {{< ui >}}Service{{< /ui >}}, select the service to target, or leave the field empty to apply the rule to all services. Scope rules to a single service unless the pattern applies across all of your services.

**Note**: Use the service name as sent by the tracer, not a name set by a [service remapping rule][5].

### Step 3: Define the pattern

In {{< ui >}}Define the transformation{{< /ui >}}, enter a regular expression in the {{< ui >}}Pattern{{< /ui >}} field. For example:

```text
(\w+) /api/v1/users/[0-9a-fA-F-]{36}/orders/\d+
```

<div class="alert alert-warning">The pattern must match the entire resource name. Patterns are implicitly anchored at both ends, so <code>/users/\d+</code> does not match <code>GET /users/123</code>. Use <code>.*</code> or capture groups to cover the parts of the resource name you want to keep.</div>

When writing the pattern:

- Use [RE2 syntax][6]. Lookarounds such as `(?=...)` and `(?!...)`, and backreferences such as `\1`, are not supported.
- Write the pattern against the resource name as it appears in Datadog. Patterns apply after Datadog's built-in quantization and obfuscation.
- Toggle {{< ui >}}See examples{{< /ui >}} to view sample patterns.

As you type, a preview shows how the pattern applies to recent resource names:

- The preview samples up to 10,000 distinct `resource_name` values from spans received in the last 15 minutes for the selected service, or for all services.
- The preview shows how many of the sampled values match, with **Current value**, **New value**, and **Spans** columns.
- Select {{< ui >}}Matches only{{< /ui >}} to list only the values the pattern captures. Clear it to confirm that the pattern does not miss any values you expect it to capture. Values that the pattern does not capture show **No match**.

**Note**: If the service has not received spans in the last 15 minutes, the preview is empty. You can still save the rule.

### Step 4: Define the replacement

Enter the new resource name in the {{< ui >}}Replacement{{< /ui >}} field. For example:

```text
$1 /api/v1/users/{user_id}/orders/{order_id}
```

- Reference capture groups with `$1` through `$9`, or with `${name}` for named groups defined as `(?P<name>...)`. To place a digit directly after a group reference, use braces, for example `${1}2`.
- All other text is literal. Placeholders such as `{user_id}` or `<user_id>` have no special meaning; choose any format.
- An empty replacement is allowed and removes the matched text.

The {{< ui >}}New value{{< /ui >}} column of the preview shows the final resource name. Confirm that the matched values collapse into the expected resources, and that the rule does not merge distinct endpoints.

**Note**: Datadog applies only one rule to each resource name, and rules are not chained. If a resource name contains several IDs, such as a user ID and an order ID, use a single rule that handles all of them.

### Step 5: Review the impact

The {{< ui >}}Review the impact{{< /ui >}} section lists enabled APM monitors and `trace.*` metric monitors that filter or group on `resource_name`. If the rule targets a single service, the list includes only monitors for that service. The list identifies monitors that _might_ be affected, not monitors that are confirmed to be affected.

For each listed monitor, check whether it references a resource name that the rule rewrites. If it does, update the monitor to use the new resource name. Otherwise, the monitor stops receiving data for the old value.

Dashboards, SLOs, retention filters, and span-based metrics that filter on old resource names are not listed. Review and update these manually.

### Step 6: Save the rule

Click one of the following:

- {{< ui >}}Enable{{< /ui >}}: Saves the rule and starts applying it to new data.
- {{< ui >}}Save as draft{{< /ui >}}: Saves the rule without enabling it, so you can review it and enable it later.

After you enable a rule, _it may take a few minutes for it to take effect_. To confirm the rule is working, open a new span for the service in the Trace Explorer and check for the `renaming_rules.resource_name.original` and `renaming_rules.resource_name.rule` attributes.

## Resource renaming rules behavior

Resource renaming rules rewrite the `resource_name` of APM data at intake. Creating a rule does not change any tracer or Agent configuration.

- **Impacted data:** Resource renaming rules apply to APM spans (including the Trace Explorer, indexed spans, and span-based metrics) and trace metrics (`trace.*`). Only the `resource_name` attribute is supported.
- **Scope:** A rule applies to one service or to all services. Rules cannot be scoped by environment, operation name, or other tags.
- **Service matching:** The rule's service must exactly match the span's `base_service` if it has one, otherwise the span's `service`. Wildcards are not supported. Resource renaming rules apply before [service remapping rules][5].
- **Historical data:** Resource renaming rules apply only to data ingested while a rule is enabled. Past data is not updated retroactively. Disabling or deleting a rule stops it from applying to new data, but does not restore data ingested while it was enabled.
- **Original resource name:** Rewritten spans include `renaming_rules.resource_name.original`, which contains the original resource name, and `renaming_rules.resource_name.rule`, which contains the ID of the matching rule. You can filter spans on the original resource name. Because this attribute is high-cardinality, avoid using it in span-based metrics or monitor groupings. Trace metrics do not keep the original resource name.
- **Rule order:** Rules scoped to the span's service are evaluated first. Rules that apply to all services are evaluated only if no service-scoped rule matches. Within the same scope, rules have no defined order, so make sure rules for the same service do not overlap. Only one rule applies to each resource name.
- **Regular expressions:** Patterns use RE2 syntax and must match the entire resource name. Only the first match is replaced. Some RE2 patterns are not supported; if a pattern is rejected, the form displays an error. Patterns and replacements can each contain up to 5,000 characters.
- **Data is never dropped:** Resource renaming rules do not drop or sample data. If a rule cannot be applied, the resource name is left unchanged and the data is still ingested.
- **Dashboards and monitors:** Existing queries that reference old resource names are not automatically updated. Review and update these manually.
- **Agent-side quantization:** Resource renaming rules are an alternative to [replacing tags with `DD_APM_REPLACE_TAGS`][7] in the Agent. Agent-side rules require a configuration change and a redeploy on every host. Resource renaming rules apply at intake to all hosts at once and can be disabled at any time.

## Troubleshooting

### A rule does not rewrite resource names

1. Confirm that the rule is enabled. Draft rules are not applied.
1. Confirm that the pattern matches the entire resource name. Check the preview with {{< ui >}}Matches only{{< /ui >}} selected.
1. Confirm that the service matches the span's `base_service` or `service` exactly, and is not a name set by a service remapping rule.
1. Check whether another rule matches first. The `renaming_rules.resource_name.rule` attribute on the span shows which rule matched.
1. Confirm that you are looking at data ingested after the rule was enabled, and allow a few minutes for the rule to take effect.

### A monitor shows No Data after a rule is enabled

The monitor filters on a resource name that the rule rewrites. Update the monitor to use the new resource name, or disable the rule.

### The new resource name is missing after the rule is enabled

If the service had already reached its resource cardinality limit, the new resource name may not appear for up to about 40 minutes while the limit adjusts. No action is needed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: /tracing/services/service_page/
[3]: /tracing/trace_explorer/
[4]: https://app.datadoghq.com/apm/settings/renaming-rules
[5]: /tracing/services/service_remapping_rules/
[6]: https://github.com/google/re2/wiki/Syntax
[7]: /tracing/troubleshooting/quantization/
