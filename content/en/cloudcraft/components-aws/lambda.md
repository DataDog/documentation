---
title: "Lambda Component"
---
## Overview

Use the Lambda component to represent Lambda instances from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/lambda/component-lambda-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Lambda' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Architecture**: The type of computer processor used by the instance.
- **Memory**: The amount of memory allocated for the instance.
- **Requests per month**: The number of requests per month, in millions.
- **Seconds per request**: The duration of each request in seconds.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Lambda component:

```json
{
  "type": "lambda",
  "id": "1bc08394-f884-497b-ae7f-fecc5e23d731",
  "region": "us-east-2",
  "mapPos": [-3, 10],
  "architecture":"x86_64",
  "memory": 128,
  "mRequests": 0.5,
  "computeDuration": 60,
  "color": {
    "2d": "#d86613",
    "isometric": "#3c3c3c"
  },
  "accentColor": {
    "2d": "#4286c5",
    "isometric": "#4286c5"
  },
  "link": "https://aws.amazon.com/lambda/",
  "locked": true
}
```

- **type: lambda**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the Lambda instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **architecture: string**: The type of computer processor used by the instance. Accepts one of the following values: `x86_64` or `arm64`.
- **memory: number**: The amount of memory allocated for the instance in megabytes.
- **mRequests: number**: Number of requests per month, in millions.
- **computeDuration: number**: The duration of each request in seconds.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
