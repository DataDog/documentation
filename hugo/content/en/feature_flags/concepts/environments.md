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

Environments represent different deployment stages or modes in your software delivery life cycle, such as Development, Staging, and Production. Flag configuration is isolated by environment. A flag can be enabled, disabled, overridden, or given targeting rules in one environment without affecting other environments.

## Manage environments

Manage environments from **Feature Flags > Settings > Environments**:

{{< img src="feature_flags/concepts/environments-list-2.png" alt="Environments list in Feature Flags settings." style="width:100%;" >}}

### Add an environment

1. Navigate to [**Feature Flags > Settings > Environments**][1].
2. Click **Create Environment**.
3. Configure the environment name, queries, and whether it is a production environment.

### Edit an environment

1. Navigate to [**Feature Flags > Settings > Environments**][1].
2. Click the environment you want to edit.
3. Update the environment settings and save.

### Delete an environment

1. Navigate to [**Feature Flags > Settings > Environments**][1].
2. Hover over the environment you want to delete, then click the trash icon.

## Default environments

By default, Datadog creates three environments for your organization:

- **Development**
- **Staging**
- **Production**

You can modify these environments or add new ones to match how your team deploys code.

## Production environments

Mark an environment as **production** to indicate that changes in that environment can affect customers. Production environments support additional governance controls, such as required change approvals.

## Environment queries

Each environment is configured with a **name** and a set of **queries**. Queries are the `env` or `DD_ENV` strings your applications send at runtime.

Having multiple queries per environment lets you keep the `env` value consistent with the environment you pass to RUM, APM, or StatsD. For example, you might have `staging-eu` and `staging-us` as separate `env` values in your telemetry, but map both to a single **Staging** environment in Feature Flags. That way, you do not need to duplicate flag configuration across multiple Staging environments when you want to enable a flag across all of Staging.

## Connect environments in the SDK

The `env` value you use must match a query configured for the Feature Flags environment you want, such as `staging-us` or `production`. If you already set `env` or `DD_ENV` for RUM, APM, or tracing, use the *same value* for Feature Flags.

### Client-side applications

Set `env` when you initialize the Datadog OpenFeature provider (same value as RUM):

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.com',
  env: 'staging-us', // Must match an environment query in Feature Flags
  service: '<SERVICE_NAME>',
  version: '1.0.0',
});

await OpenFeature.setProviderAndWait(provider);
```

### Server-side applications

Set `DD_ENV` in your deployment environment (shell, container, or orchestrator), not in application code:

{{< code-block lang="bash" >}}
export DD_ENV=staging-us  # Must match an environment query in Feature Flags
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

This applies to Python, Go, Java, Node.js, Ruby, and .NET server SDKs. See [Server-Side Feature Flags](/feature_flags/server/) for language-specific setup.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags/settings/environments
