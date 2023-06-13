---
title: Saved Actions
kind: documentation
disable_toc: false
type: workflows
is_beta: true
aliases:
- /workflows/saved_actions
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

You may store, modify, and reuse the preset inputs of an Action using Saved Actions, allowing you to build further Actions with pre-populated inputs.

## Save a configured action

1. From the Workflow Canvas, click on the step with the configured Action.
2. Click on the small button that appears in the top right of the side panel
3. From the popover that shows up, click on **Save action configurations**.
4. A dialog box appears with the Action configurations filled in for you to verify.
5. You can add a name and description to the Saved Action and also decide whether or not you want to make it accessible for others in your organization to use.
6. Once you are satisfied with the configurations, you can click on **Save Action Configuration**.

## Use a saved action

1. When you click on the plus (`+`) icon from the Workflow Canvas, you can toggle to Saved Actions.
2. Search for a Saved Action using the search bar or browse through the list to find the Saved Action you're looking for. Click a Saved Action to add it as a configured step on your Workflow Canvas.
3. Alternatively, if you already have a step added to the Workflow Canvas, you can click on the step and find the small button on the top right of the side panel. Click on that to open the popover where you can select **Configure using a saved action**.
4. A dialog box appears with the list of available Saved Actions for you to choose from.
5. Once you have made a choice, you can click on **Use Saved Action** to confirm your selection.

## Preview/edit a saved action

1. Navigate to the [Action Catalog][1].
2. Toggle to **Saved Actions** and browse through the list to choose which Saved Action you want to preview or edit.
3. Hover over the Saved Action of your choice to reveal the option on the right-side of the screen to **Preview/Edit saved configurations**. Click on that to navigate to the dialog box with the preview of the Saved Action.
4. If you wish to edit it, click on the pencil (**Edit**) icon, make the desired changes and click on **Save** to persist your modifications.
**Note:** if the Saved Action you want to edit was created by somebody else, you would need to clone that first by clicking on the **Clone** icon next to the **Edit** icon.

## Delete a saved action

1. Navigate to the [Action Catalog][1].
2. Toggle to **Saved Actions** and browse through the list to choose which Saved Action you want to delete.
3. Hover over the Saved Action of your choice to reveal the option on the right-side of the screen to **Preview/Edit saved configurations**. Click on that to navigate to the dialog box with the preview of the Saved Action.
4. Please click on the trash (**Delete**) icon to lead you to a confirmation box where you can click on **Delete** to delete the Saved Action.
**Note:** you cannot delete a Saved Action that was created by somebody else.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow/action-catalog
