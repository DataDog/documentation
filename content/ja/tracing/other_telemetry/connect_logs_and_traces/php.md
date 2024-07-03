---
aliases:
- /ja/tracing/connect_logs_and_traces/php
code_lang: php
code_lang_weight: 70
description: Connect your PHP logs and traces to correlate them in Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Manually instrument your application to create traces.
- link: tracing/glossary/
  tag: Documentation
  text: Explore your services, resources, and traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlate request logs with traces automatically
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Ease troubleshooting with cross product correlation.
kind: documentation
title: Correlating PHP Logs and Traces
type: multi-code-lang
---

## Automatic injection

Starting in version `0.89.0`, the PHP tracer automatically injects trace correlation identifiers into application logs. To enable automatic injection, set the environment variable `DD_LOGS_INJECTION` (INI setting `datadog.logs_injection`) to `true`.

The PHP tracer supports PSR-3 compliant loggers, such as [Monolog][4] or [Laminas Log][5].

<div class="alert alert-warning">
  <strong>Note</strong>: Set up your logging library to produce logs in JSON format so that:
  <ul>
    <li>You don't need <a href="/logs/log_configuration/parsing">custom parsing rules</a>.</li>
    <li>Stack traces are properly wrapped into the log event.</li>
  </ul>
</div>

### Configure injection in logs

If you haven't done so already, configure the PHP tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. This provides the best experience for adding `env`, `service`, and `version` to your logs (see [Unified Service Tagging][6] for more details).

The PHP tracer provides various ways to configure the injection of trace correlation identifiers into your logs:
- [Add the trace correlation identifiers to the log context](#add-the-trace-correlation-identifiers-to-the-log-context)
- [Use placeholders in your message](#use-placeholders-in-your-message)

#### Add the trace correlation identifiers to the log context {#add-the-trace-correlation-identifiers-to-the-log-context}

The default behavior of the PHP tracer is to add the trace correlation identifiers to the log context.

For example, if you are using the [Monolog][4] library in a Laravel application as follows:

```php
use Illuminate\Support\Facades\Log;
# ...
Log::debug('Hello, World!');
```

The PHP tracer adds the available trace correlation identifiers to the log context. The logged message above could be transformed into:

```
[2022-12-09 16:02:42] production.DEBUG: Hello, World! {"dd.trace_id":"1234567890abcdef","dd.span_id":"1234567890abcdef","dd.service":"laravel","dd.version":"8.0.0","dd.env":"production","status":"debug"}
```

**Note**: If there is a placeholder in your message or if a trace ID is already present in the message, the PHP tracer does **not** add the trace correlation identifiers to the log context.

#### Use placeholders in your message {#use-placeholders-in-your-message}

You can use placeholders in your message to automatically inject trace correlation identifiers into your logs. The PHP tracer supports the following placeholders:
- `%dd.trace_id%`: the trace ID
- `%dd.span_id%`: the span ID
- `%dd.service%`: the service name
- `%dd.version%`: the service version
- `%dd.env%`: the service environment

Placeholders are case-sensitive and must be enclosed in `%` characters.

For example, if you are using the [Monolog][4] library in a Laravel application, you can configure the injection into a log message as follows:

```php
use Illuminate\Support\Facades\Log;
# ...
Log::info('Hello, World! [%dd.trace_id% %dd.span_id% %status%]');
```

The PHP tracer replaces the placeholders with the corresponding values. For example, the logged message above could be transformed into:

```
[2022-12-09 16:02:42] production.INFO: Hello, World! [dd.trace_id="1234567890abcdef" dd.span_id="1234567890abcdef" status="info"]
```

**Note**: The brackets are mandatory if you plan on using the default parsing rules provided in the PHP [log pipeline][7]. If you are using a custom parsing rule, you can omit the brackets if needed.


## Manual injection

<div class="alert alert-warning">
<strong>Note:</strong> The function <code>\DDTrace\current_context()</code> has been introduced in version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a> and returns decimal trace identifiers.
</div>

To connect your logs and traces together, your logs must contain the `dd.trace_id` and `dd.span_id` attributes that respectively contain your trace ID and your span ID.

If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings and remapped thanks to the [Trace Remapper][2]. More information can be found in [Correlated Logs Not Showing Up in the Trace ID Panel][3].

For instance, you would append those two attributes to your logs with:

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%s dd.span_id=%s]',
      \DDTrace\logs_correlation_trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

If the logger implements the [**monolog/monolog** library][4], use `Logger::pushProcessor()` to automatically append the identifiers to all log messages. For monolog v1, add the following configuration:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

For monolog v2, add the following configuration:

```php
<?php
  $logger->pushProcessor(function ($record) {
      return $record->with(message: $record['message'] . sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      ));
    });
  ?>
```

If your application uses JSON logs format, you can add a first-level key `dd` that contains the `trace_id` and `span_id`, instead of appending `trace_id` and `span_id` to the log message:

```php
<?php
  $logger->pushProcessor(function ($record) use ($context) {
      $record['dd'] = [
          'trace_id' => \DDTrace\logs_correlation_trace_id(),
          'span_id'  => \dd_trace_peek_span_id()
      ];

      return $record;
  });
?>
```

For monolog v3, add the following configuration:

```php
<?php
  $logger->pushProcessor(function ($record) {
        $record->extra['dd'] = [
            'trace_id' => \DDTrace\logs_correlation_trace_id(),
            'span_id'  => \dd_trace_peek_span_id()
        ];
        return $record;
    });
?>
```

If you are ingesting your logs as JSON, go to [Preprocessing for JSON logs][8] and add `extra.dd.trace_id` to the **Trace Id Attributes** field.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/php/
[2]: /ja/logs/log_configuration/processors/#trace-remapper
[3]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
[5]: https://github.com/laminas/laminas-log
[6]: /ja/getting_started/tagging/unified_service_tagging
[7]: /ja/logs/log_configuration/pipelines
[8]: https://app.datadoghq.com/logs/pipelines/remapping