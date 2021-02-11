---
title: Advanced Filtering
kind: documentation
description: Filter your data to narrow the scope of metrics returned.
further_reading:
  - link: "/metrics/explorer/"
    tag: "Documentation"
    text: "Metrics Explorer"
  - link: "/metrics/summary/"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/distributions/"
    tag: "Documentation"
    text: "Metrics Distributions"
---

## Overview

Regardless of whether you’re using the Metrics Explorer, monitors, dashboards, or notebooks to query metrics data, you can filter the data to narrow the scope of the timeseries returned. Any metric can be filtered by tag(s) using the **from dropdown** to the right of the metric. 

{{< img src="metrics/advanced-filtering/tags.png" alt="Filter with tags"  style="width:80%;" >}}

You can also perform advanced filtering with Boolean filters.

### Boolean filtered queries 

The following syntax is supported for Boolean filtered metric queries: 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

#### Boolean query examples

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex1.png" alt="Example 1"  style="width:80%;" >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex2.gif" alt="Example 2"  style="width:80%;" >}}

```
avg:system.cpu.user{app NOT IN (village)} by {app}
```

{{< img src="metrics/advanced-filtering/ex3.gif" alt="Example 3"  style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
