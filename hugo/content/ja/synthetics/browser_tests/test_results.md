---
aliases:
- /ja/synthetics/apm/browser_tests
description: Synthetic ブラウザテストの結果を表示し、成功または失敗したサンプル実行をテスト実行と比較します。
further_reading:
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: ドキュメント
  text: Synthetics で RUM と Session Replay をチェックする
- link: /synthetics/dashboards/browser_test/
  tag: ドキュメント
  text: ブラウザテストパフォーマンスダッシュボードについて学ぶ
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: ラーニングセンター
  text: Synthetic Monitoring とブラウザテストを開始する
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: ブログ
  text: Synthetic Monitoring で Core Web Vitals を監視する
- link: https://www.datadoghq.com/blog/bits-investigation-synthetic-tests/
  tag: ブログ
  text: Bits Investigation を使用して Synthetic テストの失敗を迅速にトリアージする
title: ブラウザテスト結果
---
## 概要 {#overview}

テスト詳細ページは、Synthetic ブラウザテストの実行後に開き、[{{< ui >}}Activity{{< /ui >}}](#test-activity)、[{{< ui >}}Test Runs{{< /ui >}}](#test-runs)、[{{< ui >}}Performance{{< /ui >}}](#test-performance)、および[{{< ui >}}Properties{{< /ui >}}](#test-properties) の 4 つのタブで構成されています。これらのタブを使用して、稼働状況を監視し、個々の実行を調査し、集計されたパフォーマンスメトリクスを確認し、テスト構成を管理します。実行が失敗した場合は、AI による失敗の要約やスクリーンショットの比較などのトラブルシューティングツールに関する[失敗した結果](#failed-results)を参照してください。

## テストアクティビティ {#test-activity}

{{< ui >}}Activity{{< /ui >}} タブでは、以下を確認できます。

- 指定された時間間隔におけるすべてのテストロケーションの合計稼働時間を表示する {{< ui >}}Global Uptime{{< /ui >}} グラフ。グローバル稼働時間の可視化は、指定された時間間隔でテストに対して構成された [アラート条件][20] がトリガーされた場合にのみ赤色で表示されます。ロケーションの稼働時間は再試行完了後の最終テスト結果に基づいて計算されるため、[高速再試行][24] の間隔は合計稼働時間グラフに表示される内容に直接影響します。稼働状況を監視する方法の詳細については、[SLO を使用した Web サイト稼働状況監視][14] ガイドを参照してください。
- アラートのトリガー、復旧、およびテスト変更の {{< ui >}}Timeline{{< /ui >}}。
- 選択したタイムラインイベントの {{< ui >}}Summary{{< /ui >}} パネル。何が起こったか、失敗した結果、および調査のための推奨される次のステップを表示します。

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="ブラウザのテスト詳細ページの「アクティビティ」タブ。グローバル稼働時間、アラートタイムライン、および Bits Investigation を含む失敗詳細パネルが表示されます。" style="width:100%;" >}}

## テスト実行 {#test-runs}

{{< ui >}}Test Runs{{< /ui >}} タブでは、テストのすべての実行を確認できます。ステータス (成功または失敗)、実行タイプ、場所、またはデバイスでフィルタリングし、任意の行をクリックして、その実行を詳細に調査します。

{{< img src="synthetics/browser_tests/synthetics_test_runs.png" alt="ブラウザテスト詳細ページの「テスト実行」タブ。ステータス、日付、実行タイプ、ステップ、期間、場所、デバイス、ブラウザ、およびテストバージョンの列がある、フィルタリング可能なテスト実行テーブルが表示されます。" style="width:100%" >}}

