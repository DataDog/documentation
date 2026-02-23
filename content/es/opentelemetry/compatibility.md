---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de OpenTelemetry
title: Compatibilidad de Datadog y OpenTelemetry
---

## Información general

Datadog ofrece múltiples opciones de configuración para adaptarse a diversos casos de uso, desde implementaciones completas de OpenTelemetry (OTel) hasta configuraciones híbridas que utilizan componentes tanto de OpenTelemetry como de Datadog. En esta página, se describe la compatibilidad entre las distintas configuraciones y los productos y funciones compatibles con Datadog, lo que te ayudará a elegir la mejor configuración para tus necesidades.

## Configuraciones

Datadog admite varias configuraciones para el uso de OpenTelemetry. La principal diferencia entre estas configuraciones es la elección de SDK (OpenTelemetry o Datadog) y el recopilador utilizado para procesar y reenviar datos de telemetría.

| Tipo de configuración                                 | API                     | SDK         | Collector/Agent                               |
|--------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**SDK Datadog + DDOT (Recomendado)**][29] | API de Datadog o API de OpenTelemetry | SDK Datadog | Distribución Datadog del OTel Collector (DDOT) |
| [**SDK OTel + DDOT**][29]                  | API de OTel                | SDK OTel    | Distribución Datadog del OTel Collector (DDOT) |
| [**SDK OTel + OSS Collector**][7]          | API de OTel                | SDK OTel    | OTel Collector (OSS)                          |
| [**Ingesta OTLP directa**][28]                   | API de OTel                | SDK OTel    | N/A (Directo al endpoint Datadog)              |

## Compatibilidad de funciones

En la siguiente tabla se muestra la compatibilidad de funciones en diferentes configuraciones:

