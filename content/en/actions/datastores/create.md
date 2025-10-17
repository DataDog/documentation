---
title: Create and Manage Datastores
description: Create datastores with primary keys, seed initial data, and manage datastore contents through manual editing or file uploads.
disable_toc: false
aliases:
- /actions/datastore/create
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

You can create and manage datastores from the [Datastore page][1].

## Create a datastore

To create a datastore:

1. Navigate to the [Datastores page][1].
1. Click **+ New Datastore**.
1. Enter a **Name** for your datastore.
1. Enter a **Primary Key** or toggle the option to **Autogenerate a Primary Key** if a primary key is not essential to your use case.
   - If you choose to enter a primary key, the key must be a column name in your data where each key has a unique value.
   - Choosing to Autogenerate a key removes your ability to provide your own keys for new items in the datastore, but you can still update existing items by specifying their keys.
1. Optionally, enter a **Description** for your datastore.
1. _Optionally_, you can seed your datastore with initial data from a JSON or CSV file. Use one of the following methods to upload the contents of the file:
   * Drag and drop the file into the UI.
   * Click **browse files** to browse and select a file from your computer.
   * Copy a CSV file on your computer and use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> to paste it.

   The CSV or JSON file must include a header row with a column that matches your Primary Key.
1. Click **Create**. A confirmation pop-up window appears with options to [create a workflow or app][2] from your datastore, or view the datastore.

### Create from an app or workflow

You can create a datastore from an app or workflow by clicking the **Datastore ID** button in a datastore action and selecting **New Datastore**.

{{< img src="actions/datastore/datastore-create.png" alt="Create a workflow from a workflow by clicking New Datastore" style="width:100%;" >}}

## Edit a datastore

### Manually edit your data

To manually edit a row in your datastore:
1. On the [Datastores page][1], locate your datastore and click to open it.
1. Hover over the row you want to change and click the **Edit** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icon.
1. Use the **JSON** or **Raw text** tabs to edit keys in the row.

**Note:** You cannot manually edit the primary key in a row. If you need to edit a primary key, delete the row and re-add it or re-upload the data from a file.

### Update using a file

To update a datastore using a file:
1. On the [Datastores page][1], locate your datastore and click to open it.
1. Click **Add Data**.
1. Select an option for how your data should be handled.
   - **Overwrite** replaces existing rows in your table with the data for your file.
   - **Append** adds the rows in your file to the existing dataset. The append option does not allow you to add duplicate entries to your dataset.
1. Click **Add**.

## View a datastore

To view a datastore, locate your datastore on the [Datastores page][1] and click to open it.

After you've opened a datastore, you can:
- Export the dataset to a JSON or CSV file.
- Click **Columns** to show or hide table columns.
- Click **Create** to [create a workflow or app][2] from the datastore.
- Click **Add data** to [add data](#edit-a-datastore) from a CSV or JSON file.

The **Table Options** button allows you to:
- Edit the [datastore permissions][3].
- Copy the datastore UUID, which is useful for [apps with multiple datastore references][4].
- Clone the datastore.
- Delete the datastore.

## Limitations

Datastores have the following limitations:

- Your organization can have up to 50 datastores.
- A datastore can contain up to 5,000 rows.
- A primary key column of type `string` is required and must uniquely identify each row.
- Each row can be up to 100 KB in size.
- The primary-key value is immutable, it cannot be changed after the row is created.

Reach out to [support][5] if you have a use case that exceeds these limits.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /actions/datastore/use#create-workflow-app
[3]: /actions/datastore/auth/
[4]: /actions/datastore/use#multiple-datastores
[5]: /help/
