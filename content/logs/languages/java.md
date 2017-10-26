---
title: Java log Collection
kind: documentation
autotocdepth: 2
hideguides: true
customnav: lognav
beta: true
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
* You'll have access to [MDC](http://logback.qos.ch/manual/mdc.html), which are attributes you can attach to any log events

**To send your logs to Datadog, we recommend to log into a file and then to monitor this file with your Datadog agent.**

## Setup - Log to file
### Configure your logger
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
          <Pattern>%d{yyyy-MM-dd_HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</Pattern>
        </encoder>
   </appender>
(....)
    <root level="debug">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

### Configure the Datadog agent

Create a `java.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    [{}]
    
#Log section
logs:

    # - type : file (mandatory) type of log input source (tcp / udp / file)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/java/log.log
    service: java
    source: java
    sourcecategory: sourcecode
```

## Getting further
Enrich your log events with valuable attributes!

Logging is great- It tells developers and administrators what is happening at specific moments in time. However, you must always remember to decorate them with contextual attributes.

###Using the Key/Value parser

The [Key/Value parser](/logs/parsing/#key-value) extracts any `<key>=<value>` pattern recognized in any log event.

To enrich your log events in Java, you can re-write messages in your code and introduce `<key>=<value>` sequences.

For instance if you have:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

You can easily change it to:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

With the [Key/Value parser](/logs/parsing/#key-value) enabled, **Datadog** will automatically extract each pair from your final JSON document:

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

###MDC (Mapped Diagnostic Context)

Another option to enrich your logs is to use Java's [MDC (Mapped Diagnostic Contexts)](http://logback.qos.ch/manual/mdc.html).

If you use the logback technologie. It would give us the following Java code:

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

**MDC are great but for some reason only string types are allowed. Therefore, providing numerical values for metrics with MDCs would be a bad idea**
