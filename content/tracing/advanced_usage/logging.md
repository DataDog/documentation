---
title: Logging
kind: documentation
---

Datadog's logging APIs allow accessing active tracing identifiers. These identifiers can be injected into application logs using MDC frameworks. This allows for correlating APM traces with specific log events.

{{< tabs >}}
{{% tab "Java" %}}
The Java tracer exposes two API calls to allow printing trace and span identifiers along with log statements, `CorrelationIdentifier#getTraceId()`, and `CorrelationIdentifier#getSpanId()`.

log4j2:

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    ThreadContext.put("ddTraceID", "ddTraceID:" + String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("ddSpanID", "ddSpanID:" + String.valueOf(CorrelationIdentifier.getSpanId()));
} finally {
    ThreadContext.remove("ddTraceID");
    ThreadContext.remove("ddSpanID");
}
```

slf4j/logback:

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    MDC.put("ddTraceID", "ddTraceID:" + String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("ddSpanID", "ddSpanID:" + String.valueOf(CorrelationIdentifier.getSpanId()));
} finally {
    MDC.remove("ddTraceID");
    MDC.remove("ddSpanID");
}
```

log4j2 XML Pattern:

```
<PatternLayout pattern="%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %X{ddTraceID} %X{ddSpanID} %m%n%xwEx" />
```

Logback XML Pattern:

```
<Pattern>
    %d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} %X{ddTraceID} %X{ddSpanID} - %msg%n
</Pattern>
```

{{% /tab %}}
{{% tab "Python" %}}
{{% /tab %}}
{{% tab "Ruby" %}}
{{% /tab %}}
{{% tab "Go" %}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{% /tab %}}
{{< /tabs >}}