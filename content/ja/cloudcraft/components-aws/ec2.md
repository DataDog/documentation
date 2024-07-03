---
title: EC2 Component
---
## 概要

EC2 コンポーネントを使用して、Amazon Web Services アーキテクチャのエラスティックコンピュートインスタンスを表現します。

{{< img src="cloudcraft/components-aws/ec2/component-ec2-diagram.png" alt="EC2 AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントカラーの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Transparency**: EC2 ブロックが塗りつぶしか半透明かを選択します。
- **Platform**: エラスティックコンピュートインスタンスで使用されるプラットフォームを選択します。ライセンス料のかかるプラットフォームを選択すると、そのコスト見積りが手数料に含まれます。
- **Instance type**: インスタンスのタイプ。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **Size**: インスタンスのサイズ。インスタンスのタイプと同様、ツールバーに表示されるハードウェアの詳細がサイズを反映して変更されます。
- **Billing option**: ライセンスで使用される価格モデル。現在サポートされているオプションは、オンデマンド、リザーブドインスタンス、スポットインスタンスです。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、EC2 ブロックの JSON の例です。

```json
{
  "type": "ec2",
  "id": "d2ee1b7c-4368-4384-81dc-19c9c7866623",
  "region": "us-west-1",
  "mapPos": [3, 9],
  "transparent": false,
  "platform": "linux",
  "instanceType": "t3a",
  "instanceSize": "xlarge",
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  },
  "color": {
    "isometric": "#e6e7e8",
    "2d": "#e6e7e8"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ec2**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: この EC2 インスタンスがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **transparent: ブール値**: `true` の場合、コンポーネントは 3D ビューで半透明になります。2D ビューでは効果はありません。
- **platform: 文字列**: インスタンスで使用されるプラットフォーム。詳しくは、[プラットフォームで許容される値](#accepted-values-for-the-platform)を参照してください。
- **instanceType: 文字列**: インスタンスのタイプ。詳しくは [instanceType で許容される値](#accepted-values-for-instancetype)を参照してください。
- **instanceSize: 文字列**: インスタンスで使用されるサイズ。詳しくは [instanceSize で許容される値](#accepted-values-for-instancesize)を参照してください。
- **billingOptions: オブジェクト**: AWS でインスタンスで使用される価格モデル。詳しくは [billingOptions で許容される値](#accepted-values-for-billingoptions) を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上にコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

EC2 コンポーネントは [VPC][2]、[セキュリティグループ][3]、[オートスケーリンググループ][4]、[サブネット][5]に追加することができます。

## `platform` で許容される値

`platform` キーは以下の値を受け付けます。

```
linux、linuxSQL、linuxSQLWeb、linuxSQLEnterprise、rhel、sles、mswin、mswinSQL、mswinSQLWeb、mswinSQLEnterprise
```

## `instanceType` で許容される値

`instanceType` キーは以下の値を受け付けます。

```
a1、c1、c3、c4、c5、c5a、c5ad、c5d、c5n、c6g、c6gd、c6gn、cc2、cr1、d2、d3、d3en、f1、g2、g3、g3s、g4ad、g4dn、h1、hs1、i2、i3、i3en、inf1、m1、m2、m3、m4、m5、m5a、m5ad、m5d、m5dn、m5n、m5zn、m6g、m6gd、p2、p3、p3dn、p4d、r3、r4、r5、r5a、r5ad、r5b、r5d、r5dn、r5n、r6g、r6gd、t1、t2、t3、t3a、t4g、x1、x1e、z1d
```

## `instanceSize` で許容される値

`instanceSize` キーは以下の値を受け付けます。

```
micro、nano、small、medium、large、xlarge、2xlarge、3xlarge、4xlarge、6xlarge、8xlarge、9xlarge、10xlarge、12xlarge、16xlarge、18xlarge、24xlarge、32xlarge、metal
```

## `billingOptions` で許容される値

`billingOptions` キーは、Cloudcraftによって認められているすべての請求オプションをサポートしています。

- オンデマンド
- リザーブドインスタンス
- スポットインスタンス

各オプションは、`billingOptions` オブジェクト内では異なる形で表現されています。

### オンデマンド

```
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

```
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront",
    "offeringClass": "convertible"
  }
}
```

- **type: ri**: リザーブドインスタンスの請求オプションの値は常に `ri` です。
- **leaseContractLenght: 数値**: インスタンスが予約されている時間の長さ。許容される値は 12 または 36 です。
- **purchaseOption: 文字列**: インスタンスの購入オプション。許容される値は `No Upfront`、`Partial Upfront`、および `All Upfront` です。
- **offeringClass: 文字列**: インスタンスのオファリングクラス。許容される値は `standard` と `convertible` です。

### スポットインスタンス

```
{
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  }
}
```

- **type: si**: スポットインスタンスの請求オプションの値は常に `si` です。
- **utilization: 数値**: 指定された月にインスタンスがどれくらい使用されたかを表す浮動小数点数。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/auto-scaling-group/
[5]: /ja/cloudcraft/components-aws/subnet/