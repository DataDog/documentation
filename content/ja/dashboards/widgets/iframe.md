---
aliases:
- /ja/graphing/widgets/iframe/
description: Datadog のダッシュボードに iframe を含める
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: Iframe ウィジェット
widget_type: iframe
---

インラインフレーム (iframe) は、ドキュメント内に別の HTML ページを読み込む HTML 要素です。iframe ウィジェットを使用すると、他の Web ページの一部をダッシュボードに埋め込むことができます。

## セットアップ

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Iframe セットアップ" style="width:80%;">}}

iframe 内に表示するページの URL を入力します。HTTPS URL を使用しない場合は、セキュリティで保護されていないコンテンツを許可するようにブラウザを設定する必要があります。

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/