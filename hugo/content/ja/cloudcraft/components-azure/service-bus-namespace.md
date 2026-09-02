---
title: Service Bus Namespace コンポーネント
---

## 概要

Service Bus Namespace コンポーネントを使用して、Azure 環境からのクラウドメッセージングをサービスインテグレーションとして表現し視覚化できます。

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-diagram.png" alt="相互接続された Azure コンポーネントを示す等角 Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Name**: ネームスペースの名前を入力します。
- **Tier**: Service Bus Namespace のサービスティアを選択します。
- **Messaging units**: ネームスペースで利用可能なメッセージングユニットの数を選択します。**Premium** ティアでのみ利用可能です。

## API

[Cloudcraft API][1] を使用して、アーキテクチャダイアグラムにプログラム的にアクセスし、JSON オブジェクトとしてレンダリングできます。以下は Service Bus Namespace コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azuresbnamespace",
    "id": "5a5b710a-2a36-421b-9ac9-f94f545f8c46",
    "region": "northcentralus",
    "mapPos": [3,-1],
    "mapSize": [5,5],
    "nodes": [
        "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
        "7f836b25-2a69-4be4-8b35-c0f67480eafd",
        "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
        "afb6e41c-32c6-4e6f-b11d-6606957e4588"
    ],
    "name": "Namespace",
    "tier": "Basic",
    "messagingUnits": 1,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/service-bus",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントでは値は文字列 `azuresbnamespace` である必要があります。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **mapSize: 配列**: ブループリント内でのコンポーネントのサイズ。API は一意の X および Y 座標のペアを使用してサイズを表現します。
- **nodes: 配列**: ネームスペース内で実行されているサービス。[Service Bus Queue][2] と [Service Bus Topic][3] コンポーネントの一意の識別子の配列を受け付けます。
- **name: 文字列**: ネームスペースの名前。デフォルトは `Namespace` です。
- **tier: 文字列**: ネームスペースのサービスティア。`Basic`、`Standard`、`Premium` のいずれかの値を受け付けます。デフォルトは `Basic` です。
- **messagingUnits: 数値**: ネームスペースで利用可能なメッセージングユニットの数。`1` から `16` の数字を受け付けます。デフォルトは `1` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/189-component-service-bus-queue
[3]: https://help.cloudcraft.co/article/190-component-service-bus-topic