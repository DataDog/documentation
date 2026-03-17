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

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][6] to block IPs in your [WAF][7].

## Setup

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Follow these steps to enable App and API Protection with APM tracing on your Azure Container App.

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

   In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Java, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `Log4j 2`:

   {{< code-block lang="java" disable_copy="false" >}}
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
{{< /code-block >}}

   {{< code-block lang="xml" filename="resources/log4j2.xml" disable_copy="false" >}}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
    <File name="FileAppender" fileName="/LogFiles/app.log">
      <JsonLayout compact="true" eventEol="true" properties="true"/>
    </File>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="FileAppender"/></Root></Loggers>
</Configuration>
{{< /code-block >}}

   Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=java` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating Java Logs and Traces][3].

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

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][5] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /tracing/other_telemetry/connect_logs_and_traces/java/
[4]: https://app.datadoghq.com/security/appsec
[5]: /security/default_rules/security-scan-detected/
[6]: /actions/workflows/
[7]: /security/application_security/waf-integration/
