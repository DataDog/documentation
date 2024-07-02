---
title: "RDS Component"
---
## 概要

RDS コンポーネントを使用して、Amazon Web Services アーキテクチャのリレーショナルデータベースを表現します。

{{< img src="cloudcraft/components-aws/rds/component-rds-diagram.png" alt="'RDS' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー
ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Role**: RDS インスタンスのロール。
- **Engine**: RDS インスタンスで使用するデータベースエンジンを選択します。
- **Min capacity unit**: Aurora 容量単位の最小量。サーバーレスのロールでのみ使用できます。
- **Max capacity unit**: Aurora 容量単位の最大量。サーバーレスのロールでのみ使用できます。
- **Instance type**: インスタンスのタイプ。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **Size**: インスタンスのサイズ。インスタンスのタイプと同様、ツールバーに表示されるハードウェアの詳細がサイズを反映して変更されます。
- **Deployment option**: インスタンスのデプロイメントのタイプ。Single-AZ  または Multi-AZ Standby から指定します。
- **Billing option**: インスタンスで使用される価格モデル。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、RDS コンポーネントの JSON の例です。

```json
{
  "type": "rds",
  "id": "f184b0b6-c732-4881-841c-68477f7eb365",
  "region": "us-east-1",
  "mapPos": [-3,3],
  "role": "primary",
  "engine": "mariadb",
  "instanceType": "r6g",
  "instanceSize": "large",
  "multiAZ": false,
  "minimumCapacityUnit": 2,
  "maximumCapacityUnit": 2,
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 12,
    "purchaseOption": "No Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/rds/",
  "locked": true
}
```

- **type: rds**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: RDS インスタンスがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **role: 文字列**: RDS インスタンスで使用されるロール。`primary`、`standby`、`readReplica`、および `serverless` を指定できます。
- **engine: 文字列**: RDS インスタンスで使用されるデータベースエンジン。詳しくは [`engine` で許容される値](#accepted-values-for-engine)を参照してください。
- **instanceType: 文字列**: インスタンスのタイプ。詳しくは [`instanceType` で許容される値](#accepted-values-for-instancetype)を参照してください。
- **instanceSize: 文字列**: インスタンスのサイズ。詳しくは [`instanceSize` で許容される値](#accepted-values-for-instancesize)を参照してください。
- **multiAZ: ブール値**: `true` の場合、データベースは複数の AWS 可用性ゾーンにデプロイされます。`role` が `serverless` に設定されている場合は使用できません。
- **minimumCapacityUnit: 数値**: Aurora 容量単位の最小量。`role` が `serverless` に設定されている場合のみ適用されます。
- **maximumCapacityUnit: 数値**: Aurora 容量単位の最大量。`role` が `serverless` に設定されている場合のみ適用されます。
- **billingOptions: オブジェクト**: インスタンスで使用される価格モデル。詳しくは [`billingOptions` で許容される値](#accepted-values-for-billingoptions) を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

RDS コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

## `engine` で許容される値

`engine` キーは以下の値を受け付けます。

```
none、aurora-mysql、aurora-postgresql、mysql、mariadb、postgresql、oracle、sqlserver-ex、sqlserver-web、sqlserver-se、sqlserver-ee
```

**注**: `role` が `serverless` に設定されている場合、`engine` キーは `none`、`aurora-mysql`、`aurora-postgresql` のみを受け付けます。

## `instanceType` で許容される値

`instanceType` キーは以下の値を受け付けます。

```
m1、m2、m3、m4、m6g、r5、r5b、r6g、t1、t2、t3、x1、x1e、z1d
```

## `instanceSize` で許容される値

`instanceSize` キーは以下の値を受け付けます。

```
micro、small、medium、large、xlarge、2xlarge、4xlarge、8xlarge、12xlarge、16xlarge、24xlarge、32xlarge
```

## `billingOptions` で許容される値

`billingOptions` キーは、Cloudcraft Web アプリケーションによって現在認められているすべての請求オプションを受け付けます。

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
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
