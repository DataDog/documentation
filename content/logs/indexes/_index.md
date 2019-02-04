---
title: Indexes
kind: Documentation
description: "Configure your Datadog Indexes to control your indexed log flow."
further_reading:
- link: "agent/logs"
  tag: "Documentation"
  text: "Configure your Datadog Agent to gather logs from your host, containers, and services."
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/"
  tag: "Documentation"
  text: "Search through all of your logs and perform Log Analytics."
---

Indexes are located in the [pipeline page][1] within the Indexes section. Double click on them or click on the *edit* button to see more information about the number of logs that were indexed in the past 3 days, and the retention period for those logs:

{{< img src="logs/index_details.png" alt="index details" responsive="true" style="width:70%;">}}

Indexed logs can be used for [faceted searching][6], [Log Analytics][7], [dashboarding][8], and [monitoring][9].

It is also possible to have multiple indexes with different retention periods (**currently in private beta**).
Logs enter the first index whose filter they match on, so it is important to order your indexes carefully.

For example, if you create a first index filtered to the `status:notice` attribute and a second index filtered to the `status:error` attribute and a final one without any filter (the equivalent of `*`), all your notice logs would go to the first index, all your error logs to the second index and the rest would go to the final one.

{{< img src="logs/multi_indexes.png" alt="multi indexes" responsive="true" style="width:70%;">}}

Multiple indexes also provide the ability to define access rules on the data contained in each index. [More information available in the role base access control documentation][6].

## Setup Log Monitors on volumes

Get notified at any moment if the volumes in any scope (`service`, `availibility-zone`, etc...) of your infrastructure is growing unexpectedly:

1. Go in the [Datadog Log Explorer][7] view 
2. Build a [search query][8] that represents the volume to monitor. 
3. Click on **Export to monitor**.
4. Define the rate you would like to set as *warning* or *error*.
5. Define an explicit notification: `The volume on this service just got too high. Define an additional exclusion filter or increase the sampling rate to put it back under control.`

{{< img src="logs/example_notification.png" alt="example notifications" responsive="true" style="width:70%;">}}

## Exclusion Filters

Index Filters give dynamic control over what goes into your indexes.

For example, if some logs were captured only for troubleshooting purposes, you may only care to index those logs with errors and warnings. This can easily be achieved with exclusion filters.

To define a new Index Filter click on the "add" button:

{{< img src="logs/index_filters.png" alt="index filters" responsive="true" style="width:70%;">}}

To configure an exclusion filter:

1. Define the name of your filter
2. Define the query for logs to exclude from your index
    **Note**: It is possible to use any attribute or tag in the Index filter query, even those that are not facets. If you are filtering by non-faceted attributes or tags, be sure to hit "enter/return" from the query bar
3. Save the filter

    {{< img src="logs/index_filter_details.png" alt="index filter details" responsive="true" style="width:80%;">}}

### Example

The following filter removes all logs that have a fast response time.
We use the `duration` attribute and filter all logs that have a value below *100ms*.

```json
{
    "http": {
        "url": "https://app.datadoghq.com/logs",
        "status_code": "200"
    },
    "duration":12,
    "metadata": {
        "version": 12,
        "release": "sept18"
    }
}
```

**Filter**: `@duration:<100`

### Container example

Container logs have a lot of metadata collected as tags. To exclude all logs coming from images that contains `httpd` in the `image_name` tag use the following filter:

**Filter**: `image_name:*httpd*`

## Enable/Disable filters

If all logs are not worth indexing on a daily basis, they might still be critical in some situations.
Debug logs, for instance, are not always useful but during a complex troubleshooting or during a production release they become very interesting to get better insight into what is going on.

Instead of changing your application logging level or using a complex internal filtering tool, it is now possible to change what is indexed directly with the Datadog index filters.

Enable or disable them in one click in the Pipeline page:

{{< img src="logs/enable_index_filters.png" alt="" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/analytics
[4]: /logs/explorer/analytics/#dashboard
[5]: /monitors/monitor_types/log
[6]: /account_management/rbac
[7]: https://app.datadoghq.com/logs
[8]: /logs/explorer/search