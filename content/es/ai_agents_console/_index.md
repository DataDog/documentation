---
further_reading:
- link: https://docs.claude.com/en/docs/claude-code/settings
  tag: Documentación antrópica
  text: Ajustes del Claude Code
private: true
title: Consola de AI Agents
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-agents-console/" btn_hidden="false" header="Únete a la vista previa">}}
la consola de AI Agents está en vista previa. Completa el formulario para solicitar acceso.
{{< /callout >}}

La [consola de AI Agents][1] de Datadog proporciona monitorización para herramientas de agentes como [Claude Code][2], lo que te permite recopilar logs y métricas de entornos de desarrollo y visualizarlos en tiempo real en Datadog.

## Configurar la consola de AI Agents para Claude Code

El siguiente procedimiento configura Claude Code para enviar telemetría directamente a Datadog con la función OpenTelemetry Protocol (OTLP). Para enviar telemetría a través del Datadog Agent en su lugar, consulta [Reenviar datos a través del Datadog Agent](#via-dd-agent).

1. Asegúrate de que la [configuración de tus logs][3] incluye un [índice][4] general, o un índice que cubra `service:claude-code`.
2. Genera una [clave de API Datadog][5].
3. Define las siguientes variables de entorno en tu archivo de configuración de Claude Code (por ejemplo, `~/.claude/settings.json`):

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

   Sustituye `<DATADOG_API_KEY>` por tu clave de API Datadog.

   <div class="alert alert-info">Para configurar la consola de AI Agents para Claude Code en toda la organización, tu equipo de TI puede utilizar un sistema de Gestión de dispositivos móviles (MDM) para distribuir el archivo de configuración de Claude Code en todos los dispositivos gestionados.</div>
4. Reinicia Claude Code.

{{% collapse-content title="Configuración alternativa: Reenviar datos a través del Datadog Agent" level="h4" expanded=false id="via-dd-agent" %}}
1. Asegúrate de que la [configuración de tus logs][3] incluye un [índice][4] general, o un índice que cubra `service:claude-code`.
2. [Instala elDatadog Agent][6].
3. Configura tu Datadog Agent para activar el recopilador de OpenTelemetry:
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
4. Define las siguientes variables de entorno en tu archivo de configuración de Claude Code (por ejemplo, `~/.claude/settings.json`):
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

   <div class="alert alert-info">Para configurar la consola de AI Agents para Claude Code en toda la organización, tu equipo de TI puede utilizar un sistema de Gestión de dispositivos móviles (MDM) para distribuir el archivo de configuración de Claude Code en todos los dispositivos gestionados.</div>

5. Reinicia Claude Code.
{{% /collapse-content %}}

## Verificación

Después de reiniciar Claude Code, ve a la [consola de AI Agents[1] en Datadog y haz clic en el cuadro **Claude Code**. Las métricas (uso, coste, latencia, errores) deberían aparecer en unos minutos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: /es/logs/log_configuration/
[4]: /es/logs/log_configuration/indexes/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/agent/?tab=Host-based