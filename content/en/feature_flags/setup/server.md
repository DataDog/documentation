---
title: Server-Side Feature Flags
description: Set up Datadog Feature Flags for server-side applications.
further_reading:
- link: "/feature_flags/setup/"
  tag: "Documentation"
  text: "Feature Flags Setup"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Datadog Feature Flags for server-side applications allow you to remotely control feature availability, run experiments, and roll out new functionality with confidence. Server-side SDKs integrate with the Datadog APM tracer and use Remote Configuration to receive flag updates in real time.

This guide covers the common setup required for all server-side SDKs, including Agent configuration and application environment variables.

## Prerequisites

Before setting up server-side feature flags, ensure you have:

- **Datadog Agent 7.55 or later** installed and running
- **Datadog API key** configured
- **APM tracing** enabled in your application

## Agent configuration

Server-side feature flags use [Remote Configuration][1] to deliver flag configurations to your application. Enable Remote Configuration in your Datadog Agent by setting `DD_REMOTE_CONFIGURATION_ENABLED=true` or adding `remote_configuration.enabled: true` to your `datadog.yaml`.

See the [Remote Configuration documentation][1] for detailed setup instructions across different deployment environments.

### Polling interval

The Agent polls Datadog for configuration updates at a configurable interval. This interval determines the average time between making a flag change in the UI and the change becoming available to your application.

{{< code-block lang="bash" >}}
# Optional: Configure polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

[1]: /remote_configuration

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
{{< /code-block >}}

<div class="alert alert-info">Some SDKs require additional experimental flags to enable feature flagging. See the SDK-specific documentation for details.</div>

## Available SDKs

Select your language or framework to view SDK-specific setup instructions:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/feature_flags/setup/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/nodejs" >}}Node.js{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/ruby" >}}Ruby{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
