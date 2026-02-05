<!--
This partial contains PHP custom instrumentation content for the Datadog API.
-->

{% alert level="info" %}
If you have not yet read the instructions for auto-instrumentation and setup, start with the [PHP Setup Instructions][11]. Even if Datadog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation][12] for more details.
{% /alert %}

## Annotations {% #annotations-php %}

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

## Writing custom instrumentation {% #writing-custom-instrumentation-php %}

{% alert level="info" %}
To write custom instrumentation, you do not need any additional composer package.
{% /alert %}

{% alert level="info" %}
The Datadog APM PHP Api is fully documented [in stubs][13]. This allows you to have automated documentation in PHPStorm.
{% /alert %}

### A sample application to be instrumented {% #sample-application-php %}

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

```php
namespace App;

function some_utility_function($someArg)
{
    return 'result';
}
```

And `src/Services/SampleRegistry.php`:

```php
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
```

### Steps to instrument the sample application {% #steps-to-instrument-php %}

To avoid mixing application or service business logic with instrumentation code, write the required code in a separate file:

1. Create a file `datadog/instrumentation.php` and add it to the composer autoloader:

   ```json
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

2. Dump the autoloader by running `composer dump`.

   {% alert level="info" %}
   The file that contains the custom instrumentation code and the actual classes that are instrumented are not required to be in the same codebase and package. By separating them, you can publish an open source composer package containing only your instrumentation code, which others might find useful.
   {% /alert %}

3. In the `datadog/instrumentation.php` file, check if the extension is loaded:

   ```php
   if (!extension_loaded('ddtrace')) {
       return;
   }
   ```

4. Instrument a function. For `\App\some_utility_function`, if you are not interested in any specific aspect of the function other than the execution time:

   ```php
   \DDTrace\trace_function('App\some_utility_function', function (\DDTrace\SpanData $span, $args, $ret, $exception) {});
   ```

5. For the `SampleRegistry::put` method, add tags with the returned item identifier and the key. Because `put` is a method, use `\DDTrace\trace_method` instead of `\DDTrace\trace_function`:

   ```php
   \DDTrace\trace_method(
       'App\Services\SampleRegistry',
       'put',
       function (\DDTrace\SpanData $span, $args, $ret, $exception) {
           $span->meta['app.cache.key'] = $args[0]; // The first argument is the 'key'
           $span->meta['app.cache.item_id'] = $ret; // The returned value
       }
   );
   ```

6. For `SampleRegistry::faultyMethod`, which generates an exception, there is nothing extra to do. If the method is instrumented, the default exception reporting mechanism attaches the exception message and stack trace.

7. For `SampleRegistry::get`, which uses a `NotFound` exception as part of business logic, you can prevent marking the span as an error by unsetting the exception:

   ```php
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

8. For `SampleRegistry::compact`, to add a tag with a value that is neither an argument nor the return value, you can access the active span directly from within the method:

   ```php
   public function compact()
   {
       $numberOfItemsProcessed = 123;

       // Add instrumenting code within your business logic.
       if (\function_exists('\DDTrace\active_span') && $span = \DDTrace\active_span()) {
           $span->meta['registry.compact.items_processed'] = $numberOfItemsProcessed;
       }

       // ...
   }
   ```

## Details about `trace_function` and `trace_method` {% #details-trace-function-method-php %}

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

## Accessing active spans {% #accessing-active-spans-php %}

The built-in instrumentation and your own custom instrumentation creates spans around meaningful operations. You can access the active span in order to include meaningful data.

### Current span {% #current-span-php %}

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null` is returned.

```php
<?php
$span = \DDTrace\active_span();
if ($span) {
    $span->meta['customer.id'] = get_customer_id();
}
?>
```

### Root span {% #root-span-php %}

The following method returns a `DDTrace\SpanData` object. When tracing is disabled, `null` is returned. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
$span = \DDTrace\root_span();
if ($span) {
    $span->meta['customer.id'] = get_customer_id();
}
?>
```

## Adding tags {% #adding-tags-php %}

{% alert level="danger" %}
When you set tags, to avoid overwriting existing tags automatically added by the Datadog core instrumentation, **do write `$span->meta['mytag'] = 'value'`**. Do not write `$span->meta = ['mytag' => 'value']`.
{% /alert %}

### Adding tags locally {% #adding-tags-locally-php %}

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

### Adding tags globally {% #adding-tags-globally-php %}

Set the `DD_TAGS` environment variable (version 0.47.0+) to automatically apply tags to every span that is created.

```
DD_TAGS=key1:value1,<TAG_KEY>:<TAG_VALUE>
```

### Setting errors on a span {% #setting-errors-on-a-span-php %}

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

## Adding span links {% #adding-span-links-php %}

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

## Context propagation for distributed traces {% #context-propagation-php %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][9] for information.

## Resource filtering {% #resource-filtering-php %}

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][3] page.

## API reference {% #api-reference-php %}

{% alert level="info" %}
The Datadog APM PHP Api is fully documented [in stubs][13]. This allows you to have automated documentation in PHPStorm.
{% /alert %}

### Parameters of the tracing closure {% #parameters-tracing-closure-php %}

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

## Advanced configurations {% #advanced-configurations-php %}

### Tracing internal functions and methods {% #tracing-internal-functions-php %}

As of version 0.76.0, all internal functions can unconditionally be traced.

On older versions, tracing internal functions and methods requires setting the `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable, which takes a CSV of functions or methods that is to be instrumented. For example, `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`. Once a function or method has been added to the list, it can be instrumented using `DDTrace\trace_function()` and `DDTrace\trace_method()` respectively. The `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable is obsolete as of version 0.76.0.

### Running the tracing closure before the instrumented call {% #tracing-closure-before-php %}

By default, tracing closures are treated as `posthook` closures meaning they are executed _after_ the instrumented call. Some cases require running the tracing closure _before_ the instrumented call. In that case, tracing closures are marked as `prehook` using an associative configuration array.

```php
\DDTrace\trace_function('foo', [
    'prehook' => function (\DDTrace\SpanData $span, array $args) {
        // This tracing closure will run before the instrumented call
    }
]);
```

### Debugging sandboxed errors {% #debugging-sandboxed-errors-php %}

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

### Zend framework 1 manual instrumentation {% #zend-framework-1-php %}

Zend framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][6]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### PHP code optimization {% #php-code-optimization-php %}

Prior to PHP 7, some frameworks provided ways to compile PHP classes (for example, through the Laravel's `php artisan optimize` command).

While this [has been deprecated][7] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing][8] API instead of adding `datadog/dd-trace` to your Composer file.

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
[11]: /tracing/setup/php/
[12]: /tracing/setup/php/#automatic-instrumentation
[13]: https://github.com/DataDog/dd-trace-php/blob/master/ext/ddtrace.stub.php
