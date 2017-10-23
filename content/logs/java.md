---
title: Java log Collection
kind: documentation
autotocdepth: 2
hideguides: true
customnav: lognav
beta: true
---

Java logs are quite complex to handle, mainly because of stack traces. These stack traces are split into multiple lines which makes them difficult to associate to the original log event: :

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

You have two ways to send your logs to datadog, either by logging to a fileand monitoring it with your Datadog agent, or by logging directly to Datadog.

## Setup - Log into file
### Configure your logger
#### Log4j

Edit your `log4j.xml` with a new file appender:

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

### Configure the Datadog agent.

[Follow thoses steps](https://docs.datadoghq.com/logs/#tail-existing-files) to tail your java log files

##Setup - Agent-less 

### Log4j
Logging to a remote server in json may be difficult with log4j that's why we advise you to use a  SLF4J ship with a module called *log4j-over-slf4j* and then use logback for the json format.

It allows log4j users to migrate existing applications to SLF4J without changing a single line of code but simply by replacing the log4j.jar file with log4j-over-slf4j.jar, as described below.

#### Step 1 - Build a bridge to logback using SLF4J
To use log4j-over-slf4j in your own application, the first step is to locate and then to replace log4j.jar with log4j-over-slf4j.jar. 
Note that you still need an SLF4J binding and its dependencies for log4j-over-slf4j to work properly.

In most situations, replacing a jar file is all it takes in order to migrate from log4j to SLF4J.
Edit your `pom.xml`:

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

As a result of this migration, log4j configuration files will no longer be picked up. So you need to migrate your log4j.properties file to logback.xml [the log4j translator](http://logback.qos.ch/translator/) might be of help

#### Step2 
Once that done, just edit your *logback.xml* such as seen [here](#create-the-appender)

### Log4j2

#### Step 1 - Get the .JAR

The community have been released a JSONLayout. If you plan to stream logs through a log-shipper, it's a good alternative. See the following example: 

 * https://gist.github.com/gpolaert/fd6fb18419efb60d61a3305dfeaa1385

The best open source JSON library we've found for Log4j2 is the [log4j2-logstash-jsonevent-layout](https://github.com/majikthys/log4j2-logstash-jsonevent-layout).
However, this is not an official maven product so if you use maven you'll have to somehow include it into your repository.

You can directly download the .jar file [here](https://github.com/logmatic/log4j2-logstash-jsonevent-layout/raw/master/target/log4j2-logstash-jsonevent-layout-2.0.0.jar)

#### Step 2 - Create the appender layout
Once the library is in your classpath, you can attach the following layout to any appender in your `log4j2.xml` file:

```xml
<LogStashJSONLayout>
    <PatternLayout pattern="%msg%throwable{none}"/>
</LogStashJSONLayout>  
```

###Step 3 - Create the appender
Now you can also send it directly through the TCP layer:

```xml
<Socket name="TCP" host="XXXX_REMOTE_HOST" port="10514" reconnectionDelay="5000">
   <LogStashJSONLayout>
    <PatternLayout pattern="%msg%throwable{none}"/>
    <KeyValuePair key="DatadogKey" value="<your_api_key>"/>
  </LogStashJSONLayout>  
</Socket>
<Loggers>
    <Root level="debug">
    <AppenderRef ref="TCP" />
    </Root>
</Loggers>
```

### Slf4j
#### Add the JSON library
The JSON library we selected for Logback is [logstash-logback-encoder](https://github.com/logstash/logstash-logback-encoder). One advantage is: it's inside the main Maven repository.

To add it into your classpath, simply add the following dependency (version 4.5.1 on the example) in your `pom.xml`:
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

#### Create the appender
Now that you have the library setup, you can log the JSON in your console or straight in the TCP to **Datadog**, as shown in the example below for `Logback.xml`:

```xml
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
</appender>

<appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <remoteHost>XXXX_REMOTE_HOST</remoteHost>
  <port>10514</port>
  <keepAliveDuration>1 minute</keepAliveDuration>
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <customFields>{"DatadogKey":"<your_api_key>", "@marker": ["java","sourcecode"]}</customFields>
    </encoder>
</appender>
 
<root level="debug">
    <appender-ref ref="JSON_TCP" />
    <appender-ref ref="JSON" />
</root>
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