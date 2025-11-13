---
title: Build Apps
description: Create custom apps from blueprints or scratch using drag-and-drop UI components, queries, and JavaScript expressions.
aliases:
  - /app_builder/build
  - /service_management/app_builder/build
disable_toc: false
further_reading:
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "https://learn.datadoghq.com/courses/getting-started-app-builder/"
  tag: "Learning Center"
  text: "Getting Started with App Builder"
---

You can create an app or edit existing apps from the [App Builder][1] page. The page lists information about existing apps, including the following:
- Author
- Status
- Date that each app was last modified
- Whether the app is published

On the App Builder page, you can access and filter your apps. Hover over an app for options to edit, delete, view, or clone the app. You can also enable the **My apps** toggle to see only apps that you created:

{{< img src="service_management/app_builder/app-builder-my-apps.png" alt="The App Builder page, filtered to show only 'My apps'" style="width:100%;" >}}

## Create an app

### Build an app from a blueprint

Blueprints are helpful starter apps that cover common use cases. They come loaded with demo data that you can use to familiarize yourself with the app. Blueprints also showcase best practices for setting up app functionality and visual presentation.

1. From [App Builder][1], click the [Blueprints][2] tab.
1. Find the blueprint that you want to use and click **Preview**.
1. Click **Use Blueprint** to open the app blueprint.
1. To change the app name and description, click the app name.
1. Each blueprint template comes loaded with demo data. To customize the app, edit the **Connection** for each query.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. After you finish modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

### Build an app with AI

With Bits AI, you can generate a complete app from a single prompt. Describe the app you want to create, and the agent will automatically generate the UI, actions, and logic mapped to your existing data and permissions. You can then iterate by chatting---refining components, flows, or styling---all without writing any code.

To build an app with Bits AI:
1. From [App Builder][1], click **New App**.
1. Click **Start with AI**.
1. Click a suggested prompt, or enter a prompt that describes the app you want to create. Enter as much detail as possible to improve the results. Here are some example queries:
   - `Display a list of lambda functions in a table. Allow the user to filter by function name and specify the limit.`
   - `Display GitHub pull requests in a table.`
1. Press **Enter** to send your prompt. Bits AI will automatically generate the UI, actions, and logic for your app, mapped to your existing data and permissions.
1. While it's responding, Bits AI will ask you to set up a connection to build the app with real data. You can complete this step, or skip it to build the app layout faster without data.
1. Bits AI sometimes asks clarification questions while it responds to your prompt. If this happens, enter a response, then press **Enter**. 
1. After Bits AI adds an action to the app, you will be prompted to either Mock with AI Data, or skip configuration. Configuring your action during agent execution helps with connecting the data types to other components.
1. After Bits AI responds to your prompt, you can click **Edit with AI** or manually [customize your app][15].
1. To save the app, click **Save**.
1. To preview the app, click **View**. Click **Edit** to return to the configuration view.
1. After you finish modifying the app, click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

To iterate on an existing app:
1. From an existing app, click **UI Agent Chat** (**<i class="icon-bits-ai"></i>**).
1. Enter a detailed prompt for the behavior you'd like to add to your app. Include the integrations and actions you'd like to use.
1. Press **Enter** to add the functionality to your app.

### Create a custom app

1. From [App Builder][1], click **New App**.
1. To change the app name and description, click the app name.
1. To add a [UI component](#app-canvas-and-components) to the app canvas, click the plus ({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}}) to open the **Components** tab, then click the component or drag it onto the canvas.
1. Use [queries][12] to populate or interact with your canvas.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. After you finish modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

## Customize your app

Apps are made up of UI components and queries which interact with each other to form the user experience and logic behind each app. The query list and editor appear on the left side of the page, while the app canvas and UI components make up the right side of the page.

Basic customization:
- To edit the **Name**, **Description**, or **Canvas Color** of your app, click the app name at the top left.
- Click the **Preview** button to preview your app. Preview mode allows you to view the app from the user's perspective. Use preview mode to interact with the app UI and test your queries. When you're done, click **Edit** to return to the app builder.
- To save your app, click **Save**.
- When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

### App canvas and components

The app canvas represents the graphical interface that your users interact with. You can drag and drop components to move them around on the canvas. To see all available components, click the plus ({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}}) to open the **Components** tab.

