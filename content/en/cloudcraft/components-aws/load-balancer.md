---
title: "Component: Load balancer"
kind: guide
---

{{< img src="cloudcraft/components-aws/load-balancer/component-load-balancer-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Load balancer' AWS component." responsive="true" style="width:100%;">}}

The **Load balancer** component is used to represent application and network load balancers from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Type**. Select the elastic load balancer type, classic, application, or network.
- **Data processed**. Total volume of data processed per hour, in gigabytes. Only available for type classic.
- **LCUs**. Number of load balancer capacity units. Only available for type application and network.

## API

In [the Cloudcraft API][1], the load balancer component is represented in JSON.

```json
{
  "type": "elb",
  "id": "811ac6d8-bd6b-4d19-8504-d68d6c8381a9",
  "region": "us-east-2",
  "mapPos": [0,10],
  "elbType": "application",
  "dataGb": 10,
  "lcu": 1,
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "link": "blueprint://e2fd00f6-84d9-4a40-acf0-ff2ea01ae59c",
  "locked": true
}
```

- **type: elb**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region this load balancer is deployed in. With the exception of `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **elbType: string**. Type of elastic load balancer. Accepts `classic`, `application`, or `network` as values.
- **dataGb: number**. Volume of data processed per hour by the load balancer, in gigabytes. Only applicable to load balancers of type classic.
- **lcu: number**. Number of load balancer capacity units. Only applicable to load balancers of type application or network.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: obect**. The accent color used to display the component logo on top of the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
