---
title: Connecting Ruby Logs and Traces
kind: documentation
description: 'Connect your Ruby logs and traces to correlate them in Datadog.'
further_reading:
    - link: 'tracing/manual_instrumentation'
      tags: 'Enrich Tracing'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/opentracing'
      tags: 'Enrich Tracing'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Use the APM UI'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
---

## Automatic Trace ID injection

Use one of the following options to inject Ruby trace information into your logs:

- [Automatic Trace ID Injection for Rails Applications using Lograge is recommended](?tab=lograge).
- [Automatic Trace ID Injection for default Rails Applications](?tab=default).

{{< tabs >}}
{{% tab "Lograge" %}}

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

[1]: /logs/log_collection/python/#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Default" %}}

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

{{% /tab %}}
{{< /tabs >}}

## Manual Trace ID injection

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/ruby/#configure-the-datadog-agent
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
