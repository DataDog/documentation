---
title: Datastore
disable_toc: false
aliases:
- service_management/workflows/datastore/
- service_management/app_builder/datastore/
further_reading:
- link: "service_management/app_builder/build"
  tag: "Documentation"
  text: "Build Apps"
- link: "service_management/workflows/build"
  tag: "Documentation"
  text: "Build Workflows"
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

## Prerequisites

To interact with the Actions Datastore, your Datadog account must have the following [permissions][6], which are included in the Datadog Standard Role:

* `actions_datastore_read` - Allows read access to the data within the Actions Datastore.
* `actions_datastore_write` - Allows modification of data within the Actions Datastore, including adding, editing, and deleting records.

To use the [Actions Datastore UI][1], you also need the following permission, which is also included in the Datadog Standard Role:

* `actions_datastore_manage` - Allows management of the Actions Datastore, including creating, updating, and deleting the datastore itself.

## Create a datastore

To create a datastore:

1. Navigate to the [Datastore page][1].
1. Click **+ New Datastore**.
1. Enter a **Name**, a **Primary Key**, and optionally a **Description** for your datastore. The Primary Key must be a column name in your data where every data row has a unique value.
1. _Optionally_, you can seed your datastore with initial data from a JSON or CSV file. Use one of the following methods to upload the contents of the file:
   * Drag and drop the file into the UI.
   * Click **browse files** to browse and select a file from your computer.
   * Copy a CSV file on your computer and use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> to paste it.

   The CSV or JSON file must include a header row with a column that matches your Primary Key.
1. Click **Create**. A confirmation pop-up window appears with options to [create a workflow or app](#create-a-workflow-or-app-from-a-datastore) from your datastore, or view the datastore.

After you populate your datastore with data, you can:

* Search the datastore by using the **Search** box in the header.
* Click the name of a column to sort the datastore by that column's data.

## Edit a datastore

### Manually edit your data

To manually edit a row in your datastore:
1. On the [Datastore page][1], locate your datastore in the list and click to open it.
1. Hover over the row you want to change and click the pencil (**Edit**) icon.
1. Use the **JSON** or **Raw text** tabs to edit keys in the row.

**Note:** You cannot manually edit the primary key in a row. Instead, delete the row and re-enter the information.

### Update using a file

To update a datastore using a file:
1. On the [Datastore page][1], locate your datastore in the list and click to open it.
1. Click **Add Data**.
1. Select an option for how your data should be handled.
   - **Overwrite** replaces existing rows in your table with the data for your file.
   - **Append** adds the rows in your file to the existing dataset. If you select append, you cannot add duplicate data to your dataset.
1. Click **Add**.

## Reference a datastore

To use values from a datastore in a workflow or app:

1. On the [Datastore page][1], locate your datastore in the list.
1. In the header of your datastore, click the **Copy Datastore UUID** button.
1. Use this UUID to reference your datastore in a workflow or app. Use the [Delete item][2], [Get item][3], [List items][4], or [Put item][5] actions and provide the UUID as your **Datastore ID**.

## Delete a datastore

To delete a datastore, click the **Trash (Delete Datastore)** icon in the header of the datastore you want to delete, then click **Confirm** to verify.

## Create a workflow or app from a datastore

You can get started with a workflow or app directly from a datastore.

### Workflows

To create a workflow from a datastore:
1. On the [Datastore page][1], locate your datastore in the list and click to open it.
1. Click **Create** > **Workflow from Datastore**.

Datadog creates a Workflow with a **List items** workflow step prepopulated with your datastore ID. From here, follow the [Workflow Automation][8] documentation to build your workflow. For a list of available datastore actions, see the [Action Catalog][10].

### App Builder

To create an app from a datastore:
1. On the [Datastore page][1], locate your datastore in the list and click to open it.
1. Click **Create** > **App from Datastore**.

Datadog creates an app prepopulated with your datastore ID. From here, follow the [App Builder][9] documentation to build your app. For a list of available datastore actions, see the [Action Catalog][10].

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