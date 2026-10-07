---
aliases:
- /ja/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /ja/graphing/metrics/summary/
description: Datadog に報告されるメトリクスのリストを参照してください。
further_reading:
- link: /metrics/explorer/
  tag: ドキュメント
  text: Metrics Explorer
- link: /metrics/distributions/
  tag: ドキュメント
  text: メトリクス分布
title: Metrics Summary
---
## 概要 {#overview}

[Metrics Summary ページ][1]には、指定された期間 (過去 1 時間、1 日、または 1 週間) に Datadog に報告されたメトリクスのリストが表示されます。

[{{< ui >}}Metric{{< /ui >}}] (メトリクス) または [{{< ui >}}Tag{{< /ui >}}] (タグ) の検索フィールドを使用して、メトリクス名またはタグでメトリクスを検索します。

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="[Tag] 検索バーに“NOT team:*”と入力した Metrics Summary ページ" style="width:75%;">}}

**注**: タグ値は [{{< ui >}}Tag{{< /ui >}}] 検索フィールドに 28 時間保持されます。過去 28 時間以内に送信されていない値は、メトリクス詳細サイドパネルに表示されていても、検索オプションには表示されません。

[Metric] 検索フィールドの強化されたあいまい一致サポートを使用して、関連するメトリクスを見つけることもできます。

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="“shopist checkout”であいまい検索を行った Metrics Summary ページ" style="width:75%;">}}

タグフィルタリングはブール演算子とワイルドカード構文をサポートしているため、以下を特定できます。
* 特定のタグキーでタグ付けされたメトリクス (例: `team`: `team:*`)
* 特定のタグキーが欠落しているメトリクス (例: `team`: `NOT team:*`)

## ファセットパネル {#facet-panel}

検索バーは、メトリクスのリストをフィルタリングするための最も包括的なアクションセットを提供します。しかし、ファセットを使用して以下の要素でメトリクスをフィルタリングすることもできます。

- {{< ui >}}Configuration{{< /ui >}}: タグ設定を持つメトリクス
- {{< ui >}}Percentiles{{< /ui >}}: パーセンタイル/高度なクエリ機能によって有効化される分布メトリクス
- {{< ui >}}Historical Metrics{{< /ui >}}: 過去のメトリクスの取り込みが有効になっているメトリクス 
- {{< ui >}}Query Activity{{< /ui >}}: 過去 30 日、60 日、または 90 日間に Datadog または API によってクエリされていないメトリクス
- {{< ui >}}Related Assets{{< /ui >}}: ダッシュボード、ノートブック、モニター、および SLO で使用されているメトリクス
- {{< ui >}}Metric Type{{< /ui >}}: 分布メトリクスと非分布メトリクス (カウント、ゲージ、レート) を区別
- {{< ui >}}Metric Origin{{< /ui >}}: メトリクスの生成元となった製品 (例: Logs や APM Spans から生成されたメトリクス)。さまざまなメトリクス生成元タイプの詳細については、[メトリクス生成元の定義][12]を参照してください。

### 定義 {#definitions}

メトリクスは、過去 30 日、60 日、または 90 日間に、モニター、SLO、実行されたノートブック、開かれたダッシュボード、Metrics Explorer クエリでの使用、または API 呼び出しを通じてアクセスされていない場合、**クエリされていない**と見なされます。

メトリクスは、アクティブにクエリされているかどうかにかかわらず、アセット上に存在する限り**使用されている**と見なされます。

{{< img src="metrics/summary/facet_panel_2025-02-26.png" alt="メトリクスファセットパネル" style="width:75%;">}}

## 複数のメトリクスの設定 {#configuration-of-multiple-metrics}

[{{< ui >}}Configure Metrics{{< /ui >}}] (メトリクスを設定) をクリックすると、一度に複数のメトリクスを設定するためのオプションが表示されます。

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="一括設定ボタン" style="width:100%;">}}

* {{< ui >}}Manage tags{{< /ui >}} (タグの管理): Metrics without Limits™ を使用して、名前空間に一致する複数のカスタムメトリクスのタグを設定します。

{{< img src="metrics/summary/tags-bulk-config.mp4" alt="メトリクスタグの一括設定" video="true" style="width:100%;" >}}

