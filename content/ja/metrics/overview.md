---
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: ブログ
  text: Metrics without LimitsTM でカスタムメトリクスのボリュームをダイナミックにコントロール
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インタラクティブなセッションに参加して、メトリクスの可能性を最大限に引き出しましょう
- link: /metrics/units
  tag: ドキュメント
  text: メトリクス単位
title: Metrics Overview ページ
---

## 概要

Metrics Overview ページでは、ユーザーの経験レベルに関係なく、メトリクスの状況をより深く理解することができます。それにより、Datadog メトリクスの価値を最大化する方法についての指針が得られます。

Metrics Overview ページでは、以下のことを学ぶことができます。
- メトリクスのソースを探る方法
- Datadog 製品から追加のメトリクスを生成する方法
- パーセンタイル、Metrics without Limits™、過去のメトリクス取り込みなどの高度なプラットフォーム機能を有効化する方法

## メトリクスが Datadog を通過する仕組み

{{< img src="metrics/overview/how_metrics_flow.png" alt="Metrics Overview ページの「メトリクスが Datadog を通過する仕組み」セクション" >}}

このセクションでは、すべてのメトリクスソース、メトリクスデータに適用される追加の処理と構成、および標準メトリクスとカスタムメトリクスの量の内訳が示されます。

**注**: Overview ページは、メトリクスのコスト管理専用ではありません。コストを最適化する方法の詳細については、[カスタムメトリクス管理のベストプラクティス][25] を参照してください。

### メトリクスソース

**Metric Sources** 列には、Datadog に報告を行うメトリクスソースの概要が表示されます。いずれかのソースをクリックすると、そのソースを対象とした [Summary ページ][2]が開きます。Datadog メトリクスは、以下のソースが起源となっている可能性があります。

{{% collapse-content title="Datadog Agent" level="h4" %}}
[Datadog Agent][3] は、それがインストールされているホストからメトリクスを収集し、Datadog に転送します。これらのメトリクスの起源としては、以下のようなものが挙げられます。

   - Agent に付属する公式の Datadog インテグレーションのいずれか。利用可能な Agent ベースのインテグレーションの一覧については、[integrations-core リポジトリ][4]を参照してください。
   - [DogStatsD][6] は、Datadog Agent に付属するメトリクス集計サービスです。DogStatsD は [StatsD][7] プロトコルを実装すると共に、Datadog 固有の拡張機能をいくつか提供します。
   - [カスタムチェック][8]は、カスタムアプリケーションや独自のシステムからメトリクスを収集するために使用されます。チェックのロジックは、Agent の構成ファイルで自分で定義します。詳細については、[カスタム Agent チェックの作成][9]を参照してください。
   - Agent にインストールされている [Marketplace インテグレーション][10]。[Datadog Marketplace][11] は、テクノロジーパートナーが Datadog ユーザー向けに有償製品を出品できるデジタルマーケットプレイスです。

{{% /collapse-content %}}

{{% collapse-content title="クラウドインテグレーション" level="h4" %}}
認証ベースのインテグレーションとしても知られ、セットアップは Datadog 内で行います。メトリクスを取得するための認証情報を提供すると、Datadog がユーザーに代わって API 呼び出しを行い、メトリクスを収集します。一般的な例としては、クラウドプロバイダーのインテグレーション、Slack、PagerDuty などが挙げられます。詳細については、開発者向けドキュメントの [API ベースのインテグレーション][12]を参照してください。
{{% /collapse-content %}}

{{% collapse-content title="Datadog API" level="h4" %}}
[Metrics API][13] に直接メトリクスを送信することができます。
{{% /collapse-content %}} 

Datadog には全部で {{< translate key="integration_count" >}} を超えるインテグレーションがあります。インテグレーションの管理の詳細については、[インテグレーションの管理][5]を参照してください。

### 構成可能な処理

**Configurable Processing** 列には、メトリクスの価値を高めるために使用できるさまざまな高度な設定オプションが一覧表示されます。任意のオプションをクリックすると、詳細情報と関連する設定画面へのリンクが表示されます。

{{% collapse-content title="Metrics without LimitsTM でカスタムメトリクスのコストを最適化する" level="h4" %}}
[Metrics without LimitsTM][19] は、組織にとって最も価値のあるメトリクスタグのみをインデックス化することで、カスタムメトリクスのコスト管理に役立ちます。Metrics without LimitsTM の使用は、Overview ページのトップセクションに **Selected Metrics** として反映されます。カスタムメトリクスのコスト管理の詳細については、[カスタムメトリクス管理のベストプラクティス][22] を参照してください。
{{% /collapse-content %}} 

