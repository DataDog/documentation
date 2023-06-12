---
title: Propagating PHP Trace Context
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
---

The Datadog APM Tracer supports [B3][7] and [W3C][10] headers extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The PHP Tracer supports the following styles:

- Datadog: `Datadog`
- W3C: `tracecontext`
- B3 Multi Header: `b3multi` (`B3` is deprecated)
- B3 Single Header: `B3 single header`

You can use the following environment variables to configure the PHP tracing library injection and extraction styles. For instance:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,tracecontext,B3 single header`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=Datadog,tracecontext,B3 single header`

The environment variable values are comma-separated lists of header styles enabled for injection or extraction. By default, only the `tracecontext` and `Datadog` injection styles are enabled.

If multiple extraction styles are enabled, the extraction attempt is completed with the following priorities: `tracecontext` has priority, then `Datadog`, then B3.

When a new PHP script is launched, the tracer automatically checks for the presence of Datadog headers for distributed tracing:
- `x-datadog-trace-id` (environment variable: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (environment variable: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (environment variable: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (environment variable: `HTTP_X_DATADOG_TAGS`)

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


[7]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
