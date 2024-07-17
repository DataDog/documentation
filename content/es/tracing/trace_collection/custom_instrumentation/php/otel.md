---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/php/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación PHP con la API de OpenTelemetry, para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
kind: documentación
title: Instrumentación personalizada de PHP con la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## Configuración

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Instalar [paquetes de la API de OpenTelemetry][13].
  ```php
  composer require open-telemetry/sdk
  ```
2. Añade la instrumentación manual de OpenTelemetry que desees a tu código PHP siguiendo la [documentación de instrumentación manual de OpenTelemetry PHP][5]. 

3. Instala la [biblioteca de rastreo de Datadog PHP][6].

4. Configura `DD_TRACE_OTEL_ENABLED` en `true`.

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM tramos en una única traza de tu aplicación.

## Añadir etiquetas al tramo

Puedes añadir atributos en el momento exacto en que inicias el tramo:

```php
$span = $tracer->spanBuilder('mySpan')
    ->setAttribute('key', 'value')
    ->startSpan();
```

O mientras el tramo esté activo:

```php
$activeSpan = OpenTelemetry\API\Trace\Span::getCurrent();

$activeSpan->setAttribute('key', 'value');
```


## Configuración de errores en un tramo

La información de la excepción se captura y se adjunta al tramo si hay uno activo cuando se produce la excepción.

```php
// Crear un tramo
$span = $tracer->spanBuilder('mySpan')->startSpan();

throw new \Exception('Oops!');

// 'mySpan' se marcará con un error y tendrá 
// la traza del stack y el mensaje de excepción adjuntos como etiquetas
```

También se puede marcar manualmente una traza como errónea:

```php
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\Context\Context;

// Solo se puede hacer después de los pasos de configuración, tales como la inicialización del rastreador.

try {
    throw new \Exception('Oops!');
} catch (\Exception $e) {
    $rootSpan = Span::fromContext(Context::getRoot());
    $rootSpan->recordException($e);
}
```
## Añadir tramos

Para añadir un tramo:

```php
// Obtener un rastreador o usar uno existente
$tracerProvider = \OpenTelemetry\API\Globals::tracerProvider();
$tracer = $tracerProvider->getTracer('datadog')

// Crear un tramo
$span = $tracer->spanBuilder('mySpan')->startSpan();

// ... hacer algo

// Cerrar el tramo
$span->end();

```

## Acceso a tramos activos

Para acceder al tramo activo en ese momento:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/php/manual/
[6]: /es/tracing/trace_collection/dd_libraries/php#getting-started
[13]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup