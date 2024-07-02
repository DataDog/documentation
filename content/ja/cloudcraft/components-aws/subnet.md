---
title: "Subnet Component"
---

## 概要

Use the Subnet component to represent subnets from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/subnet/component-subnet.png" alt="Screenshot of a 3D representation of the subnet AWS component in Cloudcraft" responsive="true" style="width:60%;">}}


## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Name**: Give the subnet a name.
- **Shape**: Select a shape for the subnet.
- **Padding**: Increase or decrease the amount of space inside the subnet.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a Subnet component:

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

- **type: subnet**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: string**: The AWS region this subnet is deployed in. All global regions are supported except `cn-` regions.
- **name: string**: The name for the subnet.
- **shape: string**: The shape of the subnet. Accepted values are `dynamic` or `rectangular`.
- **padding: number**: The internal padding for the subnet. Defaults to `1.5`.
- **nodes: array**: The components inside the subnet. See [Accepted values for `nodes`](#accepted-values-for-nodes) for more information.
- **color: オブジェクト**: コンポーネントの塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

### `nodes` で許容される値

The `nodes` key accepts an array of unique identifiers for the components inside the subnet.

The following AWS components can be added inside a subnet:

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es, natgateway
```

In addition to the AWS components, the following common components can also be added inside a subnet:

```
block, isotext, icon, image, area
```

[1]: https://developers.cloudcraft.co/
