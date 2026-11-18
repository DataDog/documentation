---
description: メトリクス概要ページを使用して、メトリクスソースの探索、Datadog 製品からのメトリクスの生成、および高度なプラットフォーム機能の有効化を行います。
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: ブログ
  text: Metrics without Limits™ でカスタムメトリクスのボリュームをダイナミックにコントロール
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インタラクティブなセッションに参加して、メトリクスの可能性を最大限に引き出す
- link: /metrics/units
  tag: ドキュメント
  text: メトリクスの単位
title: メトリクス概要ページ
---
## 概要 {#overview}

メトリクス概要ページは、あらゆる経験レベルのユーザーに対して、メトリクス環境のより深い理解を提供します。Datadog メトリクスの価値を最大限に高める方法についてのガイダンスを提供します。

メトリクス概要ページでは、以下の方法を学びます。
- メトリクスソースを探索する
- Datadog 製品から追加のメトリクスを生成する
- パーセンタイル、Metrics without Limits™、履歴メトリクス取り込みなどの高度なプラットフォーム機能を有効にする

## メトリクスが Datadog 内を流れる仕組み {#how-your-metrics-flow-through-datadog}

{{< img src="metrics/overview/how_metrics_flow.png" alt="メトリクス概要ページの「メトリクスが Datadog 内を流れる仕組み」セクション" >}}

このセクションには、すべてのメトリクスソース、メトリクスデータに適用される追加の処理と構成、および標準メトリクスとカスタムメトリクスのボリュームの内訳が表示されます。

**注**: 概要ページはメトリクスのコスト管理専用ではありません。コストを最適化する方法の詳細については、[Custom Metrics ガバナンスのベストプラクティス][25]を参照してください。

### メトリクスソース {#metric-sources}

{{< ui >}}Metric Sources{{< /ui >}} 列には、Datadog にメトリクスを報告しているソースの概要が表示されます。いずれかのソースをクリックすると、そのソースにスコープされた [Metrics Catalog][2] が開きます。Datadog メトリクスは、以下のソースから生成されます。

{{% collapse-content title="Datadog Agent" level="h4" %}}
[Datadog Agent][3] は、インストールされているホストからメトリクスを収集し、Datadog に転送します。これらのメトリクスは、以下のソースから生成される可能性があります。

   - Agent にバンドルされている公式 Datadog インテグレーションのいずれか。利用可能な Agent ベースのインテグレーションの全リストについては、[integrations-core リポジトリ][4]を参照してください。
   - [DogStatsD][6]、Datadog Agent にバンドルされているメトリクス集計サービス。DogStatsD は、Datadog 固有のいくつかの拡張機能とともに [StatsD][7] プロトコルを実装します。
   - カスタムアプリケーションや独自のシステムからメトリクスを収集するために使用される[カスタムチェック][8]。チェックのロジックは、Agent の構成ファイル内で、ご自身で定義します。詳細については、[カスタム Agent チェックの作成][9]を参照してください。
   - Agent にインストールされる [Marketplace インテグレーション][10]。[Datadog Marketplace][11] は、テクノロジーパートナーが Datadog ユーザーに向けて有償の製品を掲載できるデジタルマーケットプレイスです。

{{% /collapse-content %}}

{{% collapse-content title="クラウドインテグレーション" level="h4" %}}
認証ベースのインテグレーションとも呼ばれるこれらは、Datadog 内で設定されます。メトリクスを取得するための認証情報を提供すると、Datadog がお客様に代わって API 呼び出しを行い、メトリクスを収集します。一般的な例として、クラウドプロバイダーのインテグレーション、Slack、PagerDuty などがあります。詳細については、開発者向けドキュメントの [API ベースのインテグレーション][12]を参照してください。
{{% /collapse-content %}} 

{{% collapse-content title="Datadog API" level="h4" %}}
メトリクスを [Metrics API][13] に直接送信することもできます。
{{% /collapse-content %}} 

Datadog には合計で {{< translate key="integration_count" >}} を超えるインテグレーションが用意されています。インテグレーションの管理方法の詳細については、[インテグレーション管理][5]を参照してください。

### 構成可能な処理 {#configurable-processing}

{{< ui >}}Configurable Processing{{< /ui >}} 列には、メトリクスの価値を高めるために使用できる、さまざまな高度な構成オプションが一覧表示されます。詳細情報および関連する構成画面へのリンクを表示するには、いずれかのオプションをクリックします。

{{% collapse-content title="Metrics without Limits™ でカスタムメトリクスのコストを最適化します" level="h4" %}}
[Metrics without Limits™][19] は、組織にとって最も価値のあるメトリクスタグのみをインデックス化することにより、カスタムメトリクスのコスト管理を支援します。Metrics without Limits™ の利用状況は、概要ページのトップセクションに {{< ui >}}Selected Metrics{{< /ui >}} として反映されます。カスタムメトリクスのコスト管理の詳細については、[Custom Metrics ガバナンスのベストプラクティス][22]を参照してください。
{{% /collapse-content %}} 

