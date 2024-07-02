---
title: "AKS Cluster Component"
---

## 概要

AKS Cluster コンポーネントを使用すると、Azure 環境の Kubernetes クラスターを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/aks-cluster/component-aks-cluster-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Name**: AKS Cluster の名前を入力します。
- **Tier**: クラスターのサービス階層を選択します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、AKS Cluster コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azureakscluster",
    "id": "9f8c8ee5-7828-4efc-8b34-fd26e69d1118",
    "resourceId":"/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster",
    "region": "eastus",
    "mapPos": [1,2.25],
    "mapSize": [11,6],
    "nodes": [
        "3511ff78-f94e-4830-88d7-54ffe91ecc28",
        "f0b6c469-26a2-49bd-8707-626cb513ea50"
    ],
    "name": "AKS Cluster",
    "tier": "standard",
    "color": {
        "isometric": "#CEE0F5",
        "2d": "#CEE0F5"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "#0078D4"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azureakscluster` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **mapSize: 配列**: ブループリント内のコンポーネントのサイズ。API では、一意の幅と高さのペアを使用してサイズ設定を表現します。
- **nodes: 配列**: クラスター内で実行されているワークロード。[AKS Workload コンポーネント][2]の一意な識別子の配列を指定します。
- **name: 文字列**: クラスターの名前。デフォルトは `AKS Cluster` です。
- **tier: 文字列**: クラスターの階層。`free`、`standard`、`premium` の 3 つの値のいずれかを指定します。デフォルトは `standard` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/217-component-aks-workload
