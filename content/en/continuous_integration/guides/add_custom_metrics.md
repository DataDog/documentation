---
title: Add Custom Metrics to your Tests
kind: guide
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

You can add custom tags to your tests by using the current active span:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

To create filters or `group by` fields for these tags, you must first create facets.

### Facet creation

Creating a facet on a span attribute/tag is not a mandatory step to search for spans. Facets are useful if you wish to add a meaningful description to a specific span attribute, or if you want the span attribute values to appear on the Facet list on the left-hand side of the span list.

You can read more in [creating facets][1]


[1]: tracing/trace_explorer/facets/#creating-facets
