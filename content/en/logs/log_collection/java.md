---
title: Java Log Collection
kind: documentation
aliases:
  - /logs/languages/java
further_reading:
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/tracing/connect_logs_and_traces/java/"
  tag: "Documentation"
  text: "Connect Logs and Traces"
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
- link: "https://www.datadoghq.com/blog/java-logging-guide/"
  tag: "Blog"
  text: "How to collect, customize, and standardize Java logs"
---

Stack traces from typical Java logs are split into multiple lines, which makes them difficult to associate to the original log event:

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

To alleviate this complexity, configure your logging library to produce your logs in JSON format. By logging to JSON, you:

* Ensure that the stack trace is properly wrapped into the its log event.
* Ensure that all log event attributes (such as severity, logger name, and thread name) are properly extracted.
* Gain access to [Mapped Diagnostic Context (MDC)][1] attributes, which you can attach to any log events.
* Avoid the need for [custom parsing rules][2].

**To send your logs to Datadog, log to a file and tail that file with your Datadog Agent.**

The following instructions show setup examples for the Log4j, Log4j 2, and Logback logging libraries.

## Configure your logger

### JSON format

{{< tabs >}}
{{% tab "Log4j" %}}

For Log4j, log in JSON format by using the SLF4J module [log4j-over-slf4j][1] combined with Logback. `log4j-over-slf4j` cleanly replaces Log4j in your application so you do not have to make any code changes. To use it:

1. In your `pom.xml` file, replace the `log4j.jar` dependency with a `log4j-over-slf4j.jar` dependency, and add the Logback dependencies:
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.13</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.1.3</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>4.5.1</version>
    </dependency>
    ```
2. Configure a file appender using the JSON layout in `logback.xml`:

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

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
{{% /tab %}}
{{% tab "Log4j 2" %}}

Log4j 2 includes a JSON layout. 

1. Configure a file appender using the JSON layout in `log4j2.xml`:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>
      <Appenders>
        <File name="FILE" fileName="logs/app.log" >
          <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
        </File>
      </Appenders>

      <Loggers>
        <Root level="INFO">
          <AppenderRef ref="FILE"/>
        </Root>
      </Loggers>
    </Configuration>
    ```
2. Add the JSON layout dependencies to your `pom.xml`:
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.7</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.8.3</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.8.3</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.8.3</version>
    </dependency>
    ```

{{% /tab %}}
{{% tab "Logback" %}}

Use the [logstash-logback-encoder][1] for JSON formatted logs in Logback. 

1. Configure a file appender using the JSON layout in `logback.xml`:

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

2. Add the Logstash encoder dependency to your `pom.xml` file:

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.1.3</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>4.5.1</version>
    </dependency>
    ```

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{< /tabs >}}

#### Inject trace IDs in your logs

If APM is enabled for this application, you can correlate logs and traces by enabling trace ID injection. See [Connecting Java Logs and Traces][3] for more information.

### Raw format

{{< tabs >}}
{{% tab "Log4j" %}}

Configure a file appender in `log4j.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

Configure a file appender in `log4j2.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

Configure a file appender in `logback.xml`:

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>Logback %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{< /tabs >}}

#### Inject trace IDs in your logs

If APM is enabled for this application, you can correlate logs and traces by enabling trace ID injection. See [Connecting Java Logs and Traces][3].

If you are _not_ correlating logs and traces, you can remove the MDC placeholders (`%X{dd.trace_id} %X{dd.span_id}`) from the log patterns included in the above configuration examples.


## Configure the Datadog Agent

Create a file `java.yaml` in the Agent's `conf.d/` directory with the following content:

```yaml
#Log section
logs:

  - type: file
    path: "/path/to/your/java/log.log"
    service: java
    source: java
    sourcecategory: sourcecode
    # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

## Agentless logging

In the exceptional case where your application is running on a machine that cannot be accessed or cannot log to a file, it is possible to stream logs to Datadog or to the Datadog Agent directly. This is not the recommended setup, because it requires that your application handles connection issues.

To stream logs directly to Datadog:

1. Add the Logback logging library to your code, or **bridge your current logger to Logback**.
2. **Configure Logback** to send logs to Datadog.

### Bridge from Java logging libraries to Logback

Most common logging libraries can be bridged to Logback.

{{< tabs >}}
{{% tab "Log4j" %}}

Use the SLF4J module [log4j-over-slf4j][1] with Logback to send logs to another server. `log4j-over-slf4j` cleanly replaces Log4j in your application so you do not have to make any code changes.  To use it:

1. In your `pom.xml` file, replace the `log4j.jar` dependency with a `log4j-over-slf4j.jar` dependency, and add the Logback dependencies:
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.13</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.1.3</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>4.5.1</version>
    </dependency>
    ```
2. Configure Logback.

**Note:** As a result of this change, Log4j configuration files will no longer be picked up. Migrate your `log4j.properties` file to `logback.xml` with the [Log4j translator][2].


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 allows logging to a remote host, but it does not offer the ability to prefix the logs with an API key. Because of this, use the SLF4J module [log4j-over-slf4j][1] and Logback. `log4j-to-slf4j.jar` cleanly replaces Log4j 2 in your application so you do not have to make any code changes. To use it:

1. In your `pom.xml` file, replace the `log4j.jar` dependency with a `log4j-over-slf4j.jar` dependency, and add the Logback dependencies:
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-to-slf4j</artifactId>
        <version>2.11.0</version>
    </dependency>
    <dependency>
        <groupId>net.logstash.logback</groupId>
        <artifactId>logstash-logback-encoder</artifactId>
        <version>4.5.1</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.1.3</version>
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

Use the [logstash-logback-encoder][4] logging library along with Logback to stream logs directly. 

1. Configure a TCP appender in your `logback.xml` file, replacing `<API_KEY>` with your Datadog API key value:

    {{< site-region region="us" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <remoteHost>intake.logs.datadoghq.com</remoteHost>
      <port>10514</port>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern><API_KEY> %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="eu" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <remoteHost>tcp-intake.logs.datadoghq.eu</remoteHost>
      <port>1883</port>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern><API_KEY> %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="us3" >}}
  Not supported.
    {{< /site-region >}}
    {{< site-region region="gov" >}}
  Not supported.
    {{< /site-region >}}

    **Note:** `%mdc{keyThatDoesNotExist}` is added because the XML configuration trims whitespace. For more information about the prefix parameter, see the [Logback documentation][5].

2. Add the Logstash encoder dependency to your `pom.xml` file:

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.1.3</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>4.5.1</version>
    </dependency>
    ```

## Getting further

Enrich your log events with contextual attributes.

### Using the key value parser

The [key value parser][6] extracts any `<KEY>=<VALUE>` pattern recognized in any log event.

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

Another option to enrich your logs is to use Java's [Mapped Diagnostic Contexts (MDC)][1].

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

**Note:** MDC allows only string types, so don't use them for numerical value metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /logs/processing/parsing/
[3]: /tracing/connect_logs_and_traces/java/
[4]: https://github.com/logstash/logstash-logback-encoder
[5]: https://github.com/logstash/logstash-logback-encoder#prefixsuffix
[6]: /logs/processing/parsing/#key-value-or-logfmt
