---
aliases:
- /ja/graphing/widgets/image/
description: Include an image or a gif in your Datadog dashboards.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
title: Image Widget
widget_type: image
---

イメージウィジェットを使用すると、ダッシュボードにイメージを埋め込むことができます。イメージには、URLでアクセスできる場所でホストされている PNG、JPG、またはアニメーション GIF を使用できます。

{{< img src="dashboards/widgets/image/image.mp4" alt="イメージ" video="true" style="width:80%;" >}}

## セットアップ

{{< img src="dashboards/widgets/image/image_setup.png" alt="イメージのセットアップ" style="width:80%;">}}

1. イメージの URL を入力します。
2. 外観を選択します。
    * Zoom image to cover whole tile (タイル全体を覆うようにイメージを拡大縮小)
    * Fit image on tile (イメージをタイル内に収める)
    * Center image on tile (イメージをタイルの中心に配置する)

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/