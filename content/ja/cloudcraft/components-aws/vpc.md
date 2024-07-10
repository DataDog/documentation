---
title: VPC コンポーネント
---
## 概要

VPC コンポーネントを使用して、Amazon Web Services アーキテクチャ内の隔離された仮想ネットワークを表現します。

{{< img src="cloudcraft/components-aws/vpc/component-vpc-diagram.png" alt="'VPC' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Name**: VPC に名前を付けます。
- **Shape**: VPC の形状を選択します。
- **Padding**: VPC 内部の空間を増減します。
- **Peering**: 他の VPC とのピアリング接続を表示、削除、追加します。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、VPC コンポーネントの JSON の例です。

```json
{
  "type": "vpc",
  "id": "5631f2ca-3d93-4591-a7d9-85d5f0d011eb",
  "region": "us-east-1",
  "name": "cloudcraft-vpc-example",
  "shape": "rectangular",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "locked": true
}
```

- **type: vpc**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: この VPC がデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **name: 文字列**: VPC の名前。
- **shape: 文字列**: VPC の形状。指定できる値は `dynamic` または `rectangular` です。
- **padding: 数値**: VPC の内部パディング。デフォルトは `1.5` です。
- **nodes: 配列**: VPC 内部のコンポーネント。詳しくは [`nodes` で許容される値](#accepted-values-for-nodes)を参照してください。
- **peeringConnections: 配列**: この VPC にピアリング接続する VPC。詳しくは [`peeringConnections` で許容される値](#accepted-values-for-peeringconnections)を参照してください。
- **color: オブジェクト**: コンポーネントの塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

### `nodes` で許容される値

`nodes` キーには VPC 内のコンポーネントの一意な識別子の配列を指定します。

VPC 内に追加できる AWS コンポーネントは以下の通りです。

```
asg, ec2, lambda, efs, fsx, elb, subnet, sg, rds, docdb, elasticache, redshift, es, natgateway, internetgateway, vpngateway, customergateway
```

AWS コンポーネントに加えて、以下の一般的なコンポーネントも VPC 内に追加できます。

```
block, isotext, icon, image, area
```

### `peeringConnections` で許容される値

`peeringConnections` キーには配列を指定し、各ピアリング接続を JSON オブジェクトで表します。

```
{
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ]
}
```

- **id: 文字列**: このピアリング接続の `uuid` 形式の一意な識別子。
- **name: 文字列**: この接続の名前。どのように表示されるかは、ページ上部のコンポーネントイメージを参照してください。
- **accepterVpc: 文字列**: アクセプター VPC の `id` 。
- **hidden: ブール値**: `true` の場合、ピアリング接続は図に表示されません。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/