---
title: "Service bus queue Component"
---

## 概要

Service Bus キューコンポーネントを使用すると、Azure 環境のクラウドメッセージングをサービスインテグレーションとして表現して視覚化できます。

{{< img src="cloudcraft/components-azure/service-bus-queue/component-service-bus-queue-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Service Bus キューのサービス階層を選択します。
- **Operations (M/month)**: 1 か月ごとのオペレーション数を百万単位で入力します。Premium のサービス階層では利用できません。
- **Brokered connections**: キューで仲介された接続数を入力します。Standard のサービス階層でのみ利用できます。
- **Hybrid connections**: キューのハイブリッド接続数を入力します。Standard のサービス階層でのみ利用できます。
- **Data transfer (GB)**: 1 か月間で転送されたデータの総量をギガバイト単位で入力します。Standard のサービス階層でのみ利用できます。
- **Relay hours**: キューの中継時間数を入力します。Standard のサービス階層でのみ利用できます。
- **Relay messages (K/mo)**: 1 か月間で中継されたメッセージ数を千件単位で入力します。Standard のサービス階層でのみ利用できます。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Service Bus キューコンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azuresbqueue",
    "id": "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
    "region": "northcentralus",
    "mapPos": [4,2],
    "tier": "Standard",
    "operationsPerMonth": 0,
    "brokeredConnections": 0,
    "hybridConnections": 0,
    "dataTransferGb": 0,
    "relayHours": 0,
    "relayMessages": 0,
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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azuresbqueue` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: 文字列**: キューのサービス階層。`Basic`、`Standard`、`Premium` の 3 つの値のいずれかを指定します。デフォルトは `Standard` です。
- **operationsPerMonth: 数値**: ひと月ごとのオペレーション数 (単位は百万)。デフォルトは `0` です。
- **brokeredConnections: 数値**: キューで仲介された接続数。デフォルトは `0` です。
- **hybridConnections: 数値**: キューのハイブリッド接続数。デフォルトは `0` です。
- **dataTransferGb: 数値**: 1 か月間で転送されたデータの総量 (ギガバイト単位)。デフォルトは `0` です。
- **relayHours: 数値**: キューで中継された時間数。デフォルトは `0` です。
- **relayMessages: 数値**: 1 か月間で中継されたメッセージ数 (千件単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
