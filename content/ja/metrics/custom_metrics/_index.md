---
algolia:
  tags:
  - カスタムメトリクス
aliases:
- /ja/guides/metrics/
- /ja/metrictypes/
- /ja/units/
- /ja/developers/metrics/datagram_shell
- /ja/developers/metrics/custom_metrics/
- /ja/getting_started/custom_metrics
- /ja/developers/metrics/
- /ja/metrics/guide/tag-configuration-cardinality-estimation-tool/
further_reading:
- link: /developers/dogstatsd/
  tag: ドキュメント
  text: DogStatsD について
- link: /developers/community/libraries/
  tag: ドキュメント
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: ドキュメント
  text: カスタムメトリクスの課金
- link: /metrics/guide/custom_metrics_governance/
  tag: ガイド
  text: カスタムメトリクスのガバナンスに関するベストプラクティス
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: ブログ
  text: Metrics without Limits™ でカスタムメトリクスのボリュームをダイナミックにコントロール
title: カスタムメトリクス
---

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加" hide_image="true" btn_title="登録" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  カスタムメトリクスのための Foundation Enablement セッションにご登録してください。カスタムメトリクスが、訪問者数、平均顧客バスケットサイズ、リクエストレイテンシー、カスタムアルゴリズムのパフォーマンス分布など、アプリケーション KPI の追跡にどのように役立つかを学びましょう。
{{< /learning-center-callout >}}

## 概要

カスタムメトリクスは、訪問者数、平均顧客バスケットサイズ、リクエストレイテンシー、カスタムアルゴリズムのパフォーマンス分布など、アプリケーションの KPI を追跡するのに役立ちます。カスタムメトリクスは、**メトリクス名とタグ値 (ホストタグを含む) のユニークな組み合わせ**によって識別されます。以下の例では、メトリクス `request.Latency` は 2 つのタグキーから 4 つのユニークなタグ値の組み合わせを持っています。

- `endpoint` の値は `endpoint:X` または `endpoint:Y` とします。
- `status` の値は `status:200` または `status:400` とします。

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="リクエストのレイテンシー" style="width:80%;">}}

以下もカスタムメトリクスと見なされます。
- 一般的に、[DogStatsD][3] または[カスタム Agent Check][4] を通じて送信されたメトリクス
- [Marketplace インテグレーション][29]によって送信されたメトリクス
- 特定の[標準インテグレーション](#standard-integrations)は、カスタムメトリクスを送信する可能性があります
- [Datadog の {{< translate key="integration_count" >}} 以上のインテグレーション][1]に含まれていないインテグレーションから送信されたメトリクス。

**注**: Datadog 管理者のロールまたは `usage_read` 権限を持つユーザーは、[使用量の詳細ページ][5]で、アカウントの 1 時間当たりのカスタムメトリクスの月平均数と、上位 5000 個のカスタムメトリクスを参照できます。詳しくは、[カスタムメトリクスの数え方][6]を参照してください。

## カスタムメトリクスのプロパティ

Datadog のカスタムメトリクスには、以下のプロパティがあります。Datadog 内でメトリクスをグラフ化する方法については、[メトリクスの概要][7]をお読みください。

| プロパティ         | 説明                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | [メトリクスの名前](#naming-custom-metrics)。                                                                                                                  |
| `<METRIC_VALUE>` | メトリクスの値。**注**: メトリクスの値は 32 ビットである必要があります。値は日付またはタイムスタンプを反映できません。                                                                                                                                |
| `<タイムスタンプ>`    | メトリクスの値に関連付けられたタイムスタンプ。**注**: メトリクスのタイムスタンプは、未来は 10 分、過去は 1 時間を超えることはできません。 |
| `<タグ>`         | メトリクスに関連付けられているタグセット。                                                                                                                 |
| `<METRIC_TYPE>`  | メトリクスのタイプ。[メトリクスのタイプ][8]をお読みください。                                                                                             |
| `<INTERVAL>`     | メトリクスの `<TYPE>` が [RATE][9] または [COUNT][10] の場合は、その[間隔][11]を定義します。                                                       |

### カスタムメトリクスの名前

カスタムメトリクスの名前は、以下の命名規則に従う必要があります。

* メトリクス名は文字で開始する必要があります。
* メトリクス名に使用できるのは、ASCII 英数字、アンダースコア、およびピリオドだけです。
  * スペースなどの他の文字はアンダースコアに変換されます。
  * Unicode はサポートされません。
* メトリクス名は 200 文字以内で作成できますが、ユーザーインターフェイスの観点からは、100 文字未満をお勧めします。

**注**: Datadog のメトリクス名は大文字と小文字が区別されます。

### メトリクス単位

[メトリクスサマリー][12]を使用してメトリクス単位を設定するか、可視化のグラフエディタで[単位オーバーライド][13]機能を使用してカスタムメトリクス単位を設定できます。詳細については、[メトリクス単位][14]のドキュメントを参照してください。

## カスタムメトリクスの送信

{{< whatsnext desc="メトリクスを Datadog に送信する方法は複数あります。">}}
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

[Datadog 公式およびコミュニティ寄稿の API および DogStatsD クライアントライブラリ][15]のいずれかを使用して、カスタムメトリクスを送信することもできます。

**注**: カスタムメトリクスの送信に適用される[固定のレート制限][5]はありません。デフォルトの割り当てを超えた場合は、[Datadog のカスタムメトリクスの課金ポリシー][6]に従って課金されます。

## 標準インテグレーション

以下の標準インテグレーションでは、カスタムメトリクスを生成することができます。

| インテグレーションの種類                           | インテグレーション                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| デフォルトで上限 350 個のカスタムメトリクス。      | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]                              |
| カスタムメトリクスの収集では既定の上限なし。 | [Nagios][19] /[PDH チェック][20] /[OpenMetrics][21] /[Windows パフォーマンスカウンター][22] /[WMI][23] /[Prometheus][21] |
| カスタムメトリクス収集の構成が可能。   | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| クラウドインテグレーションから送信されたカスタムメトリクス    | [AWS][28]                                                                          |

## 参考資料

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
[11]: /ja/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /ja/metrics/summary/#metric-unit
[13]: /ja/dashboards/guide/unit-override/
[14]: /ja/metrics/units/
[15]: /ja/developers/community/libraries/
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