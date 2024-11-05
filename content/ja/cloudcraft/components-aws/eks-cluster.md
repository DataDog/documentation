---
title: EKS クラスターコンポーネント
---
## 概要

<div class="alert alert-info">Amazon EKS コンポーネントをスキャンするには、<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">Cloudcraft の IAM ロールに閲覧専用アクセスを許可する</a>必要があります。</div>

Amazon Web Services のアーキテクチャから Amazon EKS クラスターを視覚化するために、EKS クラスターコンポーネントを使用します。

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="相互接続された AWS コンポーネントを示すアイソメトリックな Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネントの上部の塗りつぶし色と、下部およびロゴのアクセントカラーを選択します。2D と 3D ビューで同じ色を使用することも、各ビューで異なる色を使用することもできます。
- **Name**: クラスターの名前を入力します。

また、**EKS Cluster** コンポーネントを [VPC][1]、[セキュリティグループ][2]、[サブネット][3]に追加することもできます。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、EKS クラスターコンポーネントの JSON オブジェクトの例です。

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントでは値は `ekscluster` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: AWS 内でのコンポーネントのグローバルな一意識別子であり、[Amazon リソースネーム (ARN)][5] として知られています。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][6]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **name: 文字列**: クラスターの名前。デフォルトは `EKS Cluster` です。
- **nodes: 配列**: クラスター内で実行されているワークロード。[EKS Workload コンポーネント][7]の一意の識別子の配列を受け入れます。
- **color: オブジェクト**: コンポーネント本体上部の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数の色。デフォルトは `#ECECED` です。
- **accentColor: オブジェクト**: コンポーネント本体の下部およびロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の下部およびロゴの 16 進数の色。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#693CC5` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: /ja/cloudcraft/components-aws/vpc/
[2]: /ja/cloudcraft/components-aws/security-group/
[3]: /ja/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /ja/cloudcraft/faq/scan-error-aws-china-region/
[7]: /ja/cloudcraft/components-aws/eks-workload/