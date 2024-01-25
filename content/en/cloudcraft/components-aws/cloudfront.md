---
title: "Component: CloudFront"
kind: guide
---

{{< img src="cloudcraft/components-aws/cloudfront/component-cloudfront-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'CloudFront' AWS component." responsive="true" style="width:100%;">}}

The **CloudFront** block component is used to represent the content delivery network from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.

## API

In [the Cloudcraft API][1], an EBS volume is represented in JSON.

```json
{
  "type": "cloudfront",
  "id": "215b4ef1-dfce-4360-a0d1-e109a2e58f0c",
  "mapPos": [1,2],
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/cloudfront/",
  "locked": true
}
```

- **type: cloudfront**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be an hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
