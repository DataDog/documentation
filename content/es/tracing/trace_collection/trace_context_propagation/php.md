---
code_lang: php
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Propagación del contexto de rastreo de PHP
type: multi-code-lang
---

El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][7] y [contexto de rastreo W3C][10] para el rastreo distribuido.

Puedes configurar estilos de inyección y extracción para encabezados distribuidos.

El rastreador de PHP admite los siguientes estilos:

- Datadog: `datadog`
- Contexto de rastreo W3C: `tracecontext`
- Encabezado múltiple B3: `b3multi` (el alias `B3` está obsoleto)
- Encabezado único B3: `B3 single header`

Puedes utilizar las siguientes variables de entorno para configurar estilos de inyección y extracción de bibliotecas de rastreo de PHP:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,tracecontext,B3 single header`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,tracecontext,B3 single header`

Los valores de la variable de entorno son listas separadas por comas de estilos de encabezado habilitados para inyección o extracción. La configuración de estilo por defecto es `datadog,tracecontext` (para versiones del rastreador de PHP anteriores a v0.98.0, la configuración por defecto es `tracecontext,Datadog`).

Si se habilitan varios estilos de extracción, los intentos de extracción se realizan en el orden en que están configurados estos estilos y se utiliza el primer valor extraído con éxito.

Cuando se lanza un nuevo script de PHP, el rastreador automáticamente comprueba la presencia de encabezados de Datadog para el rastreo distribuido:
- `x-datadog-trace-id` (variable de entorno: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (variable de entorno: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (variable de entorno: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (variable de entorno: `HTTP_X_DATADOG_TAGS`)

Para configurar manualmente esta información en un script de la CLI en trazas (traces) nuevas o en una traza existente, se proporciona una función `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` .

```php
<?php

function processIncomingQueueMessage($message) {
}

\DDTrace\trace_function(
    'processIncomingQueueMessage',
    function(\DDTrace\SpanData $span, $args) {
        $message = $args[0];
        \DDTrace\set_distributed_tracing_context($message->trace_id, $message->parent_id);
    }
);
```

Alternativamente, a partir de la versión **0.87.0**, si los encabezados sin formato están disponibles, se proporciona una función `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)`. Ten en cuenta que los nombres de los encabezados deben estar en minúsculas.

```php
$headers = [
    "x-datadog-trace-id" => "1234567890",
    "x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

Para extraer el contexto de rastreo directamente como encabezados, se proporciona una función `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` . Su único argumento opcional acepta una matriz de nombres de estilos de inyección. Por defecto se utiliza el estilo de inyección configurado.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Almacena los encabezados en algún lugar, inyéctalos en una solicitud saliente...
// Estos $headers también pueden ser leídos por \DDTrace\consume_distributed_tracing_headers desde otro proceso.
```

## RabbitMQ

Aunque el rastreador PHP admite el rastreo automático de la biblioteca `php-amqplib/php-amqplib` a partir de la versión **0.87.0**, existen algunos casos conocidos en los que tu traza distribuid puede desconectarse. Más en específico, cuando se leen mensajes de una cola distribuida con el método `basic_get` mientras no se está aún en una traza, necesitarías añadir una traza personalizada alrededor de la llamada `basic_get` y el procesamiento de mensaje correspondiente.

Aquí encontrarás un ejemplo:

```php
// Crear una traza alrededor
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// llamadas a basic_get + procesamiento de mensajes
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// Una vez hecho, cierra el tramo
\DDTrace\close_span();
```

La creación de esta traza que rodea tu lógica de procesamiento y consumo asegura la observabilidad de tu cola distribuida.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[7]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
