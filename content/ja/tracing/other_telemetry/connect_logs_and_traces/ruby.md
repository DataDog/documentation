---
title: Correlating Ruby Logs and Traces
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /tracing/connect_logs_and_traces/ruby
description: 'Connect your Ruby logs and traces to correlate them in Datadog.'
further_reading:
    - link: "https://www.datadoghq.com/blog/request-log-correlation/"
      tag: Blog
      text: Correlate request logs with traces automatically
    - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
      tag: Guide
      text: Ease troubleshooting with cross product correlation.
---

## Trace correlation

In many cases, such as logging, it may be useful to correlate trace IDs to other events or data streams, for easier cross-referencing.

### Logging in Rails applications

#### Automatic injection

For Rails applications using the default logger (`ActiveSupport::TaggedLogging`), `lograge`, or `semantic_logger`, trace ID injection is automatically configured. You need to add a [trace remapper][1] to connect the relevant logs with the traces.

#### Manual injection

To add correlation IDs to your logger, add a log formatter which retrieves the correlation IDs with `Datadog::Tracing.correlation`, then add them to the message.

To properly correlate with Datadog logging, be sure the following is present in the log message, in order as they appear:

 - `dd.env=<ENV>`: Where `<ENV>` is equal to `Datadog::Tracing.correlation.env`. Omit if no environment is configured.
 - `dd.service=<SERVICE>`: Where `<SERVICE>` is equal to `Datadog::Tracing.correlation.service`. Omit if no default service name is configured.
 - `dd.version=<VERSION>`: Where `<VERSION>` is equal to `Datadog::Tracing.correlation.version`. Omit if no application version is configured.
 - `dd.trace_id=<TRACE_ID>`: Where `<TRACE_ID>` is equal to `Datadog::Tracing.correlation.trace_id` or `0` if no trace is active during logging.
 - `dd.span_id=<SPAN_ID>`: Where `<SPAN_ID>` is equal to `Datadog::Tracing.correlation.span_id` or `0` if no trace is active during logging.

By default, `Datadog::Tracing.log_correlation` will return `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

If a trace is not active and the application environment & version is not configured, it will return `dd.service= dd.trace_id=0 dd.span_id=0`.

An example of this in practice:

```ruby
require 'ddtrace'
require 'logger'

Datadog.configure do |c|
  c.env = 'production'
  c.service = 'billing-api'
  c.version = '2.5.17'
end

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# When no trace is active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# When a trace is active
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/?tab=ui#trace-remapper

