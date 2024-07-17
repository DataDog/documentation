---
title: File Share コンポーネント
---

## Overview

File Share コンポーネントを使用すると、Azure 環境のファイルストレージサービスを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/file-share/component-file-share-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select accent and fill colors for the body of the component in 3D view.
- **Tier**: ファイルストレージサービスのストレージ階層を選択します。
- **Redundancy**: Select how your data is replicated in the primary and secondary regions.
- **Data at-rest (GB)**: ファイルサービスのプロビジョニングされたサイズを入力します。
- **Snapshots (GB)**: スナップショットで利用可能なデータの総量を入力します。
- **Metadata at-rest (GB)**: ファイルシステムのメタデータに使用されるデータの総量を入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、File Share コンポーネントの JSON オブジェクトの例です。

### Schema

```json
{
    "type": "azurefiles",
    "id": "70cc1d82-30e1-4c62-bd29-634f72cd21cf",
    "region": "eastus",
    "mapPos": [2,6],
    "tier": "Standard",
    "redundancy": "LRS",
    "dataGb": 0,
    "snapshotsGb": 0,
    "metadataGb": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/files/",
    "locked": true
}

```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurefiles` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **resourceId: string**: The globally unique identifier for the component within Azure.
- **region: string**: The Azure region for the component. The API supports all global regions, except China.
- **mapPos: array**: The position of the component in the blueprint. The API uses a unique X and Y coordinate pair to express positioning.
- **tier: 文字列**: ストレージサービスのストレージ階層。`Premium`、`Hot`、`Cool`、`Standard` の 4 つの値のいずれかを指定します。デフォルトは `Standard` です。
- **redundancy: 文字列**: データをリージョン間でどのように複製するかを決める冗長性のオプション。`LRS`、 `ZRS`、`GRS`、`GZRS` の 4 つの値のいずれかを指定します。デフォルトは `LRS` です。
- **dataGb: 数値**: ファイルサービスのプロビジョニングされたサイズ (ギガバイト単位)。デフォルトは `0` です。
- **snapshotGb: 数値**: スナップショットで利用可能なデータの総量 (ギガバイト単位)。デフォルトは `0` です。
- **metadataGb: 数値**: ファイルシステムのメタデータに使用されるデータの総量 (ギガバイト単位)。デフォルトは `0` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in 3D view. Defaults to `#CEE0F5`.
  - **2d: string**: A hexadecimal color for the component body in 2D view. Defaults to `null`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in 3D view. Defaults to `#0078D4`.
  - **2d: string**: A hexadecimal color for the component logo in 2D view. Defaults to `null`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of two formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/