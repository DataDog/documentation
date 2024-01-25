---
title: "Component: SNS subscriptions"
kind: guide
---

{{< img src="cloudcraft/components-aws/sns-subscriptions/component-sns-subscriptions-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **SNS Subscriptions** component to represent and visualize SNS subscriptions from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/sns-subscriptions/component-sns-subscriptions-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'SNS Subscriptions' component with pricing information." responsive="true" style="width:100%;">}}

For the **SNS Subscriptions** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Notifications / mo (K)**. Enter the number of notifications per month in the thousands.
- **Notification type**. Select the type of notification for the SNS component.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```
{
    "type": "snssubscriptions",
    "id": "ba29170b-5015-419f-b617-86fe788bafcb",
    "region": "us-east-1",
    "mapPos": [0,8],
    "notifications": 1,
    "notificationType": "mobile"
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/sns/",
    "locked": true
}
```

The **SNS Subscriptions** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `snssubscriptions` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names][2].
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **notifications: number**. The number of notifications per month in the thousands. Defaults to `1`.
- **notificationType: string**. The type of notification for SNS. [See below for more information](#accepted-values-for-notificationType).. Defaults to `mobile`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#CC2264`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `notificationType`

The `notificationType` key accepts the following values:

```
mobile, sms, email, emil-json, http, https, sqs, lambda
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region