| Función | SDK Datadog + DDOT (Recomendado) | SDK OTel + DDOT | SDK OTel + OSS Collector | Ingesta OTLP directa |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trazas (traces) correlacionadas, métricas, logs][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Rastreo distribuido][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [LLM Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métricas de tiempo de ejecución][23] | {{< X >}} | {{< X >}}<br>(solo Java, .NET, Go) | {{< X >}}<br>(solo Java, .NET, Go) | {{< X >}}<br>(solo Java, .NET, Go) |
| [Enlaces de tramo] (span)[25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métricas de trazas][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Muestreado" tooltip="Calculado en tramos que llegan a Datadog; refleja cualquier muestreo del lado de OTel que configures." >}}) |
| [Database Monitoring][14] (DBM) | {{< X >}} | {{< X >}} |  |  |
| [Lista de hosts de infraestructura][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Cloud Network Monitoring][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Live Container Monitoring/Kubernetes Explorer][20] | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17] (USM) | {{< X >}} | {{< X >}} | | |
| [App and API Protection][11] (AAP) | {{< X >}} | | | |
| [Continuous Profiler][12] | {{< X >}} | | | |
| [Observabilidad de datos: monitorización de trabajos][13] (DJM) | {{< X >}} | | | |
| [Data Streams Monitoring][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel no ofrece la funcionalidad de DSM" >}} | {{< tooltip text="N/A" tooltip="OTel no ofrece la funcionalidad de DSM" >}} |
| [Real User Monitoring][22] (RUM) | {{< X >}} | | | |
| [Integración de código fuente][24] | {{< X >}} | | | |

## Soporte de API

Los SDK Datadog son compatibles con las API de trazas, métricas y logs de OpenTelemetry en varios lenguajes. Busca tu lenguaje en la tabla siguiente para obtener guías de configuración e información de asistencia.

| Lenguaje | API de trazas | API de métricas | API de logs |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java] [34] | {{< X >}} | *Aún no es compatible* | *Aún no es compatible* |
| [Go][35] | {{< X >}} | *Aún no es compatible* | *Aún no es compatible* |
| [Ruby][36] | {{< X >}} | Alpha | *Aún no es compatible* |
| [PHP][37] | {{< X >}} | *Aún no es compatible* | *Aún no es compatible* |

## Más detalles

### LLM Observability

Las trazas de OpenTelemetry que tienen [atributos de IA generativa](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) se convierten automáticamente en trazas de LLM Observability. Para desactivar esta conversión, consulta [Desactivar la conversión de LLM Observability][38].

### Métricas de tiempos de ejecución

- **Configuraciones de SDK Datadog**: Emite [métricas de tiempo de ejecución][23] utilizando el (puerto UDP 8125) de DogStatsD. Asegúrate de que DogStatsD está activado en tu Datadog Agent.
- **Configuraciones de SDK OpenTelemetry**: Siguen la especificación en [Métricas de tiempo de ejecución de OpenTelemetry][1] y suelen enviarse utilizando OTLP (puerto 4317/4318).

### Real User Monitoring (RUM)

Para habilitar la funcionalidad de RUM completa, necesitas [inyectar encabezados compatibles][2] para correlacionar RUM y trazas.

### Cloud Network Monitoring (CNM)

La monitorización a nivel de tramo o endpoint **no** es compatible.

Para más información, consulta [Configuración de Cloud Network Monitoring][3].

### Integración del código fuente

Para lenguajes no compatibles en configuraciones de OpenTelemetry, [configura el etiquetado de telemetría][5] para vincular los datos a una confirmación específica.

## Soporte de plataformas y entornos

Aunque el OpenTelemetry Collector puede desplegarse en muchos entornos, algunas plataformas tienen limitaciones o requisitos de compatibilidad específicos.

* **AWS EKS Fargate**: Este entorno **aún no es compatible** y dará lugar a una facturación incorrecta del host de infraestructura cuando se utilice con el OpenTelemetry Collector. El soporte oficial está previsto para una futura versión. Consulta la [guía de configuración del recopilador][7] para obtener información más actualizada.

## Prácticas recomendadas

Cuando se utiliza Datadog y OpenTelemetry juntos, Datadog recomienda las siguientes mejores prácticas para garantizar un rendimiento óptimo y evitar posibles problemas:

- **Evita la instrumentación mixta**: En la mayoría de los casos, no debes utilizar un SDK Datadog junto a un SDK OpenTelemetry en la misma aplicación, ya que esto conduce a un comportamiento indefinido.
  - **Excepción**: La compatibilidad con algunos lenguajes, como Python, requiere la instalación del SDK Datadog y del SDK OpenTelemetry.
  - Sigue siempre la [documentación de instrumentación específica del lenguaje][8] para asegurarte de que estás utilizando la configuración correcta y compatible.
- **Evita tener un Agent y un recopilador separado en el mismo host**: no ejecutes el Agent y un OpenTelemetry Collector separado en el mismo host, ya que esto puede causar problemas. Sin embargo, puedes ejecutar Agents y recopiladores en diferentes hosts dentro de la misma flota.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/integrations/runtime_metrics/
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /es/network_monitoring/cloud_network_monitoring/setup/
[4]: /es/infrastructure/process/
[5]: /es/integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /es/opentelemetry/collector_exporter/
[8]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /es/opentelemetry/agent
[10]: /es/tracing/trace_collection/
[11]: /es/security/application_security/
[12]: /es/profiler/
[13]: /es/data_jobs/
[14]: /es/opentelemetry/correlate/dbm_and_traces/
[15]: /es/data_streams/
[16]: /es/infrastructure/process/
[17]: /es/universal_service_monitoring/
[18]: /es/security/cloud_siem/
[19]: /es/opentelemetry/correlate/
[20]: /es/containers/
[21]: /es/network_monitoring/performance/
[22]: /es/opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /es/tracing/metrics/runtime_metrics/
[24]: /es/integrations/guide/source-code-integration/
[25]: /es/tracing/trace_collection/span_links/
[26]: /es/tracing/metrics/metrics_namespace/
[27]: /es/tracing/trace_collection/
[28]: /es/opentelemetry/setup/agentless
[29]: /es/opentelemetry/setup/ddot_collector
[30]: /es/infrastructure/list/
[31]: /es/opentelemetry/instrument/api_support/dotnet/
[32]: /es/opentelemetry/instrument/api_support/python/
[33]: /es/opentelemetry/instrument/api_support/nodejs/
[34]: /es/opentelemetry/instrument/api_support/java/
[35]: /es/opentelemetry/instrument/api_support/go/
[36]: /es/opentelemetry/instrument/api_support/ruby/
[37]: /es/opentelemetry/instrument/api_support/php/
[38]: /es/llm_observability/instrumentation/otel_instrumentation/