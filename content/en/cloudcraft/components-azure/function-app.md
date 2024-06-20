---
title: "Function App Component"
---

## Overview

You can use the Function App component to represent and visualize a group of Azure Functions from your Azure environment.

{{< img src="cloudcraft/components-azure/function-app/component-function-app-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure functions." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: Select the hosting plan for the function app.
- **vCPU**: Enter the average number of compute units used by functions.
- **Memory (GB)**: Enter the average amount of memory in gigabytes used by functions.
- **Duration (ms)**: Enter the average function duration in milliseconds.
- **Executions (MM/m)**: Enter the number of function invocations per month in millions.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Function app component:

### Schema

```json
{
  "type": "azurefunctionapp",
  "id": "939f0381-96aa-4e44-bc04-7993a121384e",
  "resourceId": "/subscriptions/76f00a52-98a8-4e61-892c-bb327ded2352/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/doc-functions",
  "region": "eastus",
  "mapPos": [1, 8],
  "tier": "consumption",
  "vcpu": 1,
  "memoryGB": 0.5,
  "durationMS": 1000,
  "executionsMM": 3,
  "color": {
    "isometric": "#ececed",
    "2d": null
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": null
  },
  "link": "https://azure.microsoft.com/en-us/products/functions/",
  "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurefunctionapp` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: string**: The hosting plan for the app. Accepts one of two values, `consumption` or `premium`. Defaults to `consumption`.
- **vcpu: number**: The average number of compute units used by functions. Defaults to `1`.
- **memoryGB: number**: The average amount of memory used by functions in gigabytes. Defaults to `0.5`.
- **durationMS: number**: The average duration of functions in milliseconds. Defaults to `1000`.
- **executionsMM: number**: The number invocation count per month in millions. Defaults to `3`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#1490df`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
