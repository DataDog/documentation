---
private: true
title: Delete Data
---

{{< callout url="#" btn_hidden="true" header="false">}}
  Deleting data using the UI is in private beta.
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

<div class="alert alert-danger">Deleted data can never be recovered, and deletions cannot be undone.</div>

<div class="alert alert-info"><strong>For Logs</strong>: Deletions cannot be scoped to a specific index, and deletions occur across Index, Flex Indexes, and Online Archives.
</div>

To delete data, perform the following steps:

1. Under Organization Settings, go to [Data Deletion][4].
2. Select a product to delete from.
3. Select a time frame to search across.
4. After the search shows the results you wish to delete, click the **Delete** button in the bottom right.
5. You are prompted to confirm the deletion by selecting a checkbox and entering confirmation text. Click **Confirm**.

The deletion begins 2 hours after you confirm the request.

To validate a deletion, check the [Deletion History][5] tab, where you can see the status of deletions. You can also search deletions in [Audit Trail][6] using the string `@asset.name:"Data Deletion"`.

**注**:
- Deletions start 2 hours after confirmation, and matching records that arrive during this period are included in deletion. In some cases, records arriving after the job has started might not be deleted because the deletion has already processed the time window that record occurred in.
- When deleting a record, data derived from that record is not deleted (for example, Metrics generated from Logs).

### Stop deletions

**Note**: Deletions that are in progress can be canceled. However, this only prevents deletion of data that has not yet been processed for a particular job.

To cancel a deletion, click **Cancel** on an **Upcoming** or **In Progress** job.

### Audit deletions

Deletions are logged in [Deletion History][5] for 90 days. They are also logged in [Audit Trail][6] alongside the requesting user's details.

[1]: https://www.datadoghq.com/support/
[2]: /ja/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"