Each component features a list of corresponding configuration options that control how users interact with your app. For example, the **Text Input** component allows you to set a default value, placeholder text, and a label. The **Button** component includes a label and an event that triggers when the button is pressed. Components also feature an **Appearance** section that changes the way the components look and act. For example, you can disable a button or control its visibility.

To delete or duplicate a component, select the component and click the three dot ellipsis (*...*) to display the **Delete** or **Duplicate** options.

For a list of available UI components and their properties, see [Components][9].

UI components can trigger reactions on an [Event][11].

[Queries][12] populate your app with data from Datadog APIs or supported integrations. They take inputs from other queries or from UI components and return outputs for use in other queries or in UI components.

You can use [JavaScript Expressions][13] anywhere in App Builder to create custom interactions between the different parts of your app.

## Tag an app

Tags display in a column on the [app list][14].

To add a tag to an app:

1. Open the **App Properties** tab in your app.
1. Under **Tags**, use the drop-down to select an existing tag, or enter a new value and click **Add option: [your text]**.
1. Save your app.

The tag displays on the line for this app in the app list. You can click the tag in this list to copy it to your clipboard.

## Favorite an app

To favorite an app and pin it to the top of your list of apps, click the star next to the name of the app in the [app list][14]:

{{< img src="service_management/app_builder/app-list-star.png" alt="An app list with four apps, none of which are starred" style="width:40%;" >}}

When you refresh the page, the starred app appears in a section at the top of your list of apps:

{{< img src="service_management/app_builder/app-list-with-favorited-app.png" alt="An app list with four apps, one of which is starred and pinned to the top of the list" style="width:40%;" >}}

## View app version history

App Builder keeps a record of every saved version of your app.

To view the version history for your app, in the left-hand menu of your app, click the version history {{< img src="icons/version-history.png" inline="true" style="width:14px;">}} icon.

The UI displays up to 50 saved or published versions of your app, along with the icon of the user who saved or published the version:

{{< img src="service_management/app_builder/version-history-example.png" alt="An example App Builder version history list with two items, the current version and a previous version" style="width:70%;" >}}

You can perform the following operations:

* To view an app version, click the version in the list.
* To overwrite an existing app with a previous version, select the version, then click **Restore Version** in the upper right.
* To create a new app that is a copy of a version, select the version, then click **Clone Version** in the upper right.


## Interact with an app in JSON

### Edit an app

To edit an app with JSON, click **Settings** {{< img src="icons/settings.png" inline="true" style="width:14px;">}} and select **Switch to JSON**. The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

### Export an app

To copy an app layout across organizations or back up the app, click **Settings** {{< img src="icons/settings.png" inline="true" style="width:14px;">}} and select **Switch to JSON**. This shows the JSON code for the entire app. Copy this JSON code and save it in a text editor. You can save intermediate states of your app during development and return to them if necessary.

To copy the app to another organization:
1. Create an app. 
1. Click **Settings** {{< img src="icons/settings.png" inline="true" style="width:14px;">}} and select **Switch to JSON**. 
1. Replace the existing JSON with the JSON that you previously copied. 

The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

## Debug an app

The App Builder Debug Console provides a central place to view real-time logs, action executions, and errors. 

To access the Debug Console, go to [your apps list][14] and click **Edit** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} for one of your apps. Click **Expand** {{< img src="icons/panel-bottom-grow.png" inline="true" style="width:14px;">}} to see the entire Debug Console. Information inside the console includes:
- **Action Executions:** Track the success and failure of action executions with their associated inputs and outputs.
- **Errors:** View logs for errors, warnings, and info messages.
- **Logs:** View configuration errors for your actions, transformers, variables, and components.
- **App State:** Access real-time application state changes.

{{< img src="service_management/app_builder/app-builder-debug-console.png" alt="The expanded panel of the Debug Console inside an app's editor view" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][8].

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /service_management/workflows/connections
[6]: /service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[9]: /service_management/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /service_management/app_builder/events
[12]: /service_management/app_builder/queries
[13]: /service_management/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list
[15]: /actions/app_builder/build/#customize-your-app