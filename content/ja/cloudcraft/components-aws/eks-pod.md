---
title: "EKS Pod Component"
---
## 概要

<div class="alert alert-info">Amazon EKS コンポーネントをスキャンするには、<a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">Cloudcraft の IAM ロールに閲覧専用アクセスを許可する</a>必要があります。</div>

EKS Pod コンポーネントを使用して、Amazon Web Services アーキテクチャから Amazon EKS コンテナを視覚化します。

{{< img src="cloudcraft/components-aws/eks-pod/component-eks-pod-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Compute**: ワーカーノードのタイプを選択します。サポートされているオプションは Fargate と Node Group です。
- **CPU**: ポッドの vCPU の値を選択します。このオプションは Node Groups では利用できません。
- **Memory (GB)**: ポッドで利用可能なメモリの量を選択します。このオプションは Node Groups では利用できません。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、EKS Pod コンポーネントの JSON オブジェクトの例です。

```
{
    "type": "ekspod",
    "id": "cc5104b0-1747-441c-a7b7-b760796d475b",
    "region": "us-east-1",
    "mapPos": [6.5,2.5],
    "compute": "fargateProfile",
    "cpu": "0.25",
    "memoryGB": "0.5",
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

**EKS Pod** コンポーネントのスキーマ表現は上記のフォーマットに従い、このコンポーネントのダイアグラム内のすべてのフィールドを定義します。

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `ekspod` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][3]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **compute: 文字列**: ポッドのワーカーノードのタイプ。`fargateProfile` または `nodeGroup` のいずれかの値を受け付けます。デフォルトは `nodeGroup` です。
- **cpu: 数値**: ポッドで利用可能な vCPU の数。詳しくは [`cpu` で許容される値](#accepted-values-for-cpu)を参照してください。デフォルトは `0.25` です。
- **memoryGB: 数値**: ポッドで利用可能なメモリの量。詳しくは [`memoryGB` で許容される値](#accepted-values-for-memorygb)を参照してください。デフォルトは `0.5` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#3C3C3C` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#D86613` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FF9800` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

## `cpu` で許容される値

`cpu` キーは以下の値を受け付けます。

```
0.25、0.5、1、2、4
```

**注***: このキーは `compute` が` fargateProfile` に設定されている場合のみポッドに影響します。

## `memoryGB` で許容される値

`memoryGB` キーは以下の値を受け付けます。

```
0.5、1、2、3、4、5、6、7、8、9、10、11、12、13、14、15、16、17、18、19、
20、21、22、23、24、25、26、27、28、29、30
```

**注***: このキーは `compute` が` fargateProfile` に設定されている場合のみポッドに影響します。

## `cpu` と `memoryGB` の有効な組み合わせ

`cpu` キーと `memoryGB` キーを合わせて、ポッド内の各コンテナ に割り当てられるリソースが決まりますが、有効な値の組み合わせを指定する必要があります。

下の表は、どの組み合わせが有効かを示しています。

cpu   | memoryGB
----  | ---------
0.25  | 0.5、1、2
0.5   | {1..4}
1     | {2..8}
2     | {4..16}
4     | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
