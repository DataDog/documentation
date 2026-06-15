---
title: Set Up Agent Console
description: Set up integrations for Claude Code, Cursor, and GitHub Copilot to monitor coding agent activity in Datadog Agent Console.
further_reading:
  - link: '/ai_agents_console/'
    tag: 'Documentation'
    text: 'Agent Console'
  - link: '/integrations/anthropic-usage-and-costs/'
    tag: 'Documentation'
    text: 'Anthropic Usage and Costs integration'
  - link: '/integrations/cursor/'
    tag: 'Documentation'
    text: 'Cursor integration'
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console is available to all Datadog customers in Preview.
{{< /callout >}}

Set up an integration for each coding agent you want to monitor in [Agent Console][1].

## Claude Code

### Option 1: Anthropic Usage and Costs integration (recommended)

To monitor Claude Code with Agent Console, set up the [Anthropic Usage and Costs][4] integration.

After setup, navigate to the [Agent Console][1] and click the {{< ui >}}Claude Code{{< /ui >}} tile to view metrics.

### Option 2: OpenTelemetry (OTLP)

The following procedure configures Claude Code to send telemetry directly to Datadog with the OpenTelemetry protocol (OTLP).

1. Make sure that your [Logs configuration][6] includes a catch-all [index][7], or an index that covers `service:claude-code`.
2. Generate a [Datadog API key][8].
3. Set the following environment variables in your Claude Code settings file (for example, `~/.claude/settings.json`):

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="otlp_logs_endpoint" >}}",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "{{< region-param key="otlp_metrics_endpoint" >}}",
       "OTEL_EXPORTER_OTLP_HEADERS": "dd-api-key=<DATADOG_API_KEY>"
     }
   }
   ```

   Replace `<DATADOG_API_KEY>` with your Datadog API key.

   <div class="alert alert-info">To set up Agent Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or <a href="https://code.claude.com/docs/en/server-managed-settings">server-managed settings</a> to distribute the Claude Code settings file across all managed devices.</div>
4. Restart Claude Code.

After you restart Claude Code, navigate to the [Agent Console][1] and click the {{< ui >}}Claude Code{{< /ui >}} tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

### Option 3: Forward data through the Datadog Agent

1. Make sure that your [Logs configuration][6] includes a catch-all [index][7], or an index that covers `service:claude-code`.
2. [Install the Datadog Agent][9].
3. Configure your Datadog Agent to enable the OpenTelemetry Collector:
   ```yaml
   otlp_config:
     receiver:
       protocols:
         grpc:
           endpoint: 0.0.0.0:4317
     logs:
       enabled: true
   otelCollector:
     enabled: true
   ```
4. Set the following environment variables in your Claude Code settings file (for example, `~/.claude/settings.json`):
   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_ENDPOINT": "http://127.0.0.1:4317",
       "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
       "OTEL_METRIC_EXPORT_INTERVAL": "10000"
     }
   }
   ```

   <div class="alert alert-info">To set up Agent Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or <a href="https://code.claude.com/docs/en/server-managed-settings">server-managed settings</a> to distribute the Claude Code settings file across all managed devices.</div>
5. Restart Claude Code.

After you restart Claude Code, navigate to the [Agent Console][1] and click the {{< ui >}}Claude Code{{< /ui >}} tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

## Cursor

To monitor Cursor with Agent Console, set up the [Cursor][5] integration using the Datadog Extension for Cursor.

After setup, navigate to the [Agent Console][1] and click the {{< ui >}}Cursor{{< /ui >}} tile to view metrics.

## GitHub Copilot

To monitor GitHub Copilot with Agent Console, set up the [GitHub Copilot][10] integration.

After setup, navigate to the [Agent Console][1] and click the {{< ui >}}GitHub Copilot{{< /ui >}} tile to view metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[4]: /integrations/anthropic-usage-and-costs/
[5]: /integrations/cursor/?tab=datadogextensionforcursor
[6]: /logs/log_configuration/
[7]: /logs/log_configuration/indexes/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /agent/?tab=Host-based
[10]: /integrations/github-copilot/
