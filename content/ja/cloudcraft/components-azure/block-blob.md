---
title: "Block Blob Component"
---

## 概要

ブロック Blob コンポーネントを使用すると、Azure 環境のブロック BLOB を表現して視覚化できます。

{{< img src="cloudcraft/components-azure/block-blob/component-block-blob-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: BLOB のストレージ階層を選択します。
- **Redundancy**: プライマリおよびセカンダリのリージョンで、データのレプリケーションをどのように行うかを選択します。
- **Storage (GiB)**: BLOB で利用可能なデータの総量をギビバイト単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、ブロック Blob コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azureblob",
    "id": "c198aeb5-b774-496d-9802-75e6d2407ab1",
    "region": "eastus",
    "mapPos": [0,7],
    "tier": "Standard",
    "redundancy": "LRS",
    "storageGb": 1,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/blobs/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントには `azureblob` という文字列を指定する必要があります。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: 文字列**: BLOB のストレージレベル階層。`Premium`、`Hot`、`Cool`、`Standard` の 4 つの値のいずれかを指定します。デフォルトは `Standard` です。
- **redundancy: 文字列**: データをリージョン間でどのように複製するかを決める冗長性のオプション。`LRS`、 `ZRS`、`GRS`、`RA-GRS` の 4 つの値のいずれかを指定します。デフォルトは `LRS` です。
- **storageGb: 数値**: BLOB で利用可能なデータの総量 (ギビバイト単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
