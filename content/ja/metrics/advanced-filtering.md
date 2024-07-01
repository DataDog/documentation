---
title: Advanced Filtering
description: Filter your data to narrow the scope of metrics returned.
further_reading:
  - link: /metrics/explorer/
    tag: Documentation
    text: Metrics Explorer
  - link: /metrics/summary/
    tag: Documentation
    text: Metrics Summary
  - link: /metrics/distributions/
    tag: Documentation
    text: Metrics Distributions
  - link: /logs/explorer/search_syntax/
    tag: Documentation
    text: Logs Query Filter and Search Syntax
  - link: /dashboards/functions/exclusion/
    tag: Documentation
    text: Exclusion Functions
---

## Overview

When using the Metrics Explorer, monitors, or dashboards to query metrics data, you can filter the data to narrow the scope of the timeseries returned. Any metric can be filtered by tag(s) using the **from** field to the right of the metric. 

You can also perform advanced filtering with Boolean or Wildcard tag value filters. For queries outside of metrics data such as logs, traces, Network Monitoring, Real User Monitoring, Synthetics, or Security, see the [Log Search Syntax][1] documentation for configuration.

## Boolean filtered queries 

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

### Boolean filtered query examples

To use the examples below, click the code icon `</>` to see the query editor in the UI, and then copy and paste the query example into the query editor.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Click code icon to see the raw query" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Boolean example AND IN" style="width:100%;" >}}
```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Boolean example NOT IN" style="width:100%;" >}}

## Wildcard filtered queries 

Prefix, suffix, and substring wildcard tag filtering are supported: 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Wildcard filtered query examples

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix_example.png" alt="Wildcard used as suffix" style="width:100%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix_example.png" alt="Wildcard used as prefix" style="width:100%;" >}}

```
avg:system.disk.utilized{region:*east*} by {region}
```

{{< img src="metrics/advanced-filtering/wildcard_infix.png" alt="Wildcard used as infix" style="width:100%;" >}}

## Exclusion functions

Add an [exclusion function][3] to your query to: 
- Exclude N/A values.
- Apply a minimum or maximum value to metrics that meet the threshold.
- Exclude values that are above or below threshold values.

Functions do not delete datapoints from Datadog, but they do remove datapoints from your visualizations.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search_syntax/
[2]: /getting_started/tagging/using_tags/
[3]: /dashboards/functions/exclusion/
