---
title: Instrumenting a Ruby Cloud Run Job
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

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/ruby">available on GitHub</a>.</div>
<div class="alert alert-info">
For full visibility and access to all Datadog features in Cloud Run Jobs,
ensure you've <a href="http://localhost:1313/integrations/google_cloud_platform/">installed the Google Cloud integration</a>
and are using <a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init version 1.9.0 or later</a>.
</div>

1. **Install the Datadog Ruby tracer**.

   Add the `datadog` gem to your Gemfile:
   {{< code-block lang="gemfile" disable_copy="false" >}}
source 'https://rubygems.org'
gem 'datadog'
{{< /code-block >}}

   **Note**: Cloud Run Jobs run to completion rather than serving requests, so auto instrumentation won't create a top-level "job" span. For end-to-end visibility, create your own root span. See the [Ruby Custom Instrumentation][1] instructions.

   See [Tracing Ruby applications][2] for additional information on how to configure the tracer and enable auto instrumentation.

2. **Install serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"bundle\", \"exec\", \"ruby\", \"path/to/your/app.rb\"" cloudservice="jobs" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=ruby` to enable advanced Datadog log parsing.

   To enable log-trace correlation, include `Datadog::Tracing.log_correlation` in your log format. For example:
   {{< code-block lang="ruby" disable_copy="false" >}}
logger = Logger.new(STDOUT)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello world!"
{{< /code-block >}}

   For more information, see [Correlating Ruby Logs and Traces][3].

4. **Configure your application**.

{{% serverless-init-configure cloudrun_jobs="true" %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-in-container language="ruby" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/ruby/dd-api
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application
[3]: /tracing/other_telemetry/connect_logs_and_traces/ruby/
[4]: /extend/dogstatsd/?tab=ruby#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=ruby#code-examples-5
