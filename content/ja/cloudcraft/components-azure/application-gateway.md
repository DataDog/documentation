---
title: Application Gateway コンポーネント
---

## 概要

Application Gateway コンポーネントを使用すると、Azure 環境のアプリケーションゲートウェイを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/application-gateway/component-application-gateway-diagram.png" alt="Azure Application Gateway コンポーネントに相互接続された Web アプリコンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: アプリケーションゲートウェイのサービスレベル階層を選択します。
- **Size**: アプリケーションゲートウェイのサイズを選択します。このオプションは、Standard および WAF 階層でのみ使用できます。
- **Instances**: 高可用性シナリオのインスタンス数を入力します。このオプションは、Standard および WAF 階層でのみ使用できます。
- **Compute units**: アプリケーションゲートウェイが消費するコンピュート容量の指標を入力します。このオプションは、Standard V2 および WAF V2 階層でのみ使用できます。
- **Persistent connections**: アプリケーションゲートウェイにおける持続的接続数を入力します。このオプションは、Standard V2 および WAF V2 階層でのみ使用できます。
- **Throughput (Mbps)**: アプリケーションゲートウェイのスループットをメガビット/秒単位で入力します。このオプションは、Standard V2 および WAF V2 階層でのみ使用できます。
- **Data processed (GB)**: アプリケーションゲートウェイがひと月に処理するデータの総量をギガバイト単位で入力します。
- **Outbound data processed (GB)**: アプリケーションゲートウェイがひと月に処理するアウトバウンドデータの総量をギガバイト単位で入力します。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Application Gateway コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azureappgw",
    "id": "900c9832-31d6-460a-9065-762fe63ec83c",
    "resourceId": "/subscriptions/c74c5de5-0170-405b-954a-e6491cf0c838/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/applicationGateways/DocTeamGateway",
    "region": "eastus",
    "mapPos": [1, 8],
    "tier": "Standard",
    "size": "Small",
    "instances": 2,
    "computeUnits": 0,
    "persistentConnections": 0,
    "throughput": 0,
    "dataProcessed": 0,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/application-gateway",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azureappgw` の文字列でなければなりません。
- **id: string, uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: 文字列**: アプリケーションゲートウェイのサービスレベル階層。`Standard`、`Standard V2`、`WAF`、`WAF V2` の 4 つの値のいずれかを指定します。デフォルトは `Standard V2` です。
- **size: 文字列**: アプリケーションゲートウェイのサイズ。`Small`、`Medium`、`Large` の 3 つの値のいずれかを指定します。デフォルトは `Medium` です。
- **instances: 数値**: アプリケーションゲートウェイのインスタンス数。デフォルトは `2` です。
- **computeUnits: 数値**: アプリケーションゲートウェイが消費するコンピュート容量の指標。デフォルトは `0` です。
- **persistentConnections: 数値**: アプリケーションゲートウェイにおける持続的接続数。デフォルトは `0` です。
- **throughput: 数値**: アプリケーションゲートウェイのスループット (メガビット/秒単位)。デフォルトは `0` です。
- **dataProcessed: 数値**: アプリケーションゲートウェイが処理する月間データ量の合計 (ギガバイト単位)。デフォルトは `0` です。
- **outboundDataTransfer: 数値**: アプリケーションゲートウェイが処理する月間アウトバウンドデータ量の合計 (ギガバイト単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/