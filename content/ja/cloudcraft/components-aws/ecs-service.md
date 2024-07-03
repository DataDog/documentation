---
title: ECS Service Component
---
## 概要

Use the ECS Service component to visualize Amazon ECS services from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors on the 2D and 3D views or different colors for each.
- **Name**: Enter a name for the service.

You can also add the **ECS Service** component to [VPCs][1], [security groups][2], and [subnets][3].

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. T

### スキーマ

The following is an example JSON of a ECS Service component:

```json
{
    "type": "ecsservice",
    "id": "58c88e1f-b9c7-47a0-aed1-ee8324bf0fd0",
    "arn": "arn:aws:ecs:us-east-1:746399320916:service/ecs-service",
    "region": "us-east-1",
    "mapPos": [6,1],
    "name": "ECS Service",
    "nodes": [
        "1005e737-2ccc-4325-abdf-b0f6c5c78ea1",
        "319c40a5-d5f2-4394-8784-f613aa1d313b"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#03a9f4",
        "2d": "#03a9f4"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `ecsservice` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][5].
- **region: string**: The AWS region for the component. The API supports all global regions, [except for AWS China][6].
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **name: string**: The name of the service. Defaults to `ECS Service`.
- **nodes: array**: The tasks running inside the service. Accepts an array of unique identifiers for tasks of launch type EC2 or Fargate.
- **color: オブジェクト**: コンポーネント本体上部の塗りつぶし色。
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ffffff`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#ffffff`.
- **accentColor: オブジェクト**: コンポーネント本体下部のアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286c5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#693cc5` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: /ja/cloudcraft/components-aws/vpc/
[2]: /ja/cloudcraft/components-aws/security-group/
[3]: /ja/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /ja/cloudcraft/faq/scan-error-aws-china-region/