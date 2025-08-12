---
title: "Save and Reuse Actions"
description: Save and reuse an action and its parameters
disable_toc: false
disable_sidebar: false
algolia:
  tags: ['app builder', 'actions']
type: documentation
aliases:
  - /app_builder/actions_catalog/action_blueprints/
  - /service_management/app_builder/actions_catalog/saved_actions/
  - /service_management/app_builder/actions/saved_actions/
  - /service_management/app_builder/saved_actions
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"

---

Use the _Saved Actions_ feature to store and reuse an action and its parameters. You can insert a saved action into your app as a new step, or use one to populate an existing step's parameters.

## Save an action

1. From [your apps list][1], hover over an app and click the **Edit** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icon.
1. Click the **Actions** {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu, then **Save Action**.
1. Enter a name and description for the action.
1. If you want anyone in your organization to have access to the action, toggle **Usable by others in the organization**.
1. Verify the configuration details for the action and click **Save Action Configuration**.

## Use a saved action in your app

To add a saved action as a new step in your app:
1. In the app editor view, click the **Actions** {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu and select **Saved Actions**.
1. Use the search bar or browse through the list to find the Saved Action you're looking for.
1. Select the Saved Action to add it as a configured step in your app.

To configure an existing step using a saved action:
1. Select a step in your app that you'd like to populate with a pre-configured action.
1. Click the **Actions** {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu and select **Saved Actions**.
1. Select the Saved Action you'd like to use and click **Use Saved Action**.

## Manage a saved action

You can preview, edit, or delete your Saved Actions from the Action Catalog.

To find a saved action:
1. Navigate to the [**Action Catalog**][2].
1. Click **Saved Actions** and browse through the list for the Saved Action you'd like to preview, edit, or delete.
1. Hover over the action and click **Preview/Edit saved configurations** to be presented with a preview of the action.
1. From the preview screen, select the action to edit or delete it.

If you did not create the action, you cannot edit it directly. Instead select the **Clone** icon to copy it and make your configuration changes. You cannot delete an action that you did not create.

{{< img src="service_management/workflows/edit_saved_action.png" alt="Preview, edit, or delete a saved action from the Action Catalog." style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://datadoghq.slack.com/