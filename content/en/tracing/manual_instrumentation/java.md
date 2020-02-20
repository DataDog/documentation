---
title: Java Manual Instrumentation
kind: documentation
decription: 'Manually instrument your Java application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

If you aren't using a [supported framework instrumentation][1], or you would like additional depth in your application’s [traces][2], you may want to manually instrument your code.

Do this either using the Trace annotation for simple method call tracing, or with the OpenTracing API for complex tracing. Datadog's Trace annotation is provided by the [dd-trace-api dependency][3]

```java
import datadog.trace.api.Trace;

public class MyJob {
  @Trace(operationName = "job.exec", resourceName = "MyJob.process")
  public static void process() {
    // your method implementation here
  }
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/java/#compatibility
[2]: /tracing/visualization/#trace
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
