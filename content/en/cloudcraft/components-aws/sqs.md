---
title: "SQS Component"
---
## Overview

Use the SQS component to represent message queues from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/sqs/component-sqs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'SQS' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate item**: Rotate the component and change its direction.
- **Type**: Select the message queue type for the SQS instance.
- **Req./month (M)**: Enter the number of requests sent per month, in millions.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of an SQS component:

```json
{
  "type": "sqs",
  "id": "c671ec0c-3103-4312-9c85-286a58dbc457",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "queueType": "standard",
  "requests": 1,
  "color": {
    "isometric": "#ececed",
    "2d": "#cc2264"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/sqs/",
  "locked": true
}
```

- **type: sqs**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region where SQS is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: string**: The rotation or direction of the component. Accepted values are `down`, `up`, `right`, or `left`. Defaults to `down`.
- **queueType: string**: The message queue type for the SQS instance. Accepted values are `standard` or `fifo`.
- **requests: number**: The number of requests sent per month, in millions. Defaults to `1`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
