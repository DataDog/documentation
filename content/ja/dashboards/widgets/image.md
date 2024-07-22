---
aliases:
- /ja/graphing/widgets/image/
description: Datadog のダッシュボードにイメージまたは gif 画像を含める
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: イメージウィジェット
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

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

イメージウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/