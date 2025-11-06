---
title: AI Agents Console
private: true
further_reading:
    - link: 'https://docs.claude.com/en/docs/claude-code/settings'
      tag: 'Anthropic Documentation'
      text: 'Claude Code settins'
---

{{< callout url=#
 btn_hidden="true" header="Join the Preview!">}}
AI Agents Console is in Preview.
{{< /callout >}}

Datadog's [AI Agents Console][1] provides monitoring for agentic tools like [Claude Code][2], enabling you to collect logs and metrics from developer environments and view them in real time within Datadog.

## Set up AI Agents Console for Claude Code

The following procedure configures Claude Code to send telemetry directly to Datadog with the OpenTelemetry protocol (OTLP). To send telemetry through the Datadog Agent instead, see [Forward data through the Datadog Agent](#via-dd-agent).

1. Ensure that your [Logs configuration][3] includes a catch-all [index][4], or an index that covers `service:claude-code`.
2. Generate a [Datadog API key][5].
3. Set the following environment variables in your Claude Code settings file (for example, `~/.claude/settings.json`):

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="http_endpoint_full" >}}/v1/logs",
       "OTEL_EXPORTER_OTLP_HEADERS": "dd-api-key=<DATADOG_API_KEY>",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "{{< region-param key="otlp_metrics_endpoint" >}}"
     }
   }
   ```

   Replace `<DATADOG_API_KEY>` with your Datadog API key.

   <div class="alert alert-info">To set up AI Agents Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system to distribute the Claude Code settings file across all managed devices.</div>
4. Restart Claude Code.

{{% collapse-content title="Alternative setup: Forward data through the Datadog Agent" level="h4" expanded=false id="via-dd-agent" %}}
1. Ensure that your [Logs configuration][3] includes a catch-all [index][4], or an index that covers `service:claude-code`.
2. [Install the Datadog Agent][6].
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

   <div class="alert alert-info">To set up AI Agents Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system to distribute the Claude Code settings file across all managed devices.</div>

5. Restart Claude Code.
{{% /collapse-content %}}

## Verification

After you restart Claude Code, navigate to the [AI Agents Console][1] in Datadog and click on the **Claude Code** tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: /logs/log_configuration/
[4]: /logs/log_configuration/indexes/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /agent/?tab=Host-based