---
title: "Direct Connect Connection Component"
---
## Overview

Use the Direct Connect Connection component to visualize connections between your internal network and an AWS Direct Connect location.

{{< img src="cloudcraft/components-aws/direct-connect-connection/component-direct-connect-connection-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on the 2D and 3D views or different colors for each.
- **Location**: Select the Direct Connect location.
- **Number of Ports**: Enter the number of ports used by Direct Connect. Only available for dedicated connections.
- **Type**: Select the type of the connection.
- **Capacity (bps)**: Select the connection capacity in bits per second.
- **Transfer from**: Select the AWS region to transfer from.
- **Data out (GB)**: Enter the total volume of outbound data in gigabytes.

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

The following is an example JSON object of a Direct Connect Connection component:

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

- **type: string**: The type of component. Must be a string of value `dxconnection` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **site: string**: The Direct Connect location. [See AWS's documentation for more information][4]. Defaults to `165HS`.
- **numberPorts: number**: The number of ports used by Direct Connect. Defaults to `1`.
- **connectionType: string**: The type of Direct Connect connection. Accepts one of the following values: `Dedicated` or `Hosted`. Defaults to `Dedicated`.
- **capacity: string**: The connection capacity in bits per second. Accepts one of the following values: `1G`, `10G`, or `100G`. Defaults to `1G`.
- **transferRegion1: string**: The AWS region to transfer from. Accepts [all Cloudcraft supported AWS regions][3]. Defaults to `us-east-1`.
- **transferDataGb1: number**: The total volume of outbound data in gigabytes. Defaults to `0`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#693CC5`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
[4]: https://aws.amazon.com/directconnect/locations/
