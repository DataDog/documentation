---
title: "Component: Lambda"
kind: guide
---

{{< img src="cloudcraft/components-aws/lambda/component-lambda-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Lambda' AWS component." responsive="true" style="width:100%;">}}

The **Lambda** component is used to represent Lambda instances from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Architecture**. Type of computer processor used by the instance..
- **Memory**. Amount of memory allocated for the instance.
- **Requests per month**. Number of requests per month in millions.
- **Seconds per request**. Duration of each request in seconds.

## API

In [the Cloudcraft API][1], the Lambda component is represented in JSON.

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

- **type: lambda**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this Lambda instance is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **architecture: string**. The type of computer processor used by the instance. Accepts one of two values, `x86_64` or `arm64`.
- **memory: number**. The amount of memory allocated for the instance in megabytes.
- **mRequests: number**. Number of requests per month in millions.
- **computeDuration: number**. The duration of each request in seconds.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on top of the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
