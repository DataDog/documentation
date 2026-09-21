---
title: Env Remapping Rules
description: Rename, merge, or split environments for APM spans with env remapping rules, without changing tracer configuration or redeploying code.
further_reading:
- link: "/tracing/services/service_remapping_rules/"
  tag: "Documentation"
  text: "Service remapping rules"
---

{{< callout url="https://www.datadoghq.com/product-preview/env-remapping/" header="Join the Preview!" >}}
Env remapping is in Preview. To request access, fill out this form.
{{< /callout >}}

## Overview

Update the `env` values of your services' APM spans without changing tracer configuration or redeploying code. Env remapping rules allow you to rename, merge, or split environments from the Datadog interface.

## Prerequisites

You must have the **APM Service Remapping Write** permission (`apm_service_renaming_write`) to create, edit, and delete env remapping rules. See [Permissions][1] for details on Datadog role-based access control.

## Create an env remapping rule

### Step 1: Select environments to target

1. In Datadog, navigate to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > {{< ui >}}Service Tags Remapping{{< /ui >}}. Click {{< ui >}}Add Env Rule{{< /ui >}}.
1. Use the search bar to select one or more environments to remap.

### Step 2: Specify a new environment name

In the text box, enter a unique name for the selected environment or environments. Alternatively, use tag values with the `{{tagName}}` syntax to remap based on an environment's tags. As you type, a preview of the new environment names appears.

If tag values follow a pattern, apply a regular expression to extract only the portion you want in the name.

**Note**: The preview is not an exhaustive list. If you are remapping an environment based on a tag with several values, only the values with the most spans appear in the preview.

### Step 3: Name your rule and review

1. Optionally, enter a descriptive name for the remapping rule so you can identify it later.
1. Review and save your remapping rule. After you save the rule, it may take about a minute to take effect.

## Env remapping rules behavior

Env remapping rules override the `env` tag at intake. Creating a rule does not change any preexisting configuration that specifies an environment name. Env remapping rules take precedence over all other environment name configurations.

- **Impacted telemetry:** Env remapping applies to APM spans only.
- **Historical data:** Env remapping rules apply only to telemetry ingested while a rule is active. Past data is not updated retroactively. Deleting or modifying a rule stops it from applying to new telemetry, but does not update previously ingested data.
- **Rule processing order:** Env remapping rules apply in the order in which they were created. Rules at the top of the env remapping list take precedence over rules below them. You can change the order of the rules.
- **Regular expressions:** Use regular expressions to define new environment names. Greedy quantifiers are not allowed inside the capture group.
- **Interaction with service remapping rules:** Env remapping rules apply after [service remapping rules][2]. If a service remapping rule modifies the `service` tag, env remapping uses the updated service name when applying an env remapping rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: /tracing/services/service_remapping_rules/
