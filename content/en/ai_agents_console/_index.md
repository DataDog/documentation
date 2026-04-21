---
title: AI Agents Console
private: true
further_reading:
  - link: '/integrations/anthropic-usage-and-costs/'
    tag: 'Documentation'
    text: 'Anthropic Usage and Costs integration'
  - link: '/integrations/cursor/'
    tag: 'Documentation'
    text: 'Cursor integration'
  - link: "https://www.datadoghq.com/blog/claude-code-monitoring"
    tag: "Blog"
    text: "Monitor Claude Code adoption in your organization with Datadog's AI Agents Console"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
AI Agents Console is in Preview and is available to all Datadog customers.
{{< /callout >}}

The [AI Agents Console][1] provides centralized monitoring for agentic developer tools. It collects logs and metrics from developer environments and surfaces them in real time within Datadog, giving you visibility into usage, cost, latency, and errors across your organization.

AI Agents Console supports the following integrations:

| Tool | Description |
|------|-------------|
| [Claude Code][2] | Anthropic's agentic coding tool |
| [Cursor][3] | AI-powered code editor |
| [GitHub Copilot][10] | GitHub's AI-powered code completion tool |

## Set up an integration

### Claude Code

#### Option 1: Anthropic Usage and Costs integration (recommended)

To monitor Claude Code with AI Agents Console, set up the [Anthropic Usage and Costs][4] integration.

After setup, navigate to the [AI Agents Console][1] and click the {{< ui >}}Claude Code{{< /ui >}} tile to view metrics.

#### Option 2: OpenTelemetry (OTLP)

The following procedure configures Claude Code to send telemetry directly to Datadog with the OpenTelemetry protocol (OTLP).

1. Ensure that your [Logs configuration][6] includes a catch-all [index][7], or an index that covers `service:claude-code`.
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

   <div class="alert alert-info">To set up AI Agents Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or <a href="https://code.claude.com/docs/en/server-managed-settings">server-managed settings</a> to distribute the Claude Code settings file across all managed devices.</div>
4. Restart Claude Code.

After you restart Claude Code, navigate to the [AI Agents Console][1] in Datadog and click on the {{< ui >}}Claude Code{{< /ui >}} tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

#### Option 3: Forward data through the Datadog Agent

1. Ensure that your [Logs configuration][6] includes a catch-all [index][7], or an index that covers `service:claude-code`.
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

   <div class="alert alert-info">To set up AI Agents Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or <a href="https://code.claude.com/docs/en/server-managed-settings">server-managed settings</a> to distribute the Claude Code settings file across all managed devices.</div>
5. Restart Claude Code.

After you restart Claude Code, navigate to the [AI Agents Console][1] in Datadog and click on the {{< ui >}}Claude Code{{< /ui >}} tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

### Cursor

To monitor Cursor with AI Agents Console, set up the [Cursor][5] integration using the Datadog Extension for Cursor.

After setup, navigate to the [AI Agents Console][1] and click the {{< ui >}}Cursor{{< /ui >}} tile to view metrics.

### GitHub Copilot

To monitor GitHub Copilot with AI Agents Console, set up the [GitHub Copilot][10] integration.

After setup, navigate to the [AI Agents Console][1] and click the {{< ui >}}GitHub Copilot{{< /ui >}} tile to view metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /integrations/anthropic-usage-and-costs/
[5]: /integrations/cursor/?tab=datadogextensionforcursor
[6]: /logs/log_configuration/
[7]: /logs/log_configuration/indexes/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /agent/?tab=Host-based
[10]: /integrations/github-copilot/
