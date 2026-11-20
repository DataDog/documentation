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

Use the _Saved Actions_ feature to save a copy of an action for reuse. You can insert a saved action into your app as a new step, or use a saved action to populate an existing step's parameters.

<div class="alert alert-info">You can only save actions if you have <a href="https://docs.datadoghq.com/actions/app_builder/access_and_auth/#app-permissions"><b>Editor</b> access.</a> for that app.</div>

## Save an action

1. In Datadog, navigate to [**Actions** > **App Builder**][1] and hover over an app. Action icons for that app will appear under the {{< ui >}}Last Saved{{< /ui >}} column. Click the {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icon.
1. Click the {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu, then {{< ui >}}Save Action{{< /ui >}}.
1. Enter a name and description for the action.
1. If you want others in your organization to have access to the action, turn on the {{< ui >}}Usable by others in the organization{{< /ui >}} toggle.
1. Verify the configuration details for the action and click {{< ui >}}Save Action Configuration{{< /ui >}}.

## Use a saved action in your app

1. In Datadog, navigate to [**Actions** > **App Builder**][1], hover over an app, and click the {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icon.
1. Click the {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menu and select {{< ui >}}Use Saved Actions{{< /ui >}}.
1. Browse through the list to find the saved action you're looking for.
1. Select the saved action to add it as a configured step in your app.

## Manage a saved action

You can edit, clone, or delete your saved actions from the Action Catalog.

<div class="alert alert-info">If you did not create an action, you cannot delete it or edit it directly. Instead, select the <b>Clone</b> {{< img src="icons/clone-alert-blue.png" inline="true" style="width:14px;">}} icon to copy the action and make your configuration changes.</div>

To find a saved action:
1. In Datadog, navigate to the [**Action Catalog**][2].
1. Click {{< ui >}}Saved Actions{{< /ui >}}.
1. Browse through the list of saved actions or use the search bar to search for actions by name. Hover over the saved action you'd like to edit, clone, or delete.
1. Click {{< ui >}}Manage Saved Actions{{< /ui >}}.
1. Select the icon to edit {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}, clone {{< img src="icons/clone.png" inline="true" style="width:14px;">}}, or delete {{< img src="icons/delete.png" inline="true" style="width:14px;">}} the saved action.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://chat.datadoghq.com/