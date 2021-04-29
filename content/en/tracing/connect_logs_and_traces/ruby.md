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
    - link: '/logs/guide/correlate-your-full-stack-data/'
      tag: 'Guide'
      text: 'Correlate your full stack logs, traces and views.'
---

## Manually Inject Trace and Span IDs

In many cases, such as logging, it may be useful to correlate trace IDs to other events or data streams, for easier cross-referencing. The tracer can produce a correlation identifier for the currently active trace via `active_correlation`, which can be used to decorate these other data sources.

```ruby
# When a trace is active...
Datadog.tracer.trace('correlation.example') do
  # Returns #<Datadog::Correlation::Identifier>
  correlation = Datadog.tracer.active_correlation
  correlation.trace_id # => 5963550561812073440
  correlation.span_id # => 2232727802607726424
  correlation.env # => 'production' (derived from DD_ENV)
  correlation.service # => 'billing-api' (derived from DD_SERVICE)
  correlation.version # => '2.5.17' (derived from DD_VERSION)
end

# When a trace isn't active...
correlation = Datadog.tracer.active_correlation
# Returns #<Datadog::Correlation::Identifier>
correlation = Datadog.tracer.active_correlation
correlation.trace_id # => 0
correlation.span_id # => 0
correlation.env # => 'production' (derived from DD_ENV)
correlation.service # => 'billing-api' (derived from DD_SERVICE)
correlation.version # => '2.5.17' (derived from DD_VERSION)
```

#### For logging in Rails applications using Lograge (recommended)

After [setting up Lograge in a Rails application][1], modify the `custom_options` block in your environment configuration file (e.g. `config/environments/production.rb`) to add the trace IDs:

```ruby
config.lograge.custom_options = lambda do |event|
  # Retrieves trace information for current thread
  correlation = Datadog.tracer.active_correlation

  {
    # Adds IDs as tags to log output
    :dd => {
      # To preserve precision during JSON serialization, use strings for large numbers
      :trace_id => correlation.trace_id.to_s,
      :span_id => correlation.span_id.to_s,
      :env => correlation.env.to_s,
      :service => correlation.service.to_s,
      :version => correlation.version.to_s
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

#### For logging in Rails applications

Rails applications which are configured with an `ActiveSupport::TaggedLogging` logger can append correlation IDs as tags to log output. The default Rails logger implements this tagged logging, making it easier to add correlation tags.

In your Rails environment configuration file, add the following:

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end

# Given:
# DD_ENV = 'production' (The name of the environment your application is running in.)
# DD_SERVICE = 'billing-api' (Default service name of your application.)
# DD_VERSION = '2.5.17' (The version of your application.)

# Web requests will produce:
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

#### For logging in Ruby applications

To add correlation IDs to your logger, add a log formatter which retrieves the correlation IDs with `Datadog.tracer.active_correlation`, then add them to the message.

To properly correlate with Datadog logging, be sure the following is present in the log message, in order as they appear:

 - `dd.env=<ENV>`: Where `<ENV>` is equal to `Datadog.tracer.active_correlation.env`. Omit if no environment is configured.
 - `dd.service=<SERVICE>`: Where `<SERVICE>` is equal to `Datadog.tracer.active_correlation.service`. Omit if no default service name is configured.
 - `dd.version=<VERSION>`: Where `<VERSION>` is equal to `Datadog.tracer.active_correlation.version`. Omit if no application version is configured.
 - `dd.trace_id=<TRACE_ID>`: Where `<TRACE_ID>` is equal to `Datadog.tracer.active_correlation.trace_id` or `0` if no trace is active during logging.
 - `dd.span_id=<SPAN_ID>`: Where `<SPAN_ID>` is equal to `Datadog.tracer.active_correlation.span_id` or `0` if no trace is active during logging.

By default, `Datadog::Correlation::Identifier#to_s` will return `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

If a trace is not active and the application environment & version is not configured, it will return `dd.trace_id=0 dd.span_id=0 dd.env= dd.version=`.

An example of this in practice:

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# When no trace is active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# When a trace is active
Datadog.tracer.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. More information can be found in the [FAQ on this topic][3].

See the [Ruby logging documentation][2] to verify the Ruby log integration is properly configured and your ruby logs are automatically parsed.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/logs/log_collection/ruby/
[2]: /logs/log_collection/ruby/#configure-the-datadog-agent
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