* {{< ui >}}Enable or disable percentiles{{< /ui >}} (パーセンタイルの有効化/無効化): 複数の分布メトリクスにわたるパーセンタイル集計を管理します。詳細については、[分布][31]を参照してください。

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="パーセンタイル集計を管理するための切り替えスイッチ" style="width:100%;">}}

* {{< ui >}}Enable or disable historical metrics ingestion{{< /ui >}} (過去のメトリクスの取り込みの有効化/無効化): 過去のメトリクスデータの取り込みを管理します。詳細については、[過去のメトリクスの取り込み][30]を参照してください。

## メトリクスの詳細サイドパネル {#metric-details-sidepanel}

メトリクス名をクリックすると、そのメトリクスのメタデータとタグに関する詳細情報が表示される詳細サイドパネルが開きます。

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="メトリクスパネル" style="width:75%;">}}

### メトリクス名 {#metric-name}

[Metrics Explorer][2]、[ダッシュボード][3]などにおけるメトリクスの名前です。

### 取り込まれたカスタムメトリクス {#ingested-custom-metrics}

メトリクス名は、関連付けられたタグ値の組み合わせに応じて、複数の取り込まれたカスタムメトリクスを出力する場合があります。取り込まれたカスタムメトリクスは、コードとともに送信されたすべての元のデータを表します。

詳細については、[カスタムメトリクス][4]のドキュメントを参照してください。

### インデックス化されたカスタムメトリクス {#indexed-custom-metrics}

取り込まれたカスタムメトリクスとは異なり、インデックス化されたカスタムメトリクスは、Datadog プラットフォーム全体でクエリ可能なメトリクスを表します。この数値は、パーセンタイル集計の追加や削除、または Metrics without Limits™ の使用によって影響を受ける可能性があります。詳細については、[Metrics without Limits™][0] のドキュメントを参照してください。

### ホスト {#hosts}

メトリクスを報告しているホストの総数です。

### タグ値 {#tag-values}

メトリクスに付与されている一意のタグ値の総数です。

[タグ付けの詳細][5]をご覧ください。

### メトリクスのメタデータ {#metrics-metadata}

メトリクスに付随するメタデータです。ほとんどのメタデータは、Metrics Summary ページまたは [Datadog API][6] を使用して編集できます。

#### メトリクスの単位 {#metric-unit}

メトリクスの単位です (バイト、秒、リクエスト、クエリなど)。詳細については、[メトリクスの単位][7]のページを参照してください。

Datadog にカスタムメトリクスを送信する際に、グラフ上でメトリクスにカーソルを合わせたときに表示される[測定単位][1]を変更できます。

**注**: これは、メトリクスグラフの表示方法を変更するものではありません。メトリクスにカーソルを合わせたときに生の値がどのような単位として扱われるかを変更するだけです。読みやすくするために、フォーマットが自動的に適用されます。たとえば、バイト (`B`) がキロバイト (`KiB`) として表示される場合があります。

#### メトリクスタイプ{#metric-type}

メトリクスのタイプです (ゲージ、レート、カウント、分布)。詳細については、[メトリクスタイプ][8]のページを参照してください。

**警告**: メトリクスタイプを編集すると、**すべて**のダッシュボードとモニターでそのメトリクスの動作が変更されます。

#### インテグレーション名{#integration-name}

メトリクスがサポートされている[インテグレーション][9]から送信されている場合、メタデータにインテグレーション名が記載されます。この情報は編集できません。

#### 間隔{#interval}

メトリクスの収集間隔です (秒単位)。

#### メトリクスの説明{#metric-description}

メトリクスの説明は、メトリクスが何を表し、なぜ存在し、どのように使用されるかを理解するのに役立ちます。このフィールドを使用して、[カスタムメトリクス][4]の説明を表示および更新します。サポートされている[インテグレーション][9]からのメトリクスに対しては、説明が事前に入力されます。

#### AI 生成の説明 {#ai-generated-description}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) では、AI 生成のメトリクスの説明を利用できません。</div>
{{< /site-region >}}

