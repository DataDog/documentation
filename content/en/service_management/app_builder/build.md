---
title: Build Apps
kind: documentation
disable_toc: false
---

You can create an app or edit existing apps from the App Builder [Explore][1] tab. The **Explore** tab lists information about existing apps, such as the author, status, the dates that each app was last modified, and whether the app is published or not.
- Hover over an app for the options to edit, delete, view or clone the app.
- Toggle **My apps** if you want to see only apps that you created.

## Build an app from a blueprint

1. Click the [**Blueprints**][2] tab.
1. Find the blueprint you'd like to use, and select it. The app template opens.
1. If desired, select the app name and enter a new name and description for the app.
1. App queries that require attention are marked with exclamation marks. Click on each query you'd like to modify and fill in the required fields.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. When you're finished modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

[1]: https://app.datadoghq.com/app-builder/

## Create a custom app

To create an app:
1. From [App Builder][2], click **New App**.
1. If desired, select the app name and enter a new name and description for the app.
1. Drag UI components into the app canvas.
1. Use queries to populate or interact with your canvas.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. When you're finished modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

[1]: https://app.datadoghq.com/app-builder/apps/
[2]: https://app.datadoghq.com/app-builder/blueprints

### Build an app with JSON

Build or edit a workflow in JSON by clicking the cog (**Settings**) icon, and selecting **Switch to JSON**. The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

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

## Queries

Queries form the logic behind your app and enable interactions with Datadog integrations. To add a query, click the plus (**+**) icon in the **Queries** section and search for an action to add to your app.



## Preview an app
