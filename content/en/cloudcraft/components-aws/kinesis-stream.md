---
title: "Kinesis Stream Component"
---
## Overview

Use the Kinesis Stream component to represent real-time data streams from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/kinesis-stream/component-kinesis-stream-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Kinesis Stream' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Rotate item**: Rotate the Kinesis component and change its direction.
- **Shards**: Enter the number of shards for the Kinesis data stream.
- **PUT units (M)**: Enter the number of `PUT` payload units for the Kinesis data stream, in millions.
- **Extended data retention**: Extend the storage of the Kinesis data stream beyond 24 hours.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Kinesis Stream component:

```json
{
  "type": "kinesisstream",
  "id": "cc3c417b-3b09-4dff-bc22-52398b86adb6",
  "region": "us-west-2",
  "mapPos": [0,10],
  "direction": "down",
  "shards": 1,
  "putUnits": 500,
  "extendedRetention": true,
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/kinesis/data-streams/",
  "locked": true
}
```

- **type: kinesisstream**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the Kinesis stream instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **direction: string**: The rotation or direction of the component. Accepted values are `down` and `right`. Defaults to `down`.
- **shards: number**: The number of shards for the Kinesis data stream. Defaults to `1`.
- **putUnits: number**: The number of `PUT` payload units for the Kinesis data stream, in millions. Defaults to `500`.
- **extendedRetention: boolean**. If `true`, store Kinesis data streams for longer than 24 hours. Defaults to `false`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
