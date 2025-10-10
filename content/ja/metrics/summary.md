---
aliases:
- /ja/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /ja/graphing/metrics/summary/
description: Datadog に報告されるすべてのメトリクスをリストする
further_reading:
- link: /metrics/explorer/
  tag: ドキュメント
  text: メトリクスエクスプローラー
- link: /metrics/distributions/
  tag: ドキュメント
  text: ディストリビューションメトリクス
title: メトリクスの概要
---

## 概要

[メトリクスの概要ページ][1]には、過去 1 時間、1 日、または 1 週間の指定されたタイムフレームで Datadog に報告されたメトリクスのリストが表示されます。

**Metric** または **Tag** 検索フィールドを使用して、メトリクス名またはタグでメトリクスを検索します。

{{< img src="metrics/summary/tag_advancedfiltering3.mp4" alt="タグ検索バーに NOT team:* が入力されたメトリクスサマリーページ" video=true style="width:75%;">}}

タグフィルターは、ブーリアンやワイルドカードの構文に対応しており、以下を素早く識別することができます。
* 特定のタグキーでタグ付けされたメトリクス。例: `team`: `team:*`
* 特定のタグキーがないメトリクス。例: `team`: `NOT team:*`


## ファセットパネル

検索バーは、メトリクスのリストをフィルタリングするための最も包括的なアクションのセットを提供しますが、ファセットも次の方法でメトリクスをフィルタリングできます。 

- **Configuration**: タグ構成によるメトリクス
- **Percentiles**: パーセンタイル / 高度なクエリ機能で有効なディストリビューションメトリクス
- **Historical Metrics**: 履歴メトリクスの取り込みが有効になっているメトリクス
- **Query Activity** (ベータ版) : 過去 30 日間にアプリまたは API でクエリされていないメトリクス
- **Metric Type**: ディストリビューションメトリクスと非ディストリビューションメトリクス (カウント、ゲージ、レート) を区別します
- **メトリクスの起源 (Metric Origin)**: メトリクスがどの製品から発生したか (例: Logs や APM Spans から生成されたメトリクス)。様々なメトリクス起源タイプの詳細については[メトリクス起源の定義][12]を参照してください。

**注**: ダッシュボードに含まれるメトリクスで、過去 30 日間にユーザーによってロードされていないものは、アクティブにクエリされたとは見なされません。

{{< img src="metrics/summary/facets4.png" alt="メトリクスファセットパネル" style="width:75%;">}}

## 複数のメトリクスのコンフィギュレーション

**Configure Metrics** (メトリクスを構成) をクリックすると、一度に複数のメトリクスを構成できるさまざまなオプションが表示されます。

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="一括構成用ボタン" style="width:100%;">}}

* **タグの管理 (Manage tags)**: Metrics without Limits™ を使用して、特定のネームスペースに一致する複数のカスタムメトリクスにタグを構成します。

{{< img src="metrics/summary/bulkconfig_new-compressed.mp4" alt="一括メトリクスタグ構成" video="true" style="width:100%;" >}}

* **パーセンタイルを有効または無効にする**: 複数の分布系メトリクスにわたってパーセンタイル集計を管理します。詳細は[分布ページ][31]をご覧ください。

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="パーセンタイル集計を管理するためのトグル" style="width:100%;">}}

* **過去のメトリクス取り込みを有効または無効にする**: 過去のメトリクスデータの取り込みを管理します。詳細は[過去のメトリクス取り込みページ][30]をご覧ください。

## メトリクスの詳細サイドパネル

メトリクスのメタデータとタグの詳細については、メトリクス名をクリックして詳細サイドパネルを表示してください。

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="メトリクスパネル" style="width:75%;">}}

### メトリクス名

[メトリクスエクスプローラー][2]や[ダッシュボード][3]などに表示されるメトリクスの名前です。

### 取り込まれたカスタムメトリクス

メトリクス名は、関連するタグ値の組み合わせによって、複数のインジェストされたカスタムメトリクスを発行することができます。インジェストされたカスタムメトリクスは、元々コードで送信されたすべてのデータを表します。

詳細については、[カスタムメトリクス][4]のドキュメントをご覧ください。

### インデックスされたカスタムメトリクス

取り込まれたカスタムメトリクスとは異なり、インデックス化されたカスタムメトリクスは Datadog プラットフォーム全体でクエリ可能な状態を維持します。この数値は、パーセンタイル集計の追加または削除、あるいは Metrics without Limits™ の使用によって影響を受ける可能性があります。詳細は [Metrics without Limits™][0] のドキュメントをご覧ください。

### ホスト

メトリクスをレポートしているホストの総数。

### タグ値

メトリクスにアタッチされた一意のタグ値の総数。

[タグ付けに関する詳しい説明][5]。

### メトリクスメタデータ

メトリクスに作成されたメタデータを表示します。ほとんどのメタデータは、メトリクスの概要ページ、または [Datadog API][6] を使用して変更できます。

#### メトリクスの単位

