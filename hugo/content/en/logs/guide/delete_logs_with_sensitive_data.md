---
title: Delete Logs with Sensitive Data

disable_toc: false
further_reading:
- link: "logs/guide/manage-sensitive-logs-data-access/"
  tag: "Documentation"
  text: "Manage sensitive logs data access"
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
- link: "/account_management/delete_data/"
  tag: "Documentation"
  text: "Delete data"
---

## Overview

Deleting logs that contain sensitive data reduces the risk of exposing that data. This guide provides information on how to:

- Check if the logs with sensitive data need to be deleted because they are within the retention period.
- Make logs with sensitive data un-queryable.
- Redact sensitive data with Sensitive Data Scanner.
- Delete logs with Logs Data Deletion.

## Check your log retention period

Datadog automatically deletes logs that exceed the longest retention period for your organization.

To check or change your log retention period:

1. Navigate to the [Log Indexes][1] page.
1. See the log retention period for each index in the {{< ui >}}Retention{{< /ui >}} column.
1. If you want to make logs age out faster, click the {{< ui >}}Edit{{< /ui >}} icon on the right side of the index.
1. Update the **Set Index Retention** dropdown menu to a new retention period.

## Make logs with sensitive data un-queryable

If logs within the retention period contain sensitive data, you can make them un-queryable until they age out. Un-queryable logs don't appear in the Log Explorer, Dashboards, or Live Tail. Follow these [instructions][2] to make logs with sensitive data un-queryable in Datadog.

## Delete an entire index

To delete an entire index:

1. Navigate to the [Log Indexes][1] page.
1. Click the {{< ui >}}Delete{{< /ui >}} icon on the right side of the index you want to delete.
1. Click {{< ui >}}Confirm{{< /ui >}} to delete the index.

## Redact sensitive data with Sensitive Data Scanner

Use [Sensitive Data Scanner][5] to limit the risk of storing sensitive data in Datadog. Sensitive Data Scanner is a stream-based, pattern matching service used to identify, tag, and optionally redact or hash sensitive data. Security and compliance teams can implement Sensitive Data Scanner to prevent sensitive data leaks and limit non-compliance risks.

## Delete logs from your organization

To permanently remove indexed logs that contain sensitive data, use [Logs Data Deletion][3]. Logs Data Deletion lets you query for logs within a time frame and delete them from your organization without contacting Datadog support.

Before you delete logs:

1. Stop sending the logs with sensitive data to Datadog.
1. Have an Organization Admin [enable Logs Data Deletion][6] for your organization.
1. Confirm that you have a role with the {{< ui >}}Logs Delete Data{{< /ui >}} permission.

<div class="alert alert-danger">Deletions are permanent after 10 days. Review your deletion requests carefully.</div>

**Note**: Logs Data Deletion doesn't delete data derived from the deleted logs, such as metrics generated from logs.

For the full procedure, including how to cancel and audit deletions, see [Delete Data][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/guide/manage-sensitive-logs-data-access/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /account_management/delete_data/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/
[6]: /account_management/delete_data/#enable-deletion-feature
