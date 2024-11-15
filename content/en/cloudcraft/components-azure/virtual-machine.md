---
title: "Virtual machine Component"
---

## Overview

You can use the Virtual Machine component to represent and visualize virtual machines from your Azure environment.

{{< img src="cloudcraft/components-azure/virtual-machine/component-virtual-machine-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure virtual machine components." responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Platform**: Select the platform for your virtual machine. Supported options are Windows and Linux.
- **Tier**: Select the service level tier for your virtual machine.
- **Series**: Select your virtual machine series. This option affects the available instance types.
- **Instance**: Select an instance type for your virtual machine. Changing the type of instance also changes the hardware details shown in the toolbar to reflect what the hypervisor uses.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Virtual machine component:

### Schema

```json
{
    "type": "azurevm",
    "id": "c46c4a24-e3b5-4830-9217-0276e92ac927",
    "resourceId": "/subscriptions/451da5fc-e712-4a34-b236-3c6992a1c2c0/resourceGroups/VMGROUP1/providers/Microsoft.Compute/virtualMachines/hello",
    "region": "eastus",
    "mapPos": [4.5, 7.5],
    "platform": "linux",
    "tier": "Standard",
    "instance": "B1ms",
    "reservationTerm": "OnDemand",
    "color": {
        "isometric": "#ececed",
        "2d": null
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/virtual-machines/",
    "locked": true
}

```

- **type: string**: The type of component. Must be a string of value `azurevm` for this component.
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **platform: string*: The platform for the virtual machine. Accepts one of two values, `windows` or `linux`. Defaults to `linux`.
- **tier: string**.: The service level tier for the virtual machine. Accepts one of three values, `Low Priority`, `Standard`, or `Basic`. Defaults to `Standard`.
- **instance: string**: The instance type for the virtual machine. [See Microsoft Learn for more information.][2]. Defaults to `A1 v2`.
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#ececed`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#4286c5`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes
