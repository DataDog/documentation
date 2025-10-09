---
title: Delete Data
description: Delete logs and other data from Datadog with proper permissions, time-based queries, and audit trail logging for compliance.
private: true
---

{{< callout url="#" btn_hidden="true" header="false">}}
  Deleting data using the UI is in Preview.
{{< /callout >}} 

This page explains how to delete data from Datadog.

## Delete non-Logs data

To delete data from a product other than Logs, contact [Support][1] with your request.

## Delete Logs data

You can delete data from the Logs product using the UI.

### Access deletion

To grant an account access to delete data, perform the following steps:

1. Under Organizational Settings, go to [Roles][3].
2. Request or create a role that has the **Delete Data** permission for the product you wish to delete data from. For example, to delete data from Logs, request or create a role with the **Logs Delete Data** permission.

### Start deletions

<div class="alert alert-info">A deletion request can be canceled for a 10 days period.</div>

<div class="alert alert-danger">Deleted data can not be recovered after the 10 days cancelation period.</div>

To delete data, perform the following steps:

1. Under Organization Settings, go to [Data Deletion][4].
2. Select a product to delete from. 
3. Select a time frame to search across.
4. Query for events within the time frame to delete.
5. After the search shows the results you wish to delete, click the **Delete** button in the bottom right.
6. You are prompted to confirm the deletion by selecting a checkbox, re-typing the deletion query and entering confirmation text.
7. Click **Confirm**.

The deletion begins instantly after you confirm the request: targeted data will become unaccessible.

From the the [Deletion History][5] tab, you can see the status of deletions. You can also search deletions in [Audit Trail][6] using the string `@asset.name:"Data Deletion"`.

This view can be used  validate a deletion, check the [Deletion History][5] tab, where you can see the status of deletions. You can also search deletions in [Audit Trail][6] using the string `@asset.name:"Data Deletion"`.

**Notes**:
- Deletions start instantly after confirmation. In some cases, records arriving after the job has started might not be deleted because the deletion has already processed the time window that record occurred in.
- When deleting a record, data derived from that record is not deleted (for example, Metrics generated from Logs).

### Cancel deletions

**Note**: When a deletion request is created, it will be in a recoverable status for 10 days. During this period, deleted data will be inaccessible in Datadog but recovered if the deletion is canceled.

To cancel a deletion, click **Cancel** on an **Upcoming** or **Done (Recoverable)** job.

### Audit deletions

Deletions are logged in [Deletion History][5] for 90 days. They are also logged in [Audit Trail][6] alongside the requesting user's details.

[1]: https://www.datadoghq.com/support/
[2]: /account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"
