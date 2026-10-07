---
algolia:
  tags:
  - Instrumentación personalizada de otel
aliases:
- /es/opentelemetry/interoperability/api_support
- /es/opentelemetry/interoperability/otel_api_tracing_interoperability/
further_reading:
- link: tracing/guide/instrument_custom_method
  tag: Documentación
  text: Instrumentar un método personalizado para obtener una visibilidad profunda
    de tu lógica de negocio
- link: tracing/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas (traces)
- link: tracing/visualization/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: Más información sobre Datadog y la iniciativa de OpenTelemetry
title: Soporte de la API de OpenTelemetry
---

Las bibliotecas de rastreo de Datadog proporcionan una implementación de la [API de OpenTelemetry][1] para instrumentar tu código. Esto significa que puedes mantener una instrumentación neutral con respecto al proveedor de todos tus servicios, sin dejar de aprovechar la implementación nativa, las características y los productos de Datadog.

{{< img src="/opentelemetry/setup/otel-api-dd-sdk.png" alt="Diagrama: La API de OpenTelemetry con bibliotecas de rastreo DD envía datos a través del protocolo OTLP al Datadog Agent, que los reenvía a la plataforma de Datadog." style="width:100%;" >}}

**Nota:** También puedes enviar tus trazas instrumentadas de la API de OpenTelemetry a Datadog utilizando el [OTel Collector][7].

Al [instrumentar tu código con las API de OpenTelemetry][2], tu código:

- Se mantiene libre de llamadas de API específicas del proveedor.
- No depende de librerías de rastreo de Datadog en tiempo de compilación (sólo en tiempo de ejecución).

Sustituye el SDK de OpenTelemetry por la librería de rastreo de Datadog en la aplicación instrumentada. Las trazas producidas por tu código en ejecución pueden ser procesadas, analizadas y monitorizadas junto con las trazas de Datadog y en los productos propiedad de Datadog como [Continuous Profiler][3], [Data Streams Monitoring][4], [App and API Protection][5] y [Live Processes][6].

Para más información, sigue el enlace correspondiente a tu lenguaje:

{{< card-grid card_width="170px">}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net" src="integrations_logos/dotnet_text.png" alt=".Net" >}}
  {{< image-card href="/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=rust" src="integrations_logos/rust.png" alt="Rust" >}}
{{< /card-grid >}}

<br>

<div class="alert alert-info">Para ver qué funciones de Datadog son compatibles con esta configuración, consulta la <a href="/opentelemetry/compatibility/">tabla de compatibilidad de funciones</a> en <b>API de OTel con el SDK Datadog y el Agent</b>.</div>



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /es/tracing/trace_collection/otel_instrumentation/
[3]: /es/profiler/
[4]: /es/data_streams/
[5]: /es/security/application_security/
[6]: /es/infrastructure/process
[7]: /es/opentelemetry/setup/collector_exporter/
