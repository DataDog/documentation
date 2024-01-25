---
title: "Component: SQS"
kind: guide
---

{{< img src="cloudcraft/components-aws/sqs/component-sqs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'SQS' AWS component." responsive="true" style="width:100%;">}}

The **SQS** component is used to represent message queue from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Rotate item**. Rotate the component and change its direction.
- **Type**. Select the message queue type for the SQS instance.
- **Req./month (M)**. Enter the number of requests sent per month, in the millions.

## API

In [the Cloudcraft API][1], an SQS instance is represented in JSON.

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

- **type: sqs**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region where SQS is deployed in. Except for `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **direction: string**. The rotation or direction of the component. Accepted values are `down`, `up`, `right`, or `left`. Defaults to `down`.
- **queueType: string**. The message queue type for the SQS instance. Accepted values are `standard` or `fifo`.
- **requests: number**. The number of requests sent per month, in the millions. Defaults to `1`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be a hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be a hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
