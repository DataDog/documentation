---
title: Connecting PHP Logs and Traces
kind: documentation
description: 'Connect your PHP logs and traces to correlate them in Datadog.'
further_reading:
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
---

## Automatic Trace ID injection

```php
  <?php
  $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
  $append = sprintf(
      ' [dd.trace_id=%d dd.span_id=%d]',
      $span->getTraceId(),
      $span->getSpanId()
  );
  my_error_logger('Error message.' . $append);
?>
```

If the logger implements the [**monolog/monolog** library][1], use `Logger::pushProcessor()` to automatically append the identifiers to all the log messages:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
      if (null === $span) {
          return $record;
      }
      $record['message'] .= sprintf(
          ' [dd.trace_id=%d dd.span_id=%d]',
          $span->getTraceId(),
          $span->getSpanId()
      );
      return $record;
  });
?>
```

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][3].

## Manual Trace ID injection

Coming Soon. Reach out to [the Datadog support team][4] to learn more.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/Seldaek/monolog
[2]: /logs/log_collection/php
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[4]: /help
