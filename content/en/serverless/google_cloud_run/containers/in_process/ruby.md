---
title: Instrumenting a Ruby Cloud Run Container In-Process
code_lang: ruby
type: multi-code-lang
code_lang_weight: 60
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/'
    tag: 'Documentation'
    text: 'Tracing Ruby Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/ruby/'
    tag: 'Documentation'
    text: 'Correlating Ruby Logs and Traces'
---

## 1. Install the Tracer

Manually install the Ruby tracer by adding the `datadog` gem to your Gemfile:
```gemfile
source 'https://rubygems.org'
gem 'datadog'
```

See [Tracing Ruby applications][1] for additional information on how to configure the tracer and enable auto instrumentation.

## 2. Install Serverless-Init

{{% gcr-install-serverless-init cmd="\"rails\", \"server\", \"-b\", \"0.0.0.0\"" %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

We also recommend setting the environment variable `DD_SOURCE=ruby` to enable advanced Datadog log parsing.

To enable log/trace correlation, you will need to include `Datadog::Tracing.log_correlation` in your log format. For example:
```ruby
logger = Logger.new(STDOUT)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello world!"
```

For more information, see [Correlating Ruby Logs and Traces][2].

## 4. Configure your application

{{% gcr-configure-env-vars language="ruby" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application
[2]: /tracing/other_telemetry/connect_logs_and_traces/ruby/
