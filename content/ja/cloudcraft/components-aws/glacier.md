---
title: Glacier Component
---
## 概要

Glacier コンポーネントを使用して、Amazon Web Services アーキテクチャの長期保存用ストレージクラスを可視化します。

{{< img src="cloudcraft/components-aws/glacier/component-glacier-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Storage (GB)**: ボールトで利用可能なストレージの総量をギガバイト単位で入力します。
- **Retrieval Type**: ボールトの取り出しタイプを選択します。
- **Retrieval Req. / mo (K)**: ひと月ごとの取り出しリクエスト数を千件単位で入力します。
- **Retrieval Data (GB)**: 取り出されたデータの量をギガバイト単位で入力します。
- **Upload  Req. / mo (K)**: ひと月ごとのアップロードリクエスト数を千件単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Glacier コンポーネントの JSON の例です。

```json
{
    "type": "glaciervault",
    "id": "a3dd25ed-5508-43f3-9041-8bd480906514",
    "region": "us-east-1",
    "mapPos": [4,6],
    "storageDataGb": 10,
    "retrievalType": "standard",
    "retrievalDataGb": 0,
    "retrievalRequests": 0,
    "uploadRequests": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3F8624"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/glacier/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `glaciervault` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][6]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **storageDataGb: 数値**: Glacier ボールトで利用可能なストレージの総量 (ギガバイト単位)。デフォルトは `10` です。
- **retrievalType: 文字列**: Glacier ボールトの取り出しタイプ。`expedited`、`standard`、`bulk` の 3 つのオプションのいずれかを指定します。デフォルトは `standard` です。
- **retrievalDataGb: 数値**: 取り出されたデータの量 (ギガバイト単位)。デフォルトは `0` です。
- **retrievalRequests: 数値**: ひと月ごとの取り出しリクエスト数 (千件単位)。デフォルトは `0` です。
- **uploadRequests: 数値**: ひと月ごとのアップロードリクエスト数 (千件単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#3F8624` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/