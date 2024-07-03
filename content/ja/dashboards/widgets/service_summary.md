---
aliases:
- /ja/graphing/widgets/service_summary/
description: Displays the graphs of a chosen service in a dashboard widget.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /tracing/services/service_page/
  tag: Documentation
  text: Learn more about the APM Service Page
title: Service Summary Widget
widget_type: trace_service
---

A service is a set of processes that do the same job, for example, a web framework or database. Datadog provides out-of-the-box graphs to display service information, as seen on the Service page. Use the service summary widget to display the graphs of a chosen [service][1] in your dashboard.

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