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

Datadog has several options available for adding deeper visibility which you can read about below to find the right approach for you.

## What are my options?

{{< img src="tracing/manual_instrumentation/flowchart.png" alt="Decide which manual instrumentation is the right choice"  >}}

For the finest-grained control and options for observability including the addition of custom span tags, the built-in [Datadog tracing library][3] is the most customizeable option.

If modifying application code is not possible, use the environment variable [dd.trace.methods][4]

If you have existing `@Trace` or [similar annotations][5], go to the Trace Annotations tab.

If you're unsure of which of these options is the best for you, try following [these steps][6] to explore the dd.trace.methods option through a spring application.

## Trace Annotations

Add `@Trace` to methods to have them be traced when running with `dd-java-agent.jar`. If the Agent is not attached, this annotation has no effect on your application.

Datadog’s Trace annotation is provided by the [dd-trace-api dependency][3].

`@Trace` annotations have the default operation name `trace.annotation` and resource name of the traced method.


```java
import datadog.trace.api.Trace;

public class MyJob {
  @Trace(operationName = "job.exec", resourceName = "MyJob.process")
  public static void process() {
    // your method implementation here
  }
}
```

Note that through the `dd.trace.annotations` property, some other method annotations can be recognized by Datadog as `@Trace`.  You can find a list [here][5].


## DD Trace Methods

Using the dd.trace.methods system property, you can get visibility into unsupported frameworks without changing application code.

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.global.tags=env:dev -Ddd.service.name=web-app -Ddd.trace.methods=notes.app.NotesHelper[customMethod3] -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="trace methods"  >}}



## Open Tracing

Datadog integrates seamlessly with open standards such as Open Tracing and we are proud to be a contributor to [Open Telemetry][7]. For more information and examples of how to instrument your application using OpenTracing, [Click here][8]




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/java/#compatibility
[2]: /tracing/visualization/#trace
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[4]: /tracing/setup/java/#dd-trace-methods
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[6]: https://docs.google.com/document/d/1t0K4hLQ8KIpsNJwWrf9Bl-R0SL--DP3A9RGFV3fNLvE/edit
[7]: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
[8]: /tracing/opentracing/java
