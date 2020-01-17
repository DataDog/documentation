---
title: Connect Logs and Traces
kind: documentation
aliases:
  - /tracing/advanced/connect_logs_and_traces/
further_reading:
- link: "tracing/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Instrument manually your application to create traces."
- link: "tracing/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
- link: "https://www.datadoghq.com/blog/request-log-correlation/"
  tag: "Blog"
  text: "Correlate request logs with traces automatically"
---

The correlation between Datadog APM and Datadog Log Management is improved by automatically adding a `trace_id` and `span_id` in your logs with the Tracing Libraries. This can then be used in the platform to show you the exact logs correlated to the observed [trace][1].

Before correlating traces with logs, ensure your logs are either sent as JSON, or [parsed by the proper language level log processor][2].

Your language level logs *must* be turned into Datadog attributes in order for traces and logs correlation to work.

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs in Traces"  style="width:100%;">}}

## Automatic Trace ID injection

{{< tabs >}}
{{% tab "Java" %}}

Enable injection in the Java tracer's [configuration][1] by adding `-Ddd.logs.injection=true` as a jvm startup argument or through environment variable `DD_LOGS_INJECTION=true`.

If your logs are raw formatted, update your formatter to include `dd.trace_id` and `dd.span_id` in your logger configuration:

```text
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

If your logs are JSON formated and you are using Logback there is nothing left to do. Otherwise with other logging libraries you need to activate MDC attributes autoinjection into your logs.

[1]: /tracing/setup/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Enable injection with the environment variable `DD_LOGS_INJECTION=true` when using `ddtrace-run`.

**Note**: The standard library `logging` is supported for auto-injection. Any libraries, such as `json_log_formatter`, that extend the standard library module are also supported for auto-injection. `ddtrace-run` calls `logging.basicConfig` before executing your application. If the root logger has a handler configured, your application must modify the root logger and handler directly.

{{% /tab %}}
{{% tab "Ruby" %}}

Use one of the following options to inject Ruby trace information into your logs:

**Automatic Trace ID Injection for Rails Applications using Lograge (recommended)**

After [setting up Lograge in a Rails application][1], modify the `custom_options` block in your environment configuration file (e.g. `config/environments/production.rb`) to add the trace IDs:

```ruby
config.lograge.custom_options = lambda do |event|
  # Retrieves trace information for current thread
  correlation = Datadog.tracer.active_correlation

  {
    # Adds IDs as tags to log output
    :dd => {
      :trace_id => correlation.trace_id,
      :span_id => correlation.span_id
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

**Automatic Trace ID Injection for default Rails Applications**

Rails applications which are configured with a `ActiveSupport::TaggedLogging` logger can append trace IDs as tags to log output. The default Rails logger implements this tagged logging, making it easier to add trace tags.

In your Rails environment configuration file (e.g. `config/environments/production.rb`), add the following:

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end
```

This appends trace tags to web requests:

```text
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

[1]: /logs/log_collection/python/#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Go" %}}

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

[1]: /help
{{% /tab %}}
{{% tab "Node.js" %}}

Enable injection with the environment variable `DD_LOGS_INJECTION=true` or by configuring the tracer directly:

```javascript
const tracer = require('dd-trace').init({
  logInjection: true
})
```

This enables automatic trace ID injection for `bunyan`, `paperplane`, `pino`, and `winston`.

**Note**: Automatic injection only works for logs formatted as JSON.

{{% /tab %}}
{{% tab ".NET" %}}

The .NET Tracer uses the [LibLog][1] library to automatically inject trace IDs into your application logs. It contains transparent built-in support for injecting into [NLog][2], [Log4Net][3], and [Serilog][4].

Enable injection in the .NET Tracer’s [configuration][5] by setting `DD_LOGS_INJECTION=true` through environment variables or the configuration files.

Additionally, injection can be enabled in the code:

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

var settings = new TracerSettings { LogsInjectionEnabled = true };
var tracer = new Tracer(settings);
```

**Note**: This setting is only read during `Tracer` initialization. Changes to this setting after the `Tracer` instance is created are ignored.

[1]: https://github.com/damianh/LibLog
[2]: http://nlog-project.org
[3]: https://logging.apache.org/log4net
[4]: http://serilog.net
[5]: /tracing/setup/dotnet/#configuration
{{% /tab %}}
{{% tab "PHP" %}}

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

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][3].

[1]: https://github.com/Seldaek/monolog
[2]: /logs/log_collection/php
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "C++" %}}

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

[1]: /help
{{% /tab %}}
{{< /tabs >}}

## Manual Trace ID injection

{{< tabs >}}
{{% tab "Java" %}}

If you prefer to manually correlate your [traces][1] with your logs, leverage the Datadog API to retrieve correlation identifiers:

* Use `CorrelationIdentifier#getTraceId()` and `CorrelationIdentifier#getSpanId()` API methods to inject identifiers at the beginning and end of each [span][2] to log (see examples below).
* Configure MDC to use the injected Keys:
  * `dd.trace_id` Active Trace ID during the log statement (or `0` if no trace)
  * `dd.span_id` Active Span ID during the log statement (or `0` if no trace)

* `log4j2` example:

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Log something

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

* `slf4j/logback` example:

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Log something

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

Then update your logger configuration to include `dd.trace_id` and `dd.span_id` in your log pattern:

```text
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**Note**: If you are not using a [Datadog Log Integration][3] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][4].

[See the Java logging documentation][3] for more details about specific logger implementation or to learn how to log in JSON.

[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#spans
[3]: /logs/log_collection/java/#raw-format
[4]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Python" %}}

**Manual Trace ID Injection with Standard Library Logging**

If you prefer to manually correlate your [traces][1] with your logs, patch your `logging` module by updating your log formatter to include the ``dd.trace_id`` and ``dd.span_id`` attributes from the log record.

The configuration below is used by the automatic injection method and is supported by default in the Python Log Integration:

``` python
from ddtrace import patch_all; patch_all(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

**Manual Trace ID Injection without Standard Library Logging**

If you are not using the standard library `logging` module, you can use the `ddtrace.helpers.get_correlation_ids()` to inject tracer information into your logs. As an illustration of this approach, the following example defines a function as a *processor* in `structlog` to add `dd.trace_id` and `dd.span_id` to the log output:

``` python
from ddtrace.helpers import get_correlation_ids

import structlog

def tracer_injection(logger, log_method, event_dict):
    # get correlation ids from current tracer context
    trace_id, span_id = get_correlation_ids()

    # add ids to structlog event dictionary
    # if no trace present, set ids to 0
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Once the logger is configured, executing a traced function that logs an event yields the injected tracer information:

```text
>>> traced_func()
{"event": "In tracer context", "trace_id": 9982398928418628468, "span_id": 10130028953923355146}
```

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][3].

[See the Python logging documentation][2] to ensure that the Python Log Integration is properly configured so that your Python logs are automatically parsed.

[1]: /tracing/visualization/#trace
[2]: /logs/log_collection/python/#configure-the-datadog-agent
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Ruby" %}}
To add trace IDs to your own logger, add a log formatter which retrieves the trace IDs with `Datadog.tracer.active_correlation`, then add the trace IDs to the message.

To ensure proper log correlation, verify the following is present in each message:

 - `dd.trace_id=<TRACE_ID>`: Where `<TRACE_ID>` is equal to `Datadog.tracer.active_correlation.trace_id` or `0` if no trace is active during logging.
 - `dd.span_id=<SPAN_ID>`: Where `<SPAN_ID>` is equal to `Datadog.tracer.active_correlation.span_id` or `0` if no trace is active during logging.

By default, `Datadog::Correlation::Identifier#to_s` returns `dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

An example of this in practice:

```ruby
require 'ddtrace'
require 'logger'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# When no trace is active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# When a trace is active
Datadog.tracer.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][2].

See the [Ruby logging documentation][1] to verify the Ruby log integration is properly configured and your ruby logs are automatically parsed.

[1]: /logs/log_collection/ruby/#configure-the-datadog-agent
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Go" %}}

The Go tracer exposes two API calls to allow printing [trace][1] and [span][2] identifiers along with log statements using exported methods from `SpanContext` type:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Retrieve Trace ID and Span ID
    traceID := span.Context().TraceID()
    spanID := span.Context().SpanID()

    // Append them to log messages as fields:
    log.Printf("my log message dd.trace_id=%d dd.span_id=%d", traceID, spanID)
}
```

The above example illustrates how to use the span's context in the standard library's `log` package. Similar logic may be applied to 3rd party packages too.

**Note**: If you are not using a [Datadog Log Integration][3] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][4].

[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#spans
[3]: /logs/log_collection/go/#configure-your-logger
[4]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Node.js" %}}

**Manual Trace ID Injection for JSON Formatted Logs**

If you are using a logging library not supported for automatic injection but are using JSON format, it's possible to do manual injection directly in your code.

Example using `console` as the underlying logger:

```javascript
const tracer = require('dd-trace')
const formats = require('dd-trace/ext/formats')

class Logger {
  log (level, message) {
    const span = tracer.scope().active()
    const time = (new Date()).toISOString()
    const record = { time, level, message }

    if (span) {
      tracer.inject(span.context(), formats.LOG, record)
    }

    console.log(JSON.stringify(record))
  }
}

module.exports = Logger
```

**Manual Trace ID Injection for Raw Formatted Logs**

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

[1]: /help
{{% /tab %}}
{{% tab ".NET" %}}

To manually inject trace identifiers into your logs, access the necessary values through the `CorrelationIdentifier` static class. If your logging library supports structured logging, such as JSON messages, add the `dd.trace_id` and `dd.span_id` properties with their respective values.

Otherwise, add the strings `dd.trace_id=<TRACE_ID>` and `dd.span_id=<SPAN_ID>` to your log message. For example:

```csharp
using Datadog.Trace;

var traceId = CorrelationIdentifier.TraceId;
var spanId = CorrelationIdentifier.SpanId;

var message = $"My log message. [dd.trace_id={traceId} dd.span_id={spanId}]";
```

**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][2].

[1]: /logs/log_collection/csharp/#configure-your-logger
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "PHP" %}}

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

[1]: /help
{{% /tab %}}
{{% tab "C++" %}}

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

[1]: /help
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /agent/logs/#enabling-log-collection-from-integrations
