---
title: Subnet コンポーネント
---

## Overview

Subnet コンポーネントを使用して、Amazon Web Services アーキテクチャのサブネットを表現します。

{{< img src="cloudcraft/components-aws/subnet/component-subnet.png" alt="Cloudcraft の Subnet AWS コンポーネントの 3D 表現のスクリーンショット" responsive="true" style="width:60%;">}}


## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Name**: サブネットに名前を付けます。
- **Shape**: サブネットの形状を選択します。
- **Padding**: サブネット内部の空間を増減します。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. 

### Schema

以下は、Subnet コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "subnet",
  "id": "838f6f30-9cdd-4c6b-9eb2-dd71b9c64047",
  "region": "us-east-1",
  "name": "example-cloudcraft-sb",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "link": "blueprint://90fb6b0b-f66e-4196-8d16-d68921448fdb",
  "locked": true
}
```

- **type: subnet**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: 文字列**: このサブネットがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **name: 文字列**: サブネットの名前。
- **shape: 文字列**: サブネットの形状。指定できる値は `dynamic` または `rectangular` です。
- **padding: 数値**: サブネットの内部パディング。デフォルトは `1.5` です。
- **nodes: 配列**: サブネット内部のコンポーネント。詳しくは [`nodes` で許容される値](#accepted-values-for-nodes)を参照してください。
- **color: object**: The fill color for the component.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

### Accepted values for `nodes`

`nodes` キーにはサブネット内のコンポーネントの一意な識別子の配列を指定します。

サブネット内に追加できる AWS コンポーネントは以下の通りです。

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es, natgateway
```

AWS コンポーネントに加えて、以下の一般的なコンポーネントもサブネット内に追加できます。

```
block, isotext, icon, image, area
```

[1]: https://developers.cloudcraft.co/