---
title: Image Component
---

## 概要

Image コンポーネントは、図の設計に利用できる基本的で強力なコンポーネントです。Icon や Blocks とともに、まだ利用可能でないクラウドコンポーネントを表現したり、新しいアイコンセットやソフトウェアスタックを追加するために使用することができます。

{{< img src="cloudcraft/components-common/image/component-image.png" alt="Cloudcraft の Image コンポーネントの 3D 表現のスクリーンショット" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Image name**: アップロードされたイメージの名前と拡張子。イメージ名をクリックすると、新しいイメージをアップロードして現在のイメージを置き換えることができます。
- **Toggle 3D/2D projection**: 図自体が 3D ビューの場合に、イメージを 3D または 2D ビューで表示します。2D の図では利用できません。
- **Toggle flat/standing projection**: イメージを図上に平面または立体に表示します。2D 投影に切り替えている場合や 2D の図では使用できません。
- **Scale**: イメージのサイズを増減します。
- **Rotate item**: イメージを回転させ、その方向を変更します。
- **Raise**: Image コンポーネントを他のイメージの上に配置します。
- **Lower**: Image コンポーネントを他のイメージの下に配置します。

## API

<div class ="alert alert-info">
  <p>図内のイメージは API から操作できますが、イメージ自体は Cloudcraft UI からアップロードする必要があります。</p>
</div>

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Image コンポーネントの JSON オブジェクトの例です。

```json
{
  "type": "image",
  "id": "53c342f3-3f13-4ba5-bffa-f4e0db874f95",
  "mapPos": [2.25, 9.75],
  "key": "a5a840d9-c1f9-4e19-b67c-6b2bd1bfcdaa/nginx-logo.webp",
  "isometric": true,
  "standing": false,
  "scale": 0.10000000000000014,
  "direction": "down",
  "link": "https://nginx.org/",
  "locked": true
}
```

- **type: image**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **key: 文字列**: UUID、ファイル名、拡張子からなるイメージの一意の識別子。
- **isometric: ブール値**: true の場合、イメージは 3D 投影で表示され、false の場合、イメージは 2D 投影で表示されます。デフォルトは true です。
- **standing: ブール値**: true の場合 、イメージを平面ではなく立体で表示します。デフォルトは false です。
- **scale: 数値**: イメージのサイズを拡大・縮小します。
- **direction: 文字列**: イメージの回転または方向。値として `down, up, right, left` を受け付けます。デフォルトは `down` です。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットで別の図にリンクするか、`https://LINK` フォーマットで外部の Web サイトにリンクします。
- **locked: ブール値**: true の場合、アプリケーション通じたコンポーネントへの変更は、ロックが解除されるまで無効になります。

[1]: https://developers.cloudcraft.co/