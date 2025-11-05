---
title: Use Datastores with Apps and Workflows
description: Reference and perform CRUD operations on datastores within workflows and apps, and create workflows or apps from existing datastores.
disable_toc: false
aliases:
- /actions/datastore/use
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

You can reference and perform CRUD (Create, Read, Update, and Delete) operations on a datastore inside a workflow or an app. Additionally, you can create a workflow or app directly from an existing datastore.

## Create a workflow or app from a datastore {#create-workflow-app}

You can get started with a workflow or app directly from a datastore. Each time you create a datastore, Datadog asks you if you'd like to create a workflow or app, or view your datastore.

{{< img src="/actions/datastore/datastore-toast.png" alt="When you create a datastore, Datadog asks if you'd like to create a workflow or app." style="width:100%;" >}}

### Workflow Automation

To create a workflow from a datastore:
1. On the [Datastores page][1], locate your datastore in the list and click to open it.
1. Click **Create** > **Workflow from Datastore**.

Datadog creates a workflow with a **List items** workflow step prepopulated with your datastore ID. From here, follow the [Workflow Automation][2] documentation to build your workflow. For a list of available datastore actions, see the [Action Catalog][4].

### App Builder

To create an app from a datastore:
1. On the [Datastores page][1], locate your datastore in the list and click to open it.
1. Click **Create** > **App from Datastore**.

Datadog creates an app prepopulated with your datastore ID. From here, follow the [App Builder][3] documentation to build your app. For a list of available datastore actions, see the [Action Catalog][4].

## Use a datastore in an app {#use-app}

To use a datastore in an existing app, add a datastore action:
1. Click the Data (**{&nbsp;}**) icon to open the Data tab.
1. Click the plus (**+**) icon, select **Action**, and add a Datastore action to add to your app. For a list of available datastore actions, see the [Action Catalog][4].
1. Choose an existing connection or [create one][10].
1. From the **Datastore ID** drop-down menu, select an existing datastore, or select **New Datastore** to create one.

   {{< img src="/actions/datastore/datastore-add-app.png" alt="Add the datastore from an App Builder action" style="width:100%;" >}}

### Use multiple datastores with a single action {#multiple-datastores}

In App Builder, you can use a single datastore action to reference multiple datastores. In the example below, a selector controls which datastore is displayed in the table. The app uses a single List Items datastore action.

**Note**: The datastore in this example uses pseudodata for demonstration purposes.

{{< img src="/actions/datastore/datastore-multiple.png" alt="You can reference multiple datastores with a single datastore action" style="width:100%;" >}}

This app uses multiple datasets by:
- Referencing each datastore's UUID as the `value` in the selector component:
  ```json
  ${[
    {
        "label": "Datastore 1",
        "value": "ae729fad-425f-4e54-b70b-f228768e66b6"
    },
    {
        "label": "Datastore 2",
        "value": "c190f470-8850-4651-9a36-781030827468"
    }
   ]}
  ```
- Using the expression `${select0?.value}` in the List Items action to list the entries from the selected datastore.

The table uses the output from the List Items action to display the data from the datastore.


### Retrieve a UUID

To retrieve the UUID for a datastore:
1. On the [Datastores page][1], locate your datastore in the list and click to open it.
1. Click **Table Options** > **Copy datastore UUID**.

## Use a datastore in a workflow {#use-workflow}

To use a datastore in an existing workflow, add a datastore action:
1. Click the plus (**+**) icon to add a step to your workflow.
1. Search for `datastore` and select a Datastore action to add to your workflow. For a list of available datastore actions, see the [Action Catalog][4].
1. Click on the step in the workflow canvas.
1. From the **Datastore ID** drop-down menu, select an existing datastore, or select **New Datastore** to create one.

   {{< img src="/actions/datastore/datastore-create.png" alt="Add the datastore from an App Builder action" style="width:100%;" >}}

## Update a Datastore with Terraform {#update-terraform}

You can use a workflow to update a Datastore with Terraform by following these steps:
1. Initialize a datastore by [creating one from the UI][9].
1. Use Terraform to define a workflow that updates the datastore.
1. Run the workflow to create or modify rows in the datastore.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /actions/workflows/build/
[3]: /actions/app_builder/build/
[4]: /actions/actions_catalog/#datadog-actions-datastore
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.deleteDatastoreItem
[6]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.getDatastoreItem
[7]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.listDatastoreItems
[8]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.putDatastoreItem
[9]: /actions/datastore/create/#create-a-datastore
[10]: /actions/connections/#create-a-connection