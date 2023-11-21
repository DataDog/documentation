---
title: Set Quotas for Data Sent to a Destination
kind: documentation
disable_toc: false
private: true
is_beta: true
further_reading:
- link: "/observability_pipelines/setup/"
  tag: "Documentation"
  text: "Set up Observability Pipelines"
- link: "/observability_pipelines/working_with_data/"
  tag: "Documentation"
  text: "Working with data in Observability Pipelines"
- link: "/monitors/configuration/"
  tag: "Documentation"
  text: "Learn more about configuring monitors"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
The <code>quota</code> transform is in private beta.
{{< /callout >}}

## Overview

The Observability Pipelines `quota` transform allows you to set a limit on the volume of data sent to a destination within a specific timeframe. This can safeguard you from unexpected data surges that might impact your operating costs. With the transform, you can set up different ways of handling the data when the quota has been reached. For example, you can:

- Reroute the data sent after the quota limit to another destination, such as a cold storage.
- Sample the data sent after the quota limit so that less data is sent to the destination.
- Drop the data sent after the quota limit.
- Set up a monitor to alert you that the quota has been reached.

You can also use multiple `quota` transforms to set different warning and alert limits. For example, use the first `quota` transform to set a limit at a warning level and send a warning notification when the limit is reached. Then, use a second `quota` transform to set a hard limit. When the hard limit is reached, you can send out an alert notification and start sampling the data sent after the limit or reroute that data to another destination.

This guide walks you through how to:

- [Set up the quota transform](#set-up-the-quota-transform)
- [Set up a monitor to alert when the quota is reached](#set-up-a-metric-monitor)
- Route logs sent after the limit to `datadog_archives`

## Set up the quota transform

1. Navigate to [Observability Pipelines][1].
1. Click on your pipeline.
1. Click **Edit draft**.
1. Click **+ Add Component**.
1. Click the **Transforms** tab.
1. Click the **Quota** tile.
1. Enter a name for the component.
1. Select the input(s) for the transform.
1. In the **Limits** section:  
    a. Select the unit type.  
    b. Enter the limit in the **Max** field.
1. Enter the timeframe in the **Window** field.  
    For example, if you set:
    - **Bytes** as the unit type  
    - `2000000000`in the **Max** field  
    - `24h` in the **Window** field  
    Then the transform is configured to send up to 2GB of logs per day to the destination.
1. Click **Save**.

### Handling data sent after the limit

Below is an example configuration with the `quota` transform. In the configuration, data sent after the quota limit goes to the `print_dropped` destination, where the data is printed to the console and dropped. You can also [sample][2] that data or reroute it to another [destination][3] instead of dropping it.

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # Parse the message as syslog
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 20000
   window:
     1h
sinks:
 print_syslog:
   type: console
   inputs:
     - quota_1
   encoding:
     codec: json

print_dropped:
   type: console
   inputs:
     - quota_example.dropped
   encoding:
     codec: json

```

See [Configurations][4] for more information about the sources, transforms, and sinks in the example.

## Set up a monitor to alert when the quota is met

### Quota metrics

The following `quota` transform metrics are available:

- `quota_limit_events` (gauge)
- `quota_limit_bytes` (gauge)
- `component_errors_total` (counter)

For the [example configuration](#handling-data-sent-after-the-limit) above, the following metric and tag combination shows all events that were sent after the limit and that were dropped.

- `vector.component_sent_event_bytes_total` (metric)
    - `component_id:quota_example` (tag)
    - `output:dropped` (tag)

If the `event` type is specified in the configuration, then this is the combination of metric and tags that shows all events that were sent after the limit.

- `vector.component_sent_events_total` (metric)
    - `component_id:quota_example` (tag)
    - `output:dropped` (tag)

### Set up a metric monitor

To set up a monitor to alert when the quota is reached:

1. Navigate to the [New Monitor][5] page.
1. Select **Metric**.
1. Leave the detection method as **Threshold Alert**.
1. In the **Define the metric** field:  
    a. Enter `vector.component_sent_event_bytes_total` for the metric.  
    b. In the **from** field, add `component_id:<transform_name>,output:dropped` and replace `<transform_name>` with the name of your `quota` transform.  
    c. Enter `host` in the **sum by** field.  
    d. Leave the setting to evaluate the `sum` of the query over the `last 5 minutes`.
1. In the **Set alert conditions** section:  
    a. Leave the setting to trigger when the evaluated value is `above` the threshold for any `host`.  
    b. Enter `1` for the **Alert threshold**. This means that if the metric query is greater than 1, then the monitor alerts.
See [Metric Monitors][6] for more information.
1. In the **Notify your team** section:  
    a. Enter a name for your monitor.  
    b. Enter a notification message. See [Notifications][7] and [Variables][8] for more information on customizing your message.  
    c. Select who and which services the notifications are sent to.
1. Optionally, you can set [renotifications][9], tags, teams, and a [priority][10] for your monitor. You can also define [permissions][11] and audit notifications.
1. Click **Create**.

## Route logs sent after the limit to datadog_archives

The Observability Pipelines `datadog_archives` destination formats logs into a Datadog-rehydratable format and then routes it to [Log Archives][12].

The example configuration below is similar to the previous [example configuration](#handling-data-sent-after-the-limit). The only difference is that the destination type is `datadog_archives` so that all the events sent to Observability Pipelines, after the quota has been reached, are routed to the archives.

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1


transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # Parse the message as syslog
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_archiving_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 200000
   window:
     1m
sinks:
 archive_dropped:
   type: datadog_archives
   inputs:
     - quota_archiving_example.dropped
    bucket: "X"
    service: "X"
```

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/reference/transforms/#sample
[3]: /observability_pipelines/reference/sinks/
[4]: /observability_pipelines/configurations/
[5]: https://app.datadoghq.com/monitors/create
[6]: /monitors/types/metric/
[7]: /monitors/notify/
[8]: /monitors/notify/variables/
[9]: /monitors/notify/#renotify
[10]: /monitors/notify/#priority
[11]: /monitors/notify/#permissions
[12]: /logs/log_configuration/archives/