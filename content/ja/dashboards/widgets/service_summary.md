---
aliases:
- /ja/graphing/widgets/service_summary/
description: 選択したサービスのグラフをダッシュボードウィジェットに表示します。
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
kind: documentation
title: サービスサマリーウィジェット
widget_type: trace_service
---

サービスサマリーは、選択された[サービス][1]のグラフをスクリーンボードに表示します。

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="サービスサマリー" >}}

## セットアップ

{{< img src="dashboards/widgets/service_summary/service_summary_setup.png" alt="サービスサマリーのセットアップ" style="width:80%;">}}

### コンフィギュレーション

1. [環境][2]と[サービス][1]を選択します。
2. ウィジェットのサイズを選択します。
3. 表示する情報を選択します。
    * Hits
    * Errors
    * レイテンシー
    * Breakdown
    * Distribution
    * リソース (**注**: このオプションを表示するには、大きなウィジェットサイズを選択する必要があります)
4. タイムフレーム、およびグラフの表示に使用する列数を選択して、表示設定を行います。
5. グラフのタイトルを入力します。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][3] ドキュメントをご参照ください。

サービスサマリーウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/service_page/
[2]: /ja/tracing/send_traces/
[3]: /ja/api/v1/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/