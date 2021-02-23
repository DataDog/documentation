---
title: Java log collection
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
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
- link: "https://www.datadoghq.com/blog/java-logging-guide/"
  tag: "Blog"
  text: "How to collect, customize, and standardize Java logs"
---

Java logs are quite complex to handle, mainly because of stack traces. These stack traces are split into multiple lines which makes them difficult to associate to the original log event:

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

By asking your logging library to log into JSON, you will:

* Ensure to have a stack_trace properly wrapped into the proper LogEvent
* Ensure that all the attributes of a log event are properly extracted (severity, logger name, thread name, etc...)
* You'll have access to [MDC][1], which are attributes you can attach to any log events

**To send your logs to Datadog, we recommend logging to a file and then tailing that file with your Datadog Agent.**

Datadog strongly recommends setting up your logging libraries to produce your logs in JSON format to avoid the need for [custom parsing rules][2].

Here are setup examples for the `log4j`, `slf4j` and `log4j2` logging libraries:

## Configure your logger

### Raw format

{{< tabs >}}
{{% tab "Log4j" %}}

Add a new file appender to `log4j.xml`:

```xml
<appender name="fileAppender" class="org.apache.log4j.FileAppender">
    <param name="File" value="/logs/log4j.log" />
    <param name="Append" value="true" />
    <layout class="org.apache.log4j.PatternLayout">
        <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n" />
    </layout>
</appender>
```

**Inject trace IDs in your logs**

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][1] to set the [MDC (Mapped Diagnostic Contexts)][2] to then automatically add trace and span id in your logs.

Once this is done, the `ConversionPattern` to use becomes:

```xml
<param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n" />
```

[1]: /tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Log4j2" %}}

Edit your `log4j2.xml` file:

```xml
<File name="MyFile" fileName="logs/app.log" immediateFlush="true">
    <PatternLayout pattern="%d{yyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
</File>
<Loggers>
    <Root level="debug">
        <AppenderRef ref="MyFile" />
    </Root>
</Loggers>
```

**Inject trace IDs in your logs**

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][1] to set the [MDC (Mapped Diagnostic Contexts)][2] to then automatically add trace and span id in your logs.

Once this is done, the `PatternLayout` to use becomes:

```xml
<PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n" />
```

[1]: /tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Slf4j" %}}

Edit your `logback.xml` file:

```xml
<configuration>
    <!-- (....) -->
    <timestamp key="byDay" datePattern="yyyyMMdd'T'HHmmss"/>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file> ~/logs/log-${byDay}.log </file>
        <append>true</append>
        <encoder>
            <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</Pattern>
        </encoder>
    </appender>
    <!-- (....) -->
    <root level="debug">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

**Inject trace IDs in your logs**

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][1] to set the [MDC (Mapped Diagnostic Contexts)][2] to then automatically add trace and span id in your logs.

Once this is done, the `Pattern` to use becomes:

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

[1]: /tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{< /tabs >}}

### JSON Format

{{< tabs >}}
{{% tab "Log4j" %}}

It can be difficult to log in JSON with log4j. Because of this, we advise you to use a slf4j ship with a module called log4j-over-slf4j and then use logback for the json format.

To use log4j-over-slf4j in your own application, the first step is to locate and then replace `log4j.jar` with `log4j-over-slf4j.jar`.
Note that you still need an slf4j binding and its dependencies for log4j-over-slf4j to work properly.

In most situations, replacing a jar file is all it takes in order to migrate from log4j to SLF4J.
Edit your `pom.xml` file:

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>log4j-over-slf4j</artifactId>
  <version>1.7.13</version>
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

Once that done, edit your `logback.xml` file as described in the below `Slf4j` section.

**Inject trace IDs in your logs**

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][1] to set the trace and span ids with [MDC (Mapped Diagnostic Contexts)][2] that are then automatically added in the JSON logs.

[1]: /tracing/connect_logs_and_traces/java/
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Log4j2" %}}

There is a default log4j2 JSON Layout that can be used. Add the following Appender to your `log4j2.xml` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="TRACE">
            <AppenderRef ref="Console" />
        </Root>
    </Loggers>
</Configuration>
```

* Then the following dependencies into your `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>datadog</groupId>
    <artifactId>support</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core -->
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
    </dependencies>
</project>
```

**Inject trace IDs in your logs**

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][1] to set the trace and span ids with [MDC (Mapped Diagnostic Contexts)][2] that are then automatically added in the JSON logs.

[1]: https://gist.github.com/NBParis/8bda7aea745987dd3261d475c613cf66
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Slf4j" %}}

The JSON library we recommend for Logback is [logstash-logback-encoder][1]. One advantage is: it's inside the main Maven repository.

To add it into your classpath, simply add the following dependency (version 4.5.1 on the example) in your `pom.xml` file:

```xml
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

Then edit your `logback.xml` file and update the encoder:

```xml
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"env":"prod"}</customFields>
        </encoder>
    </appender>
