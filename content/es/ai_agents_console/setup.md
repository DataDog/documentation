---
description: Configure integraciones para Claude Code, Cursor y GitHub Copilot para
  hacer seguimiento de la actividad del coding agent en el Agent Console.
further_reading:
- link: /ai_agents_console/
  tag: Documentación
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentación
  text: Integración de Uso y Costos de Anthropic
- link: /integrations/cursor/
  tag: Documentación
  text: Integración de Cursor
title: Configure el Agent Console.
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
El Agent Console está disponible para todos los clientes de Datadog en Preview.
{{< /callout >}}

Configure una integración para cada coding agent que desee hacer seguimiento en [Agent Console][1].

## Claude Code {#claude-code}

### Opción 1: Integración de Uso y Costos de Anthropic (recomendada) {#option-1-anthropic-usage-and-costs-integration-recommended}

Para monitorear Claude Code con el Agent Console, configure la integración de [Uso y Costos de Anthropic][4].

Después de la configuración, navegue a [Agent Console][1] y haga clic en el mosaico {{< ui >}}Claude Code{{< /ui >}} para ver las métricas.

### Opción 2: OpenTelemetry (OTLP) {#option-2-opentelemetry-otlp}

El siguiente procedimiento configura Claude Code para enviar telemetría directamente a Datadog con el protocolo OpenTelemetry (OTLP).

1. Asegúrese de que su [configuración de registros][6] incluya un [índice][7] general que cubra todo, o un índice que cubra `service:claude-code`.
2. Genere una [clave de API de Datadog][8].
3. Establezca las siguientes variables de entorno en su archivo de configuración de Claude Code (por ejemplo, `~/.claude/settings.json`):

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="otlp_logs_endpoint" >}}"",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "", "OTEL_EXPORTER_OTLP_HEADERS": "DD-API-KEY=<DATADOG_API_KEY>"{{< region-param key="otlp_metrics_endpoint" >}}"",
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
4. Establezca las siguientes variables de entorno en su archivo de configuración de Claude Code (por ejemplo, `~/.claude/settings.json`):
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

   <div class="alert alert-info">Para configurar el Agent Console para Claude Code en toda su organización, su equipo de TI puede utilizar un sistema de Gestión de Dispositivos Móviles (MDM) o configuraciones gestionadas por el servidor<a href="https://code.claude.com/docs/en/server-managed-settings"> para distribuir el archivo de configuración de Claude Code en todos los dispositivos gestionados.</a></div>
5. Reinicie Claude Code.

Después de reiniciar Claude Code, navegue a [Agent Console][1] y haga clic en el mosaico {{< ui >}}Claude Code{{< /ui >}}. Las métricas (uso, costo, latencia, errores) deberían aparecer en unos minutos.

## Cursor {#cursor}

Para monitorear Cursor con Agent Console, configure la integración de [Cursor][5] utilizando la Extensión de Datadog para Cursor.

Después de la configuración, navegue a [Agent Console][1] y haga clic en el mosaico {{< ui >}}Cursor{{< /ui >}} para ver las métricas.

## GitHub Copilot {#github-copilot}

Para monitorear GitHub Copilot con Agent Console, configure la integración de [GitHub Copilot][10].

Después de la configuración, navegue a [Agent Console][1] y haga clic en el mosaico {{< ui >}}GitHub Copilot{{< /ui >}} para ver las métricas.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[4]: /es/integrations/anthropic-usage-and-costs/
[5]: /es/integrations/cursor/?tab=datadogextensionforcursor
[6]: /es/logs/log_configuration/
[7]: /es/logs/log_configuration/indexes/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /es/agent/?tab=Host-based
[10]: /es/integrations/github-copilot/