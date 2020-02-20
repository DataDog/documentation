---
title: PHP Manual Instrumentation
kind: documentation
decription: "Manually instrument your PHP application to send custom traces to Datadog."
further_reading:
- link: "tracing/guide/instrument_custom_method"
  text: "Instrument a custom method to get deep visibility into your business logic"
- link: "tracing/connect_logs_and_traces"
  text: "Connect your Logs and Traces together"
- link: "tracing/opentracing"
  text: "Implement Opentracing across your applications"
- link: "tracing/visualization/"
  text: "Explore your services, resources, and traces"
---


Even if Datadog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation][1] for more details.

If you really need manual instrumentation, e.g., because you want to [trace][2] specific custom methods in your application, first install the PHP tracer dependency with Composer:

```bash
composer require datadog/dd-trace
```

## Trace a custom function or method

The `dd_trace()` function hooks into existing functions and methods to:

* Open a [span][3] before the code executes
* Set additional [tags][4] or errors on the span
* Close the span when it is done
* Modify the arguments or the return value

For example, the following snippet traces the `CustomDriver::doWork()` method, adds custom tags, reports any exceptions as errors on the span, and then re-throws the exceptions.

```php
<?php
  dd_trace("CustomDriver", "doWork", function (...$args) {
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
?>
```

The root span an be accessed later on directly from the global tracer via `Tracer::getRootScope()`. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
  $rootSpan = \DDTrace\GlobalTracer::get()
      ->getRootScope()
      ->getSpan();
  $rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
?>
```

### Zend Framework 1 manual instrumentation

Zend Framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][5]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

## PHP code optimization

Prior to PHP 7, some frameworks provided ways to compile PHP classes—e.g., through the Laravel's `php artisan optimize` command.

While this [has been deprecated][6] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing][7] API instead of adding `datadog/dd-trace` to your Composer file.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/php/#automatic-instrumentation
[2]: /tracing/visualization/#trace
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/#span-tags
[5]: https://github.com/DataDog/dd-trace-php/releases/latest
[6]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[7]: /tracing/opentracing/?tab=php
