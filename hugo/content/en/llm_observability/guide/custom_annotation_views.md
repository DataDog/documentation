---
title: Create Custom Annotation Views
description: Build, preview, and use a custom App to display interactions in an annotation queue.
further_reading:
  - link: /llm_observability/investigate/annotation_queues/
    tag: Documentation
    text: Review traces with annotation queues
  - link: /actions/datadog_apps/
    tag: Documentation
    text: Build and publish Datadog Apps
  - link: /actions/app_builder/access_and_auth/
    tag: Documentation
    text: Manage App access and authentication
---

## Overview

Build custom annotation views with [Datadog Apps][1] to display the interaction you are reviewing. Use a local coding agent to build a view that fits your review workflow. For example, display tool calls as a timeline and highlight failed steps.

The annotation workspace helps you install the Datadog Apps skill and generate a prompt for your agent. Then preview the published App with the selected interaction.

## Prerequisites

- An [annotation queue][2] with an interaction to review.
- Access to the {{< ui >}}Create a custom view{{< /ui >}} option in the annotation workspace.
- A local coding agent and Node.js version 20.12.0 or later. See the [Datadog Apps prerequisites][3].
- Permission to create and publish Datadog Apps in the organization where you review annotations. See [App permissions][4].

## Create a custom view

Open an interaction in an annotation queue. In the view menu, select {{< ui >}}Create a custom view{{< /ui >}}.

### Step 1: Install the skill

On the {{< ui >}}Install skill{{< /ui >}} tab, copy the installation command and run it in your project's terminal:

```shell
npx skills add datadog-labs/agent-skills --skill datadog-app --full-depth -y
```

If the skill does not appear in your agent, restart the agent. If you already installed the skill, continue to the next step.

### Step 2: Build and publish the view

1. On the {{< ui >}}Copy prompt{{< /ui >}} tab, enter a description in {{< ui >}}What would you like to see?{{< /ui >}}. For example:

   ```text
   Show tool calls as a timeline, highlight failed steps, and display the final response alongside the original input.
   ```

2. Copy the generated prompt and paste it into your local coding agent. The prompt includes the target organization and Datadog site. It also includes instructions for reading the selected interaction and the tag that identifies the App as an annotation view.
3. Complete browser authorization when prompted. Select the organization shown in the setup dialog.
4. Work with your agent to build and preview the view locally. Review the result and approve uploading and publishing it to the target organization. For details, see [Build and upload your App][5] and [Publish and manage your Apps][6].
5. Return to the setup dialog and open the {{< ui >}}Use your view{{< /ui >}} tab.

#### Use API keys instead of browser authorization

For CI or environments where browser sign-in is unavailable:

1. Enable {{< ui >}}Use API keys instead{{< /ui >}} on the {{< ui >}}Copy prompt{{< /ui >}} tab.
2. Select or create an API key and enter an application key. The application key requires [Actions API Access][7] and permission to create and publish Apps.
3. Copy the generated commands and run them in your terminal to set `DD_SITE`, `DD_API_KEY`, and `DD_APP_KEY` before starting your agent.
4. Copy the updated prompt into your agent and continue building the view.

Keep credentials in your terminal environment. Do not add them to source code or frontend bundles.

### Step 3: Preview and apply the view

1. On the {{< ui >}}Use your view{{< /ui >}} tab, select {{< ui >}}Refresh{{< /ui >}} to load published Apps.
2. Search the {{< ui >}}Published App{{< /ui >}} dropdown and select your view. If there is only one matching published App, it is selected automatically.
3. Review the preview, which displays the selected interaction using your App.
4. Select {{< ui >}}Use this view{{< /ui >}} to apply it to the annotation workspace.

The workspace switches to the selected view after you select {{< ui >}}Use this view{{< /ui >}}. Closing the dialog without applying a view keeps your existing selection.

## Update a custom view

1. Work with your local agent to change the App and preview the changes locally.
2. Upload and publish an updated version of the same App.
3. Open {{< ui >}}Create a custom view{{< /ui >}} from the annotation workspace's view menu and go to {{< ui >}}Use your view{{< /ui >}}.
4. Select {{< ui >}}Refresh{{< /ui >}}, select the App, and review the updated preview.
5. Select {{< ui >}}Use this view{{< /ui >}} to apply it.

## Troubleshooting

### The published App does not appear

- Check that you published the App to the same organization and Datadog site as the annotation workspace.
- Keep the annotation-view tag from the generated prompt in your App's configuration.
- Check that you have permission to view the App.
- Select {{< ui >}}Refresh{{< /ui >}} after publishing. If there are no published Apps, select {{< ui >}}Back to prompt{{< /ui >}} to continue working with your agent.

### Published Apps fail to load

Select {{< ui >}}Refresh{{< /ui >}} to retry loading the list.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/datadog_apps/
[2]: /llm_observability/investigate/annotation_queues/
[3]: /actions/datadog_apps/#prerequisites
[4]: /actions/app_builder/access_and_auth/#app-permissions
[5]: /actions/datadog_apps/#build-and-upload-your-app
[6]: /actions/datadog_apps/#publish-and-manage-your-apps
[7]: /account_management/api-app-keys/#actions-api-access
