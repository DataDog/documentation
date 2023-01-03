---
aliases:
- /ja/synthetics/apm/browser_tests
description: Synthetic ブラウザテストの結果
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: ブログ
  text: Synthetic モニタリングでウェブに関する主な指標を監視
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: ドキュメント
  text: Synthetics で RUM とセッションリプレイを確認する
kind: ドキュメント
title: ブラウザテストの結果
---

## 概要

テスト結果は、Synthetic テストの実行後に表示されます。ブラウザテストの結果は、ある時点に特定の場所、ブラウザ、デバイスタイプで実行されたテストデータが反映されます。

最新の失敗したテストを確認し、**Sample Results** セクションで最近成功したテストと比較します。**Test Results** セクションにスクロールダウンしてテスト結果をクリックすると、結果を詳細比較することができます。

[ブラウザテストの結果](#test-results)には、[スクリーンショット](#screenshots)、[ページパフォーマンスデータ](#page-performance)、[エラー](#errors)、[リソース](#resources)、[バックエンドのトレース](#backend-traces)などのコンポーネントが含まれており、[テストが失敗](#failed-test-result)した場合のトラブルシューティングに役立ちます。

## テスト結果

以下のテスト結果の特徴が、各ブラウザのテスト結果の上部に表示されます。

Status
: テスト結果のステータス (アラートまたは OK)。

Starting URL
: ブラウザのテストシナリオの URL。

Completed steps
: 結果データの中で完了したテストステップの数。

Duration
: テストを実行するために要した時間。

Location
: テストが実行されたマネージドまたはプライベートロケーション。

Device
: テストが実行されたデバイスのタイプ。

Browser
: テストが実行されたブラウザのタイプ。

Time ran
: テストを実行した時間。

Run type
: テストランのタイプ (CI、高速リトライ、手動トリガー、またはスケジュール)。

### スクリーンショット

ブラウザテストでは、実行されたテストステップごとにスクリーンショットが表示されます。スクリーンショットは、ブラウザテストがたどったジャーニーを可視化するのに役立ちます。

### ページのパフォーマンス

完全な URL がロードされるすべてのステップには、ページのパフォーマンス情報が含まれます。

#### ユーザーエクスペリエンス

[Google のコアウェブバイタル][1]は、サイトのユーザーエクスペリエンスを監視するために設計された 3 つのメトリクスのセットです。これらのメトリクスは、負荷パフォーマンス、対話性、視覚的安定性のビューを提供することに重点を置いています。各メトリクスには、優れたユーザーエクスペリエンスにつながる値の範囲に関するガイダンスが付属しています。

Synthetic モニタリングには、[Largest Contentful Paint][2] と [Cumulative Layout Shift][3] の 2 つの利用可能なラボメトリクスが含まれています。

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="コアウェブバイタルの概要の視覚化" style="width=80%" >}}

[初回入力遅延][4]は、[リアルユーザーモニタリング][5]を使用して、リアルユーザーとフィールドのデータを収集している場合に利用できます。詳しくは、[ページパフォーマンスの監視][6]をご覧ください。

### エラー

**Error** パネルには、エラー、種類 (`js`/`network`)、状況（ネットワークステータスコード）が表示されます。

エラーの種類はページの操作中に記録されます。ページが開かれそのページとの通信中に収集されたエラーに対応します。

表示できるエラーの数は最大で 8個です（例、2 `network` + 6 `js`）。

### リソース

リソースは、リクエストとアセットの組み合わせです。

{{< img src="synthetics/browser_tests/resources_panel.png" alt="リソースパネル"  >}}

リソースタブの上に、以下のように表示されます。
- 総ステップ持続時間
- リソースを提供している CDN プロバイダーと、それぞれのキャッシュステータスの概要

**Resources** タブには次が表示されます。

Resource
: リソースの URL。

CDN
: リソースを提供した CDN プロバイダー。カーソルを合わせると、生のキャッシュの状態が表示されます。  
Datadog は、Akamai、Cloudflare、Fastly、Amazon Cloudfront、Netlify、Google Cloud CDN、Imperva、および Sucuri を検出します。

Type
: リソースの種類 (HTML、CSS、画像、Javascript、XHR など)。

Status
: HTTP 応答ステータスコード。

Duration
: リクエストの実行に必要な時間。

% Total Time 
: インタラクション時間全体におけるリソースの継続期間。

Size
: リクエスト応答のサイズ。

表示できるリソースの数は最大で 100 です。開始時間順に、最初の 100 件のリソースが Datadog に表示されます。

#### フィルタリングおよび検索

リソースはリソースの種類によりフィルタリングできます。また、表示された URL に検索を行うことができます。

### バックエンドトレース

トレースパネルには、ブラウザのテストに関連するトレースが表示されます。UI は以下の違いを除けば、APM [トレースビュー][7]と変わりありません。

ブラウザの 1 つのステップで異なる URL/エンドポイントに複数のリクエストを行うことができます。その結果、関連するトレースが複数発生します（トレーシング設定や[設定][8]で許可した URL による）。ドロップダウンメニューから、表示するトレースを選択します。

### ステップ実行時間

ステップ実行時間は、Datadog の[ロケーターアルゴリズム][9] でステップが実行されるまでの時間を表します。ステップ実行時間にはアクション (ユーザーのインタラクションなど) が含まれるだけでなく、ブラウザテストで要素がインタラクション可能であることを確認するための待機と再試行のメカニズムも組み込まれています。

## 失敗したテスト結果

テスト結果は、アサーションを満たさない場合、または別の理由によりステップが失敗した場合に `FAILED` とみなされます。スクリーンショットを確認し、ステップレベルでの[エラー](#errors)の可能性をチェックしたり、ステップにより生成された[バックエンドトレース](#backend-traces)を確認したりして、失敗したランのトラブルシューティングを実行します。

一般的なブラウザテストのエラーには、以下が含まれます。

`Element located but it's invisible` 
: 要素はページにあるものの、クリックできない。たとえば、別の要素で覆われている、など。

`Cannot locate element`
: HTML で要素が見つけられない。

`Select did not have option`
: 指定されたオプションがドロップダウンメニューにない。

`Forbidden URL`
: テストでサポートされていないプロトコルが発生した可能性があります。詳細は、[サポート][10]までお問い合わせください。

`General test failure`
: 一般的なエラーメッセージ。詳細は、[サポートチームまでお問い合わせください][10]。

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