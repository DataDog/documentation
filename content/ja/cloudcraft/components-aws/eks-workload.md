---
title: EKS Workload コンポーネント
---
## Overview

<div class="alert alert-info">Scanning Amazon EKS components requires <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">authorizing Cloudcraft's IAM role for view-only access</a>.</div>

EKS Workload コンポーネントを使用して、Amazon Web Services アーキテクチャの Amazon EKS ワークロードを視覚化します。

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: コンポーネント上部の塗りつぶし色と下部のアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Name**: ワークロードの名前を入力します。
- **Type**: 使用するワークロードのタイプを選択します。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、EKS Workload コンポーネントの JSON オブジェクトの例です。

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントでは値は `eksworkload` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **name: 文字列**: ワークロードの名前。デフォルトは `EKS Workload` です。
- **workloadType: 文字列**: クラスター上のワークロードのタイプ。詳細は [`workloadType` で許容される値](#accepted-values-for-workloadType)を参照してください。デフォルトは `deployment` です。
- **nodes: 配列**: このワークロードで実行されているポッド。EKS Pod の一意な識別子の配列を指定します。
- **color: オブジェクト**: コンポーネント本体上部の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#FFFFFF` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#FFFFFF` です。
- **accentColor: オブジェクト**: コンポーネント本体下部のアクセントカラー。
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#693CC5` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `workloadType`

The `workloadType` key accepts one of the following string values:

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/