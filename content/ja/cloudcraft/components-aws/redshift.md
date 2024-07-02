---
title: "Redshift Component"
---
## 概要

Redshift コンポーネントを使用して、Amazon Web Services アーキテクチャのデータウェアハウスを表現します。

{{< img src="cloudcraft/components-aws/redshift/component-redshift-diagram.png" alt="'Redshift' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Nodes**: Redshift クラスターのノード数を入力します。
- **Instance type**: Redshift インスタンスのタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **Size**: Redshift インスタンスのサイズを選択します。インスタンスのタイプと同様、ツールバーに表示されるハードウェアの詳細がサイズを反映して変更されます。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Redshift コンポーネントの JSON の例です。

```json
{
  "type": "redshift",
  "id": "c1aa0ae1-8e0d-466d-a8a8-51cc9b8a6b35",
  "region": "us-west-2",
  "mapPos": [1,2],
  "nodeCount": 2,
  "instanceType": "ra3",
  "instanceSize": "xlplus",
  "color": {
    "isometric": "#80b1dc",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "link": "https://aws.amazon.com/redshift/",
  "locked": true
}
```

- **type: redshift**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: この Redshift インスタンスがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: ブループリント内のコンポーネントの位置。x 座標と y 座標のペアで表されます。
- **nodeCount: 数値**: Redshift クラスターのノード数。デフォルトは `1` です。
- **instanceType: 文字列**: インスタンスのタイプ。詳しくは [`instanceType` で許容される値](#accepted-values-for-instancetype)を参照してください。
- **instanceSize: 文字列**: インスタンスのサイズ。詳しくは [`instanceSize` で許容される値](#accepted-values-for-instancesize)を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを通じてコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

Redshift コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

## `instanceType` で許容される値

`instanceType` キーは以下の値を受け付けます。

```
dc1、dc2、ds1、ds2、ra3
```

## `instanceSize` で許容される値

`instanceSize` キーは以下の値を受け付けます。

```
large、xlarge、xlplus、4xlarge、8xlarge、16xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
