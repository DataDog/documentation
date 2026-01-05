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
- Tags
- Date that each app was last modified
- Whether each app is published

On the App Builder page, you can access and filter your apps. Hover over an app for options to edit, delete, view, or clone the app. You can also enable the **My apps** toggle to see only apps that you created:

{{< img src="service_management/app_builder/app-builder-my-apps-2025-11-19.png" alt="The App Builder page, filtered to show only 'My apps'" style="width:100%;" >}}

## Create an app

When creating a new app, you can use [AI][22], [a blueprint][18], [a layout][19], or [an action][20] to get started. Alternatively, you can [start from scratch][21] or use the [App Playground][23] to learn more about App Builder.

### Build an app with AI

With Bits AI, you can generate a complete app from a single prompt. Describe the app you want to create, and the UI agent automatically generates the UI, actions, and logic mapped to your existing data and permissions. You can then iterate by chatting---refining components, flows, or styling---without writing any code.

To build an app with Bits AI:
1. From [App Builder][1], click **New App**.
1. Click a suggested prompt, or enter a prompt that describes the app you want to create. Enter as much detail as possible to improve the results. Here are some example prompts:
   - `Display a list of AWS Lambda functions in a table. Allow the user to filter by function name and specify the limit.`
   - `Display GitHub pull requests in a table.`
1. Press <kbd>Enter</kbd> to send your prompt. Bits AI automatically generates the UI, actions, and logic for your app, mapped to your existing data and permissions.
    - While Bits AI is generating your app, it may give you the chance to set up a connection to build the app with real data. You can complete this step, or skip it to build the app layout faster without data.
    - Bits AI sometimes asks clarification questions while it responds to your prompt. If this happens, enter a response, then press <kbd>Enter</kbd>. 
    - After Bits AI adds an action to the app, it gives you the chance to either use mock data in your action, or skip that step. With mock data, Bits AI can infer the action's output and automatically connect that data to components (such as set a table's data source). If you skip this step, you can wire outputs manually later.
1. After Bits AI has generated your app, you can click **Edit with AI** or manually [customize your app][15].

To iterate on an existing app:
1. From [your apps list][14], hover over an app and click **Edit app** ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}).
1. Click **Build with AI** (**<i class="icon-bits-ai"></i>**).
1. Enter a detailed prompt for the behavior you'd like to add to your app. Include the integrations and actions you'd like to use.
1. Press <kbd>Enter</kbd> to add the functionality to your app.

### Build an app from a blueprint

Blueprints are helpful app templates that cover common use cases and showcase best practices for setting up apps. They come loaded with demo data to familiarize yourself with the app's functions. Some blueprints create a starter app that you can customize, like [Manage Datastore][24] and [Export Synthetics][25]. Blueprints with "how to" in their title, like [How to: Custom Code][26], are templates with built-in tutorials for App Builder features.

1. From [App Builder][1], click the [Blueprints][2] tab.
1. Click the blueprint you want to use. 
1. Click **Open in Editor**.
1. [Customize your app][15].

### Build an app from a layout

Choosing a layout is the fastest way to create a minimal, ready-to-edit app. There are three options: 
- **Table Manager**: List, filter, and sort data from a query.
- **Form**: Collect inputs and trigger actions (create, update, request, etc.).
  - For more detailed form templates, see [Forms][27].
- **Custom Chart**: Visualize a query by swapping your data into a prebuilt bar chart.

To create an app from a layout:
1. From [App Builder][1], click **New App**.
1. Click **Layouts** in the onboarding modal.
1. Select a layout. The pane on the right displays a preview of the app.
1. Click **Use Layout**.
1. [Customize your app][15].

### Build an app from an action

You can create an app by choosing an integration and a specific action from the [Action Catalog][17]. App Builder preconfigures the action and its queries, bringing live data into the app canvas. You can then connect components and test the app immediately. This method is best if you already have an integration and an action in mind (such as interacting with [a Datadog datastore][28]).

1. From [App Builder][1], click **New App**. 
1. Click **Action** in the onboarding modal. 
1. Choose an integration, then click **Continue**.
1. Choose one or more actions. Each set of actions are templates that are specific to the integration you've selected. There is no limit to the number of actions you can choose.
1. Click **Create**.
1. [Customize your app][15].

