---
title: Database for MySQL コンポーネント
---

## Overview

Database for MySQL コンポーネントを使用すると、Azure 環境の MySQL データベースを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/database-for-mysql/component-database-for-mysql-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Deployment option**: データベースのデプロイのタイプを選択します。
- **Tier**: データベースのパフォーマンス階層を選択します。
- **Instance**: データベースのインスタンスタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **High availability**: データベースの高可用性オプションを選択します。**Deployment option** が **Flexible server** に設定されている場合のみ利用可能です。
- **Storage (GiB)**: データベースで利用可能なストレージの総量をジビバイト単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Database for MySQL コンポーネントの JSON オブジェクトの例です。

### Schema

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azuremysql` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **deploymentOption: 文字列**: データベースのデプロイのタイプ。デフォルトは `Single` です。
- **tier: 文字列**: データベースのパフォーマンス階層。デフォルトは `GeneralPurpose` です。
- **instance: 文字列**: データベースのインスタンスタイプ。デフォルトは `GP_Gen5_2` です。
- **storageMB: 文字列**: データベースで利用可能なストレージの総容量 (メガバイト単位)。デフォルトは `20480` です。
- **haEnabled: ブール値**: 高可用性が有効かどうか。デフォルトは `false.` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/