ブラウザテスト実行には、[スクリーンショット](#screenshots-and-actions)、[ページパフォーマンスデータ](#test-performance)、[エラー](#errors-and-warnings)、[リソース](#resources)、[バックエンドトレース](#backend-traces)などのコンポーネントが含まれており、[テストの失敗](#failed-results)のトラブルシューティングに役立ちます。

{{% collapse-content title="テスト実行の列" level="h3" %}}

以下は、{{< ui >}}Test Runs{{< /ui >}} テーブルの各列の説明です。

ステータス
: テスト実行ステータス (`PASSED` または `FAILED`)。

日付
: 実行された相対時間とタイムスタンプ。

実行タイプ
: テスト実行タイプ (スケジュール実行、CI 実行、または手動実行)。

ステップ
: 実行に対して構成された合計ステップのうち、完了したテストステップの数。

所要時間
: テスト実行が完了するまでにかかった時間。

場所
: テストが実行された管理対象または非公開の場所。

デバイス
: テストが実行されたデバイスのタイプ。

ブラウザ
: テストが実行されたブラウザのタイプ。

テストバージョン
: 実行に使用されたテスト構成のバージョン。

{{% /collapse-content %}}

### RUM セッション {#rum-sessions}

関連するセッションや利用可能なリプレイを [RUM Explorer][22] で表示するには、{{< ui >}}View Session in RUM{{< /ui >}} をクリックします。特定のアクションまたはステップのユーザーセッションに [Session Replay][23] でアクセスするには、{{< ui >}}Replay Session{{< /ui >}} をクリックします。詳細については、[Synthetic Monitoring で RUM & Session Replay をチェックする][16] を参照してください。

### スクリーンショットとアクション {#screenshots-and-actions}

実行されたすべてのテストステップには、ステップアクションのスクリーンショット、Session Replay 内のセッションへのリンク、ステップの説明、特定のステップの開始 URL、ステップ ID、ステップの所要時間、およびページパフォーマンス情報が含まれています。

### エラーと警告 {#errors-and-warnings}

{{< ui >}}Errors{{< /ui >}} ピルをクリックして {{< ui >}}Errors & Warnings{{< /ui >}} タブにアクセスし、エラータイプ (`js` または `network`) およびステータス (ネットワークステータスコード) ごとに分類されたエラーリストを確認します。

{{< img src="synthetics/browser_tests/test_results/synthetics_errors.png" alt="各ステップで Errors ピルが強調表示されたブラウザテスト実行の詳細。クリックして Errors & Warnings タブを開く場所を示しています。" style="width:100%" >}}

{{< ui >}}Errors & Warnings{{< /ui >}} タブには、エラータイプ (`js` または `network`) およびステータス (ネットワークステータスコード) ごとに分類されたエラーリストが表示されます。

エラータイプは、ブラウザテストがページとやり取りする際に記録されます。これは、ページが開かれた時点からページを操作できる時点までの間に収集されたエラーに対応しています。表示可能なエラーの最大数は 8 です。例: 2 `network` + 6 `js` エラー。

### リソース {#resources}

{{< ui >}}Resources{{< /ui >}} ピルをクリックして {{< ui >}}Resources{{< /ui >}} タブにアクセスし、{{< ui >}}Fully Loaded{{< /ui >}} の下の合計ステップ所要時間やリソースを提供している CDN プロバイダーなど、リクエストとアセットの組み合わせを確認します。

{{< img src="synthetics/browser_tests/test_results/synthetics_resources.png" alt="各ステップで Resources ピルが強調表示されたブラウザテスト実行の詳細。Resources タブを開くためにクリックする場所を示しています。" style="width:100%" >}}

タイプ別にリソースをフィルタリングしたり検索バーを使って名前で検索したりできます。表示可能なリソースの最大数は 100 です。リソースは開始時間順に並べられ、Datadog で最初の 100 件が表示されます。

{{% collapse-content title="リソースタブ列" level="h4" %}}

以下は {{< ui >}}Resources{{< /ui >}} タブの列ヘッダーの説明です。

相対時間 
: テストステップでリソースの読み込みが開始された時点。

CDN
: リソースを提供した CDN プロバイダー。CDN プロバイダーのアイコンにカーソルを合わせると、生のキャッシュステータスを確認できます。 
Datadog 、Akamai、Cloudflare、Fastly、Amazon Cloudfront、Netlify、Google Cloud CDN、Imperva、および Sucuri を検出します。

リソース
: リソースの URL。

タイプ
: リソースのタイプ (HTML、Download、CSS、Fetch、Image、JavaScript、XHR、または Other)。

メソッド
: リクエストのメソッド。

プロトコル
: リクエストのプロトコル。

ステータス
: HTTP レスポンスステータスコード。

所要時間
: リクエストの実行に必要な時間。

サイズ
: リクエストレスポンスのサイズ。

{{% /collapse-content %}}

Fetch および XHR リソースの場合、リソース行をクリックすると、そのリクエストとレスポンスのヘッダーおよび本文を表示できます。ペイロードの詳細は、テストの [詳細オプション][28] で {{< ui >}}Capture HTTP payloads{{< /ui >}} が有効になっている場合にのみ利用可能です。

### バックエンドトレース {#backend-traces}

{{< ui >}}Traces{{< /ui >}} ピルをクリックして {{< ui >}}Traces{{< /ui >}} タブにアクセスし、ブラウザテストに関連付けられた APM トレースを表示します。UI は Trace Explorer の [トレースビュー][7] と似ていますが、1 つのブラウザテストステップで異なる URL やエンドポイントに対して複数のリクエストを行うことができます。これにより、トレースの設定や、[Synthetic Monitoring Settings ページ][8] でブラウザテストに対して許可した URL に応じて、関連する複数のトレースが生成されます。

製品間の相関関係の詳細については、[Ease Troubleshooting With Cross-Product Correlation][21] ガイドを参照してください。

### ステップの所要時間 {#step-duration}

ステップの所要時間とは、[Datadog ロケーターシステム][9] を使用してステップが完全に読み込まれたとみなされるまでにかかる時間のことです。詳細については、[ブラウザテストにおけるステップ所要時間の決定方法][25] を参照してください。

テストが最大実行時間に達した場合、タイムアウトメッセージは合計所要時間にテストステップとシステムオーバーヘッドの両方が含まれていることを示します。その結果、報告されるテスト実行時間は個々のステップの所要時間の合計と異なる場合があります。

{{< img src="synthetics/browser_tests/test_results/test_execution_error.png" alt="次のように記載されたテスト実行時間のタイムアウトエラーメッセージ。「最大テスト実行時間に達しました。これにはテストステップとシステムオーバーヘッドが含まれるため、報告されるテスト実行時間は異なる場合があります」。" style="width:90%;" >}}

## テストパフォーマンス {#test-performance}

{{< ui >}}Performance{{< /ui >}} タブでは、テストのすべての実行における集計パフォーマンスメトリクスを確認できます。

- **各ブラウザタイプのブラウザ成功率**カード: (Chrome、Firefox、Edge)。選択した時間間隔における合格した実行の割合を表示します。
- **ブラウザタイプ別の平均テスト実行時間**および**場所とデバイス別の平均テスト実行時間**グラフ。各ブラウザ、場所、デバイスが特定の時間間隔でテストを完了するまでにかかる時間を表示します。
- **p75 Largest Contentful Paint** および **p75 Cumulative Layout Shift** グラフ。実行全体で集計されたこれらの [Core Web Vital メトリクス][6] の 75 パーセンタイルを表示します。

{{< img src="synthetics/browser_tests/synthetics_browser_graphs.png" alt="ブラウザテスト詳細ページのパフォーマンスタブ。Chrome、Firefox、Edge の成功率、ブラウザタイプおよび場所別のテスト実行時間グラフ、p75 LCP および CLS Core Web Vital メトリクスが表示されています" style="width=80%" >}}

個々のテスト実行内では、[Largest Contentful Paint][2] および [Cumulative Layout Shift][3] が各ステップ URL の右側にピルとして表示されます。[First Input Delay][4] は、[Real User Monitoring][5] を使用して実際のユーザーデータを収集している場合に実際のメトリクスとして利用できます。詳細については、[ページパフォーマンスの監視][6] を参照してください。

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="合成ラボメトリクス" style="width:100%" >}}

