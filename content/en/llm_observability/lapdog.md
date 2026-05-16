---
title: Lapdog
description: "Run an LLM Observability dashboard locally to inspect coding-agent and application traces in your browser without a Datadog account."
further_reading:
    - link: 'https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md'
      tag: 'GitHub'
      text: 'Lapdog install and usage guide'
    - link: '/llm_observability/instrumentation/sdk'
      tag: 'Documentation'
      text: 'Instrument your application with the LLM Observability SDK'
    - link: '/llm_observability/instrumentation/auto_instrumentation'
      tag: 'Documentation'
      text: 'Auto-instrumentation for LLM Observability'
---

## Overview

Lapdog is a local development tool for LLM Observability. It runs an agent on `localhost:8126` that captures every span, prompt, tool call, and cost from your LLM application — or from a coding agent like Claude Code or Pi — and streams them into a browser dashboard at [lapdog.datadoghq.com](https://lapdog.datadoghq.com). No Datadog account is required.

Lapdog is built on the open-source [Datadog APM test agent][1]. It can also forward captured telemetry to Datadog so the same data appears in LLM Observability alongside your production traffic.

## What you get

- Per-session traces with prompts, tool calls, and responses
- Token usage and estimated cost, broken down by input, output, and cache hits
- Permission friction: gated tool calls and wait times
- Context window usage and cache hit rate over the session
- Live status of the running coding agent (running, idle, blocked)

## Install

{{< tabs >}}
{{% tab "Homebrew (macOS)" %}}
```shell
brew install datadog/lapdog/lapdog
```
{{% /tab %}}
{{% tab "pip / pipx" %}}
```shell
pipx install ddapm-test-agent
# or: pip install ddapm-test-agent
```
{{% /tab %}}
{{< /tabs >}}

For Docker, from-source, and other install paths, see the [Lapdog install guide][1].

## Run a coding agent

Lapdog instruments coding agents end-to-end. Each prompt, tool call, and permission request becomes a span in a session you can replay from the dashboard.

{{< tabs >}}
{{% tab "Claude Code" %}}
```shell
lapdog claude
```
Starts the local agent, installs the Claude Code lapdog plugin, and launches Claude Code with hooks wired up.
{{% /tab %}}
{{% tab "Pi" %}}
```shell
lapdog pi
```
Starts the local agent, installs the Pi lapdog extension, and launches Pi with `LAPDOG_URL` configured.
{{% /tab %}}
{{% tab "Other" %}}
```shell
lapdog python my_app.py
```
Run any command with `ddtrace` auto-instrumentation pointed at the local agent. Useful for instrumenting your own LLM-powered application during development.
{{% /tab %}}
{{< /tabs >}}

## View sessions

While a session is running, open [lapdog.datadoghq.com](https://lapdog.datadoghq.com). The dashboard reads directly from your local agent on `localhost:8126`; no login or Datadog account is needed.

If you've changed the local port, override it from the **Collecting sessions** badge in the dashboard header.

## Forward events to Datadog

To dual-ship captured events to LLM Observability in Datadog, set your API key and pass `--forward`:

```shell
DD_API_KEY=<YOUR_API_KEY> lapdog --forward claude
```

Forwarded spans are tagged `source:lapdog` so you can distinguish development sessions from production traffic.

## Useful commands

| Command | What it does |
| --- | --- |
| `lapdog claude` | Launch Claude Code with capture wired up |
| `lapdog pi` | Launch Pi with the lapdog extension installed |
| `lapdog python app.py` | Run any application with tracing instrumentation |
| `lapdog start` | Start the local agent in the background |
| `lapdog stop` | Stop the background agent |
| `lapdog status` | Show whether the agent is running |

For the full list of options, run `lapdog --help`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md
