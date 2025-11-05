---
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: OpenTelemetry en Datadog
title: Serverless y OpenTelemetry
---

[OpenTelemetry][1] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría.

Si instrumentaste tu código de forma personalizada con la [API de OpenTelemetry][2], o si quieres escribir código de instrumentación personalizado independiente del proveedor, puedes configurarlo para que genere tramos (spans) y trazas (traces) con el estilo de Datadog. Luego, puedes procesar estos tramos y trazas con la librería de rastreo de Datadog del lenguaje que utilizas y enviar los datos a Datadog.

### AWS Lambda

Consulta [AWS Lambda y OpenTelemetry][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /es/tracing/trace_collection/otel_instrumentation/
[4]: /es/serverless/aws_lambda/opentelemetry