Datadog では、カスタムメトリクスの説明を、利用可能なコンテキスト (メトリクス名、意味のあるタグ、クエリのアクティビティ、接続されたソースコードなど) を使用して自動生成できます。ソースコードを追加のコンテキストとして使用するには、Datadog の [GitHub][36]、[GitLab][37]、または [Azure DevOps][38] のインテグレーションをインストールし、[リポジトリ][39]を接続してください。

{{< img src="metrics/summary/metric_ai_generated_descriptions_03062026.png" alt="メトリクスサイドパネルの AI 生成の説明" style="width:80%;">}}


## ソースコード {#source-code}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) では、メトリクスのソースコードを利用できません。</div>
{{< /site-region >}}

メトリクスサイドパネルの [Source Code] (ソースコード) セクションでは、すべてのカスタムメトリクスとその基盤となるコンテキストを一元的に表示できます。

メトリクスサイドパネルの [Source Code] セクションを使用して、メトリクスのソースコードを特定し、その生成方法を理解し、所有者を判断します。コンテキストと所有権を可視化して、メトリクスのソースファイル、コミット履歴、blame データに直接リンクすることで、トラブルシューティングと最適化を迅速化できます。

{{< img src="metrics/summary/metric_source_code_03262026.png" alt="メトリクスサイドパネルのソースコードの例" style="width:80%;">}}

### メトリクスが見つからない場合のトラブルシューティング {#troubleshooting-missing-metrics}

メトリクスが [Source Code] に表示されない場合は、その定義方法が原因である可能性があります。

Datadog では、名前が明示的な文字列として記述されているメトリクスが、最も適切に検出されます。変数、定数、またはカスタムヘルパーを使用して構築されたメトリクスは、検出されない可能性があります。

メトリクスが見つからない一般的な理由:
- メトリクス名が動的に生成されている  
- メトリクスがカスタムラッパーを通じて送信されている  
- リポジトリが完全にインデックス化されていない  

ベストプラクティス:
- 可能な限り、メトリクス名を明示的な文字列として定義する  

例:

変数を使用してメトリクスを送信 (非推奨)

```java
public static final String METRIC_NAME = "my.metric.name";
statsEmitter.distribution(METRIC_NAME, value, tags);
```

明示的な文字列としてメトリクスを送信 (推奨)

```java
timer = meterRegistry.timer("my.metric.name");
```

メトリクスのソースコードを完全にカバーするには、Datadog の [GitHub][36]、[GitLab][37]、または [Azure DevOps][38] のインテグレーションがインストールされており、すべての[リポジトリ][39]が接続されていることを確認してください。

### タグテーブル {#tags-table}

タグテーブルは、メトリクスのデータでアクティブにレポートされているすべてのタグキーとタグ値を探索するための複数の方法を提供します。

タグテーブルを使用して以下の操作を行えます。

- {{< ui >}}Count{{< /ui >}} 列 (一意のタグ値の数) でタグキーを並べ替る。
- ページ分割されたタグテーブルから特定のタグキーを検索する。
- タグテーブルをダウンロード可能な CSV としてエクスポートする。
- メトリクスに設定したタグと、元々送信されたメトリクスのタグを切り替える。

特定のタグキーに対して以下の操作を行えます。

- そのタグキーのすべてのタグ値を調査する。
- 特定のタグの `key:value` を使用して、Metrics Summary ページに表示されるメトリクスのリストをさらにフィルタリングする。
- Metrics Explorer で、タグの `key:value` ペアでフィルタリングされたこのメトリクスのグラフを開く。
- アプリケーション全体でフィルタリングするために、任意のタグの `key:value` をコピーする。

{{< img src="metrics/summary/updated_tags_table.mp4" alt="タグテーブル" video=true style="width:75%;">}}

[タグ付けの詳細][5]をご覧ください。

### メトリクス関連アセット {#metrics-related-assets}

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="指定されたメトリクス名の関連アセット" style="width:80%;">}}

組織にとってのメトリクス名の価値を判断するには、メトリクス関連アセットを使用します。メトリクス関連アセットとは、特定のメトリクスをクエリするダッシュボード、ノートブック、モニター、または SLO を指します。

