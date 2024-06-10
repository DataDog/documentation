---
title: Delete Logs with Sensitive Data
kind: guide
disable_toc: false
further_reading:
- link: "logs/guide/control-sensitive-logs-data/"
  tag: "Documentation"
  text: "Control Sensitive Logs Data"
- link: "/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
---

## Overview

It is important to delete logs with sensitive data to ensure the security of your data. This guide provides information on how to:

- Check if the logs with sensitive data need to be deleted because they are within the retention period.
- Make logs with sensitive data un-queryable.
- Redact sensitive data with Sensitive Data Scanner.
- Request log deletion from Datadog support.

## Check your log retention period

Datadog automatically deletes logs that exceed the longest retention period for your organization.

To check or change your log retention period:

1. Navigate to the [Log Indexes][1] page.
1. See the log retention period for each index in the **Retention** column.
1. If you want to make logs age out faster, click the **Edit** icon on the right side of the index.
1. Update the **Set Index Retention** dropdown menu to a new retention period.

## Make logs with sensitive data un-queryable

If logs with sensitive data are within the the log retention period, you can make then un-queryable in Datadog's Log Explorer, Dashboards, and Live Tail until they age out. Logs made un-queryable are not available for querying or viewing. Follow these [instructions][2] to make logs with sensitive data un-queryable in Datadog.

## Delete an entire index

To delete an entire index:

1. Navigate to the [Log Indexes][1] page.
1. Click the **Delete** icon on the right side of the index you want to delete.
1. Click **Confirm** to delete the index.

**Note**: The index shows as a pending deletion until the logs age out, after which the index is fully deleted and removed from the UI.

## Redact sensitive data with Sensitive Data Scanner

Use [Sensitive Data Scanner][5] to limit the risk of storing sensitive data in Datadog. Sensitive Data Scanner is a stream-based, pattern matching service used to identify, tag, and optionally redact or hash sensitive data. Security and compliance teams can implement Sensitive Data Scanner to prevent sensitive data leaks and limit non-compliance risks.

## Submit a request for log deletion

<div class="alert alert-warning">
Only a Datadog Admin can request log deletion. If you are not an Admin, make sure to include an Admin on the request so they can confirm the deletion request.
</div>

If the options for changing your retention period, making logs un-queryable, and redacting sensitive data using Sensitive Data Scanner are not enough to ensure the security of your data, submit a request to [Datadog support][3] to delete the indexed logs with sensitive data. Your request must provide the following information:

1. Confirmation that the logs with sensitive data are no longer being sent to Datadog.
1. Whether this is a targeted deletion by time frame or an [entire index deletion](#delete-an-entire-index) request.
1. The exact organization name and the [site][4] (for example, US1) where the sensitive data was sent to.
1. If the request is for targeted deletion by time frame, the exact time range, in Epoch or UTC format, of the logs that contained sensitive data.
1. The name of the indexes where the sensitive data is in.
1. Confirmation that you understand the following requirement:
   <div class="alert alert-danger">
   Datadog deletes logs by time buckets, not by query scope or precise time frame. Therefore, Datadog might have to delete a larger amount of data than your exposed logs. For example. if you need to delete all error logs from <code>service:x</code> that came in between 10:00 a.m. to 12:00 p.m. from <code>index:main</code>, Datadog might have to delete all logs in that index from 1:00 a.m. to 5:00 p.m. Datadog support will work with you to ensure that only the necessary data is deleted.
   </div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/guide/control-sensitive-logs-data/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /help/
[4]: /getting_started/site/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/
