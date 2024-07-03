---
title: Database for MySQL Component
---

## 概要

You can use the Database for MySQL component to represent and visualize MySQL databases from your Azure environment.

{{< img src="cloudcraft/components-azure/database-for-mysql/component-database-for-mysql-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Deployment option**: Select the type of deployment for your database.
- **Tier**: Select the performance tier of your database.
- **Instance**: Select the instance type of your database. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **High availability**: Select a high availability option for your database. Only available for when **Deployment option** is set to **Flexible server**.
- **Storage (GiB)**: Enter the total volume of storage available for your database in gibibytes.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Database for MySQL component:

### スキーマ

```json
{
    "type": "azuremysql",
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
    "link": "https://azure.microsoft.com/products/mysql",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azuremysql` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **deploymentOption: string**: The type of deployment for the database. Defaults to `Single`.
- **tier: string**: The database performance tier. Defaults to `GeneralPurpose`.
- **instance: string**: The instance type for the database. Defaults to `GP_Gen5_2`.
- **storageMB: string**: The total volume of storage available for the database in megabytes. Defaults to `20480`.
- **haEnabled: boolean**: Whether high availability is enabled. Defaults to `false.`
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/