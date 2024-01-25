---
title: "Component: Auto scaling group"
kind: guide
---

{{< img src="cloudcraft/components-aws/auto-scaling-group/component-auto-scaling-group-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Auto scaling group' AWS component." responsive="true" style="width:100%;">}}

The **Auto scaling group** component is used to represent auto scaling groups from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Layout**. Select the layout for the auto scaling group, "even," where members are evenly laid out in the available space, or "manual," where members are manually positioned.

## API

In [the Cloudcraft API][1], the auto scaling group component is represented in JSON.

```json
{
  "type": "asg",
  "id": "0998cf01-d22e-4324-83a9-b06ffbd93188",
  "region": "us-east-2",
  "mapPos": [-2.75, 9],
  "mapSize": [3.25, 1],
  "layout": "even",
  "nodes": [
    "056b4f94-fe18-43de-9e55-325d31813a80",
    "d037dd26-252e-4ba0-95f7-e6656cd00413"
  ],
  "color": {
    "2d": "#f5b720",
    "isometric": "#f5b720"
  },
  "link": "blueprint://bbb22829-4abb-4fba-8a25-1896545eb9d1",
  "locked": true
}
```

- **type: asg**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this auto scaling group is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **mapSize: [number, number]**. The size of the auto scaling group in the blueprint.
- **layout: string**. The layout of the auto scaling group. Accepted values are `even` or `manual`.
- **nodes: array**. The EC2 instances inside the auto scaling group. Must consist of an array of Cloudcraft issued unique identifiers for the EC2 instances.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
