---
title: Enabling App and API Protection for Azure Container Apps in .NET
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

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

## Setup

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Follow these steps to enable App and API Protection with APM tracing on your Azure Container App.

1. **Install the Datadog .NET tracer** in your Dockerfile.

   {{< tabs >}}
   {{% tab "Standard Linux (glibc)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
ARG TRACER_VERSION
RUN curl -L -s "https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb" --output datadog-dotnet-apm.deb && \
   dpkg -i datadog-dotnet-apm.deb
{{< /code-block >}}
   {{% /tab %}}

   {{% tab "Alpine (musl)" %}}
{{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
{{< /code-block >}}
   {{% /tab %}}
   {{< /tabs >}}

   See the [dd-trace-dotnet releases][1] to view the latest tracer version.

   For more information, see [Tracing .NET applications][2].

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

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In .NET, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `Serilog`:
   {{< code-block lang="csharp" disable_copy="false" >}}
using Serilog;

const string LOG_FILE = "/LogFiles/app.log";

builder.Host.UseSerilog((context, config) =>
{
    // Ensure the directory exists
    Directory.CreateDirectory(Path.GetDirectoryName(LOG_FILE)!);

    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true))
          .WriteTo.File(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true), LOG_FILE);
});

logger.LogInformation("Hello World!");
{{< /code-block >}}

   Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=csharp` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating .NET Logs and Traces][3].

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

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][4] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[3]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
[4]: /security/default_rules/security-scan-detected/
[5]: /actions/workflows/
[6]: /security/application_security/waf-integration/
[8]: https://app.datadoghq.com/security/appsec
