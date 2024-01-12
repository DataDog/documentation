---
title: "Component: SNS (Deprecated)"
kind: guide
---

{{< img src="cloudcraft/components-aws/sns/component-sns-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'SNS' AWS component." responsive="true" style="width:100%;">}}

The **SNS** component is used to represent notification services from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Rotate item**. Rotate the component and change its direction.
- **Requests/month (K)**. Enter the number of requests sent per month, in the thousands.
- **Notifications/month (K)**. Enter the number of notifications sent per month, in the thousands.
- **Notification type**. Select the type of notification for the SNS component.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the SNS service is represented in JSON.

```json
{
  "type": "sns",
  "id": "76b1a724-2617-48e8-9be5-c71ccf5689cb",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "requests": 20,
  "notifications": 20,
  "notificationType": "email",
  "color": {
    "isometric": "#333333",
    "2d": "#333333"
  },
  "accentColor": {
    "isometric": "#f5b720",
    "2d": "#f5b720"
  },
  "link": "https://aws.amazon.com/sns/",
  "locked": true
}
```

- **type: sns**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region the SNS instance is deployed in. Except for `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **direction: string**. The rotation or direction of the component. Accepted values are `down`, `up`, `right`, or `left`. Defaults to `down`.
- **requests: number**. The number of requests sent per month, in the thousands. Defaults to `1`.
- **notifications: number**. The number of notifications sent per month, in the thousands. Defaults to `1`.
- **notificationType: string**. The type of notification used by SNS. See below for more information.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be a hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be a hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

## Accepted values for notificationType

The `notificationType` key accepts the following values:

```
email, email-json, http, https, lambda, mobile, sms, sqs
```
