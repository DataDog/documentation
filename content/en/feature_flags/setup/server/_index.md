---
title: Server-Side Feature Flags
description: Set up Datadog Feature Flags for server-side applications.
further_reading:
- link: "/feature_flags/setup/"
  tag: "Documentation"
  text: "Feature Flags Setup"
- link: "/agent/"
  tag: "Documentation"
  text: "Datadog Agent"
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

Server-side feature flags use Remote Configuration to deliver flag configurations to your application. Enable Remote Configuration in your Datadog Agent.

### Configuration file

Add the following to your `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
# Enable Remote Configuration
remote_configuration:
  enabled: true

# Your Datadog API key
api_key: <YOUR_API_KEY>
{{< /code-block >}}

### Environment variables

Alternatively, configure the Agent using environment variables:

{{< code-block lang="bash" >}}
# Enable Remote Configuration
DD_REMOTE_CONFIGURATION_ENABLED=true

# Your Datadog API key
DD_API_KEY=<YOUR_API_KEY>

# Optional: Configure polling interval (default: 5s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=5s
{{< /code-block >}}

### Docker

When running the Agent in Docker, pass the environment variables:

{{< code-block lang="bash" >}}
docker run -d \
  -e DD_API_KEY=<YOUR_API_KEY> \
  -e DD_REMOTE_CONFIGURATION_ENABLED=true \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  gcr.io/datadoghq/agent:latest
{{< /code-block >}}

### Kubernetes

For Kubernetes deployments, add the configuration to your Agent manifest:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-agent-config
data:
  datadog.yaml: |
    remote_configuration:
      enabled: true
{{< /code-block >}}

Or set environment variables in your Agent deployment:

{{< code-block lang="yaml" >}}
env:
  - name: DD_REMOTE_CONFIGURATION_ENABLED
    value: "true"
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        name: datadog-secrets
        key: api-key
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
{{< /code-block >}}

<div class="alert alert-info">Some SDKs require additional experimental flags to enable feature flagging. See the SDK-specific documentation for details.</div>

## Available SDKs

Select your language or framework to view SDK-specific setup instructions:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/feature_flags/setup/server/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/server/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/server/nodejs" >}}Node.js{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/server/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/feature_flags/setup/server/ruby" >}}Ruby{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
