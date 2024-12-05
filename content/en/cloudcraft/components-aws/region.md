---
title: Region
---

## Overview

Use the Region component to represent physical locations from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/region/component-region-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Region' AWS component." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Visibility**. Toggle the visibility of the component on the diagram.
- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Padding**. Enter the padding value to adjust the space between the component border and its content.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON of a Region component:

```json
{
    "type": "region",
    "id": "1063814395",
    "arn":"arn:aws::us-east-1::",
    "region": "us-east-1",
    "visible": true,
    "padding": 2,
    "shape": "rectangular",
    "nodes": [
        "6acd2c2e-60aa-44bd-93e8-aca071ef85ff"
    ],
    "color": {
        "isometric": "#a991e1",
        "2d": "#a991e1"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: string**: The type of component.
- **id: string**: A unique identifier for the component consisting of 10 random digits.
- **arn: string**: The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). The region component takes a dummy ARN value that always equals to `arn:aws::region::`.
- **region: string**: The AWS region itself. All global regions are supported except `cn-` regions.
- **visible: boolean**: If `false`, the component becomes semi-transparent on the diagram.
- **padding: number**: The padding value for the component.
- **shape: string**: The shape of the component. The region component only supports the `rectangular` shape.
- **nodes: array**: An array of node IDs that are inside the region. The node IDs are in the `uuid` format.
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color. Defaults to `#ECECED`.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color. Defaults to `#CC2264`.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.
