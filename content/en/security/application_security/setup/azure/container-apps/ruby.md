---
title: Enabling App and API Protection for Azure Container Apps in Ruby
further_reading:
    - link: "/security/application_security/how-it-works/"
      tag: "Documentation"
      text: "How App and API Protection Works"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "App and API Protection"
---

<div class="alert alert-info">AAP support for Azure Container Apps is in Preview.</div>

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][4] to block IPs in your [WAF][5].

## Setup

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Follow these steps to enable App and API Protection with APM tracing on your Azure Container App.

1. **Install the Datadog Ruby tracer**.

   Add the `datadog` gem to your Gemfile:
   {{< code-block lang="gemfile" disable_copy="false" >}}
source 'https://rubygems.org'
gem 'datadog'
{{< /code-block >}}

   See [Tracing Ruby applications][1] for additional information on how to configure the tracer and enable auto instrumentation.

2. **Enable App and API Protection**.

   Set the following environment variable in your application container:

   ```
   DD_APPSEC_ENABLED=true
   ```

3. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% aca-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Bicep" %}}
   {{% aca-install-sidecar-bicep %}}
   {{% /tab %}}

   {{% tab "ARM Template" %}}
   {{% aca-install-sidecar-arm-template %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

4. **Set up logs**.

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. Datadog recommends setting the environment variable `DD_SOURCE=ruby` in your sidecar container to enable advanced Datadog log parsing.

   Then, update your logging library. For example, you can use Ruby's native `logger` library:
   {{< code-block lang="ruby" disable_copy="false" >}}
LOG_FILE = "/LogFiles/app.log"
FileUtils.mkdir_p(File.dirname(LOG_FILE))

logger = Logger.new(LOG_FILE)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello World!"
{{< /code-block >}}

   For more information, see [Correlating Ruby Logs and Traces][2].

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Follow the same steps as above, but set the following environment variables in your application container:

```
DD_APPSEC_ENABLED=true
DD_APM_TRACING_ENABLED=false
```

{{% /collapse-content %}}

## Testing threat detection

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][3] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application
[2]: /tracing/other_telemetry/connect_logs_and_traces/ruby/
[3]: /security/default_rules/security-scan-detected/
[4]: /actions/workflows/
[5]: /security/application_security/waf-integration/
[8]: https://app.datadoghq.com/security/appsec
