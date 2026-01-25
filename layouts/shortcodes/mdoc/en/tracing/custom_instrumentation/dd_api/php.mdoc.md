<!--
This partial contains PHP custom instrumentation content for the Datadog API.
-->

{% alert level="info" %}
If you have not yet read the instructions for auto-instrumentation and setup, start with the [PHP Setup Instructions](/tracing/setup/php/). Even if Datadog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation](/tracing/setup/php/#automatic-instrumentation) for more details.
{% /alert %}

## Annotations

If you are using PHP 8, as of v0.84 of the tracer, you can add attributes to your code to instrument it. It is a lighter alternative to custom instrumentation written in code. For example, add the `#[DDTrace\Trace]` attribute to methods for Datadog to trace them.

```php
<?php
class Server {
    #[\DDTrace\Trace(name: "spanName", resource: "resourceName", type: "Custom", service: "myService", tags: ["aTag" => "aValue"])]
    static function process($arg) {}

    #[\DDTrace\Trace]
    function get() {
      Foo::simple(1);
    }
}
```

You can provide the following arguments:

- `$name`: The operation name to be assigned to the span. Defaults to the function name.
- `$resource`: The resource to be assigned to the span.
- `$type`: The type to be assigned to the span.
- `$service`: The service to be assigned to the span. Defaults to default or inherited service name.
- `$tags`: The tags to be assigned to the span.
- `$recurse`: Whether recursive calls shall be traced.
- `$run_if_limited`: Whether the function shall be traced in limited mode. (For example, when span limit exceeded)

{% alert level="danger" %}
If a namespace is present, you **must** use the fully qualified name of the attribute `#[\DDTrace\Trace]`. Alternatively, you can import the namespace with `use DDTrace\Trace;` and use `#[Trace]`.
{% /alert %}

## Writing custom instrumentation

{% alert level="info" %}
To write custom instrumentation, you do not need any additional composer package.
{% /alert %}

{% alert level="info" %}
The Datadog APM PHP Api is fully documented [in stubs](https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php). This allows you to have automated documentation in PHPStorm.
{% /alert %}

The `DDTrace\trace_function` and `DDTrace\trace_method` functions instrument (trace) specific function and method calls. These functions automatically handle the following tasks:

- Open a [span][1] before the code executes.
- Set any errors from the instrumented call on the span.
- Close the span when the instrumented call is done.

Additional [tags][2] are set on the span from the closure (called a tracing closure).

For example, the following snippet traces the `CustomDriver::doWork` method and adds custom tags:

```php
<?php
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // This closure runs after the instrumented call
        $span->name = 'CustomDriver.doWork';
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        // If an exception was thrown from the instrumented call, return value is null
        $span->meta['doWork.size'] = $exception ? 0 : count($retval),
        // Access object members via $this
        $span->meta['doWork.thing'] = $this->workToDo;
    }
);
?>
```

## Accessing active spans

The built-in instrumentation and your own custom instrumentation creates spans around meaningful operations. You can access the active span in order to include meaningful data.

### Current span

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null` is returned.

```php
<?php
$span = \DDTrace\active_span();
if ($span) {
    $span->meta['customer.id'] = get_customer_id();
}
?>
```

### Root span

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null` is returned. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
$span = \DDTrace\root_span();
if ($span) {
    $span->meta['customer.id'] = get_customer_id();
}
?>
```

## Adding tags

{% alert level="danger" %}
When you set tags, to avoid overwriting existing tags automatically added by the Datadog core instrumentation, **do write `$span->meta['mytag'] = 'value'`**. Do not write `$span->meta = ['mytag' => 'value']`.
{% /alert %}

### Adding tags locally

Add tags to a span by using the `DDTrace\SpanData::$meta` array.

```php
<?php

\DDTrace\trace_function(
    'myRandFunc',
    function(\DDTrace\SpanData $span, array $args, $retval) {
        // ...
        $span->meta['rand.range'] = $args[0] . ' - ' . $args[1];
        $span->meta['rand.value'] = $retval;
    }
);
```

### Adding tags globally

Set the `DD_TAGS` environment variable (version 0.47.0+) to automatically apply tags to every span that is created.

```
DD_TAGS=key1:value1,<TAG_KEY>:<TAG_VALUE>
```

### Setting errors on a span

Thrown exceptions are automatically attached to the active span, unless the exception is thrown at a deeper level in the call stack and it is caught before it reaches any function that is traced.

```php
<?php

function doRiskyThing() {
    throw new Exception('Oops!');
}

\DDTrace\trace_function(
    'doRiskyThing',
    function() {
        // Span will be flagged as erroneous and have
        // the stack trace and exception message attached as tags
    }
);
```

Set the `error.message` tag to manually flag a span as erroneous.

```php
<?php

function doRiskyThing() {
    return SOME_ERROR_CODE;
}

\DDTrace\trace_function(
    'doRiskyThing',
    function(\DDTrace\SpanData $span, $args, $retval) {
        if ($retval === SOME_ERROR_CODE) {
            $span->meta['error.message'] = 'Foo error';
            // Optional:
            $span->meta['error.type'] = 'CustomError';
            $span->meta['error.stack'] = (new \Exception)->getTraceAsString();
        }
    }
);
```

## Adding span links

Span links associate one or more spans together that don't have a typical parent-child relationship. They may associate spans within the same trace or spans across different traces.

To add a span link from an existing span:

```php
$spanA = \DDTrace\start_trace_span();
$spanA->name = 'spanA';
\DDTrace\close_span();

$spanB = \DDTrace\start_trace_span();
$spanB->name = 'spanB';
// Link spanB to spanA
$spanB->links[] = $spanA->getLink();
\DDTrace\close_span();
```

## Context propagation for distributed traces

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][9] for information.

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][3] page.

## API reference

{% alert level="info" %}
The Datadog APM PHP Api is fully documented [in stubs](https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php). This allows you to have automated documentation in PHPStorm.
{% /alert %}

### Parameters of the tracing closure

The tracing closure provided to `DDTrace\trace_method()` and `DDTrace\trace_function()` has four parameters:

```php
function(
    DDTrace\SpanData $span,
    array $args,
    mixed $retval,
    Exception|null $exception
);
```

1. **$span**: An instance of `DDTrace\SpanData` to write to the span properties
2. **$args**: An `array` of arguments from the instrumented call
3. **$retval**: The return value of the instrumented call
4. **$exception**: An instance of the exception that was thrown in the instrumented call or `null` if no exception was thrown

[1]: /tracing/glossary/#spans
[2]: /tracing/glossary/#span-tags
[3]: /tracing/security
[4]: /tracing/guide/send_traces_to_agent_by_api/
[5]: https://www.php.net/func_get_args
[6]: https://github.com/DataDog/dd-trace-php/releases/latest
[7]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[8]: /tracing/trace_collection/opentracing/php#opentracing
[9]: /tracing/trace_collection/trace_context_propagation/
[10]: /tracing/trace_explorer/trace_view?tab=spanlinksbeta#more-information
