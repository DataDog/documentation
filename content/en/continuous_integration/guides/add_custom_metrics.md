---
title: Add Custom Metrics to your Tests
kind: guide
description: Learn how to use custom metrics (measures) in your tests
further_reading:
  - link: "/continuous_integration/tests"
    tag: "Documentation"
    text: "Exploring tests"
---


{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning"><strong>Note</strong>: These custom metrics are <strong>not</strong> <a href="/metrics">Datadog Metrics</a>. They are numerical tags (also known as measures) that represent things like memory usage or request rates.</div>

This guide walks you through adding and using custom metrics for your tests.

### Add the custom metric to your test

Before you can follow this guide, make sure that [Test Visibility][1] is already set up for your language.

First, add the custom metric to your test. The native instrumentation allows you to use the programmatic API:

{{< tabs >}}
{{% tab "Javascript/Typescript" %}}
```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('test.memory.rss', process.memoryUsage().rss)
    // test continues normally
    // ...
  })
```
{{% /tab %}}

{{% tab "Java" %}}
```java
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```
{{% /tab %}}

{{% tab "Python" %}}
```python
from ddtrace import tracer
import os, psutil

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    process = psutil.Process()
    ddspan.set_tag("test.memory.rss", process.memory_info().rss)
    # test continues normally
    # ...
```
{{% /tab %}}

{{% tab ".NET" %}}
```csharp
// inside your test
var scope = Tracer.Instance.ActiveScope; // from Datadog.Trace;
if (scope != null) {
    scope.Span.SetTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```
{{% /tab %}}


{{% tab "JUnit Report Uploads" %}}

For `datadog-ci`, use `DD_METRICS` environment variable or `--metrics` CLI argument:
```
DD_METRICS="test.memory.usage:1000" datadog-ci junit upload --service my-service --metrics test.request.rate:30 report.xml
```
{{% /tab %}}

{{< /tabs >}}

### Facet creation

Next, create a facet for the custom metric you added to the test.

Create a facet by going to [Test Runs][2] and clicking **Add** on the facet list:

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

Make sure that the type of facet is **Measure**, which represents a numerical value:

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

Your metric is ready to be used. See in the following sections what you can do with it.

### Graph the evolution of your metric

Plot the evolution of your metric across time by selecting the **Timeseries** visualization:

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

Use this visualization to track the evolution of the memory usage in your tests, for example.

### Export your graph

It is possible to export your graph to a [dashboard][3] or a [notebook][4] and even create a [monitor][5] based on it. Click **Export** on the right side:

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

### Add a monitor

Get alerted if the value of your metric goes above or below a certain threshold:

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}

Use this type of alert to inform you about the memory usage reaching a certain threshold, for example.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /dashboards
[4]: /notebooks
[5]: /monitors
