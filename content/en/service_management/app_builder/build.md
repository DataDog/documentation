---
title: Build Apps
kind: documentation
aliases:
- /app_builder/build
disable_toc: false
further_reading:
- link: "/service_management/workflows/actions_catalog/"
  tag: "Documentation"
  text: "Actions Catalog"
---

You can create an app or edit existing apps from the App Builder [Explore][1] tab. The **Explore** tab lists information about existing apps, such as the author, status, the dates that each app was last modified, and whether the app is published or not.
- Hover over an app for the options to edit, delete, view or clone the app.
- Toggle **My apps** if you want to see only apps that you created.

## Build an app from a blueprint

1. Click the [**Blueprints**][2] tab.
1. Find the blueprint you'd like to use, and select it.
1. Click **Use Blueprint** to open the app template.
1. To change the app name and description, click the app name.
1. Each blueprint template comes loaded with demo data. You can begin customizing the app immediately by editing the **Connection** for each query.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. When you're finished modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

[1]: https://app.datadoghq.com/app-builder/

## Create a custom app

To create an app:
1. From [App Builder][1], click **New App**.
1. To change the app name and description, click the app name.
1. Drag [UI components](#app-canvas-and-components) into the app canvas.
1. Use [queries](#queries) to populate or interact with your canvas.
1. To save the app, click **Save as New App**.
1. To [preview](#preview-an-app) the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. When you're finished modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

## Build an app with JSON

To build or edit a workflow in JSON, click the cog (**Settings**) icon, and select **Switch to JSON**. The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

A typical workflow contains the following top-level keys:
- `name`: The name of the app.
- `description`: The description for the app.
- `components`: UI components used in the app. Components are constructed as an array under `components.properties.children`.
- `queries`: An array of queries used in the app.
- `rootInstanceName`: References the parent UI grid component. Defaults to `grid0`.

<details>
<summary>Click here to see the JSON for an example app that uses a Slack send message query, two text components and a button component to send a message to a Slack channel.</summary>
{{< code-block lang="json" disable_copy="true">}}
{
  "queries": [
    {
      "id": "f6cf459d-fff8-4a45-ad97-2b76f6043ca7",
      "name": "sendMessage",
      "type": "action",
      "properties": {
        "onlyTriggerManually": true,
        "spec": {
          "fqn": "com.datadoghq.slack.send_simple_message",
          "inputs": {
            "channel": "${textInput1.value}",
            "teamId": "AB12CD3E",
            "text": "${textInput0.value}"
          }
        }
      }
    }
  ],
  "id": "b3c64a77-99f9-4545-b5cd-506145f38656",
  "components": [
    {
      "events": [],
      "name": "grid0",
      "properties": {
        "children": [
          {
            "events": [],
            "name": "gridCell0",
            "properties": {
              "children": [
                {
                  "events": [
                    {
                      "name": "click",
                      "queryName": "sendMessage",
                      "type": "triggerQuery"
                    }
                  ],
                  "name": "button0",
                  "properties": {
                    "isBorderless": false,
                    "isDisabled": "false",
                    "isLoading": "false",
                    "isPrimary": true,
                    "isVisible": "true",
                    "label": "Send",
                    "level": "default"
                  },
                  "type": "button"
                }
              ],
              "isVisible": "true",
              "layout": {
                "default": {
                  "height": 4,
                  "width": 2,
                  "x": 2,
                  "y": 23
                }
              }
            },
            "type": "gridCell"
          },
          {
            "events": [],
            "name": "gridCell1",
            "properties": {
              "children": [
                {
                  "events": [],
                  "name": "textInput0",
                  "properties": {
                    "defaultValue": "",
                    "isDisabled": false,
                    "isVisible": "true",
                    "label": "Slack message",
                    "placeholder": "Enter a message to send to Slack"
                  },
                  "type": "textInput"
                }
              ],
              "isVisible": "true",
              "layout": {
                "default": {
                  "height": 8,
                  "width": 4,
                  "x": 0,
                  "y": 13
                }
              }
            },
            "type": "gridCell"
          },
          {
            "events": [],
            "name": "gridCell3",
            "properties": {
              "children": [
                {
                  "events": [],
                  "name": "textInput1",
                  "properties": {
                    "defaultValue": "",
                    "isDisabled": false,
                    "isVisible": "true",
                    "label": "Slack channel name",
                    "placeholder": "Enter a Slack channel name"
                  },
                  "type": "textInput"
                }
              ],
              "isVisible": "true",
              "layout": {
                "default": {
                  "height": 8,
                  "width": 4,
                  "x": 0,
                  "y": 3
                }
              }
            },
            "type": "gridCell"
          }
        ]
      },
      "type": "grid"
    }
  ],
  "description": "Sends a message to a Slack channel",
  "name": "Send Slack message",
  "rootInstanceName": "grid0",
  "connections": []
}
{{< /code-block >}}
</details>

## App canvas and components

Tne app canvas represents the graphical interface that your users interact with. Build the interface by dragging and dropping UI components onto the canvas. To see all available components, click **All Components**.

Each component features a list of corresponding configuration options that you can use to control how users interact with your app. For example, the **Text Input** component allows you to set a default value, placeholder text, and a label. The **Button** component allows for a label and an event to trigger when pressed. Components also feature an **Appearance** section that you can use to change the way the components look and act. For example, you can disable a button or control its visibility.

To delete or duplicate a component, select the component and click the three dot ellipsis (*...*) to display the **Delete** or **Duplicate** options.

### Dynamic values

Mention tables here.

## Queries

Queries form the logic behind your app and enable interactions with Datadog integrations. Queries can take inputs from other queries or from UI components, and return outputs for use in other queries or UI components. To add a query, click the plus (**+**) icon in the **Queries** section and search for a query to add to your app.

After you add a query to your app, ensure that you've entered any required inputs. Input fields with the variable button (**{{**) can take [variables](#variables).

### Debounce

Configuring debounce ensures that your query is only triggered once per user input. By default, debounce is set to `0` milliseconds (ms). To prevent a query from being called too frequently, increase the debounce. Configure debounce in the **Advanced** section of a query.

### Conditional queries

You can set a condition that must be met before a query can run. To set a query, enter an expression in the **Condition** field in the **Advanced** section of the query. The condition must evaluate to true before the query runs. For example, if you want a given query to run only if a UI component named `select0` exists and is not empty, you can use the expression `${select0.value && select0.value.length > 0}`.

### Post query transformation

You can perform a post query transformation to simplify or transform the output of a query. Add a post query transformation in the **Advanced** section of a query.

For example, the Slack _List Channels_ action returns an array of dictionaries containing the ID and name for each channel. To discard the IDs and return only an array of names, add the following query transformation:

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Apply transformations to the raw query output
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
}
{{< /code-block >}}

### Error notifications

To display a toast to the user when the system returns an error, toggle **Show Toast on Errors** in the **Advanced** section of a query.

### Confirmation prompts

To prompt a user for confirmation before the query runs, toggle the **Requires Confirmation** option in the **Advanced** section of a query.

## Variables

Use app variables to pass data from one part of your app to another. Additionally, you can use app variables to pass in data from your dashboard using dashboard template variables.

Variables are enclosed in braces, proceeded by a dollar sign (`${}`). To use a variable, use the query or UI component name and access the child fields using dot notation. For example, if you have a select component named `select0` and you want to access its default value field in a query, use the syntax `${select0.defaultValue}`. If you're not sure what to enter as a variable, type `${` to open a suggestions menu with all available variables.

{{< img src="service_management/app_builder/select-variable.mp4" alt="If you're not sure what to enter as a variable, type ${ to open a suggestions menu with all available variables" video=true >}}

For more information using dashboard template variables, see [Embedding apps in dashboards][3].

## Preview an app

Click the **Preview** button to preview your app. Preview mode allows you to view the app from the user's perspective. Use preview mode to interact with the app UI and test your queries. When you're done, click **Edit** to return to the app builder.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /service_management/app_builder/embedded_apps