---
title: DynamoDB コンポーネント
---
## 概要

Amazon Web Services アーキテクチャ内の NoSQL のサーバーレスなマネージド データベースを表現・可視化するために DynamoDB コンポーネントを使用します。

{{< img src="cloudcraft/components-aws/dynamodb/component-dynamodb-diagram.png" alt="アイソメトリック Cloudcraft 図で 'DynamoDB' AWS コンポーネントを示すスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用してコンポーネントを構成します。利用可能なオプションは次のとおりです:

- **Color**: コンポーネント本体の塗りつぶし色と、シンボルのアクセント カラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、ビューごとに異なる色を選択することもできます。
- **Table class**: DynamoDB テーブルのクラスを選択します。
- **Capacity mode**: DynamoDB テーブルのキャパシティ モードを選択します。
- **Dataset (GiB)**: データセットのサイズを GiB で入力します。
- **Read units**: 読み取りキャパシティ ユニットの数を入力します。
- **Write units**: 書き込みキャパシティ ユニットの数を入力します。
- **Read consistency**: DynamoDB テーブルの読み取り整合性を選択します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は DynamoDB コンポーネントの JSON オブジェクト例です:

```json
{
    "type": "dynamodb",
    "id": "29c1f0fa-3f1c-4566-ad33-ae307feee4f0-0",
    "region": "us-east-1",
    "mapPos": [39,148],
    "tableClass": "standard",
    "capacityMode": "on-demand",
    "datasetGb": 0,
    "readUnits": 0,
    "writeUnits": 0,
    "readConsistency": "strong",
    "color": {
        "isometric": "#ececed",
        "2d": "#ececed"
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": "#4286c5"
    },
    "link": "https://aws.amazon.com/dynamodb/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。`dynamodb` である必要があります。
- **id: 文字列, uuid**: コンポーネントの一意の識別子。通常は UUID v4。
- **arn: 文字列**: コンポーネントの [Amazon リソース ネーム (ARN)][2]。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][3]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。`[x, y]` の座標ペアで定義します。
- **tableClass: 文字列**: DynamoDB テーブルのクラス。`standard` または `standardInfrequentAccess` を受け付けます。デフォルトは `standard`。
- **capacityMode: 文字列**: DynamoDB テーブルのキャパシティ モード。`provisioned` または `on-demand` を受け付けます。デフォルトは `provisioned`。
- **datasetGb: 数値**: データセットのサイズ (GiB)。デフォルトは `10`。
- **readUnits: 数値**: 読み取りキャパシティ ユニット数。デフォルトは `5`。
- **writeUnits: 数値**: 書き込みキャパシティ ユニット数。デフォルトは `5`。
- **readConsistency: 文字列**: DynamoDB テーブルの読み取り整合性。`strong` または `eventual` を受け付けます。デフォルトは `strong`。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数の色。デフォルトは `#ECECED` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューにおけるコンポーネント ロゴの 16 進カラー コード。デフォルトは `#4286C5`。
- **link: string, uri**: コンポーネントを別の図または外部 Web サイトにリンクするための URI。受け付ける形式: `blueprint://` または `https://`。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/