---
title: Database for PostgreSQL コンポーネント
---

## Overview

Database for PostgreSQL コンポーネントを使用すると、Azure 環境の PostgreSQL データベースを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/database-for-postgresql/component-database-for-postgresql-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Deployment option**: Select the type of deployment for your database.
- **Tier**: Select the performance tier of your database.
- **Instance**: Select the instance type of your database. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **High availability**: Select a high availability option for your database. Only available for when **Deployment option** is set to **Flexible server**.
- **Storage (GiB)**: Enter the total volume of storage available for your database in gibibytes.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Database for PostgreSQL コンポーネントの JSON オブジェクトの例です。

### Schema

```json
{
    "type": "azurepostgresql",
    "id": "db7da7f6-9d1a-46df-808c-6979e02d5182",
    "region": "northcentralus",
    "mapPos": [5,0],
    "deploymentOption": "Single",
    "tier": "GeneralPurpose",
    "instance": "GP_Gen5_2",
    "storageMB": 20480,
    "haEnabled": false,
    "backupRetention": 7,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/postgresql",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurepostgresql` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **deploymentOption: string**: The type of deployment for the database. Defaults to `Single`.
- **tier: string**: The database performance tier. Defaults to `GeneralPurpose`.
- **instance: string**: The instance type for the database. Defaults to `GP_Gen5_2`.
- **storageMB: string**: The total volume of storage available for the database in megabytes. Defaults to `20480`.
- **haEnabled: boolean**: Whether high availability is enabled. Defaults to `false.`
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/