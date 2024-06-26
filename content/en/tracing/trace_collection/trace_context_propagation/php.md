---
title: Propagating PHP Trace Context
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

This page documents additional use cases of trace context propagation for the Datadog PHP SDK. For a high-level overview of trace context propagation, see [Trace Context Propagation][1].

## Distributed tracing on PHP script launch
When a new PHP script is launched, the tracer automatically checks for the presence of Datadog headers for distributed tracing:
- `x-datadog-trace-id` (environment variable: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (environment variable: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (environment variable: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (environment variable: `HTTP_X_DATADOG_TAGS`)

## Manually setting the distributed tracing context
To manually set this information in a CLI script on new traces or an existing trace, a function `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` is provided.

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

Alternatively, starting with version **0.87.0**, if the raw headers are available, a function `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)` is provided. Note that the header names must be in lowercase.

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

To extract the trace context directly as headers, a function `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` is provided. Its sole optional argument accepts an array of injection style names. It defaults to the configured injection style.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

## RabbitMQ

Although the PHP tracer supports automatic tracing of the `php-amqplib/php-amqplib` library starting with version **0.87.0**, there are some known cases where your distributed trace can be disconnected. Most notably, when reading messages from a distributed queue using the `basic_get` method while not already in a trace, you would need to add a custom trace surrounding a `basic_get` call and the corresponding message processing.

Here is an example:

```php
// Create a surrounding trace
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// basic_get call(s) + message(s) processing
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// Once done, close the span
\DDTrace\close_span();
```

Creating this surrounding trace to your consuming-processing logic ensures observability of your distributed queue.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/trace_context_propagation
