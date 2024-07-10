---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/live_tail/
  tag: Documentation
  text: Datadog Live Tail 機能
title: ログとメトリクスの相関
---

## 概要

Datadog アプリ内には、ログをメトリクスと相関させるいくつかの方法があります。[ログエクスプローラー][1]、[ダッシュボード][2]、[メトリクスエクスプローラー][3]などのビューには、詳細なパネルとインスタントビューの切り替えが用意されており、問題のコンテキストをすばやく取得して、サービス全体にマッピングするのに役立ちます。

このガイドでは、これらのビュー全体でログとメトリクスを相関させる方法を示します。

## ログエクスプローラー

[ログエクスプローラー][4]でログとメトリクスを相関させるには

1. **Content** 列の下にあるログをクリックします。これにより、ログに関する詳細情報を含むパネルが展開されます。
2. パネル内の **Metrics** タブをクリックします。

{{< img src="logs/guide/correlate-logs-with-metrics/log-explorer-metrics-tab.jpg" alt="ログエクスプローラーメトリクス" >}}

## ダッシュボード

[ダッシュボード][5]でログとメトリクスを相関させるには

1. ダッシュボードに移動します。
2. ウィジェット内の任意のデータポイントをクリックして、[グラフメニュー][6]にデータを入力します。
3. ウィジェットに**メトリクスと相関させたいログイベント**が含まれている場合
    1. **View related logs** を選択して、関連ログに関する詳細情報をパネルに入力します。
    2. 特定のログイベントを選択します。
    3. **Metrics** タブをクリックします。
4. ウィジェットに**ログと相関させたいメトリクス**が含まれている場合
    1. **View related logs** を選択します。

## メトリクスエクスプローラー

[ログエクスプローラー][7]ページでログとメトリクスを相関させるには

1. グラフ化するメトリクスを選択します。
2. グラフ内の任意のポイントをクリックして、グラフメニューに入力します。
3. **View related logs** を選択します。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/explorer/
[2]: /ja/dashboards/
[3]: /ja/metrics/explorer/
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/dashboard/lists
[6]: /ja/dashboards/#graph-menu
[7]: https://app.datadoghq.com/metric/explorer