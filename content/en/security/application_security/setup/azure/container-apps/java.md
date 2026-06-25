---
title: Enabling App and API Protection for Azure Container Apps in Java
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

1. **Install the Datadog Java tracer**.

   1. Add the Datadog Java tracer to your Dockerfile:

      {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
ADD 'https://dtdg.co/latest-java-tracer' agent.jar
ENV JAVA_TOOL_OPTIONS="-javaagent:agent.jar"
{{< /code-block >}}

   2. Add the tracer artifacts.
      {{< tabs >}}
      {{% tab "Maven" %}}
{{< code-block lang="xml" disable_copy="false" >}}
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>dd-trace-api</artifactId>
  <version>DD_TRACE_JAVA_VERSION_HERE</version>
</dependency>
{{< /code-block >}}
      {{% /tab %}}

      {{% tab "Gradle" %}}
{{< code-block lang="groovy" disable_copy="false" >}}
implementation 'com.datadoghq:dd-trace-api:DD_TRACE_JAVA_VERSION_HERE'
{{< /code-block >}}
      {{% /tab %}}
      {{< /tabs >}}

      See [dd-trace-java releases][1] for the latest tracer version.

   3. Add the `@Trace` annotation to any method you want to trace.

   For more information, see [Tracing Java Applications][2].

2. **Install serverless-init as a sidecar**.

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

## Configuration

### Enable App and API Protection

Set the environment variable `DD_APPSEC_ENABLED=true` in your application container to enable App and API Protection.

### Disable APM tracing

To use App and API Protection without APM tracing, set `DD_APM_TRACING_ENABLED=false` in your application container in addition to `DD_APPSEC_ENABLED=true`.

{{% serverless-init-env-vars-sidecar language="java" defaultSource="containerapp" %}}

{{% svl-tracing-env %}}

## Testing threat detection

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][6] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][7].

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /actions/workflows/
[5]: /security/application_security/waf-integration/
[6]: /security/default_rules/security-scan-detected/
[7]: https://app.datadoghq.com/security/appsec
