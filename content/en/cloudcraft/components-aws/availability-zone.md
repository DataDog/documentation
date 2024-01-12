---
title: "Component: Availability zone"
kind: guide
---

{{< img src="cloudcraft/components-aws/availability-zone/component-availability-zone-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Availability zone' AWS component." responsive="true" style="width:100%;">}}

The **Availability zone** component is used to represent availability zones from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Raise**. Raise the availability zone component above other availability zones.
- **Lower**. Lower the availability zone component below other availability zones.

## API

In [the Cloudcraft API](https://developers.cloudcraft.co/), the availability zone component is represented in JSON.

```json
{
  "type": "zone",
  "id": "a46cfaf2-ce78-4d44-9a41-a55fc7cd4ceb",
  "region": "us-east-2",
  "mapPos": [-6.75, 10.25],
  "mapSize": [2.5, 2.5],
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5",
  "locked": true
}
```

- **type: zone**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this availability zone belongs to. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **mapSize: [number, number]**. The size of the availability zone representation in the blueprint.
- **color: object**. The fill color for the availability zone.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.
