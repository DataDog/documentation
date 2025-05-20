---
title: Create and Manage Datastores
disable_toc: false
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

You can create a Datastore from the [Datastore page][1], or create one from a workflow or app.

## Create a datastore

To create a datastore:

1. Navigate to the [Datastore page][1].
1. Click **+ New Datastore**.
1. Enter a **Name** for your datastore.
1. Enter a **Primary Key** or toggle the option to **Autogenerate a Primary Key** if a primary key is not essential to your usecase. If you choose to enter a primary key, the key must be a column name in your data where each key has a unique value.
1. Optionally, enter a **Description** for your datastore.
1. _Optionally_, you can seed your datastore with initial data from a JSON or CSV file. Use one of the following methods to upload the contents of the file:
   * Drag and drop the file into the UI.
   * Click **browse files** to browse and select a file from your computer.
   * Copy a CSV file on your computer and use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> to paste it.

   The CSV or JSON file must include a header row with a column that matches your Primary Key.
1. Click **Create**. A confirmation pop-up window appears with options to [create a workflow or app][2] from your datastore, or view the datastore.

Alternatively, you can create a datastore from an app or workflow by clicking the **Datastore ID** button and selecting **New Datastore**.

{{< img src="actions/datastore/datastore-create.png" alt="Create a workflow from a workflow by clicking New Datastore" style="width:100%;" >}}

## Edit a datastore

### Manually edit your data

To manually edit a row in your datastore:
1. On the [Datastore page][1], locate your datastore in the list and click to open it.
1. Hover over the row you want to change and click the pencil (**Edit**) icon.
1. Use the **JSON** or **Raw text** tabs to edit keys in the row.

**Note:** You cannot manually edit the primary key in a row. If you need to edit a primary key, delete the row and re-add it.

### Update using a file

To update a datastore using a file:
1. On the [Datastore page][1], locate your datastore in the list and click to open it.
1. Click **Add Data**.
1. Select an option for how your data should be handled.
   - **Overwrite** replaces existing rows in your table with the data for your file.
   - **Append** adds the rows in your file to the existing dataset. If you select append, you cannot add duplicate data to your dataset.
1. Click **Add**.

## View a datastore

To view a datastore, locate your datastore on the [Datastore page][1] and click to open it.

After you've opened a datastore, you can:
- Export the dataset to JSON or CSV.
- Click **Columns** to show or hide table columns.
- Click **Create** to [create a workflow or app][2] from the datastore.
- Click **Add data** to [add data](#edit-a-datastore) from a CSV or JSON file.

The **Table Options** button allows you to:
- Edit the [datastore permissions][3]
- Copy the datastore UUID, which is useful for [apps with multiple datastore references][4].
- Clone the datastore
- Delete the datastore

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/datastore
[2]: /actions/datastore/use#create-workflow-app
[3]: /actions/datastore/auth/
[4]: /actions/datastore/use#multiple-datastores