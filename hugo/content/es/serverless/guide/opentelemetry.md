---
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: OpenTelemetry en Datadog
- link: https://www.datadoghq.com/architecture/enhancing-observability-in-aws-lambda-with-otel/
  tag: Centro de arquitectura
  text: Mejora de la observabilidad de aplicaciones en AWS Lambda con Datadog y OpenTelemetry
title: Serverless y OpenTelemetry
---
[OpenTelemetry][1] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría.

Si su código está instrumentado de forma personalizada con el [OpenTelemetry API][2], o si desea escribir código de instrumentación personalizado independiente del proveedor, puede configurarlo para generar spans y trazas al estilo de Datadog. Luego, puede procesar estos spans y trazas con el SDK de Datadog para su lenguaje y enviar los datos a Datadog.

### AWS Lambda {#aws-lambda}

Consulte [AWS Lambda y OpenTelemetry][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /es/tracing/trace_collection/otel_instrumentation/
[4]: /es/serverless/aws_lambda/opentelemetry