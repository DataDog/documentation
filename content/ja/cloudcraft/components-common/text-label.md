---
title: テキストラベルコンポーネント
---

## 概要

テキストラベルコンポーネントを使用すると、図内のコンポーネント、アイコン、および領域にラベルを付けることができ、可読性と視覚的な魅力を高めることができます。

{{< img src="cloudcraft/components-common/text-label/component-text-label.png" alt="Cloudcraft のテキストラベルコンポーネントの 3D 表現のスクリーンショット" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、色の 16 進値を入力します。2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Toggle 3D/2D projection**: ラベルを 3D または 2D ビューで表示します。
- **Toggle flat/standing projection**: ラベルを平面または立体に表示します。2D 投影に切り替えている場合は使用できません。
- **Size**: テキストラベルのサイズ。最大値は 112 です。
- **Rotate item**: テキストラベルコンポーネントを回転させ、その方向を変更します。
- **Outline**: テキストラベルにアウトラインを追加して、色のコントラストを強めます。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、テキストラベルコンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "isotext",
  "id": "8f2a0f5f-c373-42dd-b4df-f06f455f5f94",
  "mapPos": [3.5, 9],
  "text": "Hello world!",
  "textSize": 56,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "outline": true,
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "https://blog.cloudcraft.co/welcome-to-cloudcraft/",
  "locked": true
}
```

- **type: isotext**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **text: 文字列**: ラベルに使用されるテキスト。
- **textSize: 数値**: テキストラベルのサイズ。デフォルトは 25 です。
- **isometric: ブール値**: true の場合、ラベルは 3D 投影で表示され、false の場合、ラベルは 2D 投影で表示されます。デフォルトは true です。
- **standing: ブール値**: true の場合 、ラベルを平面ではなく立体で表示します。デフォルトは false です。
- **direction: 文字列**: ラベルの回転または方向。値として `down, up, right, left` を受け付けます。デフォルトは `down` です。
- **outline: ブール値**: true の場合、 テキストにアウトラインを追加して色のコントラストを増加させます。デフォルトは false です。
- **color: オブジェクト**: コンポーネントの塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットで別の図にリンクするか、`https://LINK` フォーマットで外部の Web サイトにリンクします。
- **locked: ブール値**: true の場合、アプリケーション通じたコンポーネントへの変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/