---
description: アプリケーションで収集したデータを使って作成した、すぐに使える RUM ダッシュボードを利用できます。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
kind: documentation
title: RUM ダッシュボード
---

## 概要

RUM アプリケーションを作成すると、Datadog は、アプリケーションのパフォーマンス、エラー、リソース、ユーザーセッション、モバイルパフォーマンスに関する[データを収集][1]し、ダッシュボードを生成します。

{{< img src="real_user_monitoring/dashboards/rum_application_overview_dashboard.png" alt="RUM Application Overview ページ" style="width:90%;" >}}

RUM ダッシュボードには、[**Dashboard List**][2] の検索クエリで `RUM` をフィルタリングするか、[**RUM Applications** ページ][3]でダッシュボードの **Application Overview** をクリックすることでアクセスすることができます。

{{< img src="real_user_monitoring/dashboards/available_rum_dashboards.png" alt="すぐに使える RUM ダッシュボード" style="width:90%;" >}}

{{< whatsnext desc="RUM のダッシュボードは、すぐに使える以下のようなものが用意されています。" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u>: ウェブサイトのパフォーマンスとデモグラフィックのグローバルビューを見ることができます。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u>: どのリソースが最も遅いかを分析し、サードパーティのリソースを調査します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u>: ユーザーコンソールに表示されるエラーを、ブラウザやデバイスの種類別に観測します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/frustration_signals_dashboard" >}}<u>Frustration Signals</u>: ユーザーがアプリケーションで最も高い摩擦を感じるフラストレーションシグナルを調査します。 {{< /nextlink >}}
{{< /whatsnext >}}

## RUM ダッシュボードの操作

[ダッシュボード][4]をカスタマイズしたり、[RUM エクスプローラー][5]でアプリケーションのデータを直接探索したりすることができます。

### テンプレート変数

Datadog は、自動的にデフォルトのテンプレート変数のセットを作成する RUM ダッシュボードを生成します。テンプレート変数のドロップダウンメニューを使用して、検索を絞り込むことができます。例えば、`applicationId` テンプレート変数で、特定のアプリケーションをフィルターすることができます。

{{< img src="real_user_monitoring/dashboards/template_variables.mp4" alt="テンプレート変数" video=true style="width:50%;" >}}

### RUM イベントの表示

個々のイベントを調べるには、グラフをクリックし、**View RUM events** をクリックします。これにより、事前に選択された検索フィルターを備えた RUM エクスプローラーにリダイレクトされます。

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="RUM イベントの表示" video=true style="width:80%;" >}}

### ダッシュボードのカスタマイズ

必要に応じて RUM ダッシュボードを複製し、カスタマイズできます。ウィジェットを追加したり、テンプレート変数を変更したりできます。

{{< img src="real_user_monitoring/dashboards/clone_dashboard.png" alt="ダッシュボードの複製" style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/rum/list
[4]: /ja/dashboards/
[5]: /ja/real_user_monitoring/explorer/