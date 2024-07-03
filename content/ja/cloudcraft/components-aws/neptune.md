---
title: Neptune Component
---
## 概要

Use the Neptune component to visualize serverless graph databases from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/neptune/component-neptune-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Role**: Select the role of the Neptune database.
- **Instance type**: Select the Neptune instance type. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: Select the size of the Neptune instance. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Storage (GB)**: Enter the total amount of storage available for the database in gigabytes. Not available for the reader role.
- **Snapshot (GB)**: Enter the total amount of storage provisioned for snapshots in gigabytes. Not available for role reader.
- **IOPS (Millions)**: Enter the monthly I/O limit for the instance, in millions. Not available for the reader role.
- **Instances**: Enter the number of Neptune instances. Only available for role serverless.
- **Min NCUs**: Enter the minimum amount of NCUs available for the database. Only available for the serverless role.
- **Max NCUs**: Enter the maximum amount of NCUs available for the database. Only available for the serverless role .

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a Neptune component:

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

- **type: string**: The type of component. Must be a string of value `neptune` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][3]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **role: string**: The role of the Neptune database. Accepts one of the following values: `serverless`, `writer`, or `reader`. Defaults to `writer`.
- **instanceType: string**: The Neptune instance type. See [Accepted values for `instanceType`](#accepted-values-for-instancetype) for more information. Defaults to `r5`.
- **instanceSize: string**: The size of the Neptune instance. Not applicable if `role` is `reader`. Defaults to `large`.
- **storage: number**: The total amount of storage available for the database in gigabytes. Not applicable if `role` is `reader`. Defaults to `10`.
- **snapshots: number**: The total amount of storage provisioned for snapshots in gigabytes. Not applicable if `role` is `reader`. Defaults to `0`.
- **iops: number**: The monthly I/O limit for the instance, in millions. Not applicable if `role` is `reader`. Defaults to `0`.
- **instances: number**: The number of Neptune instances. Only applicable if `role` is `serverless. Defaults to `1`.
- **minNCUs: number**: The minimum amount of NCUs available for the database. Only applicable if `role` is `serverless`. Defaults to `1`.
- **maxNCUs: number**: The maximum amount of NCUs available for the database. Only applicable if `role` is `serverless`. Defaults to `2.5`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#3B48CC`.
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