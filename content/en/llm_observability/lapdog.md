---
title: Lapdog
description: "Run an LLM Observability dashboard locally to inspect coding-agent and application traces in your browser without a Datadog account."
further_reading:
    - link: 'https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md'
      tag: 'GitHub'
      text: 'Lapdog README on GitHub'
    - link: '/llm_observability/instrumentation/sdk'
      tag: 'Documentation'
      text: 'Instrument your application with the LLM Observability SDK'
    - link: '/llm_observability/instrumentation/auto_instrumentation'
      tag: 'Documentation'
      text: 'Auto-instrumentation for LLM Observability'
---

## Overview

Lapdog is a local development tool for LLM Observability. It runs an agent on `localhost:8126` that captures every span, prompt, tool call, and cost from your LLM application, or from a coding agent like Claude Code, Codex, or Pi, and streams them into a browser dashboard at [lapdog.datadoghq.com](https://lapdog.datadoghq.com). No Datadog account is required.

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
Starts the local agent, installs the Claude Code lapdog plugin, and launches Claude Code.
{{% /tab %}}
{{% tab "Codex" %}}
```shell
lapdog codex
```
Starts the local agent, then launches Codex with an OpenAI-compatible proxy and JSONL watcher that capture every LLM request, tool call, and step into a session.
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

**Note**: `lapdog claude` and `lapdog codex` are proxy-backed: the local Lapdog agent sits in the live model-request path. Keep Lapdog running until the coding agent exits. If you stop or kill Lapdog mid-session, the launched coding agent can stop making progress on model calls. Restart the coding agent after restarting Lapdog. `lapdog pi` and hook-only setups fail open if Lapdog goes down: the coding agent keeps running, but capture data is lost.

## View sessions

While a session is running, open [lapdog.datadoghq.com](https://lapdog.datadoghq.com). The dashboard reads directly from your local agent on `localhost:8126`; no login or Datadog account is needed.

If you've changed the local port, override it from the {{< ui >}}Collecting sessions{{< /ui >}} badge in the dashboard header.

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
| `lapdog codex` | Launch Codex with the OpenAI proxy and JSONL watcher wired up |
| `lapdog pi` | Launch Pi with the lapdog extension installed |
| `lapdog python app.py` | Run any application with tracing instrumentation |
| `lapdog start` | Start the local agent in the background |
| `lapdog stop` | Stop the background agent |
| `lapdog status` | Show whether the agent is running |

For the full list of options, run `lapdog --help`.

## Uninstall

Follow these steps to remove Lapdog and the state it writes to your home directory. Your package manager (Homebrew, pip, or pipx) cleans up only what it installed; it does not touch `~/.lapdog/`, the Claude Code plugin, or the pi extension.

1. Stop the local agent:

   ```shell
   lapdog stop
   ```

2. Remove the Claude Code plugin (if installed):

   ```shell
   claude plugin uninstall lapdog@lapdog
   claude plugin marketplace remove lapdog
   ```

3. Remove the pi extension (only if you ran `lapdog pi`):

   ```shell
   rm -f ~/.pi/agent/extensions/lapdog.ts
   ```

4. Remove the Lapdog working directory:

   ```shell
   rm -rf ~/.lapdog
   ```

5. Uninstall the package:

   {{< tabs >}}
   {{% tab "Homebrew (macOS)" %}}
   ```shell
   brew uninstall lapdog
   brew untap datadog/lapdog
   ```
   {{% /tab %}}
   {{% tab "pip / pipx" %}}
   ```shell
   pipx uninstall ddapm-test-agent
   # or: pip uninstall ddapm-test-agent
   ```
   {{% /tab %}}
   {{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md
