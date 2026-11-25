---
aliases:
- /es/opentelemetry/guide/otel_api_tracing_interoperability
description: Instrumente aplicaciones con OpenTelemetry. Los SDK de DDOT, la versión
  de Datadog de los SDK de OpenTelemetry, añaden capacidades y soporte específicos
  de Datadog, utilizando la configuración y las herramientas estándar de OpenTelemetry.
further_reading:
- link: https://opentelemetry.io/docs/concepts/instrumentation/
  tag: Sitio externo
  text: Instrumentación de OpenTelemetry
- link: /opentelemetry/compatibility/
  tag: Documentación
  text: Compatibilidad de funciones de OpenTelemetry
title: Instrumente sus aplicaciones
---
## Descripción general {#overview}

Los SDK de DDOT son la versión de Datadog de los SDK de OpenTelemetry y están en Preview. Utilizan las API, las Semantic Conventions, OTLP, la configuración estándar y las herramientas de despliegue de OpenTelemetry, y añaden capacidades específicas de Datadog.

Datadog admite trazas, métricas y registros de los SDK upstream de OpenTelemetry, que la comunidad de OpenTelemetry mantiene y respalda. Utilice los SDK upstream de OpenTelemetry si la política de su organización solo permite componentes upstream de OpenTelemetry.

Ejecute un SDK por proceso de aplicación para evitar la instrumentación duplicada.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/" >}}
    <h3>Using DDOT SDKs</h3>
    Deploy Datadog's version of OpenTelemetry SDKs with standard OpenTelemetry tooling. DDOT SDKs add capabilities such as Live Debugger, Dynamic Instrumentation, Database Monitoring, and Data Streams Monitoring. They are available for Java, .NET, Node.js, Python, and Go.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/upstream_otel_sdks/" >}}
    <h3>Using Upstream OpenTelemetry SDKs</h3>
    Install SDKs maintained and supported by the OpenTelemetry community and send traces, metrics, and logs to Datadog with OTLP. Use the OpenTelemetry Operator, application builds, or deployment automation.
    {{< /nextlink >}}
{{< /whatsnext >}}

Ambos utilizan métodos estándar de configuración y despliegue de OpenTelemetry. Puede cambiar los paquetes del SDK, las imágenes de auto-instrumentación o la instrumentación en tiempo de compilación mientras mantiene la instrumentación de la API de OpenTelemetry y la configuración estándar. Volver a los SDK upstream conserva la telemetría de OpenTelemetry; las capacidades específicas de Datadog ya no están disponibles. Revise la [compatibilidad de funciones][1] para obtener detalles sobre las capacidades y los requisitos del Datadog Agent.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/compatibility/#feature-compatibility