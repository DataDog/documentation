---
title: Trace Analytics Configuration
kind: documentation
---

Trace clients can send unsampled trace data to Trace Analytics for querying. Apply the following config to your application to enable this feature.

{{< tabs >}}
{{% tab "Java" %}}

### Enable Trace Analytics

The following setting will enable trace analytics for all web integrations. (Other types of integrations to be enabled in the future.)
* System Property: `-Ddd.trace.analytics.enabled=true`
* Environment Variable: `DD_TRACE_ANALYTICS_ENABLED=true`

### Configure Additional Integrations

To enable or disable Trace Analytics for individual integrations, use the following setting:
* System Property: `-Ddd.integration.<integration>.analytics.enabled=true`
* Environment Variable: `DD_INTEGRATION_<INTEGRATION>_ANALYTICS_ENABLED=true`

Integration names can be found on the [integrations table][1].
Note: This setting takes priority over the non-integration specific setting.

### Configure Sample Rate

When enabled, the default sample rate is to collect everything (`1.0`). Sampling can be applied with the following config.
* System Property: `-Ddd.integration.<integration>.analytics.sample_rate=0.5`
* Environment Variable: `DD_INTEGRATION_<INTEGRATION>_ANALYTICS_SAMPLE_RATE=0.5`

Integration names can be found on the [integrations table][1].

### Configuring on Custom Instrumentation

Applications with custom instrumentation can enable and set sample rate by setting a tag on the service root span:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.Trace;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class SomeClass {
  @Trace
  void someMethod() {
    final Span span = GlobalTracer.get().activeSpan();
    // Span provided by @Trace annotation.
    if (span != null) {
      span.setTag(DDTags.SERVICE_NAME, "my-custom-service");
      span.setTag(DDTags.EVENT_SAMPLE_RATE, 1.0);
    }
  }
}
```

[1]: /tracing/languages/java/#integrations
{{% /tab %}}
{{% tab "Python" %}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{% /tab %}}
{{% tab "Go" %}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{% /tab %}}
{{% tab ".NET" %}}

{{% /tab %}}
{{% tab "PHP" %}}

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

