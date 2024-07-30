---
title: "SNS Component (Deprecated)"
---
## Overview

Use the SNS component to represent notification services from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/sns/component-sns-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'SNS' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate item**: Rotate the component and change its direction.
- **Requests/month (K)**: Enter the number of requests sent per month, in thousands.
- **Notifications/month (K)**: Enter the number of notifications sent per month, in thousands.
- **Notification type**: Select the type of notification for the SNS component.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a SNS component:

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

- **type: sns**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the SNS instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: string**: The rotation or direction of the component. Accepted values are `down`, `up`, `right`, or `left`. Defaults to `down`.
- **requests: number**: The number of requests sent per month, in thousands. Defaults to `1`.
- **notifications: number**: The number of notifications sent per month, in thousands. Defaults to `1`.
- **notificationType: string**: The type of notification used by SNS. See [Accepted values for `notificationType`](#accepted-values-for-notificationtype) for more information.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

## Accepted values for `notificationType`

The `notificationType` key accepts the following values:

```
email, email-json, http, https, lambda, mobile, sms, sqs
```

[1]: https://developers.cloudcraft.co/
