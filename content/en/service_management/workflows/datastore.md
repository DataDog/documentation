---
title: Apps Datastore
disable_toc: false
further_reading:
- link: "service_management/app_builder/build"
  tag: "Documentation"
  text: "Build Apps"
- link: "service_management/workflows/build"
  tag: "Documentation"
  text: "Build Workflows"
---

{{< callout url="https://docs.google.com/forms/d/1NvW3I0Ep-lQo4FbiSwOEjccoFsS9Ue2wYiYDmCxKDYg/viewform?edit_requested=true" btn_hidden="false" header="Try the Preview!">}}
Datastore is in Preview. Use this form to request access today.
{{< /callout >}}

## Overview

The Apps Datastore offers a scalable, structured data storage solution within Datadog's App Builder and Workflow Automation products. It supports CRUD (Create, Read, Update, and Delete) operations and integrates seamlessly with Datadog's ecosystem to optimize persistent data storage without the need for external databases.

You can interact with a datastore using an app or a workflow, or you can use the UI in the Datadog App.


## Prerequisites

To interact with the Apps Datastore, your Datadog account must have the following [permissions][6], which are included in the Datadog Standard Role:

* `apps_datastore_read` - Allows read access to the data within the Apps Datastore.
* `apps_datastore_write` - Allows modification of data within the Apps Datastore, including adding, editing, and deleting records.

To use the [Apps Datastore UI][1], you also need the following permission, which is also included in the Datadog Standard Role:

* `apps_datastore_manage` - Allows management of the Apps Datastore, including creating, updating, and deleting the datastore itself.


## Create a datastore

To create a datastore:

1. Navigate to the [Datastore page][1].
1. Click **+ New Datastore**.
1. Enter a **Name**, a **Primary Key**, and optionally a **Description** for your datastore. The Primary Key must be a column name in your data where every data row has a unique value.
1. _Optionally_, to upload initial items to your datastore, use one of the following methods to copy a CSV file:
   * Drag and drop the file into the UI.
   * Click **browse files** to browse and select a file from your computer.
   * Copy a CSV file on your computer and use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> to paste it.

   The CSV file must include a header row with a column that matches your Primary Key.
1. Click **Create**.
1. To see your datastore in the list, click **Refresh Results**.

After you populate your datastore with data, you can:

* Search the datastore by using the **Search** box in the header.
* Click the name of a column to sort the datastore by that column's data.


## Edit a datastore

To edit a datastore, on the [Datastore page][1], locate your datastore in the list. You can perform the following operations:

* To add a row, click the **+ (plus)** icon. Fill in values for each field in the row, then click **Create**.
* To edit non-primary-key values in an existing row, hover over the row and click the **Pencil (Edit)** icon. Edit the desired values, then click **Save**.
* To delete an existing row, hover over the row and click the **Trash (Delete)** icon. Click **Delete** to confirm.


## Reference a datastore

To use values from a datastore in a workflow or app:

1. On the [Datastore page][1], locate your datastore in the list.
1. In the header of your datastore, click the **Copy Datastore UUID** button.
1. Use this UUID to reference your datastore in a workflow or app. Use the [Delete item][2], [Get item][3], [List items][4], or [Put item][5] actions and provide the UUID as your **Datastore ID**.


## Delete a datastore

To delete a datastore, click the **Trash (Delete Datastore)** icon in the header of the datastore you want to delete, then click **Confirm** to verify.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/datastore
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.deleteDatastoreItem
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.getDatastoreItem
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.listDatastoreItems
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.putDatastoreItem
[6]: /account_management/rbac/permissions/?tab=ui#app-builder--workflow-automation
