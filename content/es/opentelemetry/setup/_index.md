---
aliases: null
further_reading:
- link: /opentelemetry/instrument/
  tag: Documentación
  text: Instrumentar tus aplicaciones
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Seleccionar el depsliegue de OpenTelemetry
title: Enviar datos a Datadog
---

Existen varias formas de enviar datos de OpenTelemetry a Datadog. Elige el método que mejor se adapte a tu infraestructura y a tus requisitos:

| Método                          | Lo mejor para                                                                 | Principales ventajas                                                                                                                                                                                                                                  | Documentación                                 |
|---------------------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| <strong>Recopilador de OTel</strong> | Usuarios nuevos o existentes de OTel que quieren una configuración neutral con respecto al proveedor                | <ul><li>Neutralidad total con respecto al proveedor</li><li>Envío de trazas (traces), métricas y logs a Datadog sin necesidad de instalar bibliotecas del Datadog Agent o de rastreo</li><li>Capacidades de procesamiento avanzadas (por ejemplo, [muestreo basado en colas][4])</li></ul> | [Enviar datos utilizando el recopilador de OTel][2]       |
| <strong>Datadog Agent</strong>  | Usuarios existentes de Datadog o equipos que necesiten funciones basadas en el Agent:<ul><li><strong>[Recopilador de DDOT][5]:</strong> Recomendado para entornos Kubernetes </li><li><strong>[Ingesta de OTLP][1]:</strong> Recomendado para todos los demás entornos</li></ul> | <ul><li>Acceso a todas las funciones del Datadog Agent </li><li>Capacidades de monitorización mejoradas que incluyen:<ul><li>Automatización de flotas</li><li>Live Container Monitoring</li><li>Explorador Kubernetes</li><li>Live Processes</li><li>Cloud Network Monitoring</li><li>Universal Service Monitoring</li><li>{{< translate key="integration_count" >}}+ integraciones Datadog</li></ul></li></ul> | [Enviar datos a través del Datadog Agent][1] |
| <strong>Despliegue sin Agent</strong>  | Situaciones que requieren conexión directa sin infraestructura adicional | <ul><li>Transmisión directa de datos</li><li>No se necesitan componentes adicionales</li></ul>                                                                                                                                                            | [Enviar datos utilizando el endpoint de entrada][3]      |

<div class="alert alert-info"><strong>¿Aún no sabes cuál es la configuración más adecuada para ti?</strong><br> Consulta la tabla de <a href="/opentelemetry/compatibility/">compatibilidad de funciones</a> para saber qué funciones de Datadog son compatibles.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/agent
[2]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/setup/intake_endpoint
[4]: /es/opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /es/opentelemetry/agent
[6]: /es/opentelemetry/setup/otlp_ingest_in_the_agent