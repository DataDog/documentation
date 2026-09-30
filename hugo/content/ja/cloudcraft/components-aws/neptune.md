---
title: Neptune コンポーネント
---
## 概要

Neptune コンポーネントを使用して、Amazon Web Services アーキテクチャからサーバーレスのグラフデータベースを視覚化します。

{{< img src="cloudcraft/components-aws/neptune/component-neptune-diagram.png" alt="相互接続された AWS コンポーネントを示す等角投影の Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Role**: Neptune データベースのロールを選択します。
- **Instance type**: Neptune のインスタンスタイプを選択します。インスタンスタイプを変更すると、ハイパーバイザーで使用されるものを反映するために、ツールバーに表示されるハードウェアの詳細が変更されます。
- **Size**: Neptune インスタンスのサイズを選択します。インスタンスタイプと同様に、サイズを反映するためにツールバーに表示されるハードウェアの詳細が変更されます。
- **Storage (GB)**: データベースで利用可能なストレージの総容量をギガバイトで入力します。reader ロールでは利用できません。
- **Snapshot (GB)**: スナップショット用にプロビジョニングされたストレージの総容量をギガバイトで入力します。reader ロールでは利用できません。
- **IOPS (Millions)**: インスタンスの月間 I/O 制限を百万単位で入力します。reader ロールでは利用できません。
- **Instances**: Neptune インスタンスの数を入力します。serverless ロールでのみ利用可能です。
- **Min NCUs**: データベースで利用可能な最小の NCU 数を入力します。serverless ロールでのみ利用可能です。
- **Max NCUs**: データベースで利用可能な最大の NCU 数を入力します。serverless ロールでのみ利用可能です。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は Neptune コンポーネントの JSON オブジェクト例です。

```json
{
    "type": "neptune",
    "id": "7d2ac4f8-2b7d-4617-98cb-ff792963df6d",
    "region": "us-east-1",
    "mapPos": [-2,12],
    "role": "writer",
    "instanceType": "r5",
    "instanceSize": "large",
    "storage": 10,
    "snapshots": 0,
    "iops": 0,
    "instances": "1",
    "minNCUs": 1,
    "maxNCUs": 2.5,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/neptune/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプです。このコンポーネントでは、値が `neptune` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][3]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **role: 文字列**: Neptune データベースのロールです。`serverless`、`writer`、`reader` の値のいずれかを受け入れます。デフォルトは `writer` です。
- **instanceType: 文字列**: Neptune のインスタンスタイプです。詳細は [`instanceType` で許容される値](#accepted-values-for-instancetype)を参照してください。デフォルトは `r5` です。
- **instanceSize: 文字列**: Neptune インスタンスのサイズです。`role` が `reader` の場合は適用されません。デフォルトは `large` です。
- **storage: 数値**: データベースで利用可能なストレージの総容量をギガバイトで表します。`role` が `reader` の場合は適用されません。デフォルトは `10` です。
- **snapshots: 数値**: スナップショット用にプロビジョニングされたストレージの総容量をギガバイトで表します。`role` が `reader` の場合は適用されません。デフォルトは `0` です。
- **iops: 数値**: インスタンスの月間 I/O 制限を百万単位で表します。`role` が `reader` の場合は適用されません。デフォルトは `0` です。
- **instances: 数値**: Neptune インスタンスの数です。`role` が `serverless` の場合にのみ適用されます。デフォルトは `1` です。
- **minNCUs: 数値**: データベースで利用可能な最小の NCU 数です。`role` が `serverless` の場合にのみ適用されます。デフォルトは `1` です。
- **maxNCUs: 数値**: データベースで利用可能な最大の NCU 数です。`role` が `serverless` の場合にのみ適用されます。デフォルトは `2.5` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進カラーコードです。デフォルトは `#3B48CC` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

## `instanceType` で許容される値

`instanceType` キーは以下の値を受け付けます。

```
t4g, t3, x2g, x2iedn, r6g, r6i, r5, r5d, r4
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/