---
title: ECR Repository Component
---
## 概要

Use the ECR Repository component to visualize container repositories from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ecr-repository/component-ecr-repository-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Data stored (GB)**: Enter the amount of data you store in your repositories.
- **Private**: Select if your repository is public or private.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a ECR Repository component:

```json
{
    "type": "ecr",
    "id": "15e88546-33f3-40d5-b88c-e7cdae335da8",
    "arn": "arn:aws:ecr:us-east-1:728720640411:repository/cloudcraft",
    "region": "us-east-1",
    "mapPos": [7.5,6],
    "storageGB": 1,
    "private": true,
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#ffffff",
        "2d": "#ffffff"
    },
    "link": "https://aws.amazon.com/ecr/",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `ecr` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。API は、[AWS China を除く][3]すべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **storageGB: number**: The amount of data stored in the repositories inside the registry, in gigabytes. Defaults to `1`.
- **private: boolean**: Whether the repository is private. Defaults to `true`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#3F7DDE`.
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#D86613` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#052048`.
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/