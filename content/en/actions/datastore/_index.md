---
title: Datastore
disable_toc: false
aliases:
- service_management/workflows/datastore/
- service_management/app_builder/datastore/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-datastore/"
  tag: "Blog"
  text: "Enhance your automated workflows and apps with Datastore"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datastores are not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

The Actions Datastore offers a scalable, structured data storage solution within Datadog's App Builder and Workflow Automation products. Datastores support CRUD (Create, Read, Update, and Delete) operations and integrate seamlessly with Datadog's ecosystem to optimize persistent data storage without the need for external databases.

You can interact with a datastore using an app or a workflow, or you can use the UI in the Datadog App.

## Before you begin {#prerequisites}

To interact with the Actions Datastore, your Datadog account must have the following [permissions][6], which are included in the Datadog Standard Role:

* `actions_datastore_read` - Allows read access to the data within the Actions Datastore.
* `actions_datastore_write` - Allows modification of data within the Actions Datastore, including adding, editing, and deleting records.

To use the [Actions Datastore UI][1], you also need the following permission, which is also included in the Datadog Standard Role:

* `actions_datastore_manage` - Allows management of the Actions Datastore, including creating, updating, and deleting the datastore itself.

## Limitations

Datastore has the following limitations:

- A datastore can contain up to 5,000 rows.
- A primary key column of type `string` is required and must uniquely identify each row.
- Each row can be up to 100 KB in size.
- The primary key value is immutable, it cannot be changed after the row is created.

Reach out to [support](https://docs.datadoghq.com/help/) if you have a use case that exceeds these limits.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/datastore
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.deleteDatastoreItem
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.getDatastoreItem
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.listDatastoreItems
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.putDatastoreItem
[6]: /account_management/rbac/permissions/?tab=ui#app-builder--workflow-automation
[7]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore
[8]: /actions/workflows/build/
[9]: /actions/app_builder/build/
[10]: /actions/actions_catalog/#datadog-actions-datastore