---
title: Add Custom Measures To Your Tests

description: Learn how to use custom measures in your tests.
aliases:
- /continuous_integration/guides/add_custom_metrics/
- /tests/guides/add_custom_metrics/
further_reading:
- link: "/continuous_integration/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
- link: "/monitors/types/ci"
  tag: "Documentation"
  text: "Learn about CI Monitors"
---


{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Before you begin, make sure that [Test Visibility][1] is already set up for your language. This guide walks you through adding and using custom measures for your tests.

## Add the custom measure to your test

Add the custom measure to your test. The native instrumentation allows you to use the programmatic API:

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

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

To add custom metrics, include the [`opentracing-util`][1] library as a compile-time dependency to your project.

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util

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

{{% tab "Ruby" %}}

```ruby
require 'datadog/ci'

# inside your test
Datadog::CI.active_test&.set_tag('test.memory.usage', 1e8)
# test continues normally
# ...
```

{{% /tab %}}

{{% tab "JUnit Report Uploads" %}}

For `datadog-ci`, use the `DD_MEASURES` environment variable or `--measures` CLI argument:

```
DD_MEASURES="test.memory.usage:1000" datadog-ci junit upload --service my-service --measures test.request.rate:30 report.xml
```

{{% /tab %}}

{{< /tabs >}}

## Create a facet

Create a facet for the custom measure you added to the test by navigating to the [**Test Runs** page][2] and clicking **+ Add** on the facet list.

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

Make sure that the type of facet is **Measure**, which represents a numerical value:

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}

Click **Add** to start using your custom measure.

## Graph the evolution of your measure

Plot the evolution of your measure across time by selecting the **Timeseries** visualization:

{{< img src="/continuous_integration/plot_measure.png" text="Plot benchmark mean duration" style="width:100%" >}}

For example, you can use this visualization to track the evolution of the memory usage in your tests.

## Export your graph

You can export your graph to a [dashboard][3] or a [notebook][4], and create a [monitor][5] based on it by clicking the **Export** button.

{{< img src="/continuous_integration/export_measure.png" text="Export benchmark mean duration graph" style="width:100%" >}}

## Add a monitor

Get alerted if the value of your measure goes above or below a certain threshold by creating a [CI Tests Monitor][6].

{{< img src="/continuous_integration/monitor_measure.png" text="Monitor benchmark mean duration" style="width:100%" >}}

For example, you can use this type of alert to inform you about the memory usage reaching a certain threshold.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /dashboards
[4]: /notebooks
[5]: /monitors
[6]: https://app.datadoghq.com/monitors/create/ci-tests
