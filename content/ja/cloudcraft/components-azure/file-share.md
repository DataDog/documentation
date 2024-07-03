---
title: File share Component
---

## 概要

You can use the File Share component to represent and visualize file storage services from your Azure environment.

{{< img src="cloudcraft/components-azure/file-share/component-file-share-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Select the storage tier for your file storage service.
- **Redundancy**: プライマリおよびセカンダリのリージョンで、データのレプリケーションをどのように行うかを選択します。
- **Data at-rest (GB)**: Enter the provisioned size of the file service.
- **Snapshots (GB)**: Enter the total volume of data available for snapshots.
- **Metadata at-rest (GB)**: Enter the total volume of data used for file system metadata.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a File share component:

### スキーマ

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

- **type: string**: The type of component. Must be a string of value `azurefiles` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: string**: The storage tier for the storage service. Accepts one of four values, `Premium`, `Hot`, `Cool`, and `Standard`. Defaults to `Standard`.
- **redundancy: string**: The redundancy option for how data is replicated across regions. Accepts one of four values, `LRS`, `ZRS`, `GRS`, and `GZRS`. Defaults to `LRS`.
- **dataGb: number**: The provisioned size of the file service in gigabytes. Defaults to `0`.
- **snapshotGb: number**: The total volume of data available for snapshots in gigabytes. Defaults to `0`.
- **metadataGb: number**: The total volume of data used for file system metadata in gigabytes. Defaults to `0`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/