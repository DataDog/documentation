---
title: Add Custom Metrics to your Tests
kind: guide
---


{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Depending on your choice of language, adding a custom metric to your test is slightly different:

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
{{< /tabs >}}

Now that the test includes this custom metric, you can do certain operations with it, but you must first create a facet.


### Facet creation

You can create a facet by going to [Test Runs][1] and clicking on Add on the facet list:

{{< img src="/continuous_integration/facet_creation.png" text="Test Runs facet creation" style="width:100%" >}}

Then make sure that the type of facet is "Measure", which represents a numerical value:

{{< img src="/continuous_integration/measure_creation.png" text="Test Runs measure creation" style="width:100%" >}}




[1]: https://app.datadoghq.com/ci/test-runs
