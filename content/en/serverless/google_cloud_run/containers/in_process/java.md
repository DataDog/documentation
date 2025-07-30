---
title: Instrumenting a Java Cloud Run Container In-Process
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

## 1. Install the Tracer

Add the Java tracer agent to your Dockerfile:

```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' agent.jar
ENV JAVA_TOOL_OPTIONS="-javaagent:agent.jar"
```

Then, add the tracer artifacts.

Maven:
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>dd-trace-api</artifactId>
  <version>DD_TRACE_JAVA_VERSION_HERE</version>
</dependency>
```

Gradle:
```groovy
implementation 'com.datadoghq:dd-trace-api:DD_TRACE_JAVA_VERSION_HERE'
```

Finally, add the `@Trace` annotation to any method you want to trace.

For more information, see [Tracing Java Applications][1].

## 2. Install Serverless-Init

{{% gcr-install-serverless-init cmd="\"./mvnw\", \"spring-boot:run\"" %}}

## 3. Setup Logs

To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows serverless-init to read logs from stdout and stderr.

If you want multiline logs to be preserved in a single log message, we recommend writing your logs in *compact* JSON format. For example, you can use a third-party logging library such as `Log4j 2`:
```java
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
```
`resources/log4j2.xml`:
```xml
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="Console"/></Root></Loggers>
</Configuration>
```

For more information, see [Correlating Java Logs and Traces][2].

## 4. Configure your application

{{% gcr-configure-env-vars %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[2]: /tracing/other_telemetry/connect_logs_and_traces/java/