1. メトリクスの詳細サイドパネルの一番下までスクロールして、[{{< ui >}}Related Assets{{< /ui >}}] (関連アセット) セクションに移動します。
2. ドロップダウンボタンをクリックして、関心のある関連アセットのタイプ (ダッシュボード、モニター、ノートブック、SLO) を表示します。さらに、検索バーを使用して特定のアセットを検証することもできます。
3. [{{< ui >}}Tags{{< /ui >}}] (タグ) 列には、各アセットで使用されているタグが正確に表示されます。
   
## Custom Metrics Tags Cardinality Explorer {#custom-metrics-tags-cardinality-explorer}

{{< img src="metrics/tagsexplorer.png" alt="急増しているメトリクス名に対する Custom Metrics Tags Cardinality Explorer" style="width:80%;">}}
特定のメトリクス名が大量のカスタムメトリクスを生成している (急増している) 理由を特定するには、Custom Metrics Tags Cardinality Explorer を使用します。これにより、急増の原因となっているタグキーを特定し、Metrics without Limits™ を使用してすぐに除外することで、コストを削減できます。

## Metrics without Limits™ {#metrics-without-limits}
Metrics without Limits™ を使用すると、エージェントやコードレベルの変更を必要とせずに、カスタムメトリクスのサイズを制御できます。

**注**: Metrics without Limits™ は、カスタムメトリクスでのみ利用可能です。

