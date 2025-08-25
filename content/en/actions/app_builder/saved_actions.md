---
title: "Save and Reuse Actions"
description: Save and reuse an action and its parameters
disable_toc: false
disable_sidebar: false
algolia:
  tags: ['app builder', 'actions']
type: documentation
further_reading:
- link: "/actions/workflows/actions/"
  tag: "Documentation"
  text: "Learn about actions in workflows"
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

1. In the app editor view, click the **Actions** {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu and select **Use Saved Actions**.
1. Browse through the list to find the Saved Action you're looking for.
1. Select the Saved Action to add it as a configured step in your app.

## Manage a saved action

You can edit, clone, or delete your Saved Actions from the Action Catalog.

To find a saved action:
1. Navigate to the [**Action Catalog**][2].
1. Click **Saved Actions**. 
1. Browse through the list of Saved Actions or use the search bar. Hover over the Saved Action you'd like to edit, clone, or delete.
1. Click **Manage Saved Actions**. 
1. Select the icon to edit {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}, clone {{< img src="icons/clone.png" inline="true" style="width:14px;">}}, or delete {{< img src="icons/delete.png" inline="true" style="width:14px;">}} the Saved Action.

**Note:** If you did not create an action, you cannot delete it or edit it directly. Instead, select the **Clone** {{< img src="icons/clone.png" inline="true" style="width:14px;">}}icon to copy the action and make your configuration changes. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://datadoghq.slack.com/