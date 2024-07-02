---
title: "Load Balancer コンポーネント"
---
## 概要

Use the Load Balancer component to represent application and network load balancers from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/load-balancer/component-load-balancer-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Load balancer' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Type**: Select the elastic load balancer type, classic, application, or network.
- **Data processed**: The total volume of data processed per hour, in gigabytes. Only available for type `classic`.
- **LCUs**: The number of load balancer capacity units. Only available for application and network types of load balancers.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a Load Balancer component:

```json
{
  "type": "elb",
  "id": "811ac6d8-bd6b-4d19-8504-d68d6c8381a9",
  "region": "us-east-2",
  "mapPos": [0,10],
  "elbType": "application",
  "dataGb": 10,
  "lcu": 1,
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "link": "blueprint://e2fd00f6-84d9-4a40-acf0-ff2ea01ae59c",
  "locked": true
}
```

- **type: elb**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: ロードバランサーがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **elbType: string**: Type of elastic load balancer. Accepts `classic`, `application`, or `network` as values.
- **dataGb: number**: The volume of data processed per hour by the load balancer, in gigabytes. Only applicable to load balancers of type `classic`.
- **lcu: number**: The number of load balancer capacity units. Only applicable to application or network types of load balancers.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上にコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/
