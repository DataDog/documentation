---
title: Java Log Collection
aliases:
  - /logs/languages/java
further_reading:
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/tracing/other_telemetry/connect_logs_and_traces/java/"
  tag: "Documentation"
  text: "Connect Logs and Traces"
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
- link: "https://www.datadoghq.com/blog/java-logging-guide/"
  tag: "Blog"
  text: "How to collect, customize, and standardize Java logs"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'
---

To send your logs to Datadog, log to a file and [tail][1] that file with your Datadog Agent.

Stack traces from typical Java logs are split into multiple lines, which makes them difficult to associate to the original log event. For example:

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

To address this issue, configure your logging library to produce your logs in JSON format. By logging to JSON, you:

* Ensure that the stack trace is properly wrapped into the log event.
* Ensure that all log event attributes (such as severity, logger name, and thread name) are properly extracted.
* Gain access to [Mapped Diagnostic Context (MDC)][2] attributes, which you can attach to any log event.
* Avoid the need for [custom parsing rules][3].

The following instructions show setup examples for the Log4j, Log4j 2, and Logback logging libraries.

## Configure your logger

### JSON format

{{< tabs >}}
{{% tab "Log4j" %}}

For Log4j, log in JSON format by using the SLF4J module [log4j-over-slf4j][1] combined with Logback. `log4j-over-slf4j` cleanly replaces Log4j in your application so you do not have to make any code changes.

1. In your `pom.xml` file, replace the `log4j.jar` dependency with a `log4j-over-slf4j.jar` dependency, and add the Logback dependencies. For example:
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Configure an appender using the JSON layout in `logback.xml`. See the following example configurations for file and console.

    For file:

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

    For console:

    ```xml
    <configuration>
      <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
          <encoder class="ch.qos.logback.classic.encoder.JsonEncoder"/>
      </appender>

      <root>
        <level value="DEBUG"/>
          <appender-ref ref="CONSOLE"/>
        </root>
    </configuration>
    ```

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
{{% /tab %}}
{{% tab "Log4j 2" %}}

Log4j 2 includes a JSON layout.

