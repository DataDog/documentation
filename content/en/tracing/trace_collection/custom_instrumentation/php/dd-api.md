---
title: PHP Custom Instrumentation using Datadog API
kind: documentation
aliases:
    - /tracing/manual_instrumentation/php
    - /tracing/opentracing/php
    - /tracing/custom_instrumentation/php
    - /tracing/setup_overview/custom_instrumentation/php
    - /tracing/trace_collection/custom_instrumentation/php
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/php
description: 'Manually instrument your PHP application to send custom traces to Datadog.'
code_lang: dd-api
code_lang_weight: 1
type: multi-code-lang
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="/tracing/setup/php/">PHP Setup Instructions</a>. Even if Datadog does not officially support your web framework, you may not need to perform any manual instrumentation. See <a href="/tracing/setup/php/#automatic-instrumentation">automatic instrumentation</a> for more details.
</div>

## Annotations

If you are using PHP 8, as of v0.84 of the tracer, you can add attributes to your code to instrument it. It is a lighter alternative to [custom instrumentation written in code](#writing-custom-instrumentation). For example, add the `#[DDTrace\Trace]` attribute to methods for Datadog to trace them.

```php
<?php
class Server {
    #[DDTrace\Trace(name: "spanName", resource: "resourceName", type: "Custom", service: "myService", tags: ["aTag" => "aValue"])]
    static function process($arg) {}

    #[DDTrace\Trace]
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

<div class="alert alert-warning">
If a namespace is present, you <strong>must</strong> use the fully qualified name of the attribute <code>#[\DDTrace\Trace]</code>. Alternatively, you can import the namespace with <code>use DDTrace\Trace;</code> and use <code>#[Trace]</code>.
</div>

## Writing custom instrumentation

If you do need to write your own custom instrumentation, consider the following sample application and walk through the coding examples.

### A sample application to be instrumented

Assume the following directory structure:

```
.
|-- composer.json
|-- docker-compose.yml
|-- index.php
`-- src
    |-- Exceptions
    |   `-- NotFound.php
    |-- Services
    |   `-- SampleRegistry.php
    `-- utils
        `-- functions.php
```
Within this, two files contain the functions and methods that are interesting to instrument. The most relevant files are `src/utils/functions.php`:

{{< code-block lang="php" filename="src/utils/functions.php" >}}
namespace App;

function some_utility_function($someArg)
{
    return 'result';
}
{{< /code-block >}}

And `src/Services/SampleRegistry.php`:

{{< code-block lang="php" filename="src/Services/SampleRegistry.php" >}}
namespace App\Services;

use App\Exceptions\NotFound;
use Exception;

class SampleRegistry
{
    public function put($key, $value)
    {
        \App\some_utility_function('some argument');
        // Return the id of the item inserted
        return 456;
    }

    public function faultyMethod()
    {
        throw new Exception('Generated at runtime');
    }

    public function get($key)
    {
        // The service uses an exception to report a key not found.
        throw new NotFound('The key was not found');
    }

    public function compact()
    {
        // This function executes some operations on the registry and
        // returns nothing. In the middle of the function, we have an
        // interesting value that is not returned but can be related
        // to the slowness of the function

        $numberOfItemsProcessed = 123;

        // ...
    }
}
{{< /code-block >}}


### Writing the custom instrumentation

<div class="alert alert-info">
To write custom instrumentation, you do not need any additional composer package.
</div>

<div class="alert alert-info">
    The Datadog APM PHP Api is fully documented <strong><a href="https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php">in stubs</a></strong>. This allows you to have automated documentation in PHPStorm. You can still go through the stub file for more info about Datadog APM PHP API.
</div>

To avoid mixing application or service business logic with instrumentation code, write the required code in a separate file.

1. Create a file `datadog/instrumentation.php` and add it to the composer autoloader.

   {{< code-block lang="json" filename="composer.json" >}}
{
    ...
    "autoload": {
        ...
        "files": [
            ...
            "datadog/instrumentation.php"
        ]
    },
    ...
}
   {{< /code-block >}}

2. Dump the autoloader, for example by running `composer dump`.

   <div class="alert alert-info">
   <strong>Note</strong>: The file that contains the custom instrumentation code and the actual classes that are instrumented are not required to be in the same code base and package. By separating them, you can publish an open source composer package, for example to GitHub, containing only your instrumentation code, which others might find useful. Registering the instrumentation entry point in the <code>composer.json</code>'s <code>autoload.files</code> array ensures that the file is always executed when the composer autoloader is required.
   </div>

3. In the `datadog/instrumentation.php` file, check if the extension is loaded. If the extension is not loaded then all the functions used in this file do not exist.

   {{< code-block lang="php" filename="datadog/instrumentation.php" >}}
if (!extension_loaded('ddtrace')) {
    return;
}
   {{< /code-block >}}

4. Instrument a function, `\App\some_utility_function`. If you are not interested in any specific aspect of the function other than the execution time, then this is all that is required:

   {{< code-block lang="php" filename="datadog/instrumentation.php" >}}
\DDTrace\trace_function('App\some_utility_function', function (\DDTrace\SpanData $span, $args, $ret, $exception) {});
   {{< /code-block >}}

5. Suppose for the `SampleRegistry::put` method, you not only want to generate a span, you also want to add a tag with the value of the returned item identifier, and a tag for the key. Because `put` is a method, use `\DDTrace\trace_method` instead of `\DDTrace\trace_function`:

   {{< code-block lang="php" filename="datadog/instrumentation.php" >}}
...
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'put',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
        $span->meta['app.cache.key'] = $args[0]; // The first argument is the 'key'
        $span->meta['app.cache.item_id'] = $ret; // The returned value
    }
);
   {{< /code-block >}}

   <div class="alert alert-warning">
   When you set tags, to avoid overwriting existing tags automatically added by the Datadog core instrumentation, <strong>do write <code>$span->meta['mytag'] = 'value'</code></strong>. Do not write <code>$span->meta = ['mytag' => 'value']</code>.
   </div>

