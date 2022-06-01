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

## Write your own custom instrumentation

To show how to write custom instrumentations, we use a basic web application containing a number of interesting use cases.

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
The most relevant files are `src/utils/functions.php`

```
namespace App;

function some_utility_function($someArg)
{
    return 'result';
}
```

and `src/Services/SampleRegistry.php`

```
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
        // This function execute some operations on the registry and
        // returns nothing. In the middle of the function, we have an
        // interesting value that is not returned but can be related
        // to the slowness of the function

        $numberOfItemsProcessed = 123;

        // ...
    }
}
```

### Writing the custom instrumentation

<div class="alert alert-info">
In order to write custom instrumentations you do not need any additional composer package. There is only a specific use case that is not covered by the current version of the api and that requires the legacy API provided by a composer package. This use case is presented later in the page.
</div>

The recommended approach to instrument an application or a service is to write the required code in a separate file, with the result that the application business logic is not mixed with instrumentation code.

Create a file `datadog/instrumentation.php` and add it to the composer autoloader. Do not forget to dump the autoloader after you have added the file definition, for example running `composer update`.

In `composer.json`

```
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

```

<div class="alert alert-info">
Note that the file where the custom code to perform manual instrumentation lies and the actual classes that are instrumented are not required to be in the same code base and package. With this approach you can publish an open source composer package, for example on github, containing only the code you wrote to instrument a specific library that others might find useful. Registering the instrumentation entry point, as described below, in the <code>composer.json</code>'s <code>autoload.files</code> array ensures that this file will always be executed when the composer autoloader is required.
</div>

#### The `datadog/instrumentation.php` file

The first thing to check is if the extension is loaded. If the extension is not loaded then all the functions used in this file do not exist.

```
if (!extension_loaded('ddtrace')) {
    return;
}
```

Then we instrument the function `\App\some_utility_function`, if you are not interested in any specific aspect of the function other than the execution time, then this is all that is required

```
\DDTrace\trace_function('App\some_utility_function', function (\DDTrace\SpanData $span, $args, $ret, $exception) {});
```

For the `SampleRegistry` class's `put` method we are interested not only generating a span, but we also want to add a tag with the value of the returned item identifier and a tag for the key. Since this is a method, we use `\DDTrace\trace_method`:

```
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'put',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
        $span->meta['app.cache.key'] = $args[0];
        $span->meta['app.cache.item_id'] = $ret;
    }
);
```

<div class="alert alert-warning">
When you set tags, never do <code>$span->meta = ['my' => 'tag']</code>. Alwasy do <code>$span->meta['my'] = 'tag'</code> otherwise you might overwrite existing tags automatically added by our core instrumentations.
</div>

`SampleRegistry::faultyMethod` generated an exception. There is nothing to do with regards to custom instrumentation, as if the method is instrumented, the default exception reporting mechanism will take care of attaching the exception message and the stack trace.

```
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'faultyMethod',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
    }
);
```

`SampleRegistry::get` has a behavior that we are interested instrumenting properly. Specifically, if the item is not found, it will throw a `NotFound` exception. This exception is expected and we do not want to mark the span as errored. We just want to change the resource name in order to add it to a pool of `not_found` operations. In order to achieve this goal, we `unset` the exception for the span.

```
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
```

The method `SampleRegistry::compact` presents an interesting use case. We are interested in adding a tag with a value that is neither an argument nor the value returned by the function. In order to achieve this, we need to edit both files `datadog/instrumentation.php` and the actual class file `src/Services/SampleRegistry.php`.

In `datadog/instrumentation.php` add

```
\DDTrace\trace_method(
    'App\Services\SampleRegistry',
    'compact',
    function (\DDTrace\SpanData $span, $args, $ret, $exception) {
    }
);
```

In `src/Services/SampleRegistry.php` edit the body of the method