```

**Inject trace IDs in your logs**

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][2] to set the trace and span ids with [MDC (Mapped Diagnostic Contexts)][3] that are then automatically added in the JSON logs.

[1]: https://github.com/logstash/logstash-logback-encoder
[2]: /tracing/connect_logs_and_traces/java/
[3]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{< /tabs >}}

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

It is possible to stream logs from your application to Datadog or to the Datadog Agent directly. This is not the recommended setup, as handling connection issues should not be done directly in your application, but it might not be possible to log to a file when your application is running on a machine that cannot be accessed.

There are two steps to configure the Java application to stream logs directly to Datadog:

1. Add the Logback logging library to your code (or build a bridge from your current logger to it)
2. Configure it to send logs to Datadog

### Bridge from Java logging libraries to Logback

* The recommended logging library to stream logs directly is Logback [logstash-logback-encoder][3].

This logging library can be linked from the most common Java ones:

{{< tabs >}}
{{% tab "Log4j" %}}

Logging to a remote server in JSON may be difficult with Log4j. It is recommended that you use a SLF4J ship with a module called `log4j-over-slf4j` and then use Logback for the JSON format.

To use `log4j-over-slf4j` in your own application, the first step is to find-and-replace `log4j.jar` with `log4j-over-slf4j.jar`.
In most situations, replacing a JAR file is all it takes in order to migrate from Log4j to SLF4J.

Then, edit the `pom.xml` file with the following content:

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>log4j-over-slf4j</artifactId>
    <version>1.7.13</version>
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

**note:** As a result of this migration, Log4j configuration files will no longer be picked up. Migrate your `log4j.properties` file to `logback.xml` with the [Log4j translator][1].

[1]: http://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Log4j2" %}}

Log4j2 allows logging to a remote host, but it does not offer the ability to prefix the logs by an API key. Because of this, it is recommended that you use a SLF4J ship with a module called `log4j-over-slf4j` and then use Logback for the JSON format.

To use `log4j-over-slf4j` in your own application, the first step is to find-and-replace `log4j.jar` with `log4j-to-slf4j-2.11.jar`.

Then, edit the `pom.xml` file with the following content:

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

**notes:**

- Make sure that `log4j-slf4j-impl-2.0.jar` is **not** used as explained here: https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- As a result of this migration, Log4j configuration files will no longer be picked up. Migrate your `log4j.properties` file to `logback.xml` with the [Log4j translator][1].

[1]: https://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Slf4j" %}}

To add Logback [logstash-logback-encoder][1] into your classpath, add the following dependency (version 4.5.1 on the example) in your `pom.xml` file:

```xml
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

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{< /tabs >}}

### Logback configuration

Configure the Logback logger to stream logs directly to Datadog by adding the following in your `logback.xml` file:

{{< site-region region="us" >}}

```xml
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
</appender>
<appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <remoteHost>intake.logs.datadoghq.com</remoteHost>
    <port>10514</port>
    <keepAliveDuration>20 seconds</keepAliveDuration>
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="ch.qos.logback.classic.PatternLayout">
                <pattern><APIKEY> %mdc{keyThatDoesNotExist}</pattern>
            </layout>
          </prefix>
    </encoder>
</appender>
<root level="debug">
    <appender-ref ref="JSON_TCP" />
    <appender-ref ref="JSON" />
</root>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```xml
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
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
<root level="debug">
    <appender-ref ref="JSON_TCP" />
    <appender-ref ref="JSON" />
</root>
```

{{< /site-region >}}

**Notes:**

* Replace `<API_KEY>` with your Datadog API key value.
* `%mdc{keyThatDoesNotExist}` is added because the XML configuration trims whitespace, as explained [here][4].

More information available on the prefix parameter in the [Logback documentation][4].

## Getting further

Enrich your log events with contextual attributes.

### Using the Key/Value parser

The [Key/Value parser][5] extracts any `<KEY>=<VALUE>` pattern recognized in any log event.

To enrich your log events in Java, you can re-write messages in your code and introduce `<KEY>=<VALUE>` sequences.

For instance if you have:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

You can change it to:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

With the [Key/Value parser][5] enabled, **Datadog** automatically extracts each pair from your final JSON document:

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

So you can exploit *scope* as a field, and *durationInMs* and *quantity* as log measures.

### MDC (Mapped Diagnostic Context)

Another option to enrich your logs is to use Java's [MDC (Mapped Diagnostic Contexts)][1].

If you use Logback, use the following Java code:

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

To generate this final JSON document:

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**MDC are great but only string types are allowed. Therefore, providing numerical values for metrics with MDCs would be a bad idea**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /logs/processing/parsing/
[3]: https://github.com/logstash/logstash-logback-encoder
[4]: https://github.com/logstash/logstash-logback-encoder#prefixsuffix
[5]: /logs/processing/parsing/#key-value
