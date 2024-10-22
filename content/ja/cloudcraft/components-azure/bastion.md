---
title: Bastion コンポーネント
---

## 概要

Azure 環境からの Bastion サーバーを表現し視覚化するために、Bastion コンポーネントを使用できます。

{{< img src="cloudcraft/components-azure/bastion/component-bastion-diagram.png" alt="相互接続された Azure コンポーネントを示す等角 Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Bastion サーバーのサービスレベルティアを選択します。
- **Scale units**: Bastion サーバーのスケールユニットの数を入力します。このオプションは Standard ティアでのみ利用可能です。
- **Outbound data transfer (GB)**: Bastion サーバーによって転送されるアウトバウンドデータの総量をギガバイトで入力します。

## API

[Cloudcraft API][1] を使用して、アーキテクチャダイアグラムにプログラム的にアクセスし、JSON オブジェクトとしてレンダリングできます。以下は Bastion コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azurebastion",
    "id": "efe6a642-dc6d-4ea3-ab3c-465358f10e15",
    "resourceId": "/subscriptions/14cc8259-0159-45d7-801b-2b209bac6e98/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/bastionHosts/BastionDoc",
    "region": "eastus",
    "mapPos": [2,10],
    "tier": "Basic",
    "scaleUnits": 1,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/azure-bastion/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントでは値は文字列 `azurebastion` である必要があります。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: 文字列**: Bastion サーバーのサービスレベルティア。`Basic` または `Standard` のいずれかの値を受け付けます。デフォルトは `Standard` です。
- **scaleUnits: 数値**: Bastion サーバーのスケールユニットの数。
- **outboundDataTransfer: 数値**: Bastion サーバーによって転送されるアウトバウンドデータの総量 (ギガバイト単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078d4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通じたコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/