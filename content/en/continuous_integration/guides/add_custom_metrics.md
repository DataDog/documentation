---
title: Add Custom Metrics to your Tests
kind: guide
---


{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

This guide will walk you through adding and using custom metrics for your tests.

### Add the custom metric to your test
First step is to add the custom metric to your test by using the programmatic API:

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

{{% tab "JUnit Report Uploads" %}}

For `datadog-ci`, use `DD_METRICS` environment variable or `--metrics` CLI argument:
```
DD_METRICS="test.memory_usage:1000" datadog-ci junit upload --service my-service --metrics test.importance:3 report.xml
```
{{% /tab %}}

{{< /tabs >}}

### Facet creation

Now that the test includes this custom metric, the next step is to create a facet.

You can create a facet by going to [Test Runs][1] and clicking on Add on the facet list:

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

Then make sure that the type of facet is "Measure", which represents a numerical value:

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

And that's it. Your metric is ready for usage. In the following sections you'll learn what you can do with it.

### Graph the evolution of your metric

Plot the evolution of your metric across time by selecting the "Timeseries" visualization:

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

### Export your graph

It is possible to export your graph to a [dashboard][2] or a [notebook][3] and even create a [monitor][4] based on it, by clicking on "Export":

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

### Add a monitor

Get alerted if the value of your metric goes above of below a certain threshold:

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}


[1]: https://app.datadoghq.com/ci/test-runs
[2]: /dashboards
[3]: /notebooks
[4]: /monitors
