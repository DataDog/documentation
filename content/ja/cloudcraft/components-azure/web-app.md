---
title: "Web app Component"
---

## 概要

Web アプリコンポーネントを使用すると、Azure 環境の Web アプリケーションを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/web-app/component-web-app-diagram.png" alt="相互接続された Azure Web アプリコンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Platform**: Web アプリケーションのプラットフォームを選択します。サポートされているオプションは Windows と Linux です。
- **Tier**: Web アプリケーションのサービスレベル階層を選択します。
- **Instance**: Web アプリケーションのインスタンスタイプを選択します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Web アプリコンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
  "type": "azurewebapp",
  "id": "274993bf-646d-4046-a20a-063a243e22b7",
  "resourceId": "/subscriptions/4f02467b-945a-4d06-8789-66b52d1c92a3/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/docsite#componentType=azurewebapp",
  "region": "eastus",
  "mapPos": [0, 8],
  "platform": "Windows",
  "tier": "Basic",
  "instance": "B1",
  "color": {
      "isometric": "#ececed",
      "2d": null
  },
  "accentColor": {
      "isometric": "#4286c5",
      "2d": null
  },
  "link": "https://azure.microsoft.com/products/app-service/web/",
  "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurewebapp` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **platform: 文字列**: Web アプリケーションのプラットフォーム。`Windows` または `Linux` のどちらかを指定します。デフォルトは `Linux` です。
- **tier: 文字列**: Web アプリケーションのサービスレベル階層。[詳細は以下を参照してください](#accepted-values-for-tier)。デフォルトは `Basic` です。
- **instance: 文字列**: Web アプリケーションのインスタンスタイプ。[詳細は以下を参照してください](#accepted-values-for-instance)。デフォルトは `B1` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286c5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

## tier で許容される値

`tier` キーは以下の値を受け付けます。

```
Basic, Free, Isolated, "Isolated v2", "Premium v2", "Premium v3", Shared, Standard
```

## instance で許容される値

`instance` キーは以下の値を受け付けます。

```
B1, B2, B3, F1, I1, I2, I3, "I1 v2", "I2 v2", "I3 v2", "I4 v2", "I5 v2",
"I6 v2", "P1 v2", "P2 v2", "P3 v2", P0v3, "P1 v3", P1mv3, "P2 v3",
P2mv3, "P3 v3", P3mv3, P4mv3, P5mv3, D1, S1, S2, S3
```

## tier と instance の有効な組み合わせ

`tier` キーと `instance` キーは連携してアプリケーションに割り当てられるリソースを定義しますが、有効な値の組み合わせを提供する必要があります。

次の表は、どの組み合わせが有効かを示しています。

tier        | インスタンス
----------- | ---------
Basic       | B1, B2, B3
Free        | F1
Isolated    | I1, I2, I3
Isolated v2 | I1 v2, I2 v2, I3 v2, I4 v2, I5 v2, I6 v2
Premium v2  | P1 v2, P2 v2, P3 v2
Premium v3  | P0v3, P1 v3, P1mv3, P2 v3, P2mv3, P3 v3, P3mv3, P4mv3, P5mv3
Shared      | D1
標準的な方法    | S1, S2, S3

[1]: https://developers.cloudcraft.co/
