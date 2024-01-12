---
title: "Component: WAF"
kind: guide
---

{{< img src="cloudcraft/components-aws/waf/component-waf-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:100%;">}}

You can use the **WAF** component to represent and visualize web application firewalls from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

To configure or customize how your firewall looks in a diagram, you can use the toolbar that appears when selecting a component inside the application.

### Options

{{< img src="cloudcraft/components-aws/waf/component-waf-toolbar.png" alt="Screenshot of a Cloudcraft interface showing configuration options for the 'WAF' component with pricing information." responsive="true" style="width:100%;">}}

For the **WAF** component, the following options are available:

-  **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
-  **Rules & Groups**. Enter the number of rules and groups you want per web ACL.
-  **Requests (millions/mo)**. Enter the number of web requests your WAF receive per month in the millions.

## API

Suppose you need programmatic access and remote rendering of architecture diagrams. In that case, [the Cloudcraft API](https://developers.cloudcraft.co/) provides an interface for you to interact with your AWS account within Cloudcraft by sending and receiving data as JSON objects.

### Schema

```json
{
    "type": "waf",
    "id": "7334ebd8-e980-45c6-9211-e8f090089c6e",
    "arn": "arn:aws:wafv2:us-east-1:746399320916:global/webacl/webacl-test-cdn/793709d6-e353-4cce-aeb7-b1fa5d8845d4",
    "region": "us-east-1",
    "mapPos": [-1,9],
    "aclCount": 5,
    "ruleCount": 5,
    "requestMillions": 5,
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/waf/",
    "locked": true
}
```

The **WAF** component schema representation follows the format above and defines all fields within a diagram for this component.

- **type: string**. The type of component. Must be a string of value `waf` for this component.
- **id: string, uuid**. The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**. The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**. The AWS region for the component. The API supports all global regions, [except for AWS China](https://help.cloudcraft.co/article/110-scan-error-aws-china-region).
- **mapPos: array**. The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **aclCount: number**. The number of web access control lists used. Defaults to `1`.
- **ruleCount: number**. The number of rules added per web access control list. Defaults to `0`.
- **requestMillions: number**. The number of web requests received per month in the millions. Defaults to `0`.
- **color: object**. The fill color for the component body.
  - **isometric: string**. A hexadecimal color for the component body in 3D view. Defaults to `#607D8B`.
  - **2d: string**. A hexadecimal color for the component body in 2D view. Defaults to `#D6242D`.
- **accentColor: object**. The accent color for the component logo.
  - **isometric: string**. A hexadecimal color for the component logo in 3D view. Defaults to `#FF5722`.
  - **2d: string**. A hexadecimal color for the component logo in 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**. A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**. Whether to allow changes to the position of the component through the web interface. Defaults to `false`.
