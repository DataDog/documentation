---
title: Instrumenting a Java Cloud Run Function
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

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/java">available on GitHub</a>.</div>

## Setup

1. **Install the Datadog Java tracer**.

   1. Download the Datadog Java tracer, and make sure it is deployed with your function:

      {{< code-block lang="bash" disable_copy="false" >}}
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

      Add the `JAVA_TOOL_OPTIONS: -javaagent:/path/to/dd-java-agent.jar` environment variable to your app.

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

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Set up logs**.

   In the previous step, you created a shared volume. You may have also set the `DD_SERVERLESS_LOG_PATH` environment variable, which defaults to `/shared-volume/logs/app.log`.

   In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Java, Datadog recommend writing logs in JSON format. For example, you can use a third-party logging library such as `Log4j 2`:

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

   Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=java` (in your sidecar container) to enable advanced Datadog log parsing.

   For more information, see [Correlating Java Logs and Traces][3].

4. {{% gcr-service-label %}}

5. **Send custom metrics**.

   To send custom metrics, [install the DogStatsD client][4] and [view code examples][5]. In Serverless Monitoring, only the *distribution* metric type is supported.

{{% serverless-init-env-vars-sidecar language="java" function="true" defaultSource="cloudrun" %}}

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: /tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /developers/dogstatsd/?tab=java#install-the-dogstatsd-client
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5
