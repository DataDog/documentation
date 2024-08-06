---
aliases:
- /ja/synthetics/apm/browser_tests
description: Synthetic ブラウザのテスト結果を表示し、成功または失敗したサンプル実行とテスト実行を比較することができます。
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: ブログ
  text: Synthetic モニタリングでウェブに関する主な指標を監視
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: ドキュメント
  text: Synthetics で RUM とセッションリプレイを確認する
- link: /synthetics/dashboards/browser_test/
  tag: ドキュメント
  text: ブラウザテストパフォーマンスダッシュボードについて
title: ブラウザテストの結果
---

## 概要

テスト実行は、Synthetic テストが実行された後、テストの詳細ページに表示されます。[サンプル結果](#sample-results)は、ある時間間隔と特定の数の場所やデバイスでの最新のテスト実行の合格と不合格を関連付けるものです。

## テストプロパティ

**Properties** セクションでは、テスト ID、テストの作成日および編集日、タグのリスト、テストの優先度、すぐに使える Synthetic [ブラウザテストダッシュボード][11]へのリンクが表示されます。

**Overview** 
: このセクションでは、テスト URL、ロケーション数、デバイス数、テスト間隔、およびカスタムステップを含むテストステップ数について説明します。

**Monitor**
: このセクションには、[Synthetic テストのモニター][13]の名前と、設定した通知メッセージが含まれています。

**CI/CD Execution**
: このセクションには、[Continuous Testing CI パイプライン][19]の一部として実行されているこのテストの[実行ルール][12]を変更するためのドロップダウンメニューが含まれています。

## テスト履歴

**History** セクションでは、3 つのグラフを見ることができます。

- **Global Uptime** グラフは、指定された時間間隔におけるすべてのテストロケーションの合計アップタイムを表示します。グローバルアップタイムは、テストに構成された[アラート条件][20]を考慮したものです。
- **Time-to-interactive by location and device** グラフは、ページがインタラクティブに操作できるようになるまでの時間を秒単位で表示します。アップタイムモニタリングの詳細については、[SLO による Web サイトアップタイムモニタリング][14]ガイドを参照してください。
- **Test duration by location and device** グラフは、それぞれの場所とデバイスが与えられた時間間隔で完了するのにかかる時間を分単位で表示します。

{{< img src="synthetics/browser_tests/history.png" alt="テスト詳細ページの履歴とサンプル実行のセクション" style="width=80%" >}}

## 結果例

ブラウザテスト実行には、[スクリーンショット](#screenshots-and-actions)、[ページパフォーマンスデータ](#page-performance)、[エラー](#errors-and-warnings)、[リソース](#resources)、[バックエンドのトレース](#backend-traces)などのコンポーネントが含まれており、[テストが失敗](#failed-results)した場合のトラブルシューティングに役立ちます。

**Sample Runs** セクションでは、失敗した最新のテスト実行を調べ、最近成功したテスト実行と比較することができます。

### Overview 属性

Status
: テスト実行のステータス (`PASSED` または `FAILED`)。

Starting URL
: ブラウザのテストシナリオの URL。

Steps
: サンプル実行で完了したテストステップの数。

Duration
: テストの実行にかかった時間。

Location
: テストが実行されたマネージドまたはプライベートロケーション。

Device
: テストが実行されたデバイスのタイプ。

Browser
: テストが実行されたブラウザのタイプ。

Time ran
: テストが実行されてから経過した時間。

Run type
: テスト実行のタイプ (CI、高速リトライ、手動トリガー、またはスケジュール)。

### RUM セッション

[RUM エクスプローラー][22]で関連するセッションや利用可能なリプレイを表示するには、**View Session in RUM** をクリックします。[セッションリプレイ][23]で特定のアクションやステップのユーザーセッションにアクセスするには、**Replay Session** をクリックします。詳しくは、[Synthetics で RUM とセッションリプレイを確認する][16]を参照してください。

### スクリーンショットとアクション

実行されたすべてのテストステップには、ステップアクションのスクリーンショット、セッションリプレイのセッションへのリンク、ステップの説明、指定したステップの開始 URL、ステップ ID、ステップ時間、およびページパフォーマンス情報が含まれます。

### ページのパフォーマンス

Synthetic Monitoring は、2つの [Core Web Vital メトリクス][6] ([Largest Contentful Paint][2] と [Cumulative Layout Shift][3]) をラボメトリクスとして、各ステップの URL の右側にピルで表示します。

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Synthetic ラボメトリクス" style="width:100%" >}}

[初回入力遅延][4]は、[リアルユーザーモニタリング][5]を使用して、リアルユーザーデータを収集している場合にリアルメトリクスとして利用できます。詳しくは、[ページパフォーマンスの監視][6]をご覧ください。

### エラーと警告

**Errors** ピルをクリックして、**Errors &amp; Warnings** タブにアクセスし、エラーの種類 (`js` または `network`) とステータス (ネットワークのステータスコード) に分けてエラーのリストを確認します。

{{< img src="synthetics/browser_tests/test_results/errors_pill.png" alt="エラーピル" style="width:100%" >}}

このエラータイプは、ブラウザテストがページと相互作用するときに記録されます。これは、ページが開かれてからページとやりとりできるようになるまでの間に収集されたエラーに対応します。表示されるエラーの最大数は 8 個で、例えば、2 つの `network` エラーと 6 つの `js` エラーが表示されます。

### リソース

**Resources** のピルをクリックして、**Resources** タブにアクセスし、**Fully Loaded** の下の総ステップ持続時間やリソースを提供する CDN プロバイダーを含むリクエストとアセットの組み合わせを調べます。

{{< img src="synthetics/browser_tests/test_results/resources_pill.png" alt="リソースピル" style="width:100%" >}}

検索バーでは、リソースを種類でフィルターしたり、名前で検索したりすることができます。表示可能なリソースの最大数は 100 です。リソースは開始された時間順に並び、Datadog では最初の 100 個が表示されます。

{{< img src="synthetics/browser_tests/resources_panel.png" alt="リソースパネル" style="width:100%" >}}

Relative Time
: インタラクション時間全体におけるリソースの継続期間。

CDN
: リソースを提供した CDN プロバイダー。CDN プロバイダーのアイコンにカーソルを合わせると、生のキャッシュのステータスが表示されます。 
Datadog は、Akamai、Cloudflare、Fastly、Amazon Cloudfront、Netlify、Google Cloud CDN、Imperva、および Sucuri を検出します。

Resource
: リソースの URL。

Type
: リソースの種類 (HTML、Download、CSS、Fetch、Image。JavaScript、XHR、または Other)。

Method
: リクエストの方法。

Protocol
: リクエストのプロトコル。

Status
: HTTP 応答ステータスコード。

Duration
: リクエストの実行に必要な時間。

Size
: リクエスト応答のサイズ。

### バックエンドトレース

**Traces** のピルをクリックして **Traces** タブにアクセスし、ブラウザテストに関連する APM トレースを検索します。UI はトレースエクスプローラーの[トレースビュー][7]と似ていますが、1 つのブラウザテストステップは異なる URL またはエンドポイントに複数のリクエストを行うことができます。この結果、トレースのセットアップと、[Synthetic Monitoring Settings ページ][8]でブラウザテスト用に許可した URL に応じて、関連するトレースが複数発生します。

クロスプロダクト相関の詳細については、[クロスプロダクト相関で容易にトラブルシューティング][21]のガイドを参照してください。

### ステップ実行時間

ステップ実行時間は、[Datadog ロケーターシステム][9]でステップが実行されるまでの時間を表します。ステップ実行時間にはアクション (ユーザーのインタラクションなど) が含まれるだけでなく、ブラウザテストで要素がインタラクション可能であることを確認するための待機と再試行のメカニズムも組み込まれています。詳しくは、[ブラウザテストステップの高度なオプション][9]をご覧ください。

## 失敗した結果

テスト結果は、アサーションを満たさない場合、または別の理由によりステップが失敗した場合に `FAILED` とみなされます。スクリーンショットを確認し、ステップレベルでの[エラー](#errors-and-warnings)の可能性をチェックしたり、ステップにより生成された[リソース][17]と[バックエンドトレース](#backend-traces)を確認したりして、失敗したランのトラブルシューティングを実行します。

一般的なブラウザテストのエラーには、以下が含まれます。

`Element located but it's invisible` 
: 要素はページにあるものの、クリックできない。たとえば、別の要素で覆われている、など。

`Cannot locate element`
: HTML で要素が見つけられない。

`Select did not have option`
: 指定されたオプションがドロップダウンメニューにない。

`Forbidden URL`
: テストでサポートされていないプロトコルが発生した可能性があります。詳細は、[サポートまでお問い合わせ][10]ください。

`General test failure`
: 一般的なエラーメッセージ。詳細は、[サポートチームまでお問い合わせください][10]。

## テストイベント

Synthetic テストモニターからのアラートは、**Test Runs** の下の **Events** タブに表示されま す。イベントエクスプローラーで Synthetic テストからのアラートを検索するには、[**Events** >  **Explorer**][18] に移動して、検索クエリに `Event Type:synthetics_alert` を入力します。詳細については、[Synthetic テストモニターを利用する][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /ja/real_user_monitoring/
[6]: /ja/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[7]: /ja/tracing/trace_explorer/trace_view/
[8]: /ja/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /ja/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /ja/help/
[11]: /ja/synthetics/dashboards/browser_test/
[12]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /ja/synthetics/guide/synthetic-test-monitors/
[14]: /ja/synthetics/guide/uptime-percentage-widget/
[15]: /ja/real_user_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /ja/synthetics/guide/explore-rum-through-synthetics/
[17]: /ja/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /ja/continuous_testing/cicd_integrations
[20]: /ja/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /ja/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /ja/real_user_monitoring/explorer
[23]: /ja/real_user_monitoring/session_replay