[タグ付けを一括で設定](#configuration-of-multiple-metrics)するには、[[Metrics] (メトリクス) ページ][34]の [{{< ui >}}Configure Metrics{{< /ui >}}] > [{{< ui >}}Manage tags{{< /ui >}}] に移動するか、メトリクスの詳細サイドパネルにある [{{< ui >}}Manage Tags{{< /ui >}}] ボタンをクリックします。

{{< img src="metrics/distributions/managetags.png" alt="分布のタグを設定する" style="width:80%;">}}

1. [{{< ui >}}Metrics Summary{{< /ui >}}] テーブルでカスタム分布メトリクス名をクリックして、メトリクスの詳細サイドパネルを開きます。
2. [{{< ui >}}Manage Tags{{< /ui >}}] ボタンをクリックして、タグ設定モーダルを開きます。
3. [{{< ui >}}Include tags...{{< /ui >}}] (含めるタグ) または [{{< ui >}}Exclude tags...{{< /ui >}}] (除外するタグ) を選択して、クエリ対象にするタグとしないタグをカスタマイズします。タグ設定の詳細については、[Metrics without Limits][10] のドキュメントを参照してください。
4. 提案するタグ設定の効果をカーディナリティエスティメーターでプレビューした後、[{{< ui >}}Save{{< /ui >}}] (保存) を選択します。

**注**: カーディナリティエスティメーターを使用するには、メトリクスが 48 時間以上経過している必要があります。

### クエリ可能なタグ {#queryable-tags}

Metrics without Limits™ でメトリクスを設定すると、どのタグがクエリ可能であるかを確認できます。これらは、最終的に _Indexed Custom Metrics_ のボリュームに寄与するタグです。また、_Ingested Custom Metrics_ のボリュームに寄与する、元々送信および取り込まれたすべてのタグに切り替えることもできます。

### メトリクス生成元の定義 {#metric-origin-definitions}

このテーブルは、ファセットに表示されるメトリクス生成元とその送信元とのマッピングを示しています。

| メトリクス生成元           | 送信元                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | Datadog [Catalog][13] 製品によって APIM エンドポイントから送信された時系列。
| APM                     | Datadog APM 製品によって、トレースおよびスパンメトリクスから生成されたメトリクスに対して送信された時系列。
| Agent                   | Datadog Agent によって送信された、[Agent インテグレーション][10]、[組み込みインテグレーション][9]、[DogStatsD][32]、または[カスタム Agent チェック][33]から収集された時系列。
| Cloud Security                     | Datadog [Cloud Security][14] 製品によって送信された時系列。
| Cloud Integrations      | AWS、Azure、Google Cloud などのクラウドプロバイダーから、それぞれのインテグレーションを通じて収集された時系列。
| DBM                     | MySQL、Oracle、Postgres のアクティビティ/クエリ/ロックに関するインサイトを含む、Datadog [Database Monitoring][15] 製品によって送信された時系列。
| DSM                     | Datadog [Data Streams Monitoring][16] 製品によって、DSM スパンおよびトレースから生成されたメトリクスに対して送信された時系列。
| Datadog Exporter        | [OpenTelemetry Collector][17] または [Datadog Exporter][18] によって送信された時系列。
| Datadog Platform        | [メトリクス使用状況の報告][11]に使用されるメトリクスインテークによって送信された時系列。
| Events                  | Datadog Events プラットフォームから生成された時系列。
| Agent Observability       | Agent Observability 製品が `lmobs_to_metrics` サービスを使用して出力した時系列。
| Logs                    | Datadog [Logs][28] プラットフォームから生成された時系列。
| Metrics API             | Datadog の [OTLP インジェストエンドポイント][21]および OTel レシーバーを使用して、Datadog インテグレーションの対応物、推定使用量メトリクス用のポイント、または Datadog API Client によって送信された時系列。
| CNM                     | Datadog [Cloud Network Monitoring][19] 製品によって送信された時系列。
| Observability Pipelines | Datadog [Observability Pipielines][20] によって送信された時系列 (エラーおよびパフォーマンスメトリクスを含む)。
| Other                   | DD インテグレーションの対応物がない時系列。
| Processes               | Datadog [Processes][22] 製品から生成された時系列。
| RUM                     | Datadog [Real User Monitoring][23] 製品から生成された時系列。
| SAAS Integrations       | Slack、Docker、PagerDuty などの一般的な SAAS プラットフォームから収集された時系列。
| Serverless              | Datadog [Serverless][24] プラットフォームによって送信された時系列 (Function、App Services、Cloud Run、および Container App Metrics を含む)。
| Catalog         | Datadog [Catalog][25] 製品によって送信された時系列 ([Scorecard][29] メトリクスを含む)。
| Synthetic Monitoring    | Datadog [Synthetic Monitoring][26] 製品から生成された、Synthetic Monitoring および継続的テストのメトリクス。
| USM                     | Datadog [Universal Service Monitoring][27] 製品から生成された時系列。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: /ja/metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /ja/metrics/explorer/
[3]: /ja/dashboards/
[4]: /ja/metrics/custom_metrics/
[5]: /ja/getting_started/tagging/
[6]: /ja/api/v1/metrics/#edit-metric-metadata
[7]: /ja/metrics/units/
[8]: /ja/metrics/types/
[9]: /ja/integrations/
[10]: /ja/integrations/agent_metrics/
[11]: /ja/account_management/billing/usage_metrics/
[12]: /ja/metrics/summary/#metric-origin-definitions
[13]: /ja/internal_developer_portal/catalog/endpoints/
[14]: /ja/security/cloud_security_management/
[15]: /ja/database_monitoring/
[16]: /ja/data_streams/
[17]: /ja/opentelemetry/setup/collector_exporter/
[18]: /ja/opentelemetry/collector_exporter/
[19]: /ja/network_monitoring/cloud_network_monitoring/
[20]: /ja/observability_pipelines/
[21]: /ja/opentelemetry/setup/otlp_ingest_in_the_agent/
[22]: /ja/integrations/process/
[23]: /ja/monitors/types/real_user_monitoring/
[24]: /ja/serverless/
[25]: /ja/internal_developer_portal/catalog/
[26]: /ja/synthetics/
[27]: /ja/universal_service_monitoring/
[28]: /ja/logs/
[29]: /ja/internal_developer_portal/scorecards/
[30]: /ja/metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /ja/metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /ja/metrics/custom_metrics/agent_metrics_submission/
[34]: https://app.datadoghq.com/metric/overview
[35]: https://app.datadoghq.com/integrations?category=Source%20Control
[36]: https://app.datadoghq.com/integrations/github/configuration
[37]: https://app.datadoghq.com/integrations/gitlab-source-code
[38]: https://app.datadoghq.com/integrations/azure-devops-source-code?subPath=configuration
[39]: https://app.datadoghq.com/source-code/repositories
[40]: https://www.datadoghq.com/product-preview/metrics-source-code-attribution/