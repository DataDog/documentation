---
title: ECS Service コンポーネント
---
## 概要

ECS Service コンポーネントを使用して、Amazon Web Services アーキテクチャからの Amazon ECS サービスを視覚化します。

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="相互接続された AWS コンポーネントを示す等角 Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネントの上部の塗りつぶしカラーと下部のアクセントカラーを選択します。2D および 3D ビューで同じカラーを使用することも、各ビューで異なるカラーを使用することもできます。
- **Name**: サービスの名前を入力します。

また、**ECS Service** コンポーネントを [VPC][1]、[セキュリティグループ][2]、および[サブネット][3]に追加することもできます。

## API

[Cloudcraft API][1] を使用して、アーキテクチャダイアグラムにプログラム的にアクセスし、JSON オブジェクトとしてレンダリングできます。

### スキーマ

以下は ECS Service コンポーネントの JSON の例です。

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

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントでは値は文字列 `ecsservice` である必要があります。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: AWS 内でのコンポーネントのグローバルな一意識別子であり、[Amazon リソースネーム (ARN)][5] として知られています。
- **region: 文字列**: コンポーネントの AWS リージョン。API は [AWS China を除く][6]すべてのグローバルリージョンをサポートします。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **name: 文字列**: サービスの名前。デフォルトは `ECS Service` です。
- **nodes: 配列**: サービス内で実行されているタスク。EC2 または Fargate の起動タイプのタスクの一意の識別子の配列を受け付けます。
- **color: オブジェクト**: コンポーネント本体上部の塗りつぶし色。
  -  **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ffffff` です。
  -  **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ffffff` です。
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