### Create a custom app

If you don't want to use any of the methods above, you can create a new app from the blank App Builder canvas.

1. From [App Builder][1], click **New App**. 
1. Click **Start From Scratch**, or click the **X** to close the onboarding modal.
1. [Customize your app][15].

### See what's possible with App Playground

The App Playground is an interactive demo that guides users through creating and using an app. If you're new to App Builder, you can use the App Playground to learn about its core concepts, including: 
- Data fetching
- Displaying query data in a table
- Configuring a button to fire a query
- Configuring the loading states for a component to reflect a query's loading state
- Visualizing data in a graph

To access the App Playground:
1. From [App Builder][1], click **New App**. 
1. Click **App Playground**.
1. On the next screen, the app canvas (the right pane) displays information to guide you through App Builder. Click elements like **Fetching Data** to see information and instructions for using that feature. 

## Customize your app

Apps are made up of UI components and queries which interact with each other to form the user experience and logic behind each app. The query list and editor appear on the left side of the page, while the app canvas and UI components make up the right side of the page.

To change basic elements of your app:
- From [App Builder][1], hover over an app and click **Edit app** ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}).
- Click the app name to edit these elements:
  - Name
  - Description
  - Tags
  - Appearance
  - [Input parameters][29]
- To add a [UI component](#app-canvas-and-components) to the app canvas, click **Add Component** (<i class="icon-component-wui" style="position:relative; top:4px;"></i>) to open the **Components** tab. Click the component or drag it onto the canvas.
- Click the **View** button to see your app from the user's perspective. Use view mode to interact with the app UI and test your queries. When you're done, click **Edit** to return to the app builder.
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

Favoriting an app pins it to the top of your [app list][14]. 

To favorite an app, click the star icon (<i class="icon-star-empty-wui" style="position:relative; top:4px;"></i>) next to the app's name. When you refresh the page, the starred app appears at the top of your app list.

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

To edit an app with JSON, click **Settings** ({{< img src="icons/settings.png" inline="true" style="width:14px;">}}) and select **Switch to JSON**. The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

### Export an app

To copy an app layout across organizations or back up the app, click **Settings** ({{< img src="icons/settings.png" inline="true" style="width:14px;">}}) and select **Switch to JSON**. This shows the JSON code for the entire app. Copy this JSON code and save it in a text editor. You can save intermediate states of your app during development and return to them if necessary.

To copy the app to another organization:
1. Create an app. 
1. Click **Settings** {{< img src="icons/settings.png" inline="true" style="width:14px;">}} and select **Switch to JSON**. 
1. Replace the existing JSON with the JSON that you previously copied. 

The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

## Debug an app

The App Builder Debug Console provides a central place to view real-time logs, action executions, and errors. 

To access the Debug Console, hover over an app in [your apps list][14] and click **Edit app** ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}). Click **Expand** ({{< img src="icons/panel-bottom-grow.png" inline="true" style="width:14px;">}}) in the bottom right to see the entire Debug Console. Information inside the console includes:
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
[8]: https://chat.datadoghq.com/
[9]: /service_management/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /service_management/app_builder/events
[12]: /service_management/app_builder/queries
[13]: /service_management/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list
[15]: /actions/app_builder/build/#customize-your-app
[16]: /getting_started/integrations/
[17]: /actions/actions_catalog/
[18]: /actions/app_builder/build/#build-an-app-from-a-blueprint
[19]: /actions/app_builder/build/#build-an-app-from-a-layout
[20]: /actions/app_builder/build/#build-an-app-from-an-action
[21]: /actions/app_builder/build/#create-a-custom-app
[22]: /actions/app_builder/build/#build-an-app-with-ai
[23]: /actions/app_builder/build/#see-whats-possible-with-app-playground
[24]: https://app.datadoghq.com/app-builder/apps/edit?template=manage-datastore&viewMode=templatePreview
[25]: https://app.datadoghq.com/app-builder/apps/edit?template=export-synthetics&viewMode=templatePreview
[26]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to__write_custom_code&viewMode=templatePreview
[27]: /actions/forms/
[28]: https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.apps_datastore
[29]: /actions/app_builder/embedded_apps/input_parameters/