メトリクスの単位 (バイト、秒、リクエスト、クエリなど) を表示します。詳しくは、[メトリクスの単位][7]のページを参照してください。

Datadog にカスタムメトリクスを送信する際、グラフのメトリクスにカーソルを合わせた時に表示される[計測単位][1]を変更することが可能です。

**注**: メトリクスのグラフの表示方法は変わりません。元の値の測定単位がマウスを合わせた時に変わるだけです。読みやすい形式になるよう自動的に変更されます。たとえば、バイト (`B`) がキロバイト (`KiB`) の表示に変わる場合があります。

#### メトリクスタイプ

メトリクスタイプ (GAUGE、RATE、COUNT、DISTRIBUTION など) を表示します。詳しくは、[メトリクスタイプ][8]のページを参照してください。

**警告**: メトリクスタイプを編集すると、ダッシュボードとモニターの**すべて**に対するメトリクスの動作が変更されます。

#### インテグレーション名

メトリクスがサポートされている[インテグレーション][9]からのものである場合、メタデータにはインテグレーション名がリストされます。この情報は編集できません。

#### 間隔

メトリクスの収集間隔を秒で表示します。

#### メトリクスの説明

メトリクスの内容を理解するのに役立ちます。メトリクスに使用したサポート対象の[インテグレーション][9]から送られてくる説明が表示されます。[カスタムメトリクス][4]の場合は、このフィールドを使用して説明を更新できます。

### タグテーブル

タグテーブルは、メトリクスのデータでアクティブにレポートしているすべてのタグキーとタグ値を探索するための複数の方法を提供します。

タグテーブルを使用して、次のことを行います。

- **Count 列** (一意のタグ値のカウント) でタグキーを並べ替えます。
- タグのページ区切りされたテーブルを検索して、特定のタグキーを探します。
- タグテーブルをダウンロード可能な CSV としてエクスポートします。
- メトリクスに構成したタグと、メトリクスに元々登録されているタグを切り替えることができます。

特定のタグキーについて、次のことができます。

- そのタグキーのすべてのタグ値を検査します。
- 特定のタグ `key:value` を使用して、[メトリクスの概要]ページに表示されるメトリクスのリストをさらにフィルタリングします。
- メトリクスエクスプローラーで、タグ `key:value` ペアによってフィルタリングされたこのメトリクスのグラフを開きます。
- アプリケーション全体でフィルタリングするために、タグ `key:value` をコピーします。

{{< img src="metrics/summary/updated_tags_table.mp4" alt="タグテーブル" video=true style="width:75%;">}}

[タグ付けに関する詳しい説明][5]。

## メトリクス関連アセット

{{< img src="metrics/summary/related_assets_dashboards.png" alt="指定したメトリクス名の関連アセット" style="width:80%;">}}

組織にとってのメトリクス名の価値を判断するには、メトリクス関連アセットを使用します。メトリクス関連アセットとは、特定のメトリクスをクエリするダッシュボード、ノートブック、モニター、または SLO を指します。

1. メトリクスの詳細サイドパネルの一番下までスクロールして、"Related Assets" セクションに移動します。
2. ドロップダウンボタンをクリックして、関心のある関連アセットタイプ (ダッシュボード、モニター、ノートブック、SLO) を表示します。さらに、検索バーを活用して特定のアセットを検証できます。


## Metrics without LimitsTM
Metrics without LimitsTM は、Agent やコードレベルの変更を必要とせずに、カスタムメトリクスのサイズを制御できます。

**注:** Metrics without LimitsTM は、カスタムメトリクスでのみ利用可能です。

タグの構成は、メトリクスのタグ一括構成ボタン、またはメトリクスの詳細サイドパネルの **Manage Tags** ボタンで行えます。

{{< img src="metrics/distributions/managetags.png" alt="ディストリビューションでタグを構成する" style="width:80%;">}}

1. **Metrics Summary** テーブルでカスタムディストリビューションのメトリクス名をクリックし、メトリクス詳細のサイドパネルを開きます。
2. **Manage Tags** ボタンをクリックして、タグコンフィギュレーションモーダルを開きます。

3. **Include tags...** または **Exclude tags...** を選択して、クエリするタグまたはクエリしないタグをカスタマイズします。タグ構成の詳細については、[Metrics without Limits][10] のドキュメントを参照してください。
4. **Save** を選択する前に、カーディナリティ推定機能を使用して提案したタグ構成の効果をプレビューします。

**注**: カーディナリティ推定機能では、メトリクスが 48 時間より古い必要があります。

### クエリ可能なタグ 

メトリクスが Metrics without LimitsTM で構成されると、どのタグが Queryable のままか、つまり _Indexed Custom Metrics_ のボリュームに寄与するタグを表示することができます。また、_Ingested Custom Metrics_ のボリュームに寄与する、最初に送信されインジェストされたすべてのタグにトグルバックすることができます。

### アドバンスドモードでの集計によるメトリクスの最適化

