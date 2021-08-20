---
title: PHP Custom Instrumentation
kind: documentation
aliases:
    - /tracing/manual_instrumentation/php
    - /tracing/opentracing/php
    - /tracing/custom_instrumentation/php
description: 'Manually instrument your PHP application to send custom traces to Datadog.'
code_lang: php
code_lang_weight: 50
type: multi-code-lang
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/php/">PHP Setup Instructions</a>.
</div>

Even if Datadog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation][1] for more details.

## Creating spans

To manually instrument code to [trace][2] specific custom methods in your application or add tags to your spans, use `DDTrace\trace_function()` or `DDTrace\trace_method()`.

<div class="alert alert-info">If you are using a version of ddtrace prior to 0.47.0, use <code>dd_trace_function()</code> instead of <code>DDTrace\trace_function()</code> and <code>dd_trace_method()</code> instead of <code>DDTrace\trace_method()</code> or upgrade to the latest tracer version.</div>

### Trace a custom function or method

The `DDTrace\trace_function()` and `DDTrace\trace_method()` functions instrument (trace) specific function and method calls. These functions automatically handle the following tasks:

- Open a [span][3] before the code executes
- Set any errors from the instrumented call on the span
- Close the span when the instrumented call is done

Additional [tags][4] are set on the span from the closure (called a tracing closure).

For example, the following snippet traces the `CustomDriver::doWork()` method and adds custom tags. Exceptions are automatically tracked on the span.

```php
<?php
// For ddtrace < v0.47.0 use dd_trace_method()
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // This closure runs after the instrumented call
        // Span was automatically created before the instrumented call

        // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // If an exception was thrown from the instrumented call, return value is null
            'doWork.size' => $exception ? 0 : count($retval),
            // Access object members via $this
            'doWork.thing' => $this->workToDo,
        ];

        // The span will automatically close
    }
);

// For functions
// For ddtrace < v0.47.0 use dd_trace_function()
\DDTrace\trace_function(
    'doCustomDriverWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Same as DDTrace\trace_method tracing closure
    }
);
?>
```

{{< tabs >}}
{{% tab "Tracing function calls" %}}

Function calls are instrumented with `DDTrace\trace_function()` and the tracing closure is executed after the instrumented call is made.

```php
<?php

use DDTrace\SpanData;

function addNums($a, $b) {
    $sum = $a + $b;
    printf("%d + %d = %d\n", $a, $b, $sum);
    return $sum;
}

\DDTrace\trace_function(
    'addNums',
    function(SpanData $span, $args, $retval) {
        echo "Traced" . PHP_EOL;
    }
);

var_dump(addNums(2, 8));
// 2 + 8 = 10
// Traced
// int(10)
```

{{% /tab %}}
{{% tab "Tracing method calls" %}}

Methods are instrumented with `DDTrace\trace_method()` which provides the same functionality as `DDTrace\trace_function()`. One key difference is that the tracing closure is bound to the instrumented class which exposes an instance of the instrumented class via `$this`.

```php
<?php

use DDTrace\SpanData;

class Calc {
    public $foo = 'bar';
    public function addNums($a, $b) {
        $sum = $a + $b;
        printf("%d + %d = %d\n", $a, $b, $sum);
        return $sum;
    }
}

\DDTrace\trace_method(
    'Calc', 'addNums',
    function(SpanData $span, $args, $retval) {
        echo '$this->foo: ' . $this->foo . PHP_EOL;
    }
);

$calc = new Calc();
var_dump($calc->addNums(2, 8));
// 2 + 8 = 10
// $this->foo: bar
// int(10)
```
{{% /tab %}}
{{< /tabs >}}

## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data.

{{< tabs >}}
{{% tab "Current span" %}}

```php
<?php
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if ($span) {
    $span->setTag('customer.id', get_customer_id());
}
?>
```

{{% /tab %}}
{{% tab "Root span" %}}

The root span of the trace can be accessed later directly from the global tracer via `Tracer::getRootScope()`. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
$scope = \DDTrace\GlobalTracer::get()->getRootScope();
if ($scope) {
    $scope->getSpan()->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
}
?>
```

{{% /tab %}}
{{< /tabs >}}

## Adding tags

{{< tabs >}}
{{% tab "Locally" %}}

Add tags to a span via the `DDTrace\SpanData::$meta` array.

```php
<?php

\DDTrace\trace_function(
    'myRandFunc',
    function(\DDTrace\SpanData $span, array $args, $retval) {
        // ...
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
    }
);
```

{{% /tab %}}
{{% tab "Globally" %}}

Set the `DD_TAGS` environment variable (version 0.47.0+) to automatically apply tags to every span that is created. This was previously `DD_TRACE_GLOBAL_TAGS`. For more information about configuring the older version, see [environment variable configuration][1].

```
DD_TAGS=key1:value1,<TAG_KEY>:<TAG_VALUE>
```

[1]: /tracing/setup/php/#environment-variable-configuration
{{% /tab %}}
{{% tab "Errors" %}}

Thrown exceptions are automatically attached to the active span.

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

Set the `error.msg` tag to manually flag a span as erroneous.

```php
<?php

function doRiskyThing() {
    return SOME_ERROR_CODE;
}

\DDTrace\trace_function(
    'doRiskyThing',
    function(\DDTrace\SpanData $span, $args, $retval) {
        if ($retval === SOME_ERROR_CODE) {
            $span->meta = [
                'error.msg' => 'Foo error',
                // Optional:
                'error.type' => 'CustomError',
                'error.stack' => my_get_backtrace(),
            ];
        }
    }
);
```

{{% /tab %}}
{{< /tabs >}}

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][5] page.

## API reference

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

#### Parameter 1: `DDTrace\SpanData $span`

The `DDTrace\SpanData` instance contains [the same span information that the Agent expects][6]. A few exceptions are `trace_id`, `span_id`, `parent_id`, `start`, and `duration` which are set at the C level and not exposed to userland via `DDTrace\SpanData`. Exceptions from the instrumented call are automatically attached to the span and the `error` field is managed automatically.

| Property | Type | Description |
| --- | --- | --- |
| `SpanData::$name` | `string` | The span name _(Optional as of ddtrace v0.47.0; defaults to 'ClassName.methodName' if not set)_ |
| `SpanData::$resource` | `string` | The resource you are tracing _(Optional as of ddtrace v0.47.0; defaults to `SpanData::$name` if not set)_ |
| `SpanData::$service` | `string` | The service you are tracing |
| `SpanData::$type` | `string` | The type of request which can be set to: **web**, **db**, **cache**, or **custom** _(Optional)_ |
| `SpanData::$meta` | `string[]` | An array of key-value span metadata; keys and values must be strings _(Optional)_ |
| `SpanData::$metrics` | `float[]` | An array of key-value span metrics; keys must be strings and values must be floats _(Optional)_ |

```php
<?php

use DDTrace\SpanData;

function myRandFunc($min, $max) {
    return mt_rand($min, $max);
}

\DDTrace\trace_function(
    'myRandFunc',
    function(SpanData $span, $args, $retval) {
        // SpanData::$name defaults to 'functionName' if not set (>= v0.47.0)
        $span->name = 'myRandFunc';
        // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
        $span->resource = 'myRandFunc';
        $span->service = 'php';
        // The following are optional
        $span->type = 'web';
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
        $span->metrics = [
            '_sampling_priority_v1' => 0.9,
        ];
    }
);
```

#### Parameter 2: `array $args`

The second parameter to the tracing closure is an array of arguments from the instrumented call. It functions similarly to [`func_get_args()`][7].

By default the tracing closure is executed _after_ the instrumented call which means any arguments passed by reference could be a different value when they reach the tracing closure.

```php
<?php

use DDTrace\SpanData;

function argsByRef(&$a) {
    return ++$a;
}

\DDTrace\trace_function(
    'argsByRef',
    function(SpanData $span, $args) {
        var_dump($args);
    }
);

$foo = 10;
var_dump(argsByRef($foo));
// array(1) {
//   [0]=>
//   int(11)
// }
// int(11)
```

On PHP 7, the tracing closure has access to the same arguments passed to the instrumented call. If the instrumented call mutates an argument, including arguments passed by value, the `posthook` tracing closure will receive the mutated argument.

This is the expected behavior of arguments in PHP 7 as illustrated in the following example:

```php
<?php

function foo($a) {
    var_dump(func_get_args());
    $a = 'Dogs';
    var_dump(func_get_args());
}

foo('Cats');

/*
array(1) {
  [0]=>
  string(4) "Cats"
}
array(1) {
  [0]=>
  string(4) "Dogs"
}
*/
```

The following example demonstrates this effect on `posthook` tracing closures.

```php
<?php

function foo($a) {
    $a = 'Dogs';
}

\DDTrace\trace_function('foo', function ($span, array $args) {
    var_dump($args[0]);
});

foo('Cats');

// string(4) "Dogs"
```

If an argument needs to be accessed before mutation, the tracing closure [can be marked as `prehook`](#running-the-tracing-closure-before-the-instrumented-call) to access the arguments before the instrumented call.

#### Parameter 3: `mixed $retval`

The third parameter of the tracing closure is the return value of the instrumented call. Functions or methods that declare a `void` return type or ones that do not return a value will have a value of `null`.

```php
<?php

use DDTrace\SpanData;

function message(): void {
    echo "Hello!\n";
}

\DDTrace\trace_function(
    'message',
    function(SpanData $span, $args, $retval) {
        echo "Traced\n";
        var_dump($retval);
    }
);

var_dump(message());
// Hello!
// Traced
// NULL
// NULL
```

#### Parameter 4: `Exception|null $exception`

The final parameter of the tracing closure is an instance of the exception that was thrown in the instrumented call or `null` if no exception was thrown.

```php
<?php

use DDTrace\SpanData;

function mightThrowException() {
  throw new Exception('Oops!');
  return 'Hello';
}

