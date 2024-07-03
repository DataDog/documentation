---
title: DocumentDB Component
---
## 概要

Use the DocumentDB component to represent DocumentDB clusters from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/documentdb/component-documentdb-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'DocumentDB' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Role**: Select the role of the DocumentDB instance. Can be writer or reader.
- **Instance type**: インスタンスのタイプ。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **Size**: The size of the database cluster. As with instance type, the hardware details shown in the toolbar change to reflect the size.
- **Storage (GiB)**: Amount of storage provisioned for the cluster, in gibibytes. Only available for the writer role.
- **Snapshots (GiB)**: Amount of storage provisioned for snapshots, in gibibytes. Only available for the writer role.
- **IOPS (Millions)**: The monthly I/O limit for the cluster, in the millions. Only available for the writer role.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a DocumentDB component:

```json
{
  "type": "docdb",
  "id": "36f18266-2d25-4003-9719-ee64899e2c4e",
  "region": "us-east-1",
  "mapPos": [2,4],
  "role": "writer",
  "instanceType": "t3",
  "instanceSize": "medium",
  "storage": 10,
  "snapshots": 4,
  "iops": "200",
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: docdb**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: RDS インスタンスがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **role: string**: The role used for the DocumentDB instance. Accepted values are `writer` and `reader`.
- **instanceType: string**: The type of the instance. Accepted values are `r4`, `r5`, and `t3`.
- **instanceSize: string**: The size of the database cluster. See [Accepted values for instanceSize](#accepted-values-for-instancesize) for more information.
- **storage: number**: Amount of storage provisioned for the cluster, in gibibytes. Only applicable if `role` is set to `writer`.
- **snapshots: number**: Amount of storage provisioned for snapshots, in gibibytes. Only applicable if `role` is set to `writer`.
- **iops: number**: The monthly I/O limit for the cluster, in the millions. Only applicable if `role` is set to `writer`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: string**. The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

The DocumentDB component can be added to [VPCs][2], [security groups][3], and [subnets][4].

## `instanceSize` で許容される値

`instanceSize` キーは以下の値を受け付けます。

```
medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/subnet/