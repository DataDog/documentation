---
title: "Azure Queue Component"
---

## 概要

Azure Queue コンポーネントを使用すると、Azure 環境のキューストレージを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/azure-queue/component-azure-queue-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}


## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Kind**: ストレージアカウントの種類を選択します。
- **Redundancy**: プライマリおよびセカンダリのリージョンで、データのレプリケーションをどのように行うかを選択します。
- **Storage (GiB)**: キューで利用可能なデータの総量をギビバイト単位で入力します。
- **Class 1 Requests (10k)**: リクエスト 1 万件を 1 つの単位として、クラス 1 リクエストの数を入力します。
- **Class 2 Requests (10k)**: リクエスト 1 万件を 1 つの単位として、クラス 2 リクエストの数を入力します。
- **Replication (GiB)**: キューの geo レプリケーションのためのデータ転送の総量を入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Azure Queue コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azurequeue",
    "id": "6cc7f504-a5a5-4354-ad34-0d250b462ce2",
    "region": "westeurope",
    "mapPos": [0,6],
    "kind": "Storage",
    "redundancy": "LRS",
    "storageGb": 1,
    "requestUnitsC1": 0,
    "requestUnitsC2": 0,
    "replicationGb": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/en-us/products/storage/queues/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurequeue` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **kind: 文字列**: ストレージアカウントの種類。`Storage` と `StorageV2` の 2 つの値のいずれかを使用できます。デフォルトは `Storage` です。
- **redundancy: 文字列**: データをリージョン間でどのように複製するかを決める冗長性のオプション。`LRS`、 `ZRS`、`GRS`、`GZRS`、`RA-GRS`、`RA-GZRS` の 6 つの値のいずれかを使用できます。デフォルトは `LRS` です。
- **storageGb: 数値**: キューで利用可能なデータの総量 (ギビバイト単位)。デフォルトは `0` です。
- **requestUnitsC1: 数値**: Class 1 リクエストの数 (単位は 1 万)。デフォルトは `0` です。
- **requestUnitsC2: 数値**: Class 2 リクエストの数 (単位は 1 万)。デフォルトは `0` です。
- **replicationGb: 数値**: キューの geo レプリケーションのためのデータ転送の総量。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
