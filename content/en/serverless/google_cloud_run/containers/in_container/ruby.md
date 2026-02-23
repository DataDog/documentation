---
title: Instrumenting a Ruby Cloud Run Container In-Container
code_lang: ruby
type: multi-code-lang
code_lang_weight: 60
aliases:
  - /serverless/google_cloud_run/containers/in_process/ruby
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/'
    tag: 'Documentation'
    text: 'Tracing Ruby Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/ruby/'
    tag: 'Documentation'
    text: 'Correlating Ruby Logs and Traces'
---

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/ruby">available on GitHub</a>.</div>

1. **Install the Datadog Ruby tracer**.

   Add the `datadog` gem to your Gemfile:
   {{< code-block lang="gemfile" disable_copy="false" >}}
source 'https://rubygems.org'
gem 'datadog'
{{< /code-block >}}

   See [Tracing Ruby applications][1] for additional information on how to configure the tracer and enable auto instrumentation.

2. **Install serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"rails\", \"server\", \"-b\", \"0.0.0.0\"" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=ruby` to enable advanced Datadog log parsing.

   To enable log-trace correlation, you need to include `Datadog::Tracing.log_correlation` in your log format. For example:
   {{< code-block lang="ruby" disable_copy="false" >}}
logger = Logger.new(STDOUT)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello world!"
{{< /code-block >}}

   For more information, see [Correlating Ruby Logs and Traces][2].

4. **Configure your application**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][3] and [view code examples][4]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-in-container language="ruby" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application
[2]: /tracing/other_telemetry/connect_logs_and_traces/ruby/
[3]: /developers/dogstatsd/?tab=ruby#install-the-dogstatsd-client
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=ruby#code-examples-5
