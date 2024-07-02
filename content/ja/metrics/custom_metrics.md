---
title: Custom Metrics
aliases:
  - /guides/metrics/
  - /metrictypes/
  - /units/
  - /developers/metrics/datagram_shell
  - /developers/metrics/custom_metrics/
  - /getting_started/custom_metrics
  - /developers/metrics/
  - /metrics/guide/tag-configuration-cardinality-estimation-tool/
further_reading:
- link: /developers/dogstatsd/
  tag: Documentation
  text: Learn more about DogStatsD
- link: /developers/community/libraries/
  tag: Documentation
  text: Official and Community created API and DogStatsD client libraries
- link: "https://dtdg.co/fe"
  tag: Foundation Enablement
  text: Join an interactive session to unlock the full potential of metrics
- link: "https://www.datadoghq.com/blog/metrics-without-limits/"
  tag: Blog
  text: Dynamically control your custom metrics volume with Metrics without LimitsTM
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: Blog
  text: Monitor your Linux web apps on Azure App Service with Datadog
algolia:
  tags: [custom metrics]
---

## 概要

メトリクスが [{{< translate key="integration_count" >}} 種以上の Datadog インテグレーション][1]以外から送信された場合、そのメトリクスはカスタムメトリクスとみなされます。カスタムメトリクスを使うと、訪問者数、平均顧客バスケットサイズ、リクエストレイテンシー、カスタムアルゴリズムのパフォーマンス分布など、アプリケーションの KPI を追跡することができます。特定の[標準インテグレーション](#standard-integrations)は、カスタムメトリクスを出力する可能性もあります。

カスタムメトリクスは、**メトリクス名とタグ値 (ホストタグを含む) の組み合わせ**により、一意に識別されます。一般に、[DogStatsD][3] または[カスタム Agent チェック][4]を使用して送信されるメトリクスはすべて、カスタムメトリクスとなります。

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

### Metric units

Set metric units through [Metrics Summary][12] or set custom metric units with the [Unit override][13] feature in the graph editor of your visualizations. For more information, see the [Metrics Units][14] documentation.

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

You can also use one of the [Datadog official and community contributed API and DogStatsD client libraries][15] to submit your custom metrics

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

[1]: /integrations/
[2]: /account_management/billing/custom_metrics/#standard-integrations
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /metrics
[8]: /metrics/types/
[9]: /metrics/types/?tab=rate#metric-types
[10]: /metrics/types/?tab=count#metric-types
[11]: /developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /metrics/summary/#metric-unit
[13]: /dashboards/guide/unit-override/
[14]: /metrics/units/
[15]: /developers/community/libraries/
[16]: /integrations/activemq/#activemq-xml-integration
[17]: /integrations/go_expvar/
[18]: /integrations/java/
[19]: /integrations/nagios
[20]: /integrations/pdh_check/
[21]: /integrations/openmetrics/
[22]: /integrations/windows_performance_counters/
[23]: /integrations/wmi_check/
[24]: /integrations/mysql/
[25]: /integrations/oracle/
[26]: /integrations/postgres/
[27]: /integrations/sqlserver/
[28]: /integrations/amazon_web_services/
