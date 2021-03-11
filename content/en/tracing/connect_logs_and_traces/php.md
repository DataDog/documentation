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

## Automatically Inject Trace and Span IDs

Given the many different ways to implement logging in PHP<span class="x x-first x-last">,</span> with some completely circumventing PHP's built-in error-logging API, the Datadog PHP tracing library cannot reliably inject trace and span <span class="x x-first x-last">IDs</span> into logs automatically.
See the section below to learn how to connect your PHP Logs and traces manually.

## Manually Inject Trace and Span IDs

<div class="alert alert-warning">
Note that the function <code>\DDTrace\trace_id()</code> has been introduced in version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.53.0">0.53.0</a>.
</div>

To connect your logs and traces together, your logs must contain the `dd.trace_id` and `dd.span_id` attributes that respectively contain your trace ID and your span ID.

If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings and remapped thanks to the [Trace Remapper][2]. More information can be found in the [Why can't I see my correlated logs in the Trace ID panel?][3] FAQ.

For instance, you would append those two attributes to your logs with:

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%d dd.span_id=%d]',
      \DDTrace\trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

If the logger implements the [**monolog/monolog** library][4], use `Logger::pushProcessor()` to automatically append the identifiers to all log messages:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%d dd.span_id=%d]',
          \DDTrace\trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

If your application uses json logs format instead of appending trace_id and span_id to the log message you can add first-level key "dd" containing these ids:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['dd'] = [
          'trace_id' => \DDTrace\trace_id(),
          'span_id'  => \dd_trace_peek_span_id(),
      ];

      return $record;
  });
?>
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/php/
[2]: /logs/processing/processors/#trace-remapper
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
