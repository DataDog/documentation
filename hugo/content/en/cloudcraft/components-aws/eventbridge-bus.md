---
title: "EventBridge Bus Component"
---

## Overview

Use the EventBridge Bus component to represent serverless event buses from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/eventbridge-bus/component-eventbridge-bus-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'EventBridge Bus' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- {{< ui >}}Color{{< /ui >}}. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- {{< ui >}}Type{{< /ui >}}. Select the type of your event bus.
- {{< ui >}}Event size{{< /ui >}}. Enter the size of your event in kilobytes.
- {{< ui >}}Custom evnt./mo{{< /ui >}}. Enter the number of custom events processed per month in the millions.
- {{< ui >}}Partner evnt./mo{{< /ui >}}. Enter the number of partner events processed per month in the millions.
- {{< ui >}}Cross-region evnt./mo{{< /ui >}}. Enter the number of cross-region events processed per month in the millions.
- {{< ui >}}Bus-2-bus evnt./mo{{< /ui >}}. Enter the number of bus to bus events processed per month in the millions.
- {{< ui >}}Rotate item{{< /ui >}}. Rotate the component to change its direction.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a EventBridge Bus component:

```json
{
    "type": "eventbus",
    "id": "2791cea2-f727-428f-a504-3358bfcba66f",
    "region": "us-east-1",
    "mapPos": [-2,11],
    "direction": "down",
    "eventBusType": "default",
    "eventSize": 1,
    "numCustomEvents": 0,
    "numPartnerEvents": 0,
    "numCrossRegionEvents": 0,
    "numBus2BusEvents": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/eventbridge/",
    "locked": true
}
```

- **type: string**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **arn: string**: The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**: The AWS region the load balancer is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: string**: The rotation of the device in the blueprint. Accepts one of two values, `down` or `right`. Defaults to `down`.
- **eventBusType: string**: The type of event bus. Accepts one of two values, `default` or `custom`. Defaults to `default`.
- **eventSize: number**: The size of the event in kilobytes. Defaults to `1`.
- **numCustomEvents: number**: The number of custom events processed per month in the millions. Defaults to `0`.
- **numPartnerEvents: number**: The number of partner events processed per month in the millions. Defaults to `0`.
- **numCrossRegionEvents: number**: The number of cross-region events processed per month in the millions. Defaults to `0`.
- **numBus2BusEvents: number**: The number of bus to bus events processed per month in the millions. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color. Defaults to `#ECECED`.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color. Defaults to `#CC2264`.
- **accentColor: obect**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color. Defaults to `#4286C5`.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color. Defaults to `#FFFFFF`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.
