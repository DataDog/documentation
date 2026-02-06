---
title: Instrumenting a Ruby Cloud Run Container with Sidecar
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/sidecar/ruby">available on GitHub</a>.</div>

## Setup

1. **Install the Datadog Ruby tracer**.

   Add the `datadog` gem to your Gemfile:
   {{< code-block lang="gemfile" disable_copy="false" >}}
source 'https://rubygems.org'
gem 'datadog'
{{< /code-block >}}

   See [Tracing Ruby applications][1] for additional information on how to configure the tracer and enable auto instrumentation.

2. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "YAML Deploy" %}}
   {{% gcr-install-sidecar-yaml language="ruby" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. Additionally, you may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. You can also set a custom format for log/trace correlation and other features. Datadog recommends setting the environment variable `DD_SOURCE=ruby` in your sidecar container to enable advanced Datadog log parsing.

   Then, update your logging library. For example, you can use Ruby's native `logger` library:
   {{< code-block lang="ruby" disable_copy="false" >}}
LOG_FILE = "/shared-logs/logs/app.log"
FileUtils.mkdir_p(File.dirname(LOG_FILE))

logger = Logger.new(LOG_FILE)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello World!"
{{< /code-block >}}

   For more information, see [Correlating Ruby Logs and Traces][2].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][3] and [view code examples][4]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="ruby" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application
[2]: /tracing/other_telemetry/connect_logs_and_traces/ruby/
[3]: /developers/dogstatsd/?tab=ruby#install-the-dogstatsd-client
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=ruby#code-examples-5
