---
title: "Icon Component"
---

## 概要

Icon コンポーネントは、利用可能なコンポーネントの中で最も基本的なものの 1 つです。画像**やブロックと共に、まだ利用可能でないクラウドコンポーネントを表現するために使用することができます。

{{< img src="cloudcraft/components-common/icon/component-icon.png" alt="Cloudcraft の Icon コンポーネントの 3D 表現のスクリーンショット" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの背景とアイコンの色を選択するか、色の 16 進値を入力します。2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Icon set**: 必要なアイコンを含むアイコンセットを選択します。利用可能なセットは AWS、AWS (レガシー)、Azure、Font Awesome です。
- **Icon name**: 図で使用されるアイコンの名前。このフィールドは利用可能なアイコンの検索にも使用できます。
- **Toggle 3D/2D projection**: 図自体が 3D ビューの場合に、アイコンを 3D または 2D ビューで表示します。2D の図では利用できません。
- **Toggle flat/standing projection**: ラベルを平面または立体に表示します。2D 投影に切り替えている場合や 2D の図では使用できません。
- **Size**: アイコンのサイズを増減します。
- **Rotate item**: アイコンを回転させ、その方向を変更します。
- **Raise**: Icon コンポーネントを他のアイコンより高くします。
- **Lower**: Icon コンポーネントを他のアイコンより低くします。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Icon コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "icon",
  "id": "a65bf697-3f17-46dd-8801-d38fcc3827b6",
  "mapPos": [4.5, 13.5],
  "iconSet": "fa",
  "name": "firefox",
  "iconSize": 6,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "color": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "background": {
    "2d": "#000000",
    "isometric": "#0e141f"
  },
  "link": "blueprint://5dccf526-bb9b-44ba-abec-3b5e7c8076a6",
  "locked": true
}
```

- **type: icon**: コンポーネントのタイプ。
- **id: 文字列**。`uuid` 形式のコンポーネントの一意な識別子。
- **mapPos: [数値, 数値]**。x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **iconSet: 文字列**. 使用されるアイコンセットの名前。`aws、aws2、azure、fa` のいずれかを値として受け入れます。
- **name: 文字列**. アイコンセット内のアイコン名。名前はコンポーネントツールバーを使ってアプリケーション内で確認できます。
- **iconSize: 数値**. アイコンのサイズ。デフォルトは 3 です。
- **isometric: ブール値**。true の場合、アイコンは 3D 投影で表示され、false の場合、ラベルは 2D 投影で表示されます。デフォルトは true です。
- **standing: ブール値**。true の場合 、アイコンを平面ではなく立体で表示します。デフォルトは false です。
- **direction: 文字列**。アイコンの回転または方向。値として `down, up, right, left` を受け付けます。デフォルトは `down` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**。3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**。2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **background: オブジェクト**. コンポーネントの背景色。
  - **isometric: 文字列**。3D ビューでのアイコンの背景色。16 進数で指定します。
  - **2d: 文字列**。2D ビューでのアイコンの背景色。16 進数で指定します。
- **link: uri**。コンポーネントを、`blueprint://ID` フォーマットで別の図にリンクするか、`https://LINK` フォーマットで外部の Web サイトにリンクします。
- **locked: ブール値**。true の場合、アプリケーション通じたコンポーネントへの変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/
