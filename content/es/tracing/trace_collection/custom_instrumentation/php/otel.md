---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/php/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación PHP con la API OpenTelemetry para enviar trazas
  (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación de PHP personalizada utilizando la API OpenTelemetry
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

Datadog combina estos tramos (spans) de OpenTelemetry con otros tramos de Datadog APM en una única traza de tu aplicación.

## Añadir etiquetas (tags) de tramo

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
// la traza del stack tecnológico y el mensaje de excepción adjuntos como etiquetas
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

## Añadir eventos de tramos

<div class="alert alert-info">Para añadir eventos de tramos se requiere la versión 1.3.0 o posterior del SDK.</div>

Puedes añadir eventos de tramos utilizando la API `addEvent`. Este método requiere un parámetro `name` y acepta opcionalmente los parámetros `attributes` y `timestamp`. El método crea un nuevo evento de tramo con las propiedades especificadas y lo asocia al tramo correspondiente.

- **Nombre** [_obligatorio_]: Una cadena que representa el nombre del evento.
- **Atributos** [_opcional_]: Cero o más pares clave-valor con las siguientes propiedades:
  - La clave debe ser una cadena no vacía.
  - El valor puede ser:
    - Un tipo primitivo: cadena, booleano o número.
    - Una matriz homogénea de valores de tipo primitivo (por ejemplo, una matriz de cadenas).
  - Las matrices anidadas y las matrices que contienen elementos de distintos tipos de datos no están permitidas.
- **Marca de tiempo** [_opcional_]: Una marca de tiempo UNIX que representa la hora en que se produjo un evento. Se espera en `nanoseconds`.

Los siguientes ejemplos muestran distintas formas de añadir eventos a un tramo:

```php
$span->addEvent("Event With No Attributes");
$span->addEvent(
    "Event With Some Attributes", 
    [ 
        'int_val' => 1, 
        'string_val' => "two", 
        'int_array' => [3, 4], 
        'string_array' => ["5", "6"],
        'bool_array' => [true, false]
    ]
);
```

Para obtener más información, consulta la especificación de [OpenTelemetry][14].

### Registro de excepciones

Para registrar excepciones, utiliza la API `recordException`. Este método requiere un parámetro `exception` y acepta opcionalmente un parámetro UNIX `timestamp`. Crea un nuevo evento de tramo que incluya atributos de excepción estandarizados y lo asocia al tramo correspondiente.

Los siguientes ejemplos muestran diferentes formas de registrar excepciones:

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

Para obtener más información, consulta la especificación de [OpenTelemetry][15].

## Acceso a tramos activos

Para acceder al tramo activo en ese momento:

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/php/manual/
[6]: /es/tracing/trace_collection/dd_libraries/php#getting-started
[13]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[15]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception