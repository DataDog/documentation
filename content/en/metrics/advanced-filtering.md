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
  - link: "/logs/explorer/search_syntax/"
    tag: "Documentation"
    text: "Logs Query Filter and Search Syntax"
---

## Overview

Whether you're using the Metrics Explorer, monitors, or dashboards to query metrics data, you can filter the data to narrow the scope of the timeseries returned. Any metric can be filtered by tag(s) using the **from dropdown** to the right of the metric. 

{{< img src="metrics/advanced-filtering/tags.png" alt="Filter with tags" style="width:80%;" >}}

You can also perform advanced filtering with Boolean or Wildcard tag value filters. For queries outside of metrics data such as logs, traces, Network Monitoring, Real User Monitoring, Synthetics, or Security, see the [Log Search Syntax documentation][1] for configuration.

### Boolean filtered queries 

The following syntax is supported for Boolean filtered metric queries: 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

When including or excluding multiple tags:
* Include uses `AND` logic
* Exclude uses `OR` logic

For more information on tags, see the [Getting Started With Using Tags][2] guide.

**Note:** Symbolic boolean syntax (`!`, `,`) cannot be used with functional syntax operators (`NOT`, `AND`, `OR`, `IN`, `NOT IN`). The following query is considered _invalid_: 
`avg:mymetric{env:prod AND !region:us-east}`

#### Boolean filtered query examples

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex1.png" alt="Example 1" style="width:80%;" >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex2.mp4" alt="Example 2" video=true style="width:80%;" >}}


```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/NOTIN.jpg" alt="Example 3" style="width:80%;" >}}


### Wildcard filtered queries 

Tag value prefix and suffix wildcard matching is supported: 
-  `pod_name: web-*` 
-  `cluster:*-trace`

**Note**: Prefix and suffix wildcard matching in the same filter is not supported.


#### Wildcard filtered query examples

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcards1.mp4" alt="Example 1" video=true style="width:80%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcards2.jpg" alt="Example 2" style="width:80%;" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search_syntax/
[2]: /getting_started/tagging/using_tags/
