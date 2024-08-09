---
aliases:
- /ja/graphing/widgets/service_summary/
description: 選択したサービスのグラフをダッシュボードウィジェットに表示します。
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: APM サービス詳細画面について
title: サービスサマリーウィジェット
widget_type: trace_service
---

サービスサマリーは、選択された[サービス][1]のグラフをダッシュボードに表示します。

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="サービスサマリー" >}}

## セットアップ

### 構成

1. [環境][2]と[サービス][1]を選択します。
2. ウィジェットのサイズを選択します。
3. 表示する情報を選択します。
    * Hits
    * エラー
    * レイテンシー
    * Breakdown
    * Distribution
    * リソース (**注**: このオプションを表示するには、大きなウィジェットサイズを選択する必要があります)
4. グラフの表示に使用する列数を選択して、表示設定を行います。
5. グラフのタイトルを入力します。

## API

このウィジェットは **[Dashboards API][3]** で使用できます。[ウィジェット JSON スキーマ定義][4]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/service_page/
[2]: /ja/tracing/send_traces/
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/