1. Configure an appender using the JSON layout in `log4j2.xml`. See the following example configurations for file and console appender. For a comprehensive description of Log4j plugins, see the [Log4j Plugin reference][1].
{{% collapse-content title="File appender" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml"  >}}
<?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <File name="FILE" fileName="logs/app.log" >
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </File>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="FILE"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Console appender" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <Console name="console" target="SYSTEM_OUT">
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </Console>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="console"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

2. Add the JSON layout template file (such as `MyLayout.json`) in the `src/main/resources` directory of your Java project. For example:
    ```json
    {
       "timestamp":{
          "$resolver":"timestamp",
          "pattern":{
             "format":"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
             "timeZone":"UTC"
          }
       },
       "status":{
          "$resolver":"level",
          "field":"name"
       },
       "thread_name":{
          "$resolver":"thread",
          "field":"name"
       },
       "logger_name":{
          "$resolver":"logger",
          "field":"name"
       },
       "message":{
          "$resolver":"message",
          "stringified":true
       },
       "exception_class":{
          "$resolver":"exception",
          "field":"className"
       },
       "exception_message":{
          "$resolver":"exception",
          "field":"message"
       },
       "stack_trace":{
          "$resolver":"exception",
          "field":"stackTrace",
          "stackTrace":{
             "stringified":true
          }
       },
       "host":"${hostName}",
       "service":"${env:DD_SERVICE}",
       "version":"${env:DD_VERSION}",
       "dd.trace_id":{
          "$resolver":"mdc",
          "key":"dd.trace_id"
       },
       "dd.span_id":{
          "$resolver":"mdc",
          "key":"dd.span_id"
       }
    }
    ```

3. Add the JSON layout dependencies to your `pom.xml`. For example:
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.13.0</version>
    </dependency>
    ```

[1]: https://logging.apache.org/log4j/2.x/plugin-reference.html
{{% /tab %}}
{{% tab "Logback" %}}

Use the [logstash-logback-encoder][1] for JSON formatted logs in Logback.

1. Configure a file appender using the JSON layout in `logback.xml`. For example:

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

2. Add the Logstash encoder dependency to your `pom.xml` file. For example:

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{% tab "Tinylog" %}}

Create a JSON writer configuration based on the [official Tinylog documentation][1].


Use the following format in a `tinylog.properties` file:

```properties
writer                     = json
writer.file                = log.json
writer.format              = LDJSON
writer.level               = info
writer.field.level         = level
writer.field.source        = {class}.{method}()
writer.field.message       = {message}
writer.field.dd.trace_id   = {context: dd.trace_id}
writer.field.dd.span_id    = {context: dd.span_id}
writer.field.dd.service    = {context: dd.service}
writer.field.dd.version    = {context: dd.version}
writer.field.dd.env        = {context: dd.env}
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

### Raw format

{{< tabs >}}
{{% tab "Log4j" %}}

Configure a file appender in `log4j.xml`. For example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </layout>
  </appender>

  <root>
    <priority value="INFO"/>
    <appender-ref ref="FILE"/>
  </root>

</log4j:configuration>
```

{{% /tab %}}
{{% tab "Log4j 2" %}}

Configure a file appender in `log4j2.xml`. For example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </File>
  </Appenders>

  <Loggers>
    <Root level="INFO">
      <AppenderRef ref="FILE"/>
    </Root>
  </Loggers>
</Configuration>
```

{{% /tab %}}
{{% tab "Logback" %}}

Configure a file appender in `logback.xml`. For example:

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{% tab "Tinylog" %}}

Create a writer configuration outputting to a file based on the [official Tinylog documentation][1].


Use the following format in a `tinylog.properties` file:

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#writer
{{% /tab %}}
{{< /tabs >}}

#### Inject trace IDs into your logs

If APM is enabled for this application, you can correlate logs and traces by enabling trace ID injection. See [Connecting Java Logs and Traces][4].

If you are _not_ correlating logs and traces, remove the MDC placeholders (`%X{dd.trace_id} %X{dd.span_id}`) from the log patterns included in the previous configuration examples.

For example, if you are using Log4j 2 but not correlating logs and traces, remove the following block from the example log layout template, `MyLayout.json`:

```json
"dd.trace_id":{
   "$resolver":"mdc",
   "key":"dd.trace_id"
},
"dd.span_id":{
   "$resolver":"mdc",
   "key":"dd.span_id"
}
```


## Configure the Datadog Agent

Once [log collection is enabled][5], set up [custom log collection][6] to tail your log files and send them to Datadog.

1. Create a `java.d/` folder in the `conf.d/` [Agent configuration directory][7].
2. Create a `conf.yaml` file in `java.d/` with the following content:

    ```yaml
    #Log section
    logs:

      - type: file
        path: "<path_to_your_java_log>.log"
        service: <service_name>
        source: java
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

3. [Restart the Agent][8].
4. Run the [Agent's status subcommand][9] and look for `java` under the `Checks` section to confirm logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][10] to extract log attributes. Use the [Log Explorer][11] to view and troubleshoot your logs.

## Stream logs directly to the Agent

In the exceptional case where your application is running on a machine that cannot be accessed or cannot log to a file, it is possible to stream logs to Datadog or to the Datadog Agent directly. This is not the recommended setup, because it requires that your application handles connection issues.

To stream logs directly to Datadog:

1. Add the Logback logging library to your code, or **bridge your current logger to Logback**.
2. **Configure Logback** to send logs to Datadog.

### Bridge from Java logging libraries to Logback

If you are not already using Logback, most common logging libraries can be bridged to Logback.

{{< tabs >}}
{{% tab "Log4j" %}}

Use the SLF4J module [log4j-over-slf4j][1] with Logback to send logs to another server. `log4j-over-slf4j` cleanly replaces Log4j in your application so that you do not have to make any code changes.

1. In your `pom.xml` file, replace the `log4j.jar` dependency with a `log4j-over-slf4j.jar` dependency, and add the Logback dependencies. For example:
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Configure Logback.

**Note:** As a result of this change, Log4j configuration files will no longer be picked up. Migrate your `log4j.properties` file to `logback.xml` with the [Log4j translator][2].


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 allows logging to a remote host, but it does not offer the ability to prefix the logs with an API key. Because of this, use the SLF4J module [log4j-over-slf4j][1] and Logback. `log4j-to-slf4j.jar` cleanly replaces Log4j 2 in your application so that you do not have to make any code changes. To use it:

1. In your `pom.xml` file, replace the `log4j.jar` dependency with a `log4j-over-slf4j.jar` dependency, and add the Logback dependencies. For example:
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-to-slf4j</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.9</version>
    </dependency>
    <dependency>
        <groupId>net.logstash.logback</groupId>
        <artifactId>logstash-logback-encoder</artifactId>
        <version>6.6</version>
    </dependency>

    ```
2. Configure Logback.

**Notes:**

- Make sure that `log4j-slf4j-impl.jar` is **not** used as described here: https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- As a result of this migration, Log4j 2 configuration files will no longer be picked up. Migrate your `log4j.properties` file to `logback.xml` with the [Log4j translator][2].

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Configure Logback
Datadog does not support sending logs directly over TCP to Datadog intake. Instead, configure Logback to your local Datadog Agent, which then forwards logs to Datadog over HTTPS with automatic enrichment.

1. [Install a local Datadog Agent][12] (v6+ / v7+).
1. Enable log collection in `datadog.yaml`, and ensure the Agent forwards logs over HTTPS (HTTPS is the default transport for Agent v6.19+/v7.19+ and later):
   ```
   logs_enabled: true
   logs_config:
     # HTTPS is the default. Keep or set this to force HTTPS forwarding.
     force_use_http: true
     # (Optional) auto-detect multi-line patterns
     auto_multi_line_detection: true
   ```

1. Enable log collection on the Agent.
   ```yaml
   # /etc/datadog-agent/conf.d/logback.d/conf.yaml
   logs:
     - type: tcp
       port: 10518           # Port the Agent will listen on
       service: my-java-app  # Your service name (unified service tagging)
       source: java          # Or a more specific source, e.g., "logback"
   ```
1. Restart the Agent to apply changes.
1. Configure Logback to send logs to the Agent. Use the [logstash-logback-encoder][13] TCP appender in your `logback.xml` to forward logs to the Agent:
   ```xml
   <configuration>
     <appender name="DD_TCP_JSON" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
       <destination>localhost:10518</destination>
       <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
         <providers>
           <timestamp/>
           <pattern>
             <pattern>
               {
                 "message": "%message",
                 "level": "%level",
                 "logger": "%logger",
                 "service": "${DD_SERVICE:-my-java-app}",
                 "env": "${DD_ENV:-prod}",
                 "version": "${DD_VERSION:-1.0.0}",
                 "dd.trace_id": "%X{dd.trace_id}",
                 "dd.span_id": "%X{dd.span_id}"
               }
             </pattern>
           </pattern>
           <arguments/>
           <stackTrace/>
         </providers>
       </encoder>
     </appender>
   </configuration>
   ```
   Then reference it in your root logger:
   ```xml
   <root level="INFO">
     <appender-ref ref="DD_TCP_JSON"/>
   </root>
   ```

1. Verify log forwarding. Run `datadog-agent status` to confirm your TCP listener, and check the Logs Explorer for entries tagged with your service.

## Getting further

Enrich your log events with contextual attributes.

### Using the key value parser

The [key value parser][14] extracts any `<KEY>=<VALUE>` pattern recognized in any log event.

To enrich your log events in Java, you can re-write messages in your code and introduce `<KEY>=<VALUE>` sequences.

For instance if you have:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

You can change it to:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

With the key value parser enabled, each pair is extracted from the JSON:

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

So you can exploit *scope* as a field, and *durationInMs* and *quantity* as log measures.

### MDC

Another option to enrich your logs is to use Java's [Mapped Diagnostic Contexts (MDC)][2].

If you use SLF4J, use the following Java code:

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

To generate this JSON:

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**Note**: MDC allows only string types, so don't use them for numerical value metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /glossary/#tail
[2]: http://logback.qos.ch/manual/mdc.html
[3]: /logs/log_configuration/parsing
[4]: /tracing/other_telemetry/connect_logs_and_traces/java/
[5]: /agent/logs/?tab=tailfiles#activate-log-collection
[6]: /agent/logs/?tab=tailfiles#custom-log-collection
[7]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[8]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /logs/log_configuration/parsing/?tab=matchers
[11]: /logs/explorer/#overview
[12]: /agent/?tab=Host-based
[13]: https://github.com/logstash/logstash-logback-encoder
[14]: /logs/log_configuration/parsing/#key-value-or-logfmt
