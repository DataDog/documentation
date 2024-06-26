---
title: "Web app Component"
---

## Overview

You can use the Web App component to represent and visualize web applications from your Azure environment.

{{< img src="cloudcraft/components-azure/web-app/component-web-app-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure web app components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Platform**: Select the platform for your web application. Supported options are Windows and Linux.
- **Tier**: Select the service level tier for your web application.
- **Instance**: Select an instance type for your web application.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Web app component:

### Schema

```json
{
  "type": "azurewebapp",
  "id": "274993bf-646d-4046-a20a-063a243e22b7",
  "resourceId": "/subscriptions/4f02467b-945a-4d06-8789-66b52d1c92a3/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/docsite#componentType=azurewebapp",
  "region": "eastus",
  "mapPos": [0, 8],
  "platform": "Windows",
  "tier": "Basic",
  "instance": "B1",
  "color": {
      "isometric": "#ececed",
      "2d": null
  },
  "accentColor": {
      "isometric": "#4286c5",
      "2d": null
  },
  "link": "https://azure.microsoft.com/products/app-service/web/",
  "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurewebapp` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **platform: string**: The platform for the web application. Accepts one of two values, `Windows` or `Linux`. Defaults to `Linux`.
- **tier: string**: The service level tier for the web application. [See below for more information](#accepted-values-for-tier). Defaults to `Basic`.
- **instance: string**: The instance type for the web application. [See below for more information](#accepted-values-for-instance). Defaults to `B1`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#4286c5`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for tier

The `tier` key accepts the following values:

```
Basic, Free, Isolated, "Isolated v2", "Premium v2", "Premium v3", Shared, Standard
```

## Accepted values for instance

The `instance` key accepts the following values:

```
B1, B2, B3, F1, I1, I2, I3, "I1 v2", "I2 v2", "I3 v2", "I4 v2", "I5 v2",
"I6 v2", "P1 v2", "P2 v2", "P3 v2", P0v3, "P1 v3", P1mv3, "P2 v3",
P2mv3, "P3 v3", P3mv3, P4mv3, P5mv3, D1, S1, S2, S3
```

## Valid combinations for tier and instance

The `tier` and `instance` keys work together to define the resources allocated to an application, but a valid combination of values must be provided.

The following table shows which combinations are valid.

tier        | instance
----------- | ---------
Basic       | B1, B2, B3
Free        | F1
Isolated    | I1, I2, I3
Isolated v2 | I1 v2, I2 v2, I3 v2, I4 v2, I5 v2, I6 v2
Premium v2  | P1 v2, P2 v2, P3 v2
Premium v3  | P0v3, P1 v3, P1mv3, P2 v3, P2mv3, P3 v3, P3mv3, P4mv3, P5mv3
Shared      | D1
Standard    | S1, S2, S3

[1]: https://developers.cloudcraft.co/
