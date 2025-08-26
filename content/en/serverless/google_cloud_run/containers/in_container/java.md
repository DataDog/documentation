---
title: Instrumenting a Java Cloud Run Container In-Container
code_lang: java
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /serverless/google_cloud_run/containers/in_process/java
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/'
    tag: 'Documentation'
    text: 'Tracing Java Applications'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/java/'
    tag: 'Documentation'
    text: 'Correlating Java Logs and Traces'
---

## Setup

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/java">available on GitHub</a>.</div>

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

   3. Add the `@Trace` annotation to any method you want to trace.

   For more information, see [Tracing Java Applications][1].

2. **Install serverless-init**.

   {{% gcr-install-serverless-init cmd="\"./mvnw\", \"spring-boot:run\"" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_SOURCE=java` to enable advanced Datadog log parsing.

   If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in *compact* JSON format. For example, you can use a third-party logging library such as `Log4j 2`:

   {{< code-block lang="java" disable_copy="false" >}}
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
{{< /code-block >}}

   {{< code-block lang="xml" filename="resources/log4j2.xml" disable_copy="false" >}}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="Console"/></Root></Loggers>
</Configuration>
{{< /code-block >}}

   For more information, see [Correlating Java Logs and Traces][2].

4. **Configure your application**.

{{% gcr-configure%}}

5. {{% gcr-service-label %}}

6. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][3] and [view code examples][4].

{{% gcr-env-vars instrumentationMethod="in-container" language="java" %}}

## Troubleshooting

{{% gcr-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[2]: /tracing/other_telemetry/connect_logs_and_traces/java/
[3]: /developers/dogstatsd/?tab=java#install-the-dogstatsd-client
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples

