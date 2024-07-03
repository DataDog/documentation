---
title: AKS Workload Component
---

## 概要

AKS Workload コンポーネントを使用すると、Azure 環境の Kubernetes ワークロードを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/aks-workload/component-aks-workload-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Name**: AKS Workload の名前を入力します。
- **Type**: クラスター内のワークロードのタイプを選択します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、AKS Workload コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azureaksworkload",
    "id": "2d432a67-4b2b-4040-8e4b-19c513bc2491",
    "resourceId": "/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/workloads/default/deployment/doc-agent",
    "region": "eastus",
    "mapPos": [2,3.25],
    "mapSize": [4,4],
    "nodes": [
        "375083c7-8212-4af6-859b-15fdc9da777d",
        "42062b69-bb14-4e05-87db-fa10cb408d5a",
        "26440a62-c06e-48f0-8c03-c5a3a2004050",
        "28efba36-1f3f-48ef-a1df-0d5473bcbf6e"
    ],
    "name": "AKS Workload",
    "workloadType": "deployment",
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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azureaksworkload` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **mapSize: 配列**: ブループリント内のコンポーネントのサイズ。API では、一意の幅と高さのペアを使用してサイズ設定を表現します。
- **nodes: 配列**: クラスター内のアプリケーションコンテナ。[AKS Pod コンポーネント][2]の一意な識別子の配列を指定します。
- **name: 文字列**: ワークロードの名前。デフォルトは `AKS Workload` です。
- **workloadType: 文字列**: クラスター内のワークロードのタイプ。[詳細は以下を参照してください](#accepted-values-for-workloadType)。デフォルトは `deployment` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

## `workloadType` で許容される値

`workloadType` キーは以下の文字列値のいずれかを受け付けます。

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/218-component-aks-pod