## テストプロパティ {#test-properties}

{{< ui >}}Properties{{< /ui >}} タブには、テストに関連付けられた構成の詳細、所有者情報、および統合が含まれています。左側のナビゲーションを使用して、セクションを切り替えます。

{{< img src="synthetics/browser_tests/synthetics_properties_tab.png" alt="ブラウザテスト詳細ページのプロパティタブ。所有権、実行、モニターの各セクションと、Continuous Testing、Parent Tests、その他の構成のための左ナビゲーションが表示されています" style="width=80%" >}}

{{% collapse-content title="Properties タブセクション" level="h3" %}}

以下は、{{< ui >}}Properties{{< /ui >}} タブで利用可能な各セクションの説明です。

{{< ui >}}Ownership{{< /ui >}}
: テストの所有者、編集者、作成日、最終更新日、環境、チーム、およびタグを表示します。テストは、すぐに使用できる合成 [ブラウザテストダッシュボード][11] にもリンクしています。

{{< ui >}}Execution{{< /ui >}}
: テストの頻度、アラート条件、および再試行の動作を表示します。

{{< ui >}}Monitor{{< /ui >}}
: [Synthetic テストモニター][13] の名前、優先度、構成された受信者、および通知メッセージが含まれます。

{{< ui >}}Continuous Testing{{< /ui >}}
: このテストが [Continuous Testing CI パイプライン][19] の一部として実行される際に使用される [実行ルール][12] を設定します。

{{< ui >}}Parent Tests{{< /ui >}}
: このテストを参照しているテスト (サブテストとして含むマルチステップテストなど) を一覧表示します。

{{< ui >}}Parent Suites{{< /ui >}}
: このテストが属する [テストスイート][26] を一覧表示します。

{{< ui >}}Downtimes{{< /ui >}}
: 計画メンテナンス期間中など、このテストの実行を一時停止する [スケジュールされたダウンタイム][27] を一覧表示します。

