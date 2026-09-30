---
algolia:
  tags:
  - custom metrics
aliases:
- /ja/guides/metrics/
- /ja/metrictypes/
- /ja/units/
- /ja/developers/metrics/datagram_shell
- /ja/developers/metrics/custom_metrics/
- /ja/getting_started/custom_metrics
- /ja/developers/metrics/
- /ja/metrics/guide/tag-configuration-cardinality-estimation-tool/
description: Custom Metrics とは何か、どのように名前やタグで識別されるか、Datadog でどのように請求されるかを学びます。
further_reading:
- link: /extend/dogstatsd/
  tag: ドキュメント
  text: DogStatsD について
- link: /extend/community/libraries/
  tag: ドキュメント
  text: 公式およびコミュニティ作成の API および DogStatsD クライアントライブラリ
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: ドキュメント
  text: Custom Metrics の課金
- link: /account_management/billing/metric_name_pricing/
  tag: ドキュメント
  text: Custom Metrics のメトリクス名の料金
- link: /metrics/guide/custom_metrics_governance/
  tag: ガイド
  text: Custom Metrics のガバナンスに関するベストプラクティス
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: ブログ
  text: Metrics without Limits™ で Custom Metrics のボリュームをダイナミックにコントロール
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: ブログ
  text: Datadog を使用して効果的なエグゼクティブ向けダッシュボードを設計する
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: ラーニングセンター
  text: Metrics Governance
title: Custom Metrics
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Custom Metrics の Foundation Enablement セッションを確認し、登録してください。訪問者数、顧客の平均バスケットサイズ、リクエストのレイテンシー、カスタムアルゴリズムのパフォーマンス分布などのアプリケーションの KPI の追跡に、Custom Metrics がどのように役立つかを学びます。
{{< /learning-center-callout >}}

## 概要 {#overview}

Custom Metrics は、訪問者数、平均顧客バスケットサイズ、リクエストレイテンシー、カスタムアルゴリズムのパフォーマンス分布など、アプリケーション KPI を追跡する上で役立ちます。Custom Metrics は、**メトリクス名とタグ値 (ホストタグを含む) の一意の組み合わせ**によって識別されます。以下の例では、メトリクス `request.Latency` は 2 つのタグキーから 4 つの一意のタグ値の組み合わせを持っています。

- `endpoint` の値は `endpoint:X` または `endpoint:Y` とします。
- `status` の値は `status:200` または `status:400` とします。

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="リクエストレイテンシー" style="width:80%;">}}

