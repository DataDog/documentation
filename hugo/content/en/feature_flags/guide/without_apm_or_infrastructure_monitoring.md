---
title: Set Up Agent-Based Feature Flags Without APM or Infrastructure Monitoring
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

Server-side Feature Flags can be deployed using the Datadog SDK and the Datadog Agent. By default, this setup also sends [APM][1] traces and [Infrastructure Monitoring][2] data. If you only want to evaluate feature flags, you can turn both off.

With APM turned on, you can compare error rates and latency for each flag variant during a canary rollout. This helps you spot problems before you release to everyone.

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

<div class="alert alert-warning">Don't turn off APM on the Agent (<code>DD_APM_ENABLED=false</code>). Your service gets flag configuration through the Agent's trace port (<code>8126</code> by default). If APM is off on the Agent, that port closes and every flag evaluation returns its default value. Your service still doesn't send any traces, because tracing is turned off in the next step.</div>

### Disable tracing and enable feature flags on the service

Set these environment variables on the service:

{{< code-block lang="bash" >}}
DD_TRACE_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

`DD_TRACE_ENABLED=false` turns tracing off, so the service sends no traces. Flag evaluation keeps working, because the SDK still receives flag configuration through Remote Configuration.

`DD_ENV` must match one of the environments set up for your flags in Datadog. If it doesn't match, flags return their default values.

If the Agent isn't on the same host as the service, also set `DD_AGENT_HOST` to the Agent's address.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /infrastructure/
[3]: /agent/
[4]: /remote_configuration/
[5]: /feature_flags/server/
[6]: /tracing/trace_collection/library_config/
[7]: /agent/configuration/infrastructure-modes/
