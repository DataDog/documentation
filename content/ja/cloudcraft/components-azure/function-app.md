---
title: "Function App Component"
---

## 概要

Function アプリコンポーネントを使用すると、Azure 環境の Azure 関数のグループを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/function-app/component-function-app-diagram.png" alt="相互接続された Azure 関数を示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Tier**: Function アプリのホスティングプランを選択します。
- **vCPU**: 関数が使用するコンピュートユニットの平均数を入力します。
- **Memory (GB)**: 関数が使用するメモリの平均量をギガバイト単位で入力します。
- **Duration (ms)**: 平均関数持続時間をミリ秒単位で入力します。
- **Executions (MM/m)**: 1 か月あたりの関数呼び出し回数を百万回単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Function アプリコンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
  "type": "azurefunctionapp",
  "id": "939f0381-96aa-4e44-bc04-7993a121384e",
  "resourceId": "/subscriptions/76f00a52-98a8-4e61-892c-bb327ded2352/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/doc-functions",
  "region": "eastus",
  "mapPos": [1, 8],
  "tier": "consumption",
  "vcpu": 1,
  "memoryGB": 0.5,
  "durationMS": 1000,
  "executionsMM": 3,
  "color": {
    "isometric": "#ececed",
    "2d": null
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": null
  },
  "link": "https://azure.microsoft.com/en-us/products/functions/",
  "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurefunctionapp` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **tier: 文字列**: アプリのホスティングプラン。`consumption` または `premium`のどちらかを指定します。デフォルトは `consumption` です。
- **vcpu: 数値**: 関数が使用するコンピュートユニットの平均数。デフォルトは `1` です。
- **memoryGB: 数値**: 関数が使用するメモリの平均量 (ギガバイト単位)。デフォルトは `0.5` です。
- **durationMS: 数値**: 関数の平均継続時間 (ミリ秒)。デフォルトは `1000` です。
- **executionsMM: 数値**: 1 か月あたりの呼び出し回数 (百万回単位)。デフォルトは `3` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#1490df` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
