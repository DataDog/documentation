---
kind: ドキュメント
title: Elasticsearch コンポーネント
---
## 概要

Elasticsearch コンポーネントを使用して、Amazon Web Services アーキテクチャの Elasticsearch クラスターを表現します。

{{< img src="cloudcraft/components-aws/elasticsearch/component-elasticsearch-diagram.png" alt="'Elasticsearch' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Role**: Elasticsearch インスタンスのロールを選択します。
- **Instance count**: Elasticsearch クラスターのインスタンス数を入力します。
- **Instance type**: インスタンスのタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **Size**: インスタンスのサイズを選択します。インスタンスのタイプと同様、ツールバーに表示されるハードウェアの詳細がサイズを反映して変更されます。
- **Billing option**: インスタンスで使用される価格モデル。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Elasticsearch コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "es",
  "id": "5f8df311-0641-410e-b427-89b7dc5e5b84",
  "region": "us-west-2",
  "mapPos": [0,10],
  "role": "data",
  "instanceCount": 2,
  "instanceType": "t3",
  "instanceSize": "medium",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticsearch-service/",
  "locked": true
}
```

- **type: es**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: この Elasticsearch インスタンスがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **role: string**: Elasticsearch インスタンスで使用されるロール。指定できる値は `data` および `master` です。
- **instanceCount: 数値**: Elasticsearch クラスター内のインスタンス数。デフォルトは `1` です。
- **instanceType: 文字列**: インスタンスのタイプ。詳しくは [`instanceType` で許容される値](#accepted-values-for-instancetype)を参照してください。
- **instanceSize: 文字列**: インスタンスのサイズ。詳しくは [`instanceSize` で許容される値](#accepted-values-for-instancesize)を参照してください。
- **billingOptions: オブジェクト**: インスタンスで使用される価格モデル。詳しくは [`billingOptions` で許容される値](#accepted-values-for-billingoptions) を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

Elasticsearch コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

## `instanceType` で許容される値

`instanceType` キーは以下の値を受け付けます。

```
c4、c5、i2、i3、m3、m4、m5、r3、r4、r5、t2、t3、ultrawarm1
```

## `instanceSize` で許容される値

`instanceSize` キーは以下の値を受け付けます。

```
micro、small、medium、large、xlarge、2xlarge、4xlarge、8xlarge、9xlarge、10xlarge、12xlarge、16xlarge、18xlarge、24xlarge、32xlarge
```

## `billingOptions` で許容される値

`billingOptions` キーは、Cloudcraft Web アプリケーションによって認められているすべての請求オプションをサポートしています。

- オンデマンド
- リザーブドインスタンス

各オプションは、`billingOptions` オブジェクト内では異なる形で表現されています。

### オンデマンド

```json
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od**: オンデマンドの請求オプションの値は常に `od` です。
- **utilization: 数値**: 指定された月にインスタンスがどれくらい使用されたかを表す浮動小数点数。

### リザーブドインスタンス

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  }
}
```

- **type: ri**: リザーブドインスタンスの請求オプションの値は常に `ri` です。
- **leaseContractLength: 数値**: インスタンスが予約されている期間の長さ。許容される値は `12` または `36` です。
- **purchaseOption: 文字列**: インスタンスの購入オプション。許容される値は `No Upfront`、`Partial Upfront`、および `All Upfront` です。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/subnet/