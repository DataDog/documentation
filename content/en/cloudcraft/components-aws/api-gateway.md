---
title: "Component: API gateway"
kind: guide
---

{{< img src="cloudcraft/components-aws/api-gateway/component-api-gateway-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'API gateway' AWS component." responsive="true" style="width:100%;">}}

The **API Gateway** component is used to represent RESTful, HTTP, and WebSocket APIs from your Amazon Web Services architecture with Cloudcraft.

## Toolbar

The toolbar is displayed when selecting a component. It allows you to customize parts of your component and its visual to your liking.

- **Color**. Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both 2D and 3D view, or different colors for each.
- **Rotate item**. Rotate the component and change its direction.
- **API Type**. Select the API type for the gateway.
- **M req./month**. Enter the number of requests sent per month, in the millions.
- **M min./month**. Enter the number of messages sent per minute, in the millions. Only available for APIs of type WebSocket.
- **Cache Memory (GB)**. Select the amount of memory used for caching API responses, in gigabytes. Only available for APIs of type REST.

## API

In [the Cloudcraft API][1], an API Gateway is represented in JSON.

```json
{
  "type": "apigateway",
  "id": "5635395f-9441-494d-bcc7-5dd4f5c93ce1",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "apiType": "rest",
  "apiCalls": "10",
  "connectionMinutes": 0,
  "cache": 1.6,
  "color": {
    "isometric": "#3c3c3c",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/api-gateway/",
  "locked": true
}
```

- **type: apigateway**. The type of component.
- **id: string**. A unique identifier for the component in the `uuid` format.
- **region: string**. The AWS region where the API Gateway is deployed in. Except for `cn-` regions, all global regions are supported.
- **mapPos: [number, number]**. The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **direction: string**. The rotation or direction of the component. Accepted values are  `down` or  `right`. Defaults to `down`.
- **apiType: string**. The type of API used for the gateway. Accepted values are `rest`, `http`, and `websocket`.
- **apiCalls: number**. The number of API calls made per month, in the millions. Defaults to `5`.
- **connectionMinutes: number**. The number of messages sent per minute, in the millions. Only applicable if `apiType` is set to `websocket`. Defaults to `0`.
- **cache: number**. The amount of memory used for caching API responses, in gigabytes. Only applicable if `apiType` is set to `rest`. [See below for more information](#accepted-values-for-cache).
- **color: object**. The fill color for the component body.
  - **isometric: string**. Fill color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Fill color for the component in 2D view. Must be a hexadecimal color.
- **accentColor: object**. The accent color used to display the component logo on the block.
  - **isometric: string**. Accent color for the component in 3D view. Must be a hexadecimal color.
  - **2d: string**. Accent color for the component in 2D view. Must be a hexadecimal color.
- **link: uri**. Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**. If true, changes to the component through the application are disabled until unlocked.

## Accepted values for cache

The `cache` key defaults to `1.6` and accepts the following values:

```
0, 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118.0, 237.0
```

[1]: https://developers.cloudcraft.co/