カウント、ゲージ、レートの各メトリクスタイプのカスタムメトリクスでは、Metrics without LimitsTM のアドバンスモードでオプションで追加の集計を含めることにより、メトリクスの構成をさらに洗練させることができます。デフォルトでは、Datadog は、構成されたメトリクスのクエリの数学的精度を維持するために、メトリクスのタイプに応じて最も頻繁にクエリされる集計の組み合わせを以下に示すように保存します。

- 構成されたカウント/レートは `SUM` の時間/空間集計でクエリ可能です
- 構成されたゲージは `AVG` の時間/空間集計ででクエリ可能です

{{< img src="metrics/summary/customize_aggr_docs.jpg" alt="カウント、レート、ゲージに関する集計の精緻化" style="width:80%;">}}

さらに多くの集計が用意されており、お客様にとって価値のある集計となります。Agent やコードレベルの変更なしに、いつでも集計を追加または削除することができます。

**注**: カウント、レート、ゲージのメトリクスを構成し、集計を削除すると、既存のダッシュボードやモニターに影響を与える可能性があります。

### メトリクス起源の定義

以下の表は、ファセットに表示されるメトリクス起源と、そのメトリクスがどこから送信されたかの対応関係を示しています。

| メトリクス起源           | 送信元                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API カタログ             | Datadog [API Catalog][13] 製品から APIM エンドポイントを介して送信された時系列データ。
| APM                     | Datadog APM 製品から送信された、トレースやスパンメトリクスにより生成された時系列データ。
| Agent                   | Datadog Agent によって送信され、[Agent インテグレーション][10]、[組み込みインテグレーション][9]、[DogStatsD][32]、または[カスタム Agent チェック][33]から収集された時系列データ。
| CSM                     | Datadog [Cloud Security Monitoring][14] 製品から送信された時系列データ。
| Cloud Integrations      | AWS、Azure、Google Cloud など、各クラウドプロバイダーのインテグレーションから収集された時系列データ。
| DBM                     | Datadog [Database Monitoring][15] 製品から送信された時系列データ (MySQL、Oracle、Postgres のアクティビティ/クエリ/ロックに関するインサイトを含む)。
| DSM                     | Datadog [Data Streams Monitoring][16] 製品から送信された時系列データ (DSM スパンやトレースから生成されたメトリクス)。
| Datadog エクスポーター        | [OpenTelemetry Collector][17] または [Datadog Exporter][18] から送信された時系列データ。
| Datadog Platform        | [メトリクス使用状況を報告する][11]ために用いられるメトリクスインテークによって送信された時系列データ。
| イベント                  | Datadog Events プラットフォームから生成された時系列データ。
| LLM Observability       | `lmobs_to_metrics` サービスを使用して LLM Observability 製品から出力された時系列データ。
| ログ                    | Datadog [Logs][28] プラットフォームから生成された時系列データ。
| Metrics API             | Datadog の [OTLP Ingestion エンドポイント][21]および OTel レシーバーを使用して送信され、Datadog インテグレーションに対応するもの、推定使用量メトリクス、または Datadog API クライアント由来の時系列データ。
| CNM                     | Datadog [Cloud Network Monitoring][19] 製品から送信された時系列データ。
| Observability Pipelines | Datadog [Observability Pipelines][20] から送信された時系列データ (エラーおよびパフォーマンスメトリクスを含む)。
| その他                   | DD インテグレーション対応がない時系列データ。
| プロセス               | Datadog [Processes][22] 製品から生成された時系列データ。
| RUM                     | Datadog [Real User Monitoring][23] 製品から生成された時系列データ。
| SAAS Integrations       | Slack、Docker、PagerDuty などの一般的な SaaS プラットフォームから収集された時系列データ。
| サーバーレス              | Datadog [Serverless][24] プラットフォームから送信された時系列データ (Function、App Services、Cloud Run、Container App Metrics を含む)。
| サービスカタログ         | Datadog [Service Catalog][25] 製品から送信された時系列データ ([Scorecard][29] メトリクスを含む)。
| Synthetic Monitoring    | Datadog [Synthetic Monitoring][26] 製品から生成された、Synthetic モニタリングおよび継続的テスト用メトリクス。
| USM                     | Datadog [Universal Service Monitoring][27] 製品から生成された時系列データ。

## 参考資料

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
[13]: /ja/api_catalog/
[14]: /ja/security/cloud_security_management/
[15]: /ja/database_monitoring/
[16]: /ja/data_streams/
[17]: /ja/opentelemetry/collector_exporter/otel_collector_datadog_exporter/?tab=onahost
[18]: /ja/opentelemetry/collector_exporter/
[19]: /ja/network_monitoring/cloud_network_monitoring/
[20]: /ja/observability_pipelines/
[21]: /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[22]: /ja/integrations/process/
[23]: /ja/monitors/types/real_user_monitoring/
[24]: /ja/serverless/
[25]: /ja/service_catalog/
[26]: /ja/synthetics/
[27]: /ja/universal_service_monitoring/
[28]: /ja/logs/
[29]: /ja/service_catalog/scorecards/
[30]: /ja/metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /ja/metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /ja/metrics/custom_metrics/agent_metrics_submission/