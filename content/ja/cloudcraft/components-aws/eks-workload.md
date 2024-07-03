---
title: EKS Workload Component
---
## 概要

<div class="alert alert-info">Amazon EKS コンポーネントをスキャンするには、<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">Cloudcraft の IAM ロールに閲覧専用アクセスを許可する</a>必要があります。</div>

Use the EKS Workload component to visualize Amazon EKS workloads from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: Select a fill color for the top of the component and an accent color for the bottom. You can use the same colors for the 2D and 3D views or different colors for each.
- **Name**: Enter a name for the workload.
- **Type**: Select the type of workload to use.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a EKS Workload component:

```json
{
    "type": "eksworkload",
    "id": "a5cad956-3366-4582-a73a-2709d53e975f",
    "region": "us-east-1",
    "mapPos": [3.5,-0.75],
    "name": "EKS Workload",
    "workloadType": "deployment",
    "nodes": [
        "cadf6a3f-67d2-4df9-ad40-f892030af58b",
        "a9437fdf-56f9-4c3b-8acf-6f0f37f70980",
        "b15e51da-b99b-4072-b4c4-e9e85df7e285",
        "b5878fa9-bf1a-44d0-bc8d-336f99763fce"
    ],
    "color": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `eksworkload` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][3]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **name: string**: The name of the workload. Defaults to `EKS Workload`.
- **workloadType: string**. The type of the workload on the cluster. See [Accepted values for `workloadType`](#accepted-values-for-workloadType) for more information. Defaults to `deployment`.
- **nodes: array**: The pods running on this workload. Accepts an array of unique identifiers of EKS Pods.
- **color: object**: The fill color for the top of the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#FFFFFF`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#FFFFFF`.
- **accentColor: object**: The accent color for the bottom of the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286C5` です。
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#693CC5`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats, `blueprint://` or `https://`.
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

## `workloadType` で許容される値

`workloadType` キーは以下の文字列値のいずれかを受け付けます。

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/