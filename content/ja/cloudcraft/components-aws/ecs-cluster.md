---
title: ECS Cluster Component
---
## 概要

Use the ECS Cluster component to visualize Amazon ECS clusters from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント上部の塗りつぶし色と下部のアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Name**: Enter a name for the cluster. You can use up to 255 letters, numbers, hyphens, and underscores.

You can also add the ECS Cluster component to [VPCs][1] and [subnets][2].

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a ECS cluster component:

```json
{
    "type": "ecscluster",
    "id": "c28296e2-01b1-463c-be6d-fe748a3dba05",
    "arn": "arn:aws:ecs:us-east-1:746399320916:cluster/ecs-cluster",
    "region": "us-east-1",
    "mapPos": [3,-1.75],
    "name": "ECS Cluster",
    "nodes": [
        "35578835-bb50-43f6-b9bc-d9a7ff20f667",
        "adad4f6e-b1dc-4e90-a860-e6c34d1d707a",
        "6321a7c4-db1f-4b47-a2dd-2d4c1a3deaff",
        "bafdae24-a6af-47ad-896d-846d790c8b23",
        "117a0f24-a115-4f12-8627-e8c8b9665d86",
        "c4af84a8-a02d-400e-9277-ad1ed886390f",
        "93a34859-a6ef-451d-96c2-4cfccab86d70",
        "b0e607e8-8b01-492b-b4a0-f4eea35d19f1",
        "085ca535-3b23-420c-a19c-27ae3d11a2ab",
        "eb7cc62b-db25-4ce4-97dd-130bb288512a"
    ],
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `ecscluster` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][4].
- **region: string**: The AWS region for the component. The API supports all global regions, [except for AWS China][5].
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **name: string**: The name of the cluster. Accepts up to 255 letters, numbers, hyphens, and underscores.
- **nodes: array**: The services and tasks running inside the cluster. Accepts an array of unique identifiers for services and tasks components.
- **color: オブジェクト**: コンポーネント本体上部の塗りつぶし色。
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ececed`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#ececed`.
- **accentColor: オブジェクト**: コンポーネント本体下部のアクセントカラー。
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286c5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#693cc5`.
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: /ja/cloudcraft/components-aws/vpc/
[2]: /ja/cloudcraft/components-aws/subnet/
[3]: https://developers.cloudcraft.co/
[4]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[5]: /ja/cloudcraft/faq/scan-error-aws-china-region/