---
title: Region
---

## 概要

Use the Region component to represent physical locations from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/region/component-region-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Region' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Visibility**. Toggle the visibility of the component on the diagram.
- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Padding**. Enter the padding value to adjust the space between the component border and its content.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a Region component:

```json
{
    "type": "region",
    "id": "1063814395",
    "arn":"arn:aws::us-east-1::",
    "region": "us-east-1",
    "visible": true,
    "padding": 2,
    "shape": "rectangular",
    "nodes": [
        "6acd2c2e-60aa-44bd-93e8-aca071ef85ff"
    ],
    "color": {
        "isometric": "#a991e1",
        "2d": "#a991e1"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component consisting of 10 random digits.
- **arn: string**: The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). The region component takes a dummy ARN value that always equals to `arn:aws::region::`.
- **region: string**: The AWS region itself. All global regions are supported except `cn-` regions.
- **visible: boolean**: If `false`, the component becomes semi-transparent on the diagram.
- **padding: number**: The padding value for the component.
- **shape: string**: The shape of the component. The region component only supports the `rectangular` shape.
- **nodes: array**: An array of node IDs that are inside the region. The node IDs are in the `uuid` format.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#CC2264` です。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。
