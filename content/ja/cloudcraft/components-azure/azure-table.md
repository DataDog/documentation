---
title: Azure Table コンポーネント
---

## 概要

Azure Table コンポーネントを使用すると、Azure 環境の NoSQL key-value ストアを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/azure-table/component-azure-table-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Redundancy**: プライマリおよびセカンダリのリージョンで、データのレプリケーションをどのように行うかを選択します。
- **Storage (GiB)**: key-value ストアで利用可能なデータの総量を入力します。
- **Class 2 Requests (10k)**: リクエスト数を 1 万単位で入力します。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Azure Table コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azuretable",
    "id": "e3b7f697-3ae6-4d3b-bd7f-bac3e0cc05ae",
    "region": "northcentralus",
    "mapPos": [1,7.75],
    "redundancy": "LRS",
    "storageGb": 10,
    "requestUnits": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/tables/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azuretable` の文字列でなければなりません。
- **id: string, uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **redundancy: 文字列**: データをリージョン間でどのように複製するかを決める冗長性のオプション。`LRS`、 `ZRS`、`GRS`、`GZRS`、`RA-GRS`、`RA-GRS` の 6 つの値のいずれかを使用できます。デフォルトは `LRS` です。
- **storageGb: 数値**: key-value ストアで利用可能なデータの総量 (ギビバイト単位)。デフォルトは `0` です。
- **requestUnits: 数値**: リクエストの数 (単位は 1 万)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/