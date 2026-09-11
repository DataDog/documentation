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
## 概要 {#overview}

RUM アプリケーションを作成すると、Datadog は、アプリケーションのパフォーマンス、エラー、リソース、ユーザーセッションに関する[データを収集][1]し、ダッシュボードを生成します。

{{< img src="real_user_monitoring/dashboards/rum-dashboards-performance-summary.png" alt="RUM アプリケーション表示ページ" style="width:90%;" >}}

[{{< ui >}}Dashboard List{{< /ui >}}][2] の検索クエリで `RUM` をフィルタリングするか、アプリケーションの概要ページ ({{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} および {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Analytics Summary{{< /ui >}}) から RUM ダッシュボードにアクセスします。

{{< img src="real_user_monitoring/dashboards/available-rum-dashboards.png" alt="すぐに使える RUM ダッシュボード" style="width:90%;" >}}

{{< whatsnext desc="すぐに使える以下の RUM ダッシュボードを探索できます。" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>パフォーマンス表示</u>: Web サイト/アプリのパフォーマンスとデモグラフィックの表示を確認します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>テストとデプロイ</u>: ブラウザテストのアプリケーションカバレッジを評価し、アプリケーション内の人気のある要素を RUM と Synthetic のデータを使用して追跡する要素として特定します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>使用状況</u>: RUM アプリケーションのユーザーセッションと使用状況データを分析します（フラストレーションシグナルを含む）。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>エラー</u>: ブラウザおよびデバイスタイプ別に、ユーザーコンソールに表示されるエラーを監視します。{{< /nextlink >}}
{{< /whatsnext >}}

## RUM ダッシュボードの操作 {#interact-with-rum-dashboards}

[ダッシュボード][3]を複製してカスタマイズし、[RUM エクスプローラー][4]でアプリケーションのデータを探索することが可能です。

### テンプレート変数 {#template-variables}

生成された RUM ダッシュボードには、デフォルトのテンプレート変数のセットが自動的に含まれます。テンプレート変数のドロップダウンを使用して値を選択し、検索を絞り込みます。詳細については、[テンプレート変数][5]のドキュメントを参照してください。

### RUM イベントの表示 {#view-rum-events}

個々のイベントを調査するには、グラフをクリックして {{< ui >}}View RUM events{{< /ui >}} をクリックします。これにより、検索フィルターが事前に選択された状態で RUM エクスプローラーに移動します。

{{< img src="real_user_monitoring/dashboards/rum-view-events-2.mp4" alt="RUM イベントの表示" video=true style="width:80%;" >}}

### ダッシュボードのカスタマイズ {#customize-dashboards}

RUM ダッシュボードを複製するには、{{< ui >}}Settings{{< /ui >}} アイコンをクリックして {{< ui >}}Clone dashboard{{< /ui >}} を選択します。ウィジェット、パワーパック、またはアプリを追加するには、一番下までスクロールして {{< ui >}}\+{{< /ui >}} アイコンをクリックします。

また、テンプレート変数を変更し、[保存ビュー][6]を作成することができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ja/dashboards/
[4]: /ja/real_user_monitoring/explorer/
[5]: /ja/dashboards/template_variables
[6]: /ja/real_user_monitoring/explorer/saved_views/