6. In the sample code, `SampleRegistry::faultyMethod` generates an exception. There is nothing you have to do with regards to custom instrumentation. If the method is instrumented, the default exception reporting mechanism takes care of attaching the exception message and the stack trace.

   {{< code-block lang="php" filename="datadog/instrumentation.php" >}}
...
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'faultyMethod',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
    }
);
   {{< /code-block >}}

7. The `SampleRegistry::get` method uses a `NotFound` exception to notify that an item was not found. This exception is an expected part of the business logic and you do not want to mark the span as an error. You just want to change the resource name to add it to a pool of `not_found` operations. To achieve that, you `unset` the exception for the span:

   {{< code-block lang="php" filename="datadog/instrumentation.php" >}}
...
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'get',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
        if ($exception instanceof \App\Exceptions\NotFound) {
            unset($span->exception);
            $span->resource = 'cache.get.not_found';
        }
    }
);
   {{< /code-block >}}

8. The `SampleRegistry::compact` method demonstrates an interesting use case. You are interested in adding a tag with a value that is neither an argument nor the value returned by the function. To do this, edit both `datadog/instrumentation.php` and the class file `src/Services/SampleRegistry.php`:

   {{< code-block lang="php" filename="datadog/instrumentation.php" >}}
...
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'compact',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
    }
);
   {{< /code-block >}}

   In `src/Services/SampleRegistry.php` edit the body of the method:

   {{< code-block lang="php" filename="src/Services/SampleRegistry.php" >}}
...
    public function compact()
    {
        // This function execute some operations on the registry and
        // returns nothing. In the middle of the function, we have an
        // interesting value that is not returned but can be related
        // to the slowness of the function

        $numberOfItemsProcessed = 123;

        // Add instrumenting code within your business logic.
        if (\function_exists('\DDTrace\active_span') && $span = \DDTrace\active_span()) {
            $span->meta['registry.compact.items_processed'] = $numberOfItemsProcessed;
        }

        // ...
    }
   {{< /code-block >}}

