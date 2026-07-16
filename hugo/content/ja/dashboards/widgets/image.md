---
aliases:
- /ja/graphing/widgets/image/
description: Datadog のダッシュボードにイメージまたは gif 画像を含める
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: イメージウィジェット
widget_type: image
---

Image ウィジェットを使うと、ダッシュボードに画像を埋め込めます。画像は Datadog にアップロードすることも、URL でアクセスできる場所にホストすることもできます。対応しているファイル形式は PNG、JPG、GIF です。

{{< img src="dashboards/widgets/image/image.mp4" alt="イメージ" video="true" style="width:80%;" >}}

## セットアップ

{{< img src="dashboards/widgets/image/image_setup2.png" alt="画像の設定" style="width:80%;">}}

1. 画像をアップロードするか、画像の URL を入力してください。
2. プリセット テンプレートを選択するか、表示オプションをカスタマイズしてください。

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/