{{% collapse-content title="ディストリビューションメトリクスでパーセンタイルを有効にする" level="h4" %}}
パーセンタイルを有効にした [ディストリビューションメトリクス][20] では、すべてのホストからサーバーサイドで計算されたグローバルで正確なパーセンタイルが提供されるため、分散インフラストラクチャー全体の統計分布を測定できます。
{{% /collapse-content %}} 

{{% collapse-content title="他の Datadog 製品からメトリクスを生成する" level="h4" %}}
製品によっては、標準的なメトリクスを組み込んで、すぐにインサイトを表示できるものもあります (例: APM)。

##### ログ

[取り込まれたログからカスタムメトリクスを生成][14] することで、Datadog によって取り込まれたすべてのログデータを要約できます。これにより、たとえログが長期的な検索用にインデックス化されていなくても、自社の環境にとって重要なログデータを可視化し、アラートを出すことができます。

##### APM

[取り込まれたスパンからカスタムメトリクスを生成][15]することで、ビジネスコンテキストにとって重要なあらゆるパラメーターを対象に、異常とトレンドを可視化することができます。

##### Real User Monitoring (RUM)

[RUM イベントからカスタムメトリクスを生成][16]することで、RUM イベントからのデータを要約し、組織にとって最もインパクトのあるユーザー行動を可視化して、アラートを出すことができます。

##### プロセス

[カスタムプロセスベースのメトリクスを生成する][17]ことで、プロセスのリソース消費量や、ビジネスニーズにとって重要なその他のプロセス関連の挙動を監視することができます。

##### イベント

[カスタムイベントベースのメトリクスを生成][18]することで、モニターアラートや、Datadog によって取り込まれたその他のイベントベースのデータを可視化することができます。
{{% /collapse-content %}}

{{% collapse-content title="過去のメトリクス取り込み" level="h4" %}}
[過去メトリクスの取り込み][21]では、タイムスタンプが送信時刻より 1 時間以上前のメトリクス値を取り込むことができます。
{{% /collapse-content %}}

### Available Metrics

**Available Metrics** 列では、過去 1 か月間の総メトリクス量が標準メトリクスとカスタムメトリクスに分けて表示されます。カスタムメトリクスのボリューム管理に興味がある場合は、[カスタムメトリクス管理のベストプラクティスページ][25] および[メトリクスのボリューム管理ページ][26]を参照してください。

## Your metrics by source

このセクションには、メトリクスソースとそれぞれのボリュームの概要を示すツリーマップが表示されます。

{{< img src="metrics/overview/metrics_by_source.png" alt="Metrics Overview ページの  your metrics by source  セクション" >}}

## 任意のソースからメトリクスを生成する

以下のオプションのいずれかをクリックすると、対応する製品の Generate Metrics ページに移動し、その製品からカスタムメトリクスを作成できます。
   - [取り込まれたログ][14]
   - [取り込まれたスパン][15]
   - [RUM イベント][16]
   - [プロセス][17]
   - [イベント][18]

## Metrics available for querying

このセクションの検索バーを使用して、メトリクスの最新データと設定オプションを表示することができます。すべてのタグを検索したり、クリックして [Metrics Explorer][23] または [Summary][24] ページでメトリクスをさらに調査したりすることができます。

{{< img src="metrics/overview/available_metrics.png" alt="Metrics Overview ページの Metrics available for querying セクション" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/
[2]: /ja/metrics/summary/
[3]: /ja/agent/
[4]: https://github.com/DataDog/integrations-core
[5]: /ja/agent/guide/integration-management/
[6]: /ja/developers/dogstatsd/
[7]: https://github.com/statsd/statsd
[8]: /ja/developers/custom_checks/
[9]: /ja/developers/custom_checks/write_agent_check/
[10]: /ja/integrations/#cat-marketplace
[11]: https://app.datadoghq.com/marketplace
[12]: /ja/developers/integrations/?tab=integrations#api-based-integrations
[13]: /ja/api/latest/metrics/#submit-metrics
[14]: /ja/logs/log_configuration/logs_to_metrics/
[15]: /ja/tracing/trace_pipeline/generate_metrics/
[16]: /ja/real_user_monitoring/platform/generate_metrics/
[17]: /ja/infrastructure/process/increase_process_retention/#generate-a-process-based-metric
[18]: /ja/service_management/events/guides/usage/#custom-metrics
[19]: /ja/metrics/metrics-without-limits/
[20]: /ja/metrics/distributions/
[21]: /ja/metrics/custom_metrics/historical_metrics/
[22]: /ja/metrics/guide/custom_metrics_governance
[23]: https://app.datadoghq.com/metric/explorer
[24]: https://app.datadoghq.com/metric/summary
[25]: /ja/metrics/guide/custom_metrics_governance/
[26]: /ja/metrics/volume/