---
aliases:
- /ja/real_user_monitoring/dashboards
description: すぐに使える RUM ダッシュボードを使用して、アプリケーションのデータとパフォーマンスについてさらに詳しく知ることができます。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
kind: ドキュメント
title: RUM ダッシュボード
---

## 概要

RUM アプリケーションを作成すると、Datadog は、アプリケーションのパフォーマンス、エラー、リソース、ユーザーセッションに関する[データを収集][1]し、ダッシュボードを生成します。

{{< img src="real_user_monitoring/rum-performance-summary-2.png" alt="RUM Application Overview ページ" style="width:90%;" >}}

Access your RUM dashboards by filtering for `RUM` in the search query of the [**Dashboard List**][2] or from your application summary pages (**Digital Experience > Performance Summary** and **Digital Experience > Product Analytics > Analytics Summary**).

{{< img src="real_user_monitoring/dashboards/available_rum_dashboards-2.png" alt="すぐに使える RUM ダッシュボード" style="width:90%;" >}}

{{< whatsnext desc="You can explore the following out-of-the-box RUM dashboards:" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Performance Overviews</u>: See a global view of your website/app performance and demographics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Testing and Deployment</u>: Evaluate your browser tests' application coverage and identify popular elements in your application to track using RUM and Synthetics data. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Usage</u>: Analyze user session and usage data for your RUM applications, including frustration signals. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Errors</u>: Observe errors that appear in user consoles by browser and device type. {{< /nextlink >}}
{{< /whatsnext >}}

## RUM ダッシュボードの操作

[ダッシュボード][3]を複製してカスタマイズし、[RUM エクスプローラー][4]でアプリケーションのデータを探索することが可能です。

### テンプレート変数

生成された RUM ダッシュボードには自動的にデフォルトのテンプレート変数セットが含まれています。テンプレート変数のドロップダウンから値を選択して検索範囲を絞り込むことができます。詳細は、[テンプレート変数][5]のドキュメントをご覧ください。

### RUM イベントの表示

個々のイベントを調べるには、グラフをクリックし、**View RUM events** をクリックします。これにより、事前に選択された検索フィルターを備えた RUM エクスプローラーにリダイレクトされます。

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="RUM イベントの表示" video=true style="width:80%;" >}}

### ダッシュボードのカスタマイズ

RUM ダッシュボードを複製するには、**Settings** アイコンをクリックし、**Clone dashboard** を選択します。ウィジェット、パワーパック、アプリを追加するには、一番下までスクロールして、**+** アイコンをクリックします。

また、テンプレート変数を変更し、[保存ビュー][6]を作成することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ja/dashboards/
[4]: /ja/real_user_monitoring/explorer/
[5]: /ja/dashboards/template_variables
[6]: /ja/real_user_monitoring/explorer/saved_views/