```
    public function compact()
    {
        // This function execute some operations on the registry and
        // returns nothing. In the middle of the function, we have an
        // interesting value that is not returned but can be related
        // to the slowness of the function

        $numberOfItemsProcessed = 123;

        // Add instrumenting code in your business logic
        if (\function_exists('\DDTrace\active_span') && $span = \DDTrace\active_span()) {
            $span->meta['registry.compact.items_processed'] = $numberOfItemsProcessed;
        }

        // ...
    }
```

## `trace_function()` and `trace_method()` in depth

The `DDTrace\trace_function()` and `DDTrace\trace_method()` functions instrument (trace) specific function and method calls. These functions automatically handle the following tasks:

- Open a [span][2] before the code executes
- Set any errors from the instrumented call on the span
- Close the span when the instrumented call is done

Additional [tags][3] are set on the span from the closure (called a tracing closure).

For example, the following snippet traces the `CustomDriver::doWork()` method and adds custom tags. Exceptions are automatically tracked on the span.

```php
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
// For ddtrace < v0.47.0 use dd_trace_function()
\DDTrace\trace_function(
    'doCustomDriverWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Same as DDTrace\trace_method tracing closure
    }
);
?>
```

## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data.

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

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null is returned. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
$scope = \DDTrace\root_span();
if ($scope) {
    $span->meta['customer.id'] = get_customer_id();
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
            $span->meta['error.msg'] = 'Foo error';
            // Optional:
            $span->meta['error.type'] = 'CustomError';
            $span->meta['error.stack'] = my_get_backtrace();
        }
    }
);
```

{{% /tab %}}
{{< /tabs >}}

## Distributed tracing

When a new PHP script is launched, the tracer automatically checks for the presence of datadog headers for distributed tracing:
- `x-datadog-trace-id` (environment variable: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (environment variable: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (environment variable: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (environment variable: `HTTP_X_DATADOG_TAGS`)

To manually set this information in a CLI script on new traces or an existing trace a function `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` is provided.

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

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][4] page.

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

The `DDTrace\SpanData` instance contains [the same span information that the Agent expects][5]. A few exceptions are `trace_id`, `span_id`, `parent_id`, `start`, and `duration` which are set at the C level and not exposed to userland via `DDTrace\SpanData`. Exceptions from the instrumented call are automatically attached to the span and the `error` field is managed automatically.

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
        $span->meta['rand.range'] = $args[0] . ' - ' . $args[1];
        $span->meta['rand.value'] = $retval;
        $span->metrics = [
            '_sampling_priority_v1' => 0.9,
        ];
    }
);
```

#### Parameter 2: `array $args`

The second parameter to the tracing closure is an array of arguments from the instrumented call. It functions similarly to [`func_get_args()`][6].

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

In order to manually remove an exception from a span, you can `unset($span->exception)`.

## Advanced configurations

### Tracing internal functions and methods

An optimization was added starting in **0.46.0** to ignore all internal functions and methods for instrumentation. Internal functions and methods can still be instrumented by setting the `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable. This takes a CSV of functions or methods that is to be instrumented. For example, `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`. Once a function or method has been added to the list, it can be instrumented using `DDTrace\trace_function()` and `DDTrace\trace_method()` respectively.

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

First, [download the latest source code from the releases page][7]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### PHP code optimization

Prior to PHP 7, some frameworks provided ways to compile PHP classes (for example, through the Laravel's `php artisan optimize` command).

While this [has been deprecated][8] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing][9] API instead of adding `datadog/dd-trace` to your Composer file.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/php/#automatic-instrumentation
[2]: /tracing/visualization/#spans
[3]: /tracing/visualization/#span-tags
[4]: /tracing/security
[5]: /tracing/guide/send_traces_to_agent_by_api/
[6]: https://www.php.net/func_get_args
[7]: https://github.com/DataDog/dd-trace-php/releases/latest
[8]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[9]: /tracing/setup_overview/open_standards/php#opentracing
