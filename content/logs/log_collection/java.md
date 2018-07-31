---
title: Java log collection
kind: documentation
aliases:
  - /logs/languages/java
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "logs/explorer"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: Log Collection Troubleshooting Guide
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

We also strongly encourage you to setup your logging libraries to produce your logs in JSON format to avoid sustaning [custom parsing rules][2].

Here are setup examples for the `log4j`, `slf4j` and `log4j2` logging libraries:

## Configure your logger

### Raw format

#### Log4j
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

#### Log4j2
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

#### Slf4j
Edit your `logback.xml` file:

```xml
<configuration>
(....)
   <timestamp key="byDay" datePattern="yyyyMMdd'T'HHmmss"/>

   <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file> ~/logs/log-${byDay}.log </file>
      <append>true</append>
      <encoder>
          <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</Pattern>
        </encoder>
   </appender>
(....)
    <root level="debug">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```
### JSON Format

#### Log4j

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

#### Log4j2

There is a default log4j2 JSON Layout that can be used as shown in this [example](https://gist.github.com/NBParis/8bda7aea745987dd3261d475c613cf66).

#### Slf4j

The JSON library we recommend for Logback is [logstash-logback-encoder](https://github.com/logstash/logstash-logback-encoder). One advantage is: it's inside the main Maven repository.

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

## Configure the Datadog Agent

Create a file `java.yaml` in the Agent's `conf.d/` directory with the following content:

```yaml

#Log section
logs:

    ## - type : file (mandatory) type of log input source (tcp / udp / file)
    ##   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service : (mandatory) name of the service owning the log
    ##   source : (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/java/log.log
    service: java
    source: java
    sourcecategory: sourcecode
    # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

## Getting further
Enrich your log events with valuable attributes!

Logging is great- It tells developers and administrators what is happening at specific moments in time. However, always remember to decorate them with contextual attributes.

### Using the Key/Value parser

The [Key/Value parser][3] extracts any `<key>=<value>` pattern recognized in any log event.

To enrich your log events in Java, you can re-write messages in your code and introduce `<key>=<value>` sequences.

For instance if you have:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

You can easily change it to:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

With the [Key/Value parser][3] enabled, **Datadog** automatically extracts each pair from your final JSON document:

```json
{
    //...
    "message" : "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
    "scope" : "prod30",
    "durationInMs" : 93180,
    "quantity" : 1001
    //...
}
```

So you can exploit *scope* as a field, and *durationInMs* & *quantity* as metrics.

### MDC (Mapped Diagnostic Context)

Another option to enrich your logs is to use Java's [MDC (Mapped Diagnostic Contexts)][1].

If you use the logback technologie. It would give us the following Java code:

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

**MDC are great but for some reason only string types are allowed. Therefore, providing numerical values for metrics with MDCs would be a bad idea**

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /logs/processing/parsing
[3]: /logs/processing/parsing/#key-value
