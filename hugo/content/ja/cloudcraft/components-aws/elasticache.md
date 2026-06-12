---
title: ElastiCache コンポーネント
---
## 概要

ElastiCache コンポーネントを使用して、Amazon Web Services アーキテクチャのインメモリキャッシュまたはデータストアを表現します。

{{< img src="cloudcraft/components-aws/elasticache/component-elasticache-diagram.png" alt="'ElastiCache' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Colors**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Engine**: ElastiCache インスタンスの動力源として使用するエンジンを選択します。
- **Instance type**: インスタンスのタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **Size**: ElastiCache インスタンスのサイズを選択します。インスタンスのタイプと同様、ツールバーに表示されるハードウェアの詳細がサイズを反映して変更されます。
- **Billing option**: インスタンスで使用される価格モデル。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、ElastiCache コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "elasticache",
  "id": "a1cebccc-d9ed-481f-b5e6-1088818ab2c6",
  "region": "us-east-1",
  "mapPos": [-1,12],
  "engine": "memcached",
  "instanceType": "m4",
  "instanceSize": "large",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  },
  "color": {
    "isometric": "#d82f27",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticache/",
  "locked": true
}
```

- **type: elasticache**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: RDS インスタンスがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **engine: 文字列**: ElastiCache インスタンスで使用されるデータベースエンジン。指定できる値は `redis` および `memcached` です。
- **instanceType: 文字列**: インスタンスのタイプ。詳しくは [`instanceType` で許容される値](#accepted-values-for-instancetype)を参照してください。
- **instanceSize: 文字列**: インスタンスのサイズ。詳しくは [`instanceSize` で許容される値](#accepted-values-for-instancesize)を参照してください。
- **billingOptions: オブジェクト**: インスタンスで使用される価格モデル。詳しくは [`instanceSize` で許容される値](#accepted-values-for-billingoptions) を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: true の場合、アプリケーション通じたコンポーネントへの変更は、ロックが解除されるまで無効になります。

ElastiCache コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

## `instanceType` で許容される値

`instanceType` キーは以下の値を受け付けます。

```
c1、m1、m2、m3、m4、m5、m6g、r3、r4、r5、r6g、t1、t2、t3
```

## `instanceSize` で許容される値

`instanceSize` キーは以下の値を受け付けます。

```
micro、small、medium、large、xlarge、2xlarge、4xlarge、8xlarge、10xlarge、12xlarge、16xlarge、24xlarge、32xlarge
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
    "purchaseOption": "Heavy Utilization"
  }
}
```

- **type: ri**: リザーブドインスタンスの請求オプションの値は常に `ri` です。
- **leaseContractLength: 数値**: インスタンスが予約されている期間の長さ。許容される値は `12` または `36` です。
- **purchaseOption: 文字列**: インスタンスの購入オプション。許容される値は `Heavy Utilization`、`No Upfront`、`Partial Upfront`、および `All Upfront` です。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/subnet/