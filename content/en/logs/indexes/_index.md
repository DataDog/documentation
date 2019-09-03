---
title: Indexes
kind: documentation
description: Control the volume of logs indexed by Datadog
aliases:
  - /logs/dynamic_volume_control
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: "Blog"
  text: "Logging without Limits*"
---

## Index details

Indexes are located in the [pipeline page][1] within the Indexes section. Double click on them or click on the *edit* button to see more information about the number of logs that were indexed in the past 3 days, and the retention period for those logs:

{{< img src="logs/indexes/index_details.png" alt="" responsive="true" style="width:70%;">}}

Indexed logs can be used for [faceted searching][2], [Log Analytics][3], [dashboarding][4], and [monitoring][5].

It is also possible to have multiple indexes with different retention periods (**currently in private beta**).
Logs enter the first index whose filter they match on, so it is important to order your indexes carefully.

For example, if you create a first index filtered to the `status:notice` attribute and a second index filtered to the `status:error` attribute and a final one without any filter (the equivalent of `*`), all your notice logs would go to the first index, all your error logs to the second index and the rest would go to the final one.

{{< img src="logs/indexes/multi_indexes.png" alt="" responsive="true" style="width:70%;">}}

Multiple indexes also provide the ability to define access rules on the data contained in each index. [More information available in the role base access control documentation][6].

## Exclusion Filters

Index Filters give dynamic control over what goes into your indexes.

For example, if some logs were captured only for troubleshooting purposes, you may only care to index those logs with errors and warnings. This can easily be achieved with exclusion filters.

To define a new Index Filter click on the "add" button:

{{< img src="logs/indexes/index_filters.png" alt="" responsive="true" style="width:70%;">}}

To configure an exclusion filter:

1. Define the name of your filter
2. Define the query for logs to exclude from your index
    **Note**: It is possible to use any attribute or tag in the Index filter query, even those that are not facets. If you are filtering by non-faceted attributes or tags, be sure to hit "enter/return" from the query bar
3. Define the sampling rate
4. Save the filter

    {{< img src="logs/indexes/index_filter_details.png" alt="" responsive="true" style="width:80%;">}}

**Note**: If a log matches several exclusion filters, only the first exclusion filter rule is applied. A log is not sampled or excluded multiple times by different exclusion filters.

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

## Reorder filters

Order matters for exclusion filters. And contrary to where several pipelines can process a log, if a log matches several exclusion filters, only the first exclusion filter rule is applied.

Reorder your pipeline to make sure the proper exclusion filters applies for your log. For instance, you probably want to set up the filters with the most inclusive queries after the others.

To reorder your exclusion filter, drag and drop them into your preferred order.


{{< img src="logs/indexes/reorder_index_filters.png" alt="" responsive="true" style="width:80%;">}}


## Enable/Disable filters

If all logs are not worth indexing on a daily basis, they might still be critical in some situations.
Debug logs, for instance, are not always useful but during a complex troubleshooting or during a production release they become very interesting to get better insight into what is going on.

Instead of changing your application logging level or using a complex internal filtering tool, it is now possible to change what is indexed directly with the Datadog index filters.

Enable or disable them in one click in the Pipeline page:

{{< img src="logs/indexes/enable_index_filters.png" alt="" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/analytics
[4]: /logs/explorer/analytics/#dashboard
[5]: /monitors/monitor_types/log
[6]: /account_management/rbac
