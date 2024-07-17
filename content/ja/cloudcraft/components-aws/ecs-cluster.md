---
title: ECS Cluster コンポーネント
---
## Overview

ECS Cluster コンポーネントを使用して、Amazon Web Services アーキテクチャの Amazon ECS クラスターを視覚化します。

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors for the 2D and 3D views or different colors for each.
- **Name**: クラスターの名前を入力します。255 文字までのアルファベット、数字、ハイフン、アンダースコアを使用できます。

また、[VPC][1] や[サブネット][2]に ECS Cluster コンポーネントを追加することもできます。

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、ECS Cluster コンポーネントの JSON オブジェクトの例です。

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `ecscluster` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: 文字列**: [Amazon Resource Name][4] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。API は、[AWS China を除く][5]すべてのグローバルリージョンをサポートしています。
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **name: 文字列**: クラスターの名前。255 文字までのアルファベット、数字、ハイフン、アンダースコアを使用できます。
- **nodes: 配列**: クラスター内部で実行されているサービスとタスク。サービスやタスクコンポーネントの一意な識別子の配列を指定します。
- **color: object**: The fill color for the top of the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
- **accentColor: object**: The accent color for the bottom of the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286c5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#693cc5` です。
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: /ja/cloudcraft/components-aws/vpc/
[2]: /ja/cloudcraft/components-aws/subnet/
[3]: https://developers.cloudcraft.co/
[4]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[5]: /ja/cloudcraft/faq/scan-error-aws-china-region/