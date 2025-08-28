---
title: Instrumenting a Java Cloud Run Container with Sidecar
code_lang: java
type: multi-code-lang
code_lang_weight: 40
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/'
    tag: 'Documentation'
    text: 'Tracing Java Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/java/'
    tag: 'Documentation'
    text: 'Correlating Java Logs and Traces'
---

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/sidecar/java">available on GitHub</a>.</div>

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

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "YAML Deploy" %}}
   {{% gcr-install-sidecar-yaml language="java" %}}
   {{% /tab %}}

   {{% tab "Custom" %}}
   {{% gcr-install-sidecar-custom %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. Additionally, you set the `DD_SERVERLESS_LOG_PATH` env var, or it was defaulted to `/shared-volume/logs/app.log`.

   Now, you will need to configure your logging library to write logs to that file. In Java, we recommend writing logs in a JSON format. For example, you can use a third-party logging library such as `Log4j 2`:

   {{< code-block lang="java" disable_copy="false" >}}
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
{{< /code-block >}}

   {{< code-block lang="xml" filename="resources/log4j2.xml" disable_copy="false" >}}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
    <File name="FileAppender" fileName="/shared-volume/logs/app.log">
      <JsonLayout compact="true" eventEol="true" properties="true"/>
    </File>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="FileAppender"/></Root></Loggers>
</Configuration>
{{< /code-block >}}

   Datadog recommends setting the environment variable `DD_SOURCE=java` in your sidecar container to enable advanced Datadog log parsing.

   For more information, see [Correlating Java Logs and Traces][3].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5].

{{% gcr-env-vars instrumentationMethod="sidecar" language="java" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /developers/dogstatsd/?tab=java#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples
