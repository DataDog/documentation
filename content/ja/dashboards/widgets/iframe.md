---
title: Iframe ウィジェット
kind: documentation
description: Datadog のダッシュボードに iframe を含める
aliases:
  - /ja/graphing/widgets/iframe/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
Iframe ウィジェットを使用すると、他の Web ページの一部をダッシュボードに埋め込むことができます。

## セットアップ

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Iframe セットアップ"  style="width:80%;">}}

iframe 内に表示するページの URL を入力します。HTTPS URL を使用しない場合は、セキュリティで保護されていないコンテンツを許可するようにブラウザを設定する必要があります。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][1] ドキュメントをご参照ください。

iframe ウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/dashboards/
[2]: /ja/dashboards/graphing_json/widget_json/