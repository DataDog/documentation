---
description: すぐに使える RUM ダッシュボードを使用して、アプリケーションのデータとパフォーマンスについてさらに詳しく知ることができます。
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
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u>: Web サイトのパフォーマンスとデモグラフィックのグローバルビューを見ることができます。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/frustration_signals_dashboard" >}}<u>Frustration Signals</u>: ユーザーがアプリケーションで最も高い摩擦を感じるフラストレーションシグナルを調べます。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/testing_coverage" >}}<u>Testing Coverage</u>: ブラウザテストのアプリケーションカバレッジを評価し、RUM と Synthetic のデータを使用して追跡するアプリケーションの人気要素を特定します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/user_sessions_dashboard" >}}<u>User Sessions</u>: RUM アプリケーションのユーザーセッションと使用量データを分析します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u>: ユーザーコンソールに表示されるエラーを、ブラウザやデバイスの種類別に観測することができます。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u>: どのリソースが最も遅いかを分析し、サードパーティのリソースを調査します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/mobile_dashboard" >}}<u>Mobile</u>: モバイル RUM アプリケーションの画面表示、エラー、クラッシュを観測することができます。 {{< /nextlink >}}
{{< /whatsnext >}}

## RUM ダッシュボードの操作

[ダッシュボード][4]を複製してカスタマイズし、[RUM エクスプローラー][5]でアプリケーションのデータを探索することが可能です。

### テンプレート変数

生成された RUM ダッシュボードは、自動的にデフォルトのテンプレート変数のセットを含みます。テンプレート変数のドロップダウンメニューを使用して、検索を絞り込むことができます。例えば、`applicationId` テンプレート変数で、特定のアプリケーションをフィルターすることができます。

{{< img src="real_user_monitoring/dashboards/template_variables.mp4" alt="テンプレート変数" video=true style="width:50%;" >}}

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
[3]: https://app.datadoghq.com/rum/list
[4]: /ja/dashboards/
[5]: /ja/real_user_monitoring/explorer/
[6]: /ja/real_user_monitoring/explorer/saved_views/