以下も Custom Metrics と見なされます。
- 一般的に、[DogStatsD][3] または[カスタム Agent Check][4] を通じて送信されたメトリクス
- [Marketplace インテグレーション][29]によって送信されたメトリクス
- 特定の[標準インテグレーション](#standard-integrations)は、Custom Metrics を送信する可能性がある
- [ {{< translate key="integration_count" >}} 以上の Datadog インテグレーション][1]に含まれていないインテグレーションから送信されたメトリクス。

**注**: Datadog Admin ロールまたは `usage_read` 権限を持つユーザーは、[使用量の詳細ページ][5]で、アカウントの 1 時間あたりの Custom Metrics の月平均数と、上位 5,000 個の Custom Metrics を参照できます。詳しくは、[Custom Metrics のカウント方法][6]を参照してください。

## Custom Metrics のプロパティ {#custom-metrics-properties}

Datadog Custom Metrics には、以下のプロパティがあります。Datadog 内でメトリクスをグラフ化する方法については、[メトリクスの概要][7]をお読みください。

| プロパティ         | 説明                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | [メトリクスの名前](#naming-custom-metrics)。                                                                                                                 |
| `<METRIC_VALUE>` | メトリクスの値。**注**: メトリクスの値は 32 ビットである必要があります。値には日付またはタイムスタンプは使用できません。                                                                                                                               |
| `<TIMESTAMP>`    | メトリクス値に関連付けられたタイムスタンプ。**注**: メトリクスのタイムスタンプは、未来は 10 分、過去は 1 時間を超えることはできません。|
| `<TAGS>`         | メトリクスに関連付けられているタグセット。                                                                                                                |
| `<METRIC_TYPE>`  | メトリクスのタイプ。[メトリクスタイプ][8]を参照してください。                                                                                            |
| `<INTERVAL>`     | メトリクスの `<TYPE>` が[レート][9]または[カウント][10]の場合は、対応する[間隔][11]を定義します。                                                      |

### Custom Metrics の命名 {#naming-custom-metrics}

Custom Metrics の名前は、以下の命名規則に従う必要があります。

* メトリクス名は文字で開始する必要があります。
* メトリクスの名前に使用できるのは、ASCII 英数字、アンダースコア、およびピリオドだけです。
  * スペースなどのほかの文字はアンダースコアに変換されます。
  * Unicode はサポートされて_いません_。
* メトリクス名は 200 文字以内である必要があります。ユーザーインターフェイスの観点からは、100 文字未満をお勧めします。

**注**: Datadog のメトリクス名は大文字と小文字が区別されます。

### メトリクス単位 {#metric-units}

[Metrics Summary][12] を使用してメトリクス単位を設定するか、可視化のグラフエディターで[単位オーバーライド][13]機能を使用して Custom Metrics 単位を設定できます。詳細については、[メトリクス単位][14]のドキュメントを参照してください。

## Custom Metrics の送信 {#submitting-custom-metrics}

{{< whatsnext desc="メトリクスを Datadog に送信する方法はいくつかあります。">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}カスタム Agent チェック{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog の HTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}ログベースのメトリクスを生成する{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}APM スパンベースのメトリクスを生成する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}RUM イベントベースのメトリクスを生成する{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}ライブプロセスベースのメトリクスを生成する{{< /nextlink >}}
{{< /whatsnext >}}

[Datadog 公式およびコミュニティ寄稿の API および DogStatsD クライアントライブラリ][15]のいずれかを使用して、Custom Metrics を送信することもできます。

**注**: Custom Metrics の送信に適用される固定のレート制限はありません。デフォルトの割り当てを超えた場合は、[Datadog の Custom Metrics 請求ポリシー][6]に従って請求されます。

## 標準インテグレーション {#standard-integrations}

以下の標準インテグレーションでは、Custom Metrics を生成することができます。

| インテグレーションの種類                           | インテグレーション                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| デフォルトで上限 350 個の Custom Metrics。     | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| Custom Metrics の収集ではデフォルトの上限なし。| [Nagios][19] /[PDH Check][20] /[OpenMetrics][21] /[Windows パフォーマンスカウンター][22] /[WMI][23] /[Prometheus][21] |
| Custom Metrics 収集の構成が可能。  | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| クラウドインテグレーションから送信された Custom Metrics    | [AWS][28]                                                                          |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/account_management/billing/custom_metrics/#standard-integrations
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ja/metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /ja/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /ja/metrics
[8]: /ja/metrics/types/
[9]: /ja/metrics/types/?tab=rate#metric-types
[10]: /ja/metrics/types/?tab=count#metric-types
[11]: /ja/extend/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /ja/metrics/summary/#metric-unit
[13]: /ja/dashboards/guide/unit-override/
[14]: /ja/metrics/units/
[15]: /ja/extend/community/libraries/
[16]: /ja/integrations/activemq/#activemq-xml-integration
[17]: /ja/integrations/go_expvar/
[18]: /ja/integrations/java/
[19]: /ja/integrations/nagios
[20]: /ja/integrations/pdh_check/
[21]: /ja/integrations/openmetrics/
[22]: /ja/integrations/windows_performance_counters/
[23]: /ja/integrations/wmi_check/
[24]: /ja/integrations/mysql/
[25]: /ja/integrations/oracle/
[26]: /ja/integrations/postgres/
[27]: /ja/integrations/sqlserver/
[28]: /ja/integrations/amazon_web_services/
[29]: /ja/integrations/#cat-marketplace