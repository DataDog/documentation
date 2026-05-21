---
title: Environments
description: Learn how Datadog Feature Flags environments isolate flag configuration across deployment stages.
further_reading:
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "/feature_flags/concepts/variants_and_flag_types"
  tag: "Documentation"
  text: "Variants and Flag Types"
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
---

## Overview

Environments represent different deployment stages or modes in your software delivery lifecycle—for example, Development, Staging, and Production. Flag configuration is isolated by environment: a flag can be enabled, disabled, overridden, or given targeting rules in one environment without affecting other environments.

## Default environments

By default, Datadog creates three environments for your organization:

- **Development**
- **Staging**
- **Production**

You can modify these environments or add new ones to match how your team ships code.

## Production environments

Mark an environment as **production** to indicate that changes in that environment can affect customers. Production environments support additional governance features, such as [approvals][1].

## Environment queries and the env string

Each environment is configured with a **name** and a set of **queries**. When you initialize your Feature Flags SDK, provide an `env` string that matches one of the environment queries for that environment.

Having multiple queries per environment lets you keep the `env` value consistent with the environment you pass to RUM, APM, or StatsD. For example, you might have `staging-eu` and `staging-us` as separate `env` values in your telemetry, but map both to a single **Staging** environment in Feature Flags. That way, you do not need to duplicate flag configuration across multiple Staging environments when you want to enable a flag across all of staging.

## Manage environments

### Add an environment

1. Navigate to [**Feature Flags > Settings > Environments**][2].
2. Click **Create Environment**.
3. Configure the environment name, queries, and whether it is a production environment.

### Edit an environment

1. Navigate to [**Feature Flags > Settings > Environments**][2].
2. Hover over the environment you want to edit, then click the pencil icon.
3. Update the environment settings and save.

### Delete an environment

1. Navigate to [**Feature Flags > Settings > Environments**][2].
2. Hover over the environment you want to delete, then click the trash icon.

{{< img src="getting_started/feature_flags/environments-list.png" alt="Environments list in Feature Flags settings" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/approvals/
[2]: https://app.datadoghq.com/feature-flags/settings/environments