{{% collapse-content title="ディストリビューションメトリクスでパーセンタイルを有効にする" level="h4" %}}
パーセンタイルを有効にした[ディストリビューションメトリクス][20]は、すべてのホストからサーバー側で計算されたグローバルに正確なパーセンタイルを提供し、分散インフラストラクチャー全体での統計的分布の測定を可能にします。
{{% /collapse-content %}} 

{{% collapse-content title="他の Datadog 製品からメトリクスを生成する" level="h4" %}}
一部の製品には、すぐに使えるインサイトを表示するための標準メトリクスが組み込まれています (例: APM)。

##### ログ {#logs}

Datadog に取り込まれたすべてのログからのデータを集計するには、[取り込まれたログからカスタムメトリクスを生成][14]します。これにより、長期検索用にインデックス化されていないログであっても、環境にとって重要なログデータを可視化し、アラートを送信できます。

##### APM {#apm}

ビジネスコンテキストにとって重要なあらゆるパラメーターにわたる異常や傾向を可視化するには、[取り込まれたスパンからカスタムメトリクスを生成][15]します。

##### Real User Monitoring (RUM) {#real-user-monitoring-rum}

[RUM イベントからカスタムメトリクスを生成][16]して RUM イベントのデータを集計し、組織にとって最もインパクトのあるユーザーの行動を可視化してアラートを送信します。

##### プロセス {#processes}

ビジネスニーズにとって重要となる可能性のあるプロセスのリソース消費やその他のプロセス関連の動作を監視するには、[プロセスベースのカスタムメトリクスを生成][17]します。

##### イベント {#events}

モニターアラートや Datadog に取り込まれたその他のイベントベースのデータを可視化するには、[イベントベースのカスタムメトリクスを生成][18]します。
{{% /collapse-content %}} 

{{% collapse-content title="過去のメトリクスを取り込む" level="h4" %}}
[過去のメトリクスの取り込み][21]を使用すると、送信時点から 1 時間より前のタイムスタンプを持つメトリクス値を取り込むことができます。
{{% /collapse-content %}} 

### 利用可能なメトリクス {#available-metrics}

{{< ui >}}Available Metrics{{< /ui >}} 列には、過去 1 か月間の標準メトリクスとカスタムメトリクスの合計メトリクスボリュームの内訳が表示されます。カスタムメトリクスのボリューム管理に関心がある場合は、詳細について [Custom Metrics ガバナンスのベストプラクティスページ][25]および [Metrics Catalog ページ][26]を参照してください。

## ソース別のメトリクス {#your-metrics-by-source}

このセクションには、メトリクスソースとそれぞれのボリュームの概要を示すツリーマップが含まれています。

{{< img src="metrics/overview/metrics_by_source.png" alt="メトリクス概要ページの「ソース別のメトリクス」セクション" >}}

## 任意のソースからメトリクスを生成 {#generate-metrics-from-any-source}

以下のオプションのいずれかをクリックすると、対応する製品の {{< ui >}}Generate Metrics{{< /ui >}} ページに移動し、その製品からカスタムメトリクスを作成できます。
   - [取り込まれたログ][14]
   - [取り込まれたスパン][15]
   - [RUM イベント][16]
   - [プロセス][17]
   - [イベント][18]

## クエリ可能なメトリクス {#metrics-available-for-querying}

このセクションの検索バーを使用して、任意のメトリクスの最新データと構成オプションを表示します。すべてのタグを検索したり、クリックして [Metrics Explorer][23] または [Summary][24] ページでメトリクスをさらに調査したりできます。

{{< img src="metrics/overview/available_metrics.png" alt="メトリクス概要ページの「クエリ可能なメトリクス」セクション" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/
[2]: /ja/metrics/summary/
[3]: /ja/agent/
[4]: https://github.com/DataDog/integrations-core
[5]: /ja/agent/guide/integration-management/
[6]: /ja/extend/dogstatsd/
[7]: https://github.com/statsd/statsd
[8]: /ja/extend/custom_checks/
[9]: /ja/extend/custom_checks/write_agent_check/
[10]: /ja/integrations/#cat-marketplace
[11]: https://app.datadoghq.com/marketplace
[12]: /ja/extend/integrations/?tab=integrations#api-based-integrations
[13]: /ja/api/latest/metrics/#submit-metrics
[14]: /ja/logs/log_configuration/logs_to_metrics/
[15]: /ja/tracing/trace_pipeline/generate_metrics/
[16]: /ja/real_user_monitoring/platform/generate_metrics/
[17]: /ja/infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[18]: /ja/events/guides/usage/#custom-metrics
[19]: /ja/metrics/metrics-without-limits/
[20]: /ja/metrics/distributions/
[21]: /ja/metrics/custom_metrics/historical_metrics/
[22]: /ja/metrics/guide/custom_metrics_governance
[23]: https://app.datadoghq.com/metric/explorer
[24]: https://app.datadoghq.com/metric/catalog
[25]: /ja/metrics/guide/custom_metrics_governance/
[26]: /ja/metrics/volume/