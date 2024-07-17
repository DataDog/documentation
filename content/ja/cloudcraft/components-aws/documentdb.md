---
title: DocumentDB コンポーネント
---
## Overview

DocumentDB コンポーネントを使用して、Amazon Web Services アーキテクチャの DocumentDB クラスターを表現します。

{{< img src="cloudcraft/components-aws/documentdb/component-documentdb-diagram.png" alt="'DocumentDB' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Role**: DocumentDB インスタンスのロールを選択します。ライターまたはリーダーを選択できます。
- **Instance type**: The type of the instance. Changing the instance type changes the hardware details shown in the toolbar to reflect what is used by the hypervisor.
- **Size**: データベースクラスターのサイズ。インスタンスのタイプと同様、ツールバーに表示されるハードウェアの詳細がサイズを反映して変更されます。
- **Storage (GiB)**: クラスターにプロビジョニングされるストレージの量 (ジビバイト単位)。ライターロールにのみ利用可能です。
- **Snapshots (GiB)**: スナップショットにプロビジョニングされるストレージの量 (ジビバイト単位)。ライターロールにのみ利用可能です。
- **IOPS (Millions)**: クラスターの月間の I/O 制限 (百万単位)。ライターロールにのみ利用可能です。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、DocumentDB コンポーネントの JSON オブジェクトの例です。

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

- **type: docdb**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: string**: The AWS region the RDS instance is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **role: 文字列**: DocumentDB インスタンスで使用されるロール。指定できる値は `writer` および `reader` です。
- **instanceType: 文字列**: インスタンスのタイプ。指定できる値は `r4`、`r5`、`t3` です。
- **instanceSize: 文字列**: データベースクラスターのサイズ。詳しくは [instanceSize で許容される値](#accepted-values-for-instancesize)を参照してください。
- **storage: 数値**: クラスターにプロビジョニングされるストレージの量 (ジビバイト単位)。`role` が `writer` に設定されている場合のみ適用されます。
- **snapshots: 数値**: スナップショットにプロビジョニングされるストレージの量 (ジビバイト単位)。`role` が `writer` に設定されている場合のみ適用されます。
- **iops: 数値**: クラスターの月間の I/O 制限 (百万単位)。`role` が `writer` に設定されている場合のみ適用されます。
- **color: object**. The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**. The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**. Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

DocumentDB コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

## Accepted values for `instanceSize`

The `instanceSize` key accepts the following values:

```
medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/subnet/