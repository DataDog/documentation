---
aliases:
- /es/tracing/trace_collection/custom_instrumentation/opentracing/go
description: Actualiza tu rastreador de Go de la v1 a la v2.
further_reading:
- link: tracing/trace_collection/custom_instrumentation/go/dd-api
  tag: Documentación
  text: Comienza con la v1 del rastreador de Go
title: Migración de la v1 a la v2 del rastreador de Go
---

<div class="alert alert-info">En esta documentación, se da por hecho que utilizas la versión v1.x del rastreador de Go. Si ya utilizas v2.x, consulta <a href="/tracing/trace_collection/custom_instrumentation/go/dd-api">Instrumentación personalizada de Go mediante la API de Datadog</a> en su lugar.</div>

En esta guía, se explica cómo migrar de la v1.x a la v2 del rastreador de Go. Consulta [Requisitos de compatibilidad del rastreador de Go][2].

La versión 2 del rastreador de Go incluye mejoras importantes en la API:

- Elimina interfaces para permitir flexibilidad en el futuro.
- Aísla integraciones para evitar falsos positivos de los análisis de seguridad.
- Aplica patrones de las bibliotecas para evitar usos indebidos.

Para simplificar el proceso de migración, Datadog ofrece una herramienta de migración que gestiona automáticamente las actualizaciones esenciales del código.

## Características de la herramienta de migración

La herramienta de migración actualiza automáticamente tu código de rastreo al actualizar `dd-trace-go` de la v1.x a la v2.0. Realiza los siguientes cambios:

* Actualiza las URL de importación de `dd-trace-go.v1` a `dd-trace-go/v2`.
* Mueve las importaciones y el uso de ciertos tipos de `ddtrace/tracer` a `ddtrace`.
* Convierte las llamadas a `Span` y `SpanContext` para utilizar punteros.
* Sustituye las llamadas no compatibles de `WithServiceName()` por `WithService()`.
* Actualiza las llamadas de `TraceID()` a `TraceIDLower()` para obtener los ID de rastreo `uint64`.

## Uso de la herramienta de migración

Ejecuta estos comandos para usar la herramienta de migración:

```shell
go install github.com/DataDog/dd-trace-go/tools/v2check@latest
# En el directorio de tu repositorio
v2check .
```

Para obtener más información sobre la migración, consulta la [página de la documentación de Go sobre dd-trace-go v2][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/github.com/DataDog/dd-trace-go/v2/
[2]: /es/tracing/trace_collection/compatibility/go/?tab=v1#go-tracer-support