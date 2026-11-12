---
title: Set Up Agent-Based Feature Flags Without APM Tracing or Infrastructure Monitoring
description: Use server-side Feature Flags with APM tracing and Infrastructure Monitoring turned off.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/agent/configuration/infrastructure-modes/"
  tag: "Documentation"
  text: "Agent Infrastructure Modes"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
---

## Overview

Server-side Feature Flags can be deployed using the Datadog SDK and the Datadog Agent. By default, this setup also sends [APM][1] traces and [Infrastructure Monitoring][2] data. To only evaluate feature flags, turn both off.

With APM tracing turned on, you can compare error rates and latency for each flag variant during a canary rollout, which helps you spot problems before a full release.

This guide explains how to disable APM tracing and Infrastructure Monitoring.

## Prerequisites

- **Datadog Agent**: [Install the Agent][3]. Turning off Infrastructure Monitoring requires Agent version 7.77.0 or later.
- **Remote Configuration**: Flag configuration reaches your service through [Remote Configuration][4]. It must be enabled for your organization and for the API key the Agent uses.
- **Supported SDK**: Set up your service for [server-side Feature Flags][5]. Tracing is turned off through the [Datadog SDK configuration][6], as described in the following steps.

## Setup

Setup takes two configuration changes: one on the Datadog Agent and one on your service.

### Disable Infrastructure Monitoring on the Datadog Agent

Use the same Agent installation that you use for APM. Set the infrastructure mode to `none` with either of these options:

- Environment variable: `DD_INFRASTRUCTURE_MODE=none`
- `datadog.yaml` setting: `infrastructure_mode: none`

In this mode, the Agent doesn't run infrastructure checks or send system metrics. For more information, see [Agent infrastructure modes][7].

<div class="alert alert-warning">Don't turn off APM on the Agent (<code>DD_APM_ENABLED=false</code>). Your service gets flag configuration through the Agent's trace port (<code>8126</code> by default). If APM is off on the Agent, that port closes and every flag evaluation returns its default value. Your service doesn't send any traces, because you turn off tracing in the following section.</div>

### Disable tracing and enable feature flags on the service

Set these environment variables on the service:

{{< code-block lang="bash" >}}
DD_TRACE_ENABLED=false
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
DD_ENV=<YOUR_ENVIRONMENT>

# Required only if the Agent runs on a different host than the service
DD_AGENT_HOST=<AGENT_ADDRESS>
{{< /code-block >}}

`DD_TRACE_ENABLED=false` turns tracing off, so the service sends no traces. The SDK still receives flag configuration through Remote Configuration, so flag evaluation keeps working.

`DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` tells the SDK to get flag configuration from the Agent. Without it, supported SDKs default to agentless delivery, which doesn't use the Agent.

`DD_ENV` must match one of the environments set up for your flags in Datadog. If it doesn't match, flags return their default values.

<div class="alert alert-info">PHP, and SDK versions earlier than Java 1.66.0, Node.js 6.12.0, Python 4.14.0, .NET 3.54.0, Go 2.11.0, and Ruby 2.44.0, don't support <code>DD_FEATURE_FLAGS_CONFIGURATION_SOURCE</code>. For these SDKs, set <code>DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true</code> instead. For more information, see <a href="/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup">Migrate an existing Remote Configuration setup</a>.</div>

## Verify the setup

After you restart the Agent and the service, confirm the following:

1. **Flags evaluate as expected**: Evaluate a flag that has a non-default variant targeted to the service's environment. The service returns the targeted variant, not the default value.
2. **The service sends no traces**: In the [Trace Explorer][9] Live Search view, filter by the service name and environment. No new spans appear for the service.
3. **The Agent sends no infrastructure metrics**: In the [Infrastructure List][8], the host doesn't report system metrics such as CPU or memory.

If every flag returns its default value, confirm that APM is enabled on the Agent, that `DD_ENV` matches a flag environment, and that the service can reach the Agent on port `8126`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /infrastructure/
[3]: /agent/
[4]: /remote_configuration/
[5]: /feature_flags/server/
[6]: /tracing/trace_collection/library_config/
[7]: /agent/configuration/infrastructure-modes/
[8]: https://app.datadoghq.com/infrastructure/hosts
[9]: https://app.datadoghq.com/apm/traces
