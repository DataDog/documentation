---
aliases:
- /es/opentelemetry/guide/otel_api_tracing_interoperability
further_reading:
- link: https://opentelemetry.io/docs/concepts/instrumentation/
  tag: Sitio externo
  text: Instrumentación con OpenTelemetry
title: Instrumentar tus aplicaciones
---

## Información general

Datadog admite diferentes estrategias para la instrumentación de tus aplicaciones con OpenTelemetry. Elige el método que mejor se adapte a tus necesidades:

### SDK de OpenTelemetry

{{% opentelemetry/otel-sdks %}}

{{< whatsnext desc=" " >}}
    {{< nextlink href="https://opentelemetry.io/docs/languages/" >}}Utilizar los SDK de OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

### API de OpenTelemetry y SDK de Datadog 

La integración de Datadog con OpenTelemetry te permite utilizar la plataforma de observabilidad integral de Datadog, al tiempo que aprovechas la instrumentación de OpenTelemetry agnóstica respecto del proveedor. Así, puedes recopilar, visualizar y analizar trazas (traces), métricas y logs de tus aplicaciones e infraestructura.

Utiliza las API de rastreo de OpenTelemetry con el SDK de Datadog para conservar una instrumentación de proveedor neutral, mientras accedes al conjunto completo de funciones de Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/api_support" >}}Utilizar el SDK de Datadog con la API de OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}Configurar el SDK de Datadog con variables de entorno del SDK de OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

### Bibliotecas de instrumentación de OpenTelemetry

Amplía tu observabilidad utilizando las [bibliotecas de instrumentación][2] de OpenTelemetry junto con el SDK de Datadog.

Datadog admite bibliotecas de instrumentación compatibles con Datadog que proporcionan una observabilidad de marcos y tecnologías no cubiertos por los SDK nativos de Datadog. Esto te permite instrumentar marcos adicionales y bibliotecas sin dejar de enviar datos al backend de Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/instrumentation_libraries/" >}}Utilizar bibliotecas de instrumentación de OpenTelemetry con el SDK de Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/collector_exporter/
[2]: https://opentelemetry.io/docs/specs/otel/overview/#instrumentation-libraries