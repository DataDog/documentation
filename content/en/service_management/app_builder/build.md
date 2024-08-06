---
title: Build Apps
aliases:
- /app_builder/build
disable_toc: false
further_reading:
- link: "/service_management/workflows/actions_catalog/"
  tag: "Documentation"
  text: "Actions Catalog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

You can create an app or edit existing apps from the [App Builder][1] page. The page lists information about existing apps, including the following:
- Author
- Status
- Date that each app was last modified
- Whether the app is published

On the App Builder page, you can access and filter your apps. Hover over an app for options to edit, delete, view, or clone the app. You can also enable the **My apps** toggle to see only apps that you created:

{{< img src="service_management/app_builder/app_builder_page.png" alt="The App Builder page" style="width:100%;" >}}

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

### Create a custom app

1. From [App Builder][1], click **New App**.
1. To change the app name and description, click the app name.
1. To add a [UI component](#app-canvas-and-components) to the app canvas, click the component in the top bar or drag it onto the canvas.
1. Use [queries](#queries) to populate or interact with your canvas.
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

The app canvas represents the graphical interface that your users interact with. You can click a component in the top bar to add it to the canvas, or you can drag and drop components to add them or move them around on the canvas. To see all available components, click **All Components**.

Each component features a list of corresponding configuration options that control how users interact with your app. For example, the **Text Input** component allows you to set a default value, placeholder text, and a label. The **Button** component includes a label and an event that triggers when the button is pressed. Components also feature an **Appearance** section that changes the way the components look and act. For example, you can disable a button or control its visibility.

To delete or duplicate a component, select the component and click the three dot ellipsis (*...*) to display the **Delete** or **Duplicate** options.

For a list of available UI components and their properties, see [Components][9].

UI components can trigger reactions on an [Event][11]. 

[Queries][12] populate your app with data from Datadog APIs or supported integrations. They take inputs from other queries or from UI components and return outputs for use in other queries or in UI components.

You can use [Javascript Expressions][13] anywhere in App Builder to create custom interactions between the different parts of your app.

### Interact with an app in JSON

#### Edit an app

To edit an app with JSON, click the cog (**Settings**) icon and select **Switch to JSON**. The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

#### Copy or back up an app

To copy an app layout across organizations or back it up, click the cog (**Settings**) icon and select **Switch to JSON**. This shows the JSON code for the entire app. Copy this JSON code and save it in a text editor. You can save intermediate states of your app during development and return to them if necessary.

To copy the app to another organization:
1. Create an app. 
1. Click the cog (**Settings**) icon and select **Switch to JSON**. 
1. Replace the existing JSON with the JSON that you previously copied. 

The **Switch to GUI** option in the settings menu takes you back to the GUI editor.


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