---
title: Connecting Ruby Logs and Traces
kind: documentation
description: 'Connect your Ruby logs and traces to correlate them in Datadog.'
further_reading:
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
    - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
      tag: 'Guide'
      text: 'Ease troubleshooting with cross product correlation.'
---

## Trace correlation

In many cases, such as logging, it may be useful to correlate trace IDs to other events or data streams, for easier cross-referencing.

### For logging in Rails applications

#### Automatic

For Rails applications using the default logger (`ActiveSupport::TaggedLogging`) or `lograge`, you can automatically enable trace correlation injection by setting the `rails` instrumentation configuration option `log_injection` to `true` or by setting environment variable `DD_LOGS_INJECTION=true`:

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, log_injection: true
end
```

**Note:** For `lograge` users who have also defined `lograge.custom_options` in an `initializers/lograge.rb` configuration file, because Rails loads initializers in alphabetical order, automatic trace correlation may not take effect, since `initializers/datadog.rb` would be overwritten by the `initializers/lograge.rb` initializer. To support automatic trace correlation with _existing_ `lograge.custom_options`, use the [Manual (Lograge)](#manual-lograge) configuration below.

#### Manual (Lograge)

After [setting up Lograge in a Rails application][1], manually modify the `custom_options` block in your environment configuration file (e.g. `config/environments/production.rb`) to add the trace IDs.

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

#### Manual (ActiveSupport::TaggedLogging)

Rails applications that are configured with the default `ActiveSupport::TaggedLogging` logger can append correlation IDs as tags to log output. To enable Trace Correlation with `ActiveSupport::TaggedLogging`, in your Rails environment configuration file, add the following:

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

### For logging in Ruby applications

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
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/ruby/
