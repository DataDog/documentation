---
title: "Component: Direct connect connection"
kind: guide
---

{{< img src="cloudcraft/components-aws/direct-connect-connection/component-direct-connect-connection-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **Direct Connect Connection** component to represent and visualize connections between your internal network and an AWS Direct Connect location with Cloudcraft.

## Toolbar

To configure or customize how your repository looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/direct-connect-connection/component-direct-connect-connection-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'Direct Connect Connection' component with pricing information." responsive="true" style="width:100%;">}}

For the **Direct Connect Connection** component, the following options are available:

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Location**. Select the Direct Connect location.
- **Number of Ports**. Enter the number of ports used by Direct Connect. Only available for dedicated connections.
- **Type**. Select the type of the connection.
- **Capacity (bps)**. Select the connection capacity in bits per second.
- **Transfer from**. Select the AWS region to transfer from.
- **Data out (GB)**. Enter the total volume of outbound data in gigabytes.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API][1] provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "dxconnection",
    "id": "cff376f0-b1e3-459b-af10-a7133ad10232",
    "region": "us-east-1",
    "mapPos": [36,21],
    "site": "165HS",
    "numberPorts": 1,
    "connectionType": "Dedicated",
    "capacity": "1G",
    "transferRegion1": "us-east-1",
    "transferDataGb1": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/directconnect/",
    "locked": true
}
```

The **Direct Connect Connection** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `dxconnection` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names][2].
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **site: string**. The Direct Connect location. [See AWS's documentation for more information][4]. Defaults to `165HS`.
- **numberPorts: number**. The number of ports used by Direct Connect. Defaults to `1`.
- **connectionType: string**. The type of Direct Connect connection. Accepts one of two values, `Dedicated` or `Hosted`. Defaults to `Dedicated`.
- **capacity: string**. The connection capacity in bits per second. Accepts one of three values, `1G`, `10G`, or `100G`. Defaults to `1G`.
- **transferRegion1: string**. The AWS region to transfer from. Accepts [all Cloudcraft supported AWS regions][5]. Defaults to `us-east-1`.
- **transferDataGb1: number**. The total volume of outbound data in gigabytes. Defaults to `0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#ECECED`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#693CC5`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#4286C5`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region
[4]: https://aws.amazon.com/directconnect/locations/
[5]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region
