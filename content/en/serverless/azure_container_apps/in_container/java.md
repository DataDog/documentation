---
title: Instrumenting a Java Container App In-Container
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

2. **Install serverless-init**.

   {{% serverless-init-install cmd="\"./mvnw\", \"spring-boot:run\"" %}}

3. **Set up logs**.

   To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

   Datadog also recommends setting the environment variable `DD_LOGS_INJECTION=true` and `DD_SOURCE=java` to enable advanced Datadog log parsing.

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

   For more information, see [Correlating Java Logs and Traces][3].

4. **Configure your application**.

{{% serverless-init-configure %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In serverless, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-in-container language="java" defaultSource="containerapp" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /developers/dogstatsd/?tab=java#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5