## Details about `trace_function` and `trace_method`

The `DDTrace\trace_function` and `DDTrace\trace_method` functions instrument (trace) specific function and method calls. These functions automatically handle the following tasks:

- Open a [span][1] before the code executes.
- Set any errors from the instrumented call on the span.
- Close the span when the instrumented call is done.

Additional [tags][2] are set on the span from the closure (called a tracing closure).

For example, the following snippet traces the `CustomDriver::doWork` method and adds custom tags. Exceptions are automatically tracked on the span.

{{< code-block lang="php" >}}
<?php
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // This closure runs after the instrumented call
        // Span was automatically created before the instrumented call

        // SpanData::$name defaults to 'ClassName.methodName' if not set
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource defaults to SpanData::$name if not set
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        // If an exception was thrown from the instrumented call, return value is null
        $span->meta['doWork.size'] = $exception ? 0 : count($retval),
        // Access object members via $this
        $span->meta['doWork.thing'] = $this->workToDo;

        // The span will automatically close
    }
);

// For functions
\DDTrace\trace_function(
    'doCustomDriverWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Same as DDTrace\trace_method tracing closure
    }
);
?>
{{< /code-block >}}

## Accessing active spans

The built-in instrumentation and your own custom instrumentation creates spans around meaningful operations. You can access the active span in order to include meaningful data.

{{< tabs >}}
{{% tab "Current span" %}}

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null is returned.

```php
<?php
$span = \DDTrace\active_span();
if ($span) {
    $span->meta['customer.id'] = get_customer_id();
}
?>
```

{{% /tab %}}
{{% tab "Root span" %}}

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null` is returned. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
$span = \DDTrace\root_span();
if ($span) {
    $span->meta['customer.id'] = get_customer_id();
}
?>
```

{{% /tab %}}
{{< /tabs >}}

## Adding tags

<div class="alert alert-warning">
When you set tags, to avoid overwriting existing tags automatically added by the Datadog core instrumentation, <strong>do write <code>$span->meta['mytag'] = 'value'</code></strong>. Do not write <code>$span->meta = ['mytag' => 'value']</code>.
</div>

{{< tabs >}}
{{% tab "Locally" %}}

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

{{% /tab %}}
{{% tab "Globally" %}}

Set the `DD_TAGS` environment variable (version 0.47.0+) to automatically apply tags to every span that is created. This was previously `DD_TRACE_GLOBAL_TAGS`. For more information about configuring the older version, see [environment variable configuration][1].

```
DD_TAGS=key1:value1,<TAG_KEY>:<TAG_VALUE>
```

[1]: /tracing/setup/php/#environment-variable-configuration
{{% /tab %}}
{{% tab "Errors" %}}

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
            $span->meta['error.msg'] = 'Foo error';
            // Optional:
            $span->meta['error.type'] = 'CustomError';
            $span->meta['error.stack'] = (new \Exception)->getTraceAsString();
        }
    }
);
```

{{% /tab %}}
{{< /tabs >}}

## Adding span links (Beta)

<div class="alert alert-info">Support for span links is in beta and requires the <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.87.2">PHP tracer v0.87.2+</a>.</div>

Span links associate one or more spans together that don't have a typical parent-child relationship. They may associate spans within the same trace or spans across different traces.

Span links help trace operations in distributed systems, where workflows often deviate from linear execution patterns. Additionally, span links are useful to trace the flow of operations in systems that execute requests in batches or process events asynchronously.

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

To link a span using distributed tracing headers:

```php
$spanA = \DDTrace\start_trace_span();
$spanA->name = 'spanA';
$distributedTracingHeaders = \DDTrace\generate_distributed_tracing_headers();
\DDTrace\close_span();

$spanB = \DDTrace\start_trace_span();
$spanB->name = 'spanB';
// Link spanB to spanA using distributed tracing headers
$spanB->links[] = \DDTrace\SpanLink::fromHeaders($distributedTracingHeaders);
\DDTrace\close_span();
```

You can view span links from the [Trace View][10] in APM.

## Context propagation for distributed traces

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][9] for information.

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][3] page.

## API reference

<div class="alert alert-info">
    The Datadog APM PHP Api is fully documented <strong><a href="https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php">in stubs</a></strong>. This allows you to have automated documentation in PHPStorm. You can still go through the stub file for more info about Datadog APM PHP API.
</div>

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

The `DDTrace\SpanData` instance contains [the same span information that the Agent expects][4]. A few exceptions are `trace_id`, `span_id`, `parent_id`, `start`, and `duration` which are set at the C level and not exposed to userland via `DDTrace\SpanData`. Exceptions from the instrumented call are automatically attached to the span.

| Property | Type | Description |
| --- | --- | --- |
| `SpanData::$name` | `string` | The span name _(Optional as of ddtrace v0.47.0; defaults to 'ClassName.methodName' if not set)_ |
| `SpanData::$resource` | `string` | The resource you are tracing _(Optional as of ddtrace v0.47.0; defaults to `SpanData::$name` if not set)_ |
| `SpanData::$service` | `string` | The service you are tracing |
| `SpanData::$type` | `string` | The type of request which can be set to: **web**, **db**, **cache**, or **custom** _(Optional)_ |
| `SpanData::$meta` | `string[]` | An array of key-value span metadata; keys and values must be strings _(Optional)_ |
| `SpanData::$metrics` | `float[]` | An array of key-value span metrics; keys must be strings and values must be floats _(Optional)_ |
| `SpanData::$exception` | `\Throwable` | An exception generated during the execution of the original function, if any. |

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
        $span->meta['rand.range'] = $args[0] . ' - ' . $args[1];
        $span->meta['rand.value'] = $retval;
        $span->metrics['some_metric'] = 0.9;
    }
);
```

#### Parameter 2: `array $args`

The second parameter to the tracing closure is an array of arguments from the instrumented call. It functions similarly to [`func_get_args()`][5].

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

On PHP 7, the tracing closure has access to the same arguments passed to the instrumented call. If the instrumented call mutates an argument, including arguments passed by value, the `posthook` tracing closure receives the mutated argument.

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

The third parameter of the tracing closure is the return value of the instrumented call. Functions or methods that declare a `void` return type or ones that do not return a value have a value of `null`.

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

To manually remove an exception from a span, use `unset`, for example: `unset($span->exception)`.

## Advanced configurations

### Tracing internal functions and methods

As of version 0.76.0, all internal functions can unconditionally be traced.

On older versions, tracing internal functions and methods requires setting the `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable, which takes a CSV of functions or methods that is to be instrumented. For example, `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`. Once a function or method has been added to the list, it can be instrumented using `DDTrace\trace_function()` and `DDTrace\trace_method()` respectively. The `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable is obsolete as of version 0.76.0.

### Running the tracing closure before the instrumented call

By default, tracing closures are treated as `posthook` closures meaning they are executed _after_ the instrumented call. Some cases require running the tracing closure _before_ the instrumented call. In that case, tracing closures are marked as `prehook` using an associative configuration array.

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

First, [download the latest source code from the releases page][6]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### PHP code optimization

Prior to PHP 7, some frameworks provided ways to compile PHP classes (for example, through the Laravel's `php artisan optimize` command).

While this [has been deprecated][7] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing][8] API instead of adding `datadog/dd-trace` to your Composer file.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#spans
[2]: /tracing/glossary/#span-tags
[3]: /tracing/security
[4]: /tracing/guide/send_traces_to_agent_by_api/
[5]: https://www.php.net/func_get_args
[6]: https://github.com/DataDog/dd-trace-php/releases/latest
[7]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[8]: /tracing/trace_collection/opentracing/php#opentracing
[9]: /tracing/trace_collection/trace_context_propagation/php
[10]: /tracing/trace_explorer/trace_view?tab=spanlinksbeta#more-information
