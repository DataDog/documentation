---
title: "Save and Reuse Actions"
kind: documentation
description: Save and reuse an action and its parameters
disable_toc: false
disable_sidebar: false
algolia:
  tags: [workflow, workflows/, workflow automation]
type: documentation
aliases:
  - /workflows/actions_catalog/action_blueprints/
  - /service_management/workflows/actions_catalog/saved_actions/
  - /service_management/workflows/actions/saved_actions/
further_reading:
- link: /integrations/
  tag: Documentation
  text: Learn about integrations

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use the _Saved Actions_ feature to store and reuse an action and its parameters. You can insert a saved action into your workflow as a new step, or use one to populate an existing step's parameters.

## Save an action

1. From the workflow canvas, click an action that you'd like to save.
1. Click the **Saved Actions** icon and select **Save action configurations**.
1. Enter a name and description for the action.
1. If you want anyone in your organization to have access to the action, toggle **Usable by others in the organization**.
1. Verify the configuration details for the action and click **Save Action Configuration**.

{{< img src="service_management/workflows/save_action.mp4" alt="Click the Saved Action icon to save an action for later use." video="true" width=80% >}}

## Use a saved action in your workflow

To add a saved action as a new step in your workflow:
1. Click the plus (`+`) icon from the workflow canvas and select Saved Actions.
1. Use the search bar or browse through the list to find the Saved Action you're looking for.
1. Select the Saved Action to add it as a configured step on your workflow canvas.

To configure an existing step using a saved action:
1. Select a step in your workflow that you'd like to populate with a pre-configured action.
1. Click the **Saved Actions** icon and select **Configure using a saved action**.
1. Select the Saved Action you'd like to use to configure your step and click **Use Saved Action**.

## Manage a saved action

You can preview, edit, or delete your Saved Actions from the [Action Catalog][1] tab.

To find a saved action:
1. From the [Workflow Automation][2] page, click [**Action Catalog**][1].
1. Click **Saved Actions** and browse through the list for the Saved Action you'd like to preview, edit, or delete.
1. Hover over the action and click **Preview/Edit saved configurations** to be presented with a preview of the action.
1. From the preview screen, select the action to edit or delete it.

If you did not create the action, you cannot edit it directly. Instead select the **Clone** icon to copy it and make your configuration changes. You cannot delete an action that you did not create.

{{< img src="service_management/workflows/edit_saved_action.png" alt="Preview, edit, or delete a saved action from the Action Catalog." style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/workflow/action-catalog
[2]: https://app.datadoghq.com/workflow/
[3]: https://datadoghq.slack.com/