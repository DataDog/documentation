---
title: Server-Side Feature Flags
description: Set up Datadog Feature Flags for server-side applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview

Datadog Feature Flags for server-side applications allow you to remotely control feature availability, run experiments, and roll out new functionality with confidence. Server-side SDKs integrate with the Datadog APM tracer and use Remote Configuration to receive flag updates in real time.

This guide covers the common setup required for all server-side SDKs, including Agent configuration and application environment variables. Select your language or framework to view SDK-specific setup instructions:

{{< partial name="feature_flags/feature_flags_server.html" >}}

## Prerequisites

Before setting up server-side feature flags, ensure you have:

- **Datadog Agent 7.55 or later** installed and running
- **Datadog API key** configured
- **APM tracing** enabled in your application
- **Remote Configuration** enabled for your organization. Verify this in [Organization Settings][2].

## Agent configuration

Server-side feature flags use [Remote Configuration][1] to deliver flag configurations to your application. Enable Remote Configuration in your Datadog Agent by setting `DD_REMOTE_CONFIGURATION_ENABLED=true` or adding `remote_configuration.enabled: true` to your `datadog.yaml`.

See the [Remote Configuration documentation][1] for detailed setup instructions across different deployment environments.

### Polling interval

The Agent polls Datadog for configuration updates at a configurable interval. This interval determines the average time between making a flag change in the UI and the change becoming available to your application.

{{< code-block lang="bash" >}}
# Optional: Configure polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## Application configuration

Configure your application with the standard Datadog environment variables. These are common across all server-side SDKs:

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Agent connection (if not using default localhost:8126)
DD_AGENT_HOST=localhost
DD_TRACE_AGENT_PORT=8126

# Enable Remote Configuration in the tracer
DD_REMOTE_CONFIG_ENABLED=true

# Enable the feature flagging provider (required for most SDKs)
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
{{< /code-block >}}

<div class="alert alert-warning">The <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code> environment variable is required to enable the feature flagging provider. Java also supports the system property <code>-Ddd.experimental.flagging.provider.enabled=true</code>, and Ruby and Node.js support code-based configuration as an alternative. See the SDK-specific documentation for details.</div>

## Context attribute requirements

<div class="alert alert-warning">
Evaluation context attributes must be flat primitive values (strings, numbers, booleans). Nested objects and arrays are <strong>not supported</strong> and will cause exposure events to be silently dropped.
</div>

Use flat attributes in your evaluation context:

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID,
  companyId: req.session?.companyID,
  tier: 'enterprise'
};

const value = client.getBooleanValue('my-flag', false, evaluationContext);
{{< /code-block >}}

Avoid nested objects and arrays:

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: req.session?.userID,
  company: { id: req.session?.companyID },  // nested object - NOT SUPPORTED
  roles: ['admin', 'user']                   // array - NOT SUPPORTED
};
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration
[2]: https://app.datadoghq.com/organization-settings/remote-config