\DDTrace\trace_function(
  'mightThrowException',
  function(SpanData $span, $args, $retval, $ex) {
    if ($ex) {
      echo 'Exception from instrumented call: ';
      echo $ex->getMessage() . PHP_EOL;
    }
  }
);

mightThrowException();

/*
Exception from instrumented call: Oops!
NULL
PHP Fatal error:  Uncaught Exception: Oops! ...
*/
```

As exceptions are attached to spans automatically, there is no need to manually set `SpanData::$meta['error.*']` metadata. But having access to the exception instance enables you to check for a thrown exception before accessing the return value.

```php
<?php

use DDTrace\SpanData;

\DDTrace\trace_function(
    'mightThrowException',
    function(SpanData $span, $args, $retval, $ex) {
        if (null === $ex) {
            // Do something with $retval
        }
    }
);
```

## Advanced configurations

### Tracing internal functions and methods

An optimization was added starting in **0.46.0** to ignore all internal functions and methods for instrumentation. Internal functions and methods can still be instrumented by setting the `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable. This takes a CSV of functions or methods that will be instrumented e.g. `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`. Once a function or method has been added to the list, it can be instrumented using `DDTrace\trace_function()` and `DDTrace\trace_method()` respectively.

### Running the tracing closure before the instrumented call

By default, tracing closures are treated as `posthook` closures meaning they will be executed _after_ the instrumented call. Some cases require running the tracing closure _before_ the instrumented call. In that case, tracing closures are marked as `prehook` using an associative configuration array.

```php
\DDTrace\trace_function('foo', [
    'prehook' => function (\DDTrace\SpanData $span, array $args) {
        // This tracing closure will run before the instrumented call
    }
]);
```

### Debugging sandboxed errors

Tracing closures are "sandboxed" in that exceptions thrown and errors raised inside of them do no impact the instrumented call.

```php
<?php

function my_func() {
  echo 'Hello!' . PHP_EOL;
}

\DDTrace\trace_function(
  'my_func',
  function() {
    throw new \Exception('Oops!');
  }
);

my_func();
echo 'Done.' . PHP_EOL;

/*
Hello!
Done.
*/
```

To debug, set the environment variable `DD_TRACE_DEBUG=1` to expose any exceptions or errors that may have occurred in a tracing closure.

```php
/*
Hello!
Exception thrown in tracing closure for my_func: Oops!
Done.
*/
```

### Zend framework 1 manual instrumentation

Zend framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][8]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### PHP code optimization

Prior to PHP 7, some frameworks provided ways to compile PHP classes—e.g., through the Laravel's `php artisan optimize` command.

While this [has been deprecated][9] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing](#opentracing) API instead of adding `datadog/dd-trace` to your Composer file.

## Legacy API upgrade guide

Datadog recommends that you update custom instrumentations implemented using the legacy `dd_trace()` API.

There is an important paradigm distinction to understand between the legacy API and the "sandbox" API. The legacy API forwards the instrumented call from inside the tracing closure using `dd_trace_forward_call()`.

{{< img src="tracing/manual_instrumentation/php_legacy_api.png" alt="Legacy API" style="width:100%;">}}

The sandbox API runs the tracing closure after the instrumented call so there is no need to forward the original call along with `dd_trace_forward_call()`.

{{< img src="tracing/manual_instrumentation/php_sandbox_api.png" alt="Sandbox API" style="width:100%;">}}

Contrary to the legacy API, the sandbox API handles the following tasks automatically:

1. Creating the span
2. Forwarding the original call
3. Attaching exceptions to the span

### Upgrading example

The sandbox API reduces the amount of boilerplate required to instrument a call. Below is a side-by-side comparison of a full legacy API example and the sandbox API equivalent.

```php
# Legacy API
dd_trace('CustomDriver', 'doWork', function (...$args) {
    // Start a new span
    $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Access object members via $this
    $span->setTag(\DDTrace\Tag::RESOURCE_NAME, $this->workToDo);

    try {
        // Execute the original method. Note: dd_trace_forward_call() - handles any parameters automatically
        $result = dd_trace_forward_call();
        // Set a tag based on the return value
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // Inform the tracer that there was an exception thrown
        $span->setError($e);
        // Bubble up the exception
        throw $e;
    } finally {
        // Close the span
        $span->finish();
    }
});

# Sandbox API
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // This closure runs after the instrumented call
        // Span was automatically created before the instrumented call

        // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // If an exception was thrown from the instrumented call, return value is null
            'doWork.size' => $exception ? 0 : count($retval),
            // Access object members via $this
            'doWork.thing' => $this->workToDo,
        ];

        // No need to explicitly forward the call with dd_trace_forward_call()
        // No need to explicitly catch/attach exceptions
        // The span will automatically close
    }
);
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/php/#automatic-instrumentation
[2]: /tracing/visualization/#trace
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/#span-tags
[5]: /tracing/security
[6]: /tracing/guide/send_traces_to_agent_by_api/
[7]: https://www.php.net/func_get_args
[8]: https://github.com/DataDog/dd-trace-php/releases/latest
[9]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
