---
title: "SNS Subscriptions Component"
---
## Overview

Use the SNS Subscription component to visualize SNS subscriptions from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/sns-subscriptions/component-sns-subscriptions-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors for the 2D and 3D views or different colors for each.
- **Notifications/mo (K)**: Enter the number of notifications per month, in thousands.
- **Notification type**: Select the type of notification for the SNS component.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a SNS subscription component:

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

- **type: string**: The type of component. Must be a string of value `snssubscriptions` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **notifications: number**: The number of notifications per month, in thousands. Defaults to `1`.
- **notificationType: string**: The type of notification for SNS. See [Accepted values for `notificationType`](#accepted-values-for-notificationType) for more information. Defaults to `mobile`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#CC2264`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `notificationType`

The `notificationType` key accepts the following values:

```
mobile, sms, email, emil-json, http, https, sqs, lambda
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region