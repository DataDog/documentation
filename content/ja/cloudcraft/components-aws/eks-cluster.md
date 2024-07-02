---
title: "EKS Cluster Component"
---
## 概要

<div class="alert alert-info">Amazon EKS コンポーネントをスキャンするには、<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">Cloudcraft の IAM ロールに閲覧専用アクセスを許可する</a>必要があります。</div>

Use the EKS Cluster component to visualize Amazon EKS clusters from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: Select a fill color for the top of the component and an accent color for the bottom and logo. You can use the same colors for the 2D and 3D views or different colors for each.
- **Name**: Enter a name for the cluster.

You can also add the **EKS Cluster** component to [VPCs][1], [security groups][2], and [subnets][3].

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a EKS Cluster component:

```json
{
    "type": "ekscluster",
    "id": "0b9f9ea3-2ba7-46fd-bd40-cd694dc38af6",
    "arn": "arn:aws:eks:us-east-1:987867537671:cluster/eks-cluster",
    "region": "us-east-1",
    "mapPos": [2.5,-1.75],
    "name": "EKS Cluster",
    "nodes": [
        "c00c8af0-d409-4a1c-9db4-e2f96128ad56",
        "3d911e8b-2d8e-4cb7-8eb8-61b2e96c75b3"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#ff5722",
        "2d": "#ff5722"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `ekscluster` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][5].
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][6]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **name: string**: The name of the cluster. Defaults to `EKS Cluster`.
- **nodes: array**: The workloads running inside the cluster. Accepts an array of unique identifiers for [the EKS Workload component][7].
- **color: オブジェクト**: コンポーネント本体上部の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#ECECED`.
- **accentColor: object**: The accent color for the bottom of the component body and its logo.
  - **isometric: string**: A hexadecimal color for the bottom of the component body and its logo in the 3D view. Defaults to `#4286C5`.
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#693CC5` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: /cloudcraft/components-aws/vpc/
[2]: /cloudcraft/components-aws/security-group/
[3]: /cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /cloudcraft/faq/scan-error-aws-china-region/
[7]: /cloudcraft/components-aws/eks-workload/