{{< ui >}}Configuration as Code{{< /ui >}}
: テストをコードとして管理するために、Terraform などの形式でテスト構成をエクスポートします。

{{% /collapse-content %}}

## 失敗した結果 {#failed-results}

テスト結果は、アサーションを満たさない場合または何らかの理由でステップが失敗した場合に `FAILED` とみなされます。失敗した実行のトラブルシューティングを行うには、スクリーンショットを確認し、ステップレベルで潜在的な[エラー](#errors-and-warnings)がないかチェックし、ステップによって生成された [リソース][17] と[バックエンドトレース](#backend-traces)を調査します。

### AI エラー概要 {#ai-failure-summaries}

ブラウザテストの実行が失敗すると、Datadog は AI エラー概要を生成し、原因の特定と調査の次のステップを支援します。各概要には以下が含まれます。

- ネットワークエラー、アサーション、スクリーンショットなどの実行データに基づいた、エラー内容の簡潔な説明。
- エラーの分類。**True エラー** (アプリケーションの実際の問題) または**テストの誤設定** (テスト設定の問題) のいずれかとして分類されます。
- トラブルシューティングのための推奨される次のステップ。

AI エラー概要は、失敗したすべてのブラウザテスト実行のテスト実行詳細ページに表示されます。LLM が生成するコンテンツには不正確な情報が含まれる可能性があるため、これらは決定的な根本原因分析ではなく調査の出発点として扱います。概要にある 👍 ボタンと 👎 ボタンを使用してフィードバックを共有し、今後の結果の改善にご協力ください。

{{< img src="synthetics/browser_tests/test_results/synthetics_ai_summaries_new.png" alt="失敗したブラウザテスト実行における AI エラー概要パネル" style="width:100%" >}}

### スクリーンショットを比較する {#compare-screenshots}

調査を支援するために、{{< ui >}}Compare Screenshots{{< /ui >}} をクリックすると、エラー結果と前回の成功した実行のスクリーンショットを並べて表示できます。この比較は、テストエラーの原因となった可能性のある違いを見つける上で役立ちます。

{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="エラーになった実行と成功した実行のスクリーンショットを比較する" style="width:90%;" >}}

**注**: 比較は、同じバージョン、開始 URL、デバイス、ブラウザ、および実行タイプ (スケジュール、手動トリガー、CI/CD) を持つ 2 つのテスト実行間で行われます。同じパラメーターを持つ以前の成功した実行がない場合、比較は提供されません。
### 一般的なブラウザテストエラー {#common-browser-test-errors}

`Element located but it's invisible`
: 要素はページ上に存在しますが、クリックできません。たとえば、別の要素がその上に重なっている場合などです。

`Cannot locate element`
: HTML 内に要素が見つかりません。

`Select did not have option`
: 指定されたオプションがドロップダウンメニューにありません。

`Forbidden URL`
: テストはサポートされていないプロトコルに遭遇した可能性があります。詳細については、[サポートにお問い合わせ][10] ください。

`General test failure`
: 一般的なエラーメッセージ。詳細については、[サポートにお問い合わせ][10] ください。

## テストイベント {#test-events}

Synthetic テストモニターからのアラートは、[{{< ui >}}Activity{{< /ui >}} タブ](#test-activity)のタイムラインに表示されます。ここでは、アラートのトリガー、復旧、テストの変更をグローバル稼働時間グラフと並べて確認できます。Events エクスプローラーで Synthetic テストからのアラートを検索するには、[{{< ui >}}Events{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][18] に移動し、検索クエリに `@evt.type:synthetics_alert` と入力します。詳細については、[Synthetic テストモニターの使用][13] を参照してください。

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /ja/real_user_monitoring/
[6]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /ja/tracing/trace_explorer/trace_view/
[8]: /ja/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /ja/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /ja/help/
[11]: /ja/synthetics/dashboards/browser_test/
[12]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /ja/synthetics/guide/synthetic-test-monitors/
[14]: /ja/synthetics/guide/uptime-percentage-widget/
[15]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /ja/synthetics/guide/explore-rum-through-synthetics/
[17]: /ja/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /ja/continuous_testing/cicd_integrations
[20]: /ja/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /ja/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /ja/real_user_monitoring/explorer
[23]: /ja/real_user_monitoring/session_replay
[24]: /ja/synthetics/browser_tests/?tab=requestoptions#fast-retry
[25]: /ja/synthetics/guide/step-duration/
[26]: /ja/synthetics/test_suites/
[27]: /ja/synthetics/platform/downtime/
[28]: /ja/synthetics/browser_tests/#advanced-options