---
title: Region
---

## 概要

Region コンポーネントを使用して、Amazon Web Services アーキテクチャから物理的な場所を表現します。

{{< img src="cloudcraft/components-aws/region/component-region-diagram.png" alt="「Region」AWS コンポーネントを示す等角 Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Visibility**: ダイアグラム上でのコンポーネントの可視性を切り替えます。
- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Padding**: コンポーネントの境界とそのコンテンツの間のスペースを調整するためにパディング値を入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は Region コンポーネントの JSON の例です。

```json
{
    "type": "region",
    "id": "1063814395",
    "arn":"arn:aws::us-east-1::",
    "region": "us-east-1",
    "visible": true,
    "padding": 2,
    "shape": "rectangular",
    "nodes": [
        "6acd2c2e-60aa-44bd-93e8-aca071ef85ff"
    ],
    "color": {
        "isometric": "#a991e1",
        "2d": "#a991e1"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。
- **id: 文字列**: 10 桁のランダムな数字からなるコンポーネントの一意の識別子。
- **arn: 文字列**: AWS 内でのコンポーネントのグローバルに一意の識別子で、[Amazon リソースネーム (ARN)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) として知られています。Region コンポーネントは常に `arn:aws::region::` に等しいダミーの ARN 値を取ります。
- **region: 文字列**: AWS リージョン自体。`cn-` リージョンを除くすべてのグローバルリージョンがサポートされています。
- **visible: ブール値**: `false` の場合、ダイアグラム上でコンポーネントが半透明になります。
- **padding: 数値**: コンポーネントのパディング値。
- **shape: 文字列**: コンポーネントの形状。Region コンポーネントは `rectangular` 形状のみをサポートします。
- **nodes: 配列**: リージョン内にあるノード ID の配列。ノード ID は `uuid` 形式です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#CC2264` です。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。