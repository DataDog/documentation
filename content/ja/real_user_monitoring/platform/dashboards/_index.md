---
aliases:
- /ja/real_user_monitoring/dashboards
description: すぐに使える RUM ダッシュボードを使用して、アプリケーションのデータとパフォーマンスについてさらに詳しく知ることができます。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
title: RUM ダッシュボード
---

## 概要

RUM アプリケーションを作成すると、Datadog は、アプリケーションのパフォーマンス、エラー、リソース、ユーザーセッションに関する[データを収集][1]し、ダッシュボードを生成します。

{{< img src="real_user_monitoring/dashboards/rum-dashboards-performance-summary.png" alt="RUM アプリケーションの概要ページ" style="width:90%;" >}}

RUM ダッシュボードにアクセスするには、[**ダッシュボードリスト**][2]の検索クエリで `RUM` で絞り込むか、アプリケーションサマリーページ (**Digital Experience > Performance Summary** および **Digital Experience > Product Analytics > Analytics Summary**) からアクセスします。

{{< img src="real_user_monitoring/dashboards/available-rum-dashboards.png" alt="すぐに使える RUM ダッシュボード" style="width:90%;" >}}

{{< whatsnext desc="すぐに使える RUM ダッシュボードには、以下のようなものが用意されています。" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Performance Overviews</u>: Webサイトやアプリのパフォーマンスおよびデモグラフィックの全体像を確認できます。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Testing and Deployment</u>: ブラウザテストのアプリケーションカバレッジを評価し、RUM と Synthetic のデータを使用して追跡するアプリケーションの人気要素を特定します。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Usage</u>: RUM アプリケーションのユーザーセッションおよび使用状況データを分析できます。フラストレーションシグナルも含まれます。 {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Errors</u>: ユーザーコンソールに表示されるエラーを、ブラウザやデバイスの種類別に観測します。 {{< /nextlink >}}
{{< /whatsnext >}}

## RUM ダッシュボードの操作

[ダッシュボード][3]を複製してカスタマイズし、[RUM エクスプローラー][4]でアプリケーションのデータを探索することが可能です。

### テンプレート変数

生成された RUM ダッシュボードには自動的にデフォルトのテンプレート変数セットが含まれています。テンプレート変数のドロップダウンから値を選択して検索範囲を絞り込むことができます。詳細は、[テンプレート変数][5]のドキュメントをご覧ください。

### RUM イベントの表示

個々のイベントを調べるには、グラフをクリックし、**View RUM events** をクリックします。これにより、事前に選択された検索フィルターを備えた RUM エクスプローラーにリダイレクトされます。

{{< img src="real_user_monitoring/dashboards/rum-view-events-2.mp4" alt="RUM イベントの表示" video=true style="width:80%;" >}}

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