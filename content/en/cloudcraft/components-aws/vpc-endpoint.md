---
title: "Component: VPC endpoint"
kind: guide
---

{{< img src="cloudcraft/components-aws/vpc-endpoint/component-vpc-endpoint-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **VPC Endpoint** component to represent and visualize VPC endpoints from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/vpc-endpoint/component-vpc-endpoint-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'VPC Endpoint' component with pricing information." responsive="true" style="width:100%;">}}

For the **VPC Endpoint** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Type**. Select the type for your VPC endpoint.
- **Data processed (GB)**. Enter the total volume of data processed by the endpoint in gigabytes. Not available for type gateway.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "vpcendpoint",
    "id": "b1c1f99c-4b2b-437c-bcf4-36597da7e369",
    "region": "us-east-1",
    "mapPos": [17,4],
    "endpointType": "interface",
    "dataGb": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "locked": true
}
```

The **VPC Endpoint** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `vpcendpoint` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **endpointType: string**. The type of endpoint. Accepts one of three options, `interface`, `gateway`, or `gatewayloadbalancer`. Defaults to `interface`.
- **dataGb: number**. The total volume of data processed by the endpoint in gigabytes. Defaults to `